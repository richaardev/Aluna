import Emojis from "../../utils/Emojis";
import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";

export default class JoinCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["join"],
            requirements: {
                voiceChannelOnly: true,
            },
        });
    }
    async execute(ctx: CommandContext) {
        this.client.playerManager
            ?.joinChannel(ctx.voice!.channel!)
            .then(async (player) => {
                await ctx.beautifulReply("🎧", `Eu entrei em \`${ctx.voice?.channel!.name}\``);
            })
            .catch((err) => ctx.beautifulReply(Emojis.error, `Não consegui entrar no canal de voz! `));
    }
}
