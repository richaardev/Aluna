import { MessageEmbed, User } from "discord.js";
import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";
import user from "../../structures/command/parameters/types/UserParameter";

export default class AvatarCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["avatar"],
            description: "Veja o avatar de um usuário",
            requirements: {},
            parameters: [
                user({
                    required: false,
                    errorMessage: "",
                }),
            ],
        });
    }
    async execute(ctx: CommandContext, user: User) {
        user ??= ctx.author;
        let embed = new MessageEmbed()
            .setAuthor(ctx.author.tag, ctx.author.displayAvatarURL())
            .setDescription(
                `**[Clique aqui](${user.displayAvatarURL({
                    dynamic: true,
                    size: 2048,
                })}) para fazer o download.**`,
            )
            .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setColor("RANDOM");

        ctx.reply({ embeds: [embed] });
    }
}
