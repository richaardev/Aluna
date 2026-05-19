import type AlunaClient from "../../AlunaClient";
import type { CommandContext } from "../../structures/command";

import { Command } from "../../structures/command";
import string from "../../structures/command/parameters/types/StringParameter";
import Emojis from "../../utils/Emojis";

export default class BassBoostCommand extends Command {
  constructor(client: AlunaClient) {
    super(client, {
      labels: ["bassboost"],
      description: "Melhore o grave da musica em até 1000x",
      requirements: {
        voiceChannelOnly: true,
        needsGuildPlayer: true,
      },
      parameters: [
        string({
          errorMessage: "Indique o bassboost que deseja colocar <off/low/medium/high/ultra/insane>",
          required: false,
        }),
      ],
    });
  }
  async execute(ctx: CommandContext, type: string) {
    const allowed = {
      off: 0,
      low: 0.2,
      medium: 0.35,
      high: 0.5,
      ultra: 0.75,
      insane: 1,
    };
    if (!Object.keys(allowed).includes(type)) {
      ctx.beautifulReply(Emojis.error, "Indique um bassboost válido! <off/low/medium/high/ultra/insane>");
      return;
    }

    // @ts-expect-error
    const r = allowed[type.toLowerCase()];
    ctx.guildPlayer!.setBassboost(r);
    ctx.beautifulReply("🔊", `O bassboost foi alterado para \`${type}\``);
  }
}
