import { createSlashCommand } from "@/structures/command";
import { requireGuildPlayer, requireVoiceChannel } from "@/structures/command/middlewares";

import { InteractionContextType } from "discord.js";

export default createSlashCommand<"cached">({
  name: "skip",
  description: "Pule para proxima musica",
  contexts: [InteractionContextType.Guild],
  middlewares: [requireVoiceChannel, requireGuildPlayer],
  async execute(interaction) {
    const guildPlayer = this.playerManager.getPlayer(interaction.guildId)!;

    await guildPlayer.skip();
    interaction.reply({ content: "⏭️ A musica foi pulada com sucesso!" });
  },
});
