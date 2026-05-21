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
      description: "Tempo (Ex: 10s, 3m, 10%)",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  async execute(interaction) {
    const timeString = interaction.options.getString("time", true);
    const guildPlayer = this.playerManager.getPlayer(interaction.guildId)!;
    const track = guildPlayer.queue.current;

    if (!track) return interaction.reply({ content: "Nenhuma musica está tocando no momento." });
    if (!track.info.isSeekable) return interaction.reply({ content: "Esta musica não permite seek." });

    const trackDuration = track.info.duration;
    const time = parseTimeString(timeString, trackDuration);

    if (time <= 0)
      return interaction.reply({ content: "Tempo inválido! Use formatos como: 10s, 3m, 1h, 50%" });

    await guildPlayer.seek(time);
    interaction.reply({ content: `O tempo da musica foi alterado para \`${~~(time / 1000)} segundos\`` });
  },
});

function parseTimeString(timeStr: string, trackDuration?: number): number {
  const units: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  const match = timeStr.match(/^(\d+)([smhd%])$/);
  if (!match) return 0;

  const value = match[1];
  const unit = match[2];
  if (!value || !unit) return 0;

  if (unit === "%") {
    if (!trackDuration) return 0;
    return Math.round((parseInt(value) / 100) * trackDuration);
  }

  return parseInt(value) * (units[unit] || 0);
}
