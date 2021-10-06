import { MessageEmbed, User } from "discord.js";
import user from "structures/command/parameters/types/UserParameter";
import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";

export default class BannerCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["banner"],
            requirements: {},
            parameters: [
                user({
                    required: false,
                    errorMessage: ""
                })
            ]
        });
    }
    async execute(ctx: CommandContext, user: User) {
        user ??= ctx.author
        console.log(user)


        /*let embed = new MessageEmbed()
            .setAuthor(ctx.author.tag, ctx.author.displayAvatarURL())
            user == ctx.author ? .setDescription(`> - Você está vendo o seu avatar! **[Clique aqui](${user.displayAvatarURL({ dynamic: true, size: 2048 })}) para fazer o download.**`) : .setDescription(`> - Você está vendo o avatar do \`${ctx.user.username}\` **[Clique aqui](${user.displayAvatarURL({ dynamic: true, size: 2048 })}) para fazer o download.**`)
            .setDescription(`**[Clique aqui](${user}) para fazer o download.**`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setColor("RANDOM")
        ctx.reply({ embeds: [embed] })
        */
    }
}