import { type AlunaTrackUserData } from "@/music/Types";
import { createSlashCommand } from "@/structures/command";
import { requireVoiceChannel } from "@/structures/command/middlewares";
import AlunaEmbed from "@/utils/AlunaEmbed";
import { formatDuration } from "@/utils/formatDuration";

import { ApplicationCommandOptionType, InteractionContextType } from "discord.js";

export default createSlashCommand<"cached">({
  name: "play",
  description: "Faça-me tocar uma musica ou adicione uma musica na playlist",
  contexts: [InteractionContextType.Guild],
  middlewares: [requireVoiceChannel],
  options: [
    {
      name: "song",
      description: "Nome ou URL da música",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  async execute(interaction) {
    if (!this.playerManager) return;

    const query = interaction.options.getString("song", true);
    await interaction.guild.fetch();
    const member = await interaction.member.fetch();

    console.log(member.voice);
    const voiceChannelId = member?.voice?.channelId;
    if (!voiceChannelId) return interaction.reply({ content: "Você precisa estar em um canal de voz!" });

    const voiceChannel = (await interaction.guild.channels.fetch(voiceChannelId))!;

    await interaction.deferReply();

    // Get or create player
    let player = this.playerManager.getPlayer(interaction.guildId);

    if (!player)
      player = this.playerManager.createPlayer({
        guildId: interaction.guildId,
        voiceChannelId: voiceChannel.id,
        textChannelId: interaction.channelId,
        selfDeaf: true,
        selfMute: false,
        volume: 100,
      });

    if (!player.connected) await player.connect();

    const result = await player.search(
      {
        query: query,
        source: "scsearch",
      },
      interaction.user,
    );

    if (!result || !result.tracks || result.tracks.length === 0) {
      return interaction.editReply({ content: "❌ Não encontrei nenhuma música com esse nome!" });
    }

    // Add user data to track
    const track = result.tracks[0];
    if (!track) {
      return interaction.editReply({ content: "❌ Não encontrei nenhuma música com esse nome!" });
    }

    track.userData = {
      requestedBy: interaction.user.id,
      requestedAt: Date.now(),
    } satisfies AlunaTrackUserData;

    // Add to queue
    await player.queue.add(track);

    // Create embed response
    const embed = new AlunaEmbed()
      .setThumbnail(track.info.artworkUrl || "")
      .setTitle("**Musica adicionada na fila**")
      .addFields([
        { name: ":tv: Nome", value: `\`${track.info.title}\``, inline: false },
        {
          name: "⏰ Duração",
          value: `\`${formatDuration(track.info.duration || 0, track.info.isStream)}\``,
          inline: true,
        },
        { name: ":bust_in_silhouette: Autor", value: `\`${track.info.author}\``, inline: true },
        { name: "#️⃣ Posição na fila", value: `\`${player.queue.tracks.length}\``, inline: true },
      ]);

    await interaction.editReply({ embeds: [embed] });

    // Start playing if not already playing
    if (!player.playing && !player.paused) {
      await player.play();
    }
  },
});
