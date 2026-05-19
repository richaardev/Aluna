import type AlunaClient from "@/AlunaClient";
import { env } from "@/env";
import type AlunaGuildPlayer from "@/music/structures/AlunaGuildPlayer";

import { type StageChannel, type VoiceChannel } from "discord.js";
import { LavalinkManager, type ManagerOptions } from "lavalink-client";

const nodes = env.LAVALINK_NODES;

export default class AlunaPlayerManager extends LavalinkManager {
  constructor(client: AlunaClient, options: ManagerOptions) {
    // options.player = AlunaGuildPlayer;

    super({
      ...options,
      sendToShard: (guildId, payload) => client.guilds.cache.get(guildId)?.shard?.send(payload),
      nodes: [
        {
          host: "localhost",
          port: 2333,
          authorization: "youshallnotpass",
        },
      ],
      autoSkip: true,
      client: {
        // biome-ignore lint/style/noNonNullAssertion: we're extracting ID from token
        id: Buffer.from(env.DISCORD_BOT_TOKEN.split(".")[0]!, "base64").toString("utf8"),
        username: "TESTBOT",
      },
    });
  }

  async joinChannel(channel?: VoiceChannel | StageChannel): Promise<AlunaGuildPlayer> {
    // return new Promise((resolve, reject) => {
    //   if (!channel) return reject("Invalid Voice Channel");
    //   this.join(
    //     {
    //       guild: channel.guild.id,
    //       channel: channel.id,
    //       node: "1",
    //     },
    //     { selfdeaf: true },
    //   )
    //     .then((player) => resolve(player as AlunaGuildPlayer))
    //     .catch(reject);
    // });
  }

  get getIdealHost() {
    return nodes[0];
  }
}
