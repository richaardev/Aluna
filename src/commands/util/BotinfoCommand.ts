import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";
import AlunaEmbed from "../../utils/AlunaEmbed";

export default class BotinfoCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["botinfo"],
            requirements: {},
        });
    }
    async execute(ctx: CommandContext) {
        let embed = new AlunaEmbed()
            .setTitle("**Minhas informações**")
            .setDescription(
                [
                    `・Olá, meu nome é **${this.client.user?.username}**, sou um bot para trazer simplicidade e facilidade para meus diversos comandos!`,
                    `・Fui criada em **[TypeScript](https://www.typescriptlang.org/)** por **richaard5 🎃#0585**`,
                    `・Estou online <t:${~~(this.client.readyAt!.getTime() / 1000)}:R>`,
                ].join("\n"),
            )
            .addField("> 📁 **Minhas Estatísticas**", [`・Estou interagindo com **${this.client.users.cache.size} usuários**`, `・Estou em **${this.client.guilds.cache.size} servidores**`, `・Tenho um total de **${this.client.commandManager.size} comandos**`].join("\n"))
            .addField("> 🔗 **Links**", [`**[Me Adicione!](${this.client.utils.inviteURL})**`].join("\n"))
            .setFooter(ctx.author.username, ctx.author.displayAvatarURL())
            .setThumbnail(this.client.user?.displayAvatarURL()!);

        ctx.reply({
            embeds: [embed],
        });
    }
}
