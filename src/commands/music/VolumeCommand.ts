import { createSlashCommand } from "@/structures/command";
import { requireGuildPlayer, requireVoiceChannel } from "@/structures/command/middlewares";

import { ApplicationCommandOptionType, InteractionContextType } from "discord.js";

export default createSlashCommand<"cached">({
  name: "volume",
  description: "Altere o volume da musica",
  contexts: [InteractionContextType.Guild],
  middlewares: [requireVoiceChannel, requireGuildPlayer],
  options: [
    {
      name: "volume",
      description: "Volume level (0-150)",
      type: ApplicationCommandOptionType.Integer,
      required: true,
      minValue: 0,
      maxValue: 150,
    },
  ],
  async execute(interaction) {
    const volume = interaction.options.getInteger("volume", true);
    const guildPlayer = this.playerManager?.getPlayer(interaction.guildId);
    
    if (!guildPlayer) {
      return interaction.reply({ content: "Não há nenhum player ativo!" });
    }

    await guildPlayer.setVolume(volume);
    interaction.reply({ content: `🔊 O volume da musica foi alterado para \`${volume}\`` });
  },
});
