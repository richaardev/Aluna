import { type AlunaTrackUserData } from "@/music/Types";
import { createSlashCommand } from "@/structures/command";
import { requireGuildPlayer, requireVoiceChannel } from "@/structures/command/middlewares";
import AlunaEmbed from "@/utils/AlunaEmbed";

import { InteractionContextType } from "discord.js";

export default createSlashCommand<"cached">({
  name: "queue",
  description: "Veja as musicas que estão na playlist",
  contexts: [InteractionContextType.Guild],
  middlewares: [requireVoiceChannel, requireGuildPlayer],
  async execute(interaction) {
    const guildPlayer = this.playerManager.getPlayer(interaction.guildId)!;
    if (!guildPlayer.queue.current && guildPlayer.queue.tracks.length === 0)
      return interaction.reply({ content: "❌ Não há músicas na fila!" });

    const { formatDuration } = await import("@/utils/formatDuration");

    let description = "";

    if (guildPlayer.queue.current) {
      const currentUserData = guildPlayer.queue.current.userData as AlunaTrackUserData | undefined;
      description += `**🎵 Tocando agora:**\n\`${guildPlayer.queue.current.info.title}\` - ${formatDuration(guildPlayer.queue.current.info.duration || 0, guildPlayer.queue.current.info.isStream)} - <@!${currentUserData?.requestedBy}>\n\n`;
    }

    if (guildPlayer.queue.tracks.length > 0) {
      description += `**📋 Próximas músicas (${guildPlayer.queue.tracks.length}):**\n`;

      const queueTracks = guildPlayer.queue.tracks.slice(0, 10);
      queueTracks.forEach((track, i) => {
        const userData = track.userData as AlunaTrackUserData | undefined;
        description += `**${i + 1}.** \`${track.info.title}\` - ${formatDuration(track.info.duration || 0, track.info.isStream)} - <@!${userData?.requestedBy}>\n`;
      });

      if (guildPlayer.queue.tracks.length > 10) {
        description += `\n*...e mais ${guildPlayer.queue.tracks.length - 10} música(s)*`;
      }
    } else {
      description += "**Nenhuma música na fila!**";
    }

    const embed = new AlunaEmbed().setDescription(description);

    interaction.reply({
      embeds: [embed],
    });
  },
});
