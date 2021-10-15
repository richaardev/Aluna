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
                    errorMessage: "você precisa mencionar um usuário para expulsar!",
                }),
                string({
                    full: true,
                    errorMessage: "você precisa indicar um motivo da expulsão!",
                    required: false,
                }),
            ],
        });
    }
    async execute(ctx: CommandContext, member: GuildMember, reason: string) {
        await member
            .kick(`Expulso por ${ctx.author.username}`)
            .then(() => ctx.reply("O usuário foi expulso com sucesso!"))
            .catch(() => ctx.reply("Não foi possivel expulsar o usuário..."));
    }
}
