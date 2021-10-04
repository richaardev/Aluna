import { Message } from "eris";
import AlunaClient from "../AlunaClient";
import { CommandContext } from "../structures/command";

export default class MessageListener {
    public client: AlunaClient
    public name: string
    constructor(client: AlunaClient) {
        this.client = client
        this.name = "messageCreate"
    }

    run(message: Message): void {
        let prefix = "!"

        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;


        let args = message.content.trim().slice(prefix.length).split(/ /g)
        let commandName = args.shift()?.toLowerCase()!

        let command = this.client.commandManager.get(commandName)
        if (!command) return;

        let context = new CommandContext(this.client, {
            command,
            message,
            args,
            author: message.author,
            channel: message.channel,
            guild: message.guildID ? this.client.guilds.get(message.guildID) : null
        })
        command._execute(context)
    }
}