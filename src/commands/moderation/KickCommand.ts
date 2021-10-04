import { Member } from "eris";
import member from "structures/command/parameters/types/MemberParameter";
import string from "structures/command/parameters/types/StringParameter";
import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";

export default class KickCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["kick", "expulsar"],
            requirements: {},
            parameters: [
                member({
                    errorMessage: "Você precisa mencionar um usuário para expulsar!"
                }),
                string({
                    full: true,
                    errorMessage: "Você precisa indicar um motivo da expulsão!",
                    required: false
                })
            ]
        });
    }
    async execute(ctx: CommandContext, user: Member, reason: string) {
        await user
                .kick(`Expulso por ${ctx.author.username}`)
                .then(() => ctx.channel.createMessage("O usuário foi expulso com sucesso!"))
                .catch(err => ctx.channel.createMessage("Não foi possivel expulsar o usuário..."))
    }
}