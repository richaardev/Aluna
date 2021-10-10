import string from "../../structures/command/parameters/types/StringParameter";
import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";

export default class ReloadCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["reload"],
            requirements: {},
            parameters: [
                string({
                    errorMessage: "Você precisa indicar um comando válido!",
                }),
            ],
        });
    }
    async execute(ctx: CommandContext, command: string) {
        let r = this.client.commandManager.reloadCommand(command);
        if (!r) return ctx.reply(`Não foi possivel recarregar o comando!`);
        ctx.reply(`O comando foi recarregado com sucesso!`);
    }
}
