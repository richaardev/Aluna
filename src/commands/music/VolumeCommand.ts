import type AlunaClient from "../../AlunaClient";
import type { CommandContext } from "../../structures/command";

import { Command } from "../../structures/command";
import number from "../../structures/command/parameters/types/NumberParameter";

export default class VolumeCommand extends Command {
  constructor(client: AlunaClient) {
    super(client, {
      labels: ["volume"],
      description: "Altere o volume da musica",
      requirements: {
        voiceChannelOnly: true,
        needsGuildPlayer: true,
      },
      parameters: [
        number({
          errorMessage: "Você precisa indicar um numero entre 0 á 100",
          max: 150,
        }),
      ],
    });
  }
  async execute(ctx: CommandContext, volume: number) {
    ctx.guildPlayer!.volume(volume);
    ctx.beautifulReply("🔊", `O volume da musica foi alterado para \`${volume}\``);
  }
}
