import type AlunaClient from "@/AlunaClient";
import type AlunaGuildPlayer from "@/music/structures/AlunaGuildPlayer";
import type { AlunaTrackUserData } from "@/music/Types";
import Logger from "@/utils/Logger";

import type { Track } from "lavalink-client";
import type { TextChannel } from "discord.js";

export default class PlayerEvents {
  public client: AlunaClient;
  public name: string;

  constructor(client: AlunaClient) {
    this.client = client;
    this.name = "ready";
  }

  async run() {
    const manager = this.client.playerManager;
    if (!manager) return;

    // Track start event
    manager.on("trackStart", async (player, track) => {
      const userData = track?.userData as AlunaTrackUserData | undefined;
      const channel = player.textChannelId ? this.client.channels.cache.get(player.textChannelId) as TextChannel | undefined : undefined;

      if (channel && track) {
        await channel.send({
          content: `🔊 **|** Tocando agora **${track.info.title}** solicitado por <@!${userData?.requestedBy}>`,
          allowedMentions: {
            parse: [],
            repliedUser: false,
          },
        });
      }
    });

    // Track end event
    manager.on("trackEnd", async (player, track, payload) => {
      Logger.info(`Track ended: ${track?.info.title ?? "unknown"} - Reason: ${payload.reason}`);
    });

    // Queue end event
    manager.on("queueEnd", async (player) => {
      const channel = player.textChannelId ? this.client.channels.cache.get(player.textChannelId) as TextChannel | undefined : undefined;

      if (channel) {
        await channel.send({
          content: "💿 **|** Todas as musicas acabaram!",
          allowedMentions: {
            parse: [],
            repliedUser: false,
          },
        });
      }

      // Destroy player after queue ends (handled by onEmptyQueue.destroyAfterMs in manager options)
    });

    // Player destroy event
    manager.on("playerDestroy", (player, reason) => {
      Logger.info(`Player destroyed for guild ${player.guildId}: ${reason ?? "no reason"}`);
    });

    // Error events
    manager.on("trackError", (player, track, error) => {
      Logger.error(`Track error for ${track?.info.title ?? "unknown"}:`, JSON.stringify(error));
    });

    manager.on("playerSocketClosed", (player, payload) => {
      Logger.warn(`Player socket closed for guild ${player.guildId}:`, JSON.stringify(payload));
    });
  }
}
