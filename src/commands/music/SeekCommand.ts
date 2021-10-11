import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";
import time from "../../structures/command/parameters/types/TimeParameter";

export default class SeekCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["seek", "s"],
            requirements: {
                needsGuildPlayer: true,
                voiceChannelOnly: true,
            },
            parameters: [
                time({
                    errorMessage: "Indique um tempo válido! Ex: <10s, 3m, 1d>",
                }),
            ],
        });
    }
    async execute(ctx: CommandContext, time: number) {
        ctx.guildPlayer?.seek(time);
        ctx.beautifulReply("⏰", `O tempo da musica foi alterado para \`${~~(time / 1000)} segundos\``);
    }
}
