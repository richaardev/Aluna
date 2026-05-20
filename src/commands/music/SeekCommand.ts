import { createSlashCommand } from "@/structures/command";
import { requireGuildPlayer, requireVoiceChannel } from "@/structures/command/middlewares";

import { ApplicationCommandOptionType, InteractionContextType } from "discord.js";

export default createSlashCommand<"cached">({
  name: "seek",
  description: "Altere a posição da musica",
  contexts: [InteractionContextType.Guild],
  middlewares: [requireVoiceChannel, requireGuildPlayer],
  options: [
    {
      name: "time",
      description: "Tempo (Ex: 10s, 3m, 1d)",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  async execute(interaction) {
    const timeString = interaction.options.getString("time", true);
    const guildPlayer = this.playerManager.getPlayer(interaction.guildId)!;

    const time = parseTimeString(timeString);

    if (time <= 0) return interaction.reply({ content: "❌ Tempo inválido! Use formatos como: 10s, 3m, 1h" });

    await guildPlayer.seek(time);
    interaction.reply({ content: `⏩ O tempo da musica foi alterado para \`${~~(time / 1000)} segundos\`` });
  },
});

// Helper function to parse time strings like "10s", "3m", "1d"
function parseTimeString(timeStr: string): number {
  const units: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  const match = timeStr.match(/^(\d+)([smhd])$/);
  if (!match) return 0;

  const value = match[1];
  const unit = match[2];
  if (!value || !unit) return 0;

  return parseInt(value) * (units[unit] || 0);
}
