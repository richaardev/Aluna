import { createSlashCommand } from "@/structures/command";
import { requireVoiceChannel } from "@/structures/command/middlewares";

import { InteractionContextType } from "discord.js";

export default createSlashCommand<"cached">({
  name: "join",
  description: "Faça eu entrar no canal de voz",
  contexts: [InteractionContextType.Guild],
  middlewares: [requireVoiceChannel],
  async execute(interaction) {
    const existingPlayer = this.playerManager.getPlayer(interaction.guildId);
    if (existingPlayer?.connected) return interaction.reply({ content: "Eu já estou em um canal de voz" });

    const member = interaction.member;
    const voiceChannel = member?.voice?.channel;

    if (!voiceChannel) return interaction.reply({ content: "Você precisa estar em um canal de voz!" });

    try {
      const player = this.playerManager?.createPlayer({
        guildId: interaction.guildId,
        voiceChannelId: voiceChannel.id,
        textChannelId: interaction.channelId,
        selfDeaf: true,
        selfMute: false,
        volume: 100,
      });

      await player?.connect();
      await interaction.reply({ content: `Eu entrei em \`${voiceChannel.name}\`` });
    } catch (err) {
      await interaction.reply({ content: `Não consegui entrar no canal de voz!` });
    }
  },
});
