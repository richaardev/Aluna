import { Message } from "discord.js";
import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";

export default class StopCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["stop"],
            description: "Faça eu parar de tocar musica no canal de voz",
            requirements: {
                needsGuildPlayer: true,
                voiceChannelOnly: true,
            },
        });
    }
    async execute(ctx: CommandContext) {
        ctx.guildPlayer?.stop();
        if (ctx.message instanceof Message) ctx.message.react("⏹️");
    }
}
