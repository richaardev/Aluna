import type AlunaClient from "@/AlunaClient";

import { type CacheType, type CommandInteraction } from "discord.js";

export type CommandMiddleware<Cached extends CacheType> = (
  client: AlunaClient,
  interaction: CommandInteraction<Cached extends "cached" ? "cached" : "raw">,
) => boolean;

export function createMiddleware<Cached extends CacheType = CacheType>(
  interaction: CommandMiddleware<Cached>,
): CommandMiddleware<Cached> {
  return interaction;
}

export const requireVoiceChannel = createMiddleware<"cached">((client, interaction) => {
  const member = interaction.member;
  if (!member?.voice?.channel) {
    interaction.reply({
      content: "Você precisa estar em um canal de voz!",
      ephemeral: true,
    });

    return false;
  }

  return true;
});

export const requireGuildPlayer = createMiddleware<"cached">((client, interaction) => {
  const guildPlayer = client.playerManager?.getPlayer(interaction.guildId);
  if (!guildPlayer) {
    interaction.reply({
      content: "Não há nenhuma música tocando no momento!",
      ephemeral: true,
    });

    return false;
  }
  return true;
});
