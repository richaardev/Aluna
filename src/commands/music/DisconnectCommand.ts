import { createSlashCommand } from "@/structures/command";
import { requireGuildPlayer, requireVoiceChannel } from "@/structures/command/middlewares";

import { InteractionContextType } from "discord.js";

export default createSlashCommand<"cached">({
  name: "disconnect",
  description: "Me disconecte do canal de voz",
  contexts: [InteractionContextType.Guild],
  middlewares: [requireVoiceChannel, requireGuildPlayer],
  async execute(interaction) {
    const guildPlayer = this.playerManager.getPlayer(interaction.guildId)!;
    await guildPlayer.destroy("User requested disconnect");
    interaction.reply({ content: "👋 Desconectado do canal de voz!" });
  },
});
