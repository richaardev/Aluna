import { Interaction } from "discord.js";
import AlunaClient from "../AlunaClient";
import { CommandContext } from "../structures/command";

export default class Ready {
    public client: AlunaClient
    public name: string
    constructor(client: AlunaClient) {
        this.client = client
        this.name = "interactionCreate"
    }

    run(interaction: Interaction): void {
        if (interaction.isCommand()) {
            let command = this.client.commandManager.get(interaction.commandName)
            
            let context = new CommandContext(this.client, {
                command,
                args: [],
                author: interaction.user,
                channel: interaction.channel,
                guild: interaction.guild,
                isInteraction: true,
                message: interaction
            })

            command?._execute(context)
        }
    }
}