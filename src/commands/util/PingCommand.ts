import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";

export default class PingCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["ping"],
            requirements: {}
        });
    }
    async execute(ctx: CommandContext) {
        ctx.reply(`Pong! \`${ctx.guild?.shard.latency}\`ms`)
    }
}