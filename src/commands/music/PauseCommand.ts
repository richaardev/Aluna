import { createSlashCommand } from "@/structures/command";
import { requireGuildPlayer, requireVoiceChannel } from "@/structures/command/middlewares";

import { InteractionContextType } from "discord.js";

export default createSlashCommand<"cached">({
  name: "pause",
  description: "Pause a musica que está tocando no momento",
  contexts: [InteractionContextType.Guild],
  middlewares: [requireVoiceChannel, requireGuildPlayer],
  async execute(interaction) {
    const guildPlayer = this.playerManager?.getPlayer(interaction.guildId);

    if (guildPlayer?.paused) interaction.reply({ content: "⏸️ A musica já está pausada!" });
    else {
      await guildPlayer?.pause();
      interaction.reply({ content: "⏸️ A musica foi pausada com sucesso!" });
    }
  },
});
