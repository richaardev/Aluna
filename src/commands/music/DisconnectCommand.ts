import { Message } from "discord.js";
import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";

export default class DisconnectCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["disconnect", "leave"],
            description: "Me disconecte do canal de voz",
            requirements: {
                voiceChannelOnly: true,
                needsGuildPlayer: true,
            },
        });
    }
    async execute(ctx: CommandContext) {
        ctx.guildPlayer?.manager.leave(ctx.guild?.id!);
        if (ctx.message instanceof Message) ctx.message.react("⏹️");
    }
}
