import type AlunaClient from "@/AlunaClient";
import { Command, type CommandContext } from "@/structures/command";

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
