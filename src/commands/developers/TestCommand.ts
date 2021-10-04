import AlunaClient from "@/AlunaClient";
import { Command, CommandContext } from "@/structures/command";
import user from "@/structures/command/parameters/types/UserParameter";
import { User } from "eris";

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
    async execute(ctx: CommandContext, user: User) {
        if (!user) return ctx.channel.createMessage("ninguem")
        ctx.channel.createMessage(`${user.username}`)
    }
}
