import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";

export default class AddEmojiCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["addemoji", "adicionaremoji"],
            requirements: {},
            parameters: [
                {
                    errorMessage: "é necessário que informe o __**nome**__ que deseja colocar ao emoji!! Tente novamente.",
                },
                {
                    errorMessage: "e também é necessário que coloque o **__emoji__** que deseja adicionar ao Servidor! T",
                },
            ],
        });
    }
    async execute(ctx: CommandContext) {}
}
