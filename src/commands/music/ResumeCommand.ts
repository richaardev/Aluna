import type AlunaClient from "../../AlunaClient";
import type { CommandContext } from "../../structures/command";

import { Command } from "../../structures/command";
import Emojis from "../../utils/Emojis";

export default class ResumeCommand extends Command {
  constructor(client: AlunaClient) {
    super(client, {
      labels: ["resume"],
      description: "Despause a musica que está pausada",
      requirements: {
        needsGuildPlayer: true,
        voiceChannelOnly: true,
      },
    });
  }
  async execute(ctx: CommandContext) {
    if (ctx.guildPlayer!.paused) {
      ctx.guildPlayer?.resume();
      ctx.beautifulReply("⏸️", "A musica está sendo continuada!");
    } else {
      ctx.beautifulReply(Emojis.error, "A musica já está tocando!");
    }
  }
}
