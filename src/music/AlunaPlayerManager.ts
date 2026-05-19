import type AlunaClient from "@/AlunaClient";
import { env } from "@/env";

import { LavalinkManager, type ManagerOptions } from "lavalink-client";

import AlunaGuildPlayer from "./structures/AlunaGuildPlayer";

export default class AlunaPlayerManager extends LavalinkManager<AlunaGuildPlayer> {
  constructor(client: AlunaClient, options?: Partial<ManagerOptions>) {
    super({
      ...options,
      sendToShard: (guildId, payload) => client.guilds.cache.get(guildId)?.shard?.send(payload),
      nodes: [{ host: "localhost", port: 2333, authorization: "youshallnotpass" }],
      autoSkip: true,
      client: { id: Buffer.from(env.DISCORD_BOT_TOKEN.split(".")[0]!, "base64").toString("utf8") },
      playerOptions: {
        applyVolumeAsFilter: false,
        clientBasedPositionUpdateInterval: 50,
        defaultSearchPlatform: "scsearch",
        volumeDecrementer: 1,
        onDisconnect: {
          autoReconnect: true,
          destroyPlayer: false,
        },
        onEmptyQueue: { destroyAfterMs: 300_000 },
        useUnresolvedData: true,
      },
      queueOptions: { maxPreviousTracks: 25 },
      playerClass: AlunaGuildPlayer,
      // player: (client, options) => new AlunaGuildPlayer(client, options),
    });
  }

  get getIdealHost() {
    return this.options.nodes[0];
  }
}
