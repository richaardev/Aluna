import type AlunaClient from "../../AlunaClient";
import type { CommandContext } from "../../structures/command";

import { Command } from "../../structures/command";

export default class SkipCommand extends Command {
  constructor(client: AlunaClient) {
    super(client, {
      labels: ["skip", "pular"],
      description: "Pule para proxima musica",
      requirements: {
        voiceChannelOnly: true,
        needsGuildPlayer: true,
      },
    });
  }
  async execute(ctx: CommandContext) {
    ctx.guildPlayer!.stop();
    ctx.beautifulReply("⏩", "A musica foi pulada com sucesso!");
  }
}
