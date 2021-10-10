import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";

export default class AddEmojiCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["addemoji", "adicionaremoji"],
            requirements: {},
        });
    }
    async execute(ctx: CommandContext) {}
}
