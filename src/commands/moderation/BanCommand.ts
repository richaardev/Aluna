import { GuildMember } from "discord.js";
import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";
import member from "../../structures/command/parameters/types/MemberParameter";
import string from "../../structures/command/parameters/types/StringParameter";

export default class BanCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["ban", "banir", "hackban"],
            description: "Bane um usuário do servidor",
            requirements: {},
            parameters: [
                member({
                    errorMessage: "você deve específicar um **__membro__** antes de banir!! Tente novamente",
                }),
                string({
                    full: true,
                    errorMessage: "para realizar o **__banimento__** de um **@usuário** é necessário específicar um `motivo`!! Tente novamente.",
                    required: false,
                }),
            ],
        });
    }
    async execute(ctx: CommandContext, user: GuildMember, reason: string) {
        await user
            .ban({
                days: 7,
                reason: `Banido por ${ctx.author.username}`,
            })
            .then(() => ctx.reply("O usuário foi banido com sucesso!"))
            .catch(() => ctx.reply("Não foi possivel banir o usuário..."));
    }
}
