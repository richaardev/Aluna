import { createSlashCommand } from "@/structures/command";
import { requireGuildPlayer, requireVoiceChannel } from "@/structures/command/middlewares";

import { InteractionContextType } from "discord.js";

export default createSlashCommand<"cached">({
  name: "loop",
  description: "Crie um loop da playlist ou da musica atual",
  contexts: [InteractionContextType.Guild],
  middlewares: [requireVoiceChannel, requireGuildPlayer],
  async execute(interaction) {
    const guildPlayer = this.playerManager.getPlayer(interaction.guildId)!;

    if (guildPlayer.repeatMode === "track") {
      await guildPlayer.setRepeatMode("off");
      interaction.reply({ content: "🔁 A musica atual não irá mais se repetir!" });
    } else {
      await guildPlayer.setRepeatMode("track");
      interaction.reply({ content: "🔁 A musica atual irá se repetir agora!" });
    }
  },
});
