import { GuildMember } from "discord.js";
import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";
import member from "../../structures/command/parameters/types/MemberParameter";
import string from "../../structures/command/parameters/types/StringParameter";

export default class KickCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["kick", "expulsar"],
            requirements: {},
            parameters: [
                member({
                    errorMessage: "Você precisa mencionar um usuário para expulsar!",
                }),
                string({
                    full: true,
                    errorMessage: "Você precisa indicar um motivo da expulsão!",
                    required: false,
                }),
            ],
        });
    }
    async execute(ctx: CommandContext, user: GuildMember, reason: string) {
        await user
            .kick(`Expulso por ${ctx.author.username}`)
            .then(() => ctx.reply("O usuário foi expulso com sucesso!"))
            .catch(() => ctx.reply("Não foi possivel expulsar o usuário..."));
    }
}
