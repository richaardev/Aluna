import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";
import string from "../../structures/command/parameters/types/StringParameter";
import Emojis from "../../utils/Emojis";

export default class BassBoostCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["bassboost"],
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
        let allowed = {
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

        // @ts-ignore
        let r = allowed[type.toLowerCase()];
        ctx.guildPlayer!.setBassboost(r);
        ctx.beautifulReply("🔊", `O bassboost foi alterado para \`${type}\``);
    }
}
