import { createSlashCommand } from "@/structures/command";
import { requireGuildPlayer, requireVoiceChannel } from "@/structures/command/middlewares";

import { InteractionContextType } from "discord.js";

export default createSlashCommand<"cached">({
  name: "stop",
  description: "Faça eu parar de tocar musica no canal de voz",
  contexts: [InteractionContextType.Guild],
  middlewares: [requireVoiceChannel, requireGuildPlayer],
  async execute(interaction) {
    const guildPlayer = this.playerManager?.getPlayer(interaction.guildId);
    
    if (!guildPlayer) {
      return interaction.reply({ content: "Não há nenhum player ativo!" });
    }

    await guildPlayer.stopPlaying(true, false); // Clear queue, no autoplay
    interaction.reply({ content: "⏹️ A reprodução foi parada!" });
  },
});
