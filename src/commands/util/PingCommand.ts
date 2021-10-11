import { Command, CommandContext } from "../../structures/command";
import AlunaClient from "../../AlunaClient";

export default class PingCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["ping"],
            requirements: {},
        });
    }
    async execute(ctx: CommandContext) {
        ctx.reply(`Pong! \`${this.client.ws.ping}\`ms`);
    }
}