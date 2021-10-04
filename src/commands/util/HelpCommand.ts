import { Embed } from "eris";
import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";

export default class HelpCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["help"],
            requirements: {},
        });
    }
    async execute(ctx: CommandContext) {
        let embed: Embed = {
            type: "rich",
            author: {
                name: ctx.author.username,
                icon_url: ctx.author.avatarURL
            },
            thumbnail: {
                url: this.client.user.avatarURL
            },
            description: "",
            fields: [
                {
                    name: "Utilidades",
                    value: this.mapCommands("util")
                },
                {
                    name: "Moderação",
                    value: this.mapCommands("moderation")
                }
            ],
            color: Math.floor(Math.random() * 999999)
        }
        ctx.channel.createMessage({
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