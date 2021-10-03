import { Command, CommandContext } from "../../structures/command";
import AlunaClient from "../../AlunaClient";
import { Member, User } from "eris";

export default class TestCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["test"],
            requirements: {
                devOnly: true,
            },
            parameters: [
                {
                    type: "user",
                    errorMessage: "Você precisa mencionar um usuário válido para isso!",
                    required: false
                }
            ]
        });
    }
    async execute(ctx: CommandContext, user: Member) {
        if (!user) return ctx.channel.createMessage("ninguem")
        ctx.channel.createMessage(`${user.username}`)
    }
}
