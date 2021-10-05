import { Command, CommandContext } from "../../structures/command";
import AlunaClient from "../../AlunaClient";
import { MessageEmbed } from "discord.js";

export default class HelpCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["help"],
            requirements: {},
        });
    }
    async execute(ctx: CommandContext) {
        let embed = new MessageEmbed()
            .setAuthor(ctx.author.username, ctx.author.displayAvatarURL())
            .setThumbnail(this.client.user?.displayAvatarURL()!)
            .addField("Utilidades", this.mapCommands("util"))
            .addField("Moderação", this.mapCommands("moderation"))
            .setColor("RANDOM")

        ctx.reply({
            embeds: [embed]
        })
    }

    mapCommands(category: string) {
        let u: Command[] = []
        this.client.commandManager.forEach(command => {
            if (!u.includes(command) && command.options.category === category) u.push(command)
        })
        return u.map(a => `\`${a.options.labels[0]}\``).join(" ")
    }
}