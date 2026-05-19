import type AlunaClient from "@/AlunaClient";
import { Command, type CommandContext } from "@/structures/command";
import Emojis from "@/utils/Emojis";

export default class PauseCommand extends Command {
  constructor(client: AlunaClient) {
    super(client, {
      labels: ["pause", "pausar"],
      description: "Pause a musica que está tocando no momento",
      requirements: {
        voiceChannelOnly: true,
        needsGuildPlayer: true,
      },
    });
  }
  async execute(ctx: CommandContext) {
    if (ctx.guildPlayer!.paused) {
      ctx.beautifulReply(`${Emojis.error}`, `A musica já está pausada!`);
    } else {
      ctx.guildPlayer!.pause(true);
      ctx.beautifulReply("▶️", `A musica foi pausada com sucesso!`);
    }
  }
}
