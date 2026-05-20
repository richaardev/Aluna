import { createSlashCommand } from "@/structures/command";
import { requireGuildPlayer, requireVoiceChannel } from "@/structures/command/middlewares";

import { InteractionContextType } from "discord.js";

export default createSlashCommand<"cached">({
  name: "resume",
  description: "Despause a musica que está pausada",
  contexts: [InteractionContextType.Guild],
  middlewares: [requireVoiceChannel, requireGuildPlayer],
  async execute(interaction) {
    const guildPlayer = this.playerManager.getPlayer(interaction.guildId)!;

    if (guildPlayer?.paused) {
      await guildPlayer?.resume();
      interaction.reply({ content: "▶️ A musica está sendo continuada!" });
    } else {
      interaction.reply({ content: "▶️ A musica já está tocando!" });
    }
  },
});
