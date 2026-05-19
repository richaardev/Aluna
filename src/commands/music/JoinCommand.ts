import type AlunaClient from "@/AlunaClient";
import { Command, type CommandContext } from "@/structures/command";
import Emojis from "@/utils/Emojis";

export default class JoinCommand extends Command {
  constructor(client: AlunaClient) {
    super(client, {
      labels: ["join"],
      description: "Faça eu entrar no canal de voz",
      requirements: {
        voiceChannelOnly: true,
      },
    });
  }
  async execute(ctx: CommandContext) {
    if (ctx.guildPlayer) return ctx.beautifulReply(Emojis.error, "Eu já estou em um canal de voz");
    this.client.playerManager
      ?.joinChannel(ctx.voice!.channel!)
      .then(async (player) => {
        await ctx.beautifulReply("🎧", `Eu entrei em \`${ctx.voice?.channel!.name}\``);
      })
      .catch((err) => ctx.beautifulReply(Emojis.error, `Não consegui entrar no canal de voz! `));
  }
}
