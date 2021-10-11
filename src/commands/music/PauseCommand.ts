import Emojis from "../../utils/Emojis";
import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";

export default class PauseCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["pause", "pausar"],
            requirements: {
                voiceChannelOnly: true,
                needsGuildPlayer: true,
            },
        });
    }
    async execute(ctx: CommandContext) {
        if (ctx.guildPlayer!.paused) {
            ctx.beautifulReply(`${Emojis.error}`, `A musica já está pausada!`);
        } else {
            ctx.guildPlayer!.pause(true);
            ctx.beautifulReply("▶️", `A musica foi pausada com sucesso!`);
        }
    }
}
