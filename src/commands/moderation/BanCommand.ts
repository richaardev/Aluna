import member from "structures/command/parameters/types/MemberParameter";
import string from "structures/command/parameters/types/StringParameter";
import { Command, CommandContext } from "../../structures/command";
import AlunaClient from "../../AlunaClient";
import { GuildMember } from "discord.js";

export default class BanCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["ban", "banir", "hackban"],
            requirements: {},
            parameters: [
                member({
                    errorMessage: "Você precisa mencionar um usuário para banir!"
                }),
                string({
                    full: true,
                    errorMessage: "Você precisa indicar um motivo do banimento!",
                    required: false
                })
            ]
        });
    }
    async execute(ctx: CommandContext, user: GuildMember, reason: string) {
        await user
                .ban({
                    days: 7,
                    reason: `Banido por ${ctx.author.username}`
                })
                .then(() => ctx.reply("O usuário foi banido com sucesso!"))
                .catch(err => ctx.reply("Não foi possivel banir o usuário..."))
    }
}