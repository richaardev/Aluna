import type AlunaClient from "@/AlunaClient";
import { Command, type CommandContext } from "@/structures/command";

export default class LoopCommand extends Command {
  constructor(client: AlunaClient) {
    super(client, {
      labels: ["loop", "repetir"],
      description: "Crie um loop da playlist ou da musica atual",
      requirements: {
        needsGuildPlayer: true,
        voiceChannelOnly: true,
      },
    });
  }
  async execute(ctx: CommandContext) {
    const queue = ctx.guildPlayer?.queue!;
    if (queue?.loop) {
      queue.loop = false;
      ctx.beautifulReply("🔁", "A musica atual não irá mais se repetir!");
    } else {
      queue.loop = false;
      ctx.beautifulReply("🔁", "A musica atual irá se repetir agora!");
    }
  }
}
