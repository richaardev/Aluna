import { Command, CommandContext } from "../../structures/command";
import AlunaClient from "../../AlunaClient";
import { Member, User } from "eris";
import string from "../../structures/command/parameters/types/StringParameter";
import user from "../../structures/command/parameters/types/UserParameter";

export default class TestCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["test"],
            requirements: {
                devOnly: true,
            },
            parameters: [
                user({
                    errorMessage: "Bruh",
                    required: false
                })
            ]
        });
    }
    async execute(ctx: CommandContext, user: Member) {
        if (!user) return ctx.channel.createMessage("ninguem")
        ctx.channel.createMessage(`${user.username} ${user.ban}`)
    }
}
