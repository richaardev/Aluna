import Emojis from "../../utils/Emojis";
import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";

export default class ResumeCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["resume"],
            description: "Despause a musica que está pausada",
            requirements: {
                needsGuildPlayer: true,
                voiceChannelOnly: true,
            },
        });
    }
    async execute(ctx: CommandContext) {
        if (ctx.guildPlayer!.paused) {
            ctx.guildPlayer?.resume();
            ctx.beautifulReply("⏸️", "A musica está sendo continuada!");
        } else {
            ctx.beautifulReply(Emojis.error, "A musica já está tocando!");
        }
    }
}
