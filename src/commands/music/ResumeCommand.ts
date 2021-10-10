import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";

export default class ResumeCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["resume"],
            requirements: {
                needsGuildPlayer: true,
                voiceChannelOnly: true,
            },
        });
    }
    async execute(ctx: CommandContext) {
        if (ctx.guildPlayer!.paused) {
            ctx.guildPlayer?.resume();
            ctx.reply("A musica está sendo continuada!");
        } else {
            ctx.reply("A musica já está tocando!");
        }
    }
}
