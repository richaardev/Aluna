import { Member } from "eris";
import member from "structures/command/parameters/types/MemberParameter";
import string from "structures/command/parameters/types/StringParameter";
import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";

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
    async execute(ctx: CommandContext, user: Member, reason: string) {
        await user
                .ban(7, `Banido por ${ctx.author.username}`)
                .then(() => ctx.channel.createMessage("O usuário foi banido com sucesso!"))
                .catch(err => ctx.channel.createMessage("Não foi possivel banir o usuário..."))
    }
}