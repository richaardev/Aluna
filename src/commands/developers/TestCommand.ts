import user from "../../structures/command/parameters/types/UserParameter";
import { Command, CommandContext } from "../../structures/command";
import AlunaClient from "../../AlunaClient";
import { User } from "discord.js";

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
                    required: false,
                }),
            ],
        });
    }
    async execute(ctx: CommandContext, user: User) {
        if (!user) return ctx.reply("ninguem");
        ctx.reply(`${user.username}`);
    }
}
