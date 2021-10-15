import { Interaction } from "discord.js";
import AlunaClient from "../AlunaClient";
import { CommandContext } from "../structures/command";

export default class InteractionCreate {
    public client: AlunaClient;
    public name: string;
    constructor(client: AlunaClient) {
        this.client = client;
        this.name = "interactionCreate";
    }

    run(interaction: Interaction): void {
        if (interaction.isCommand()) {
            let command = this.client.commandManager.get(interaction.commandName);
            if (!command) return;

            let args: string[] = [];
            let parameters = command.execute.getParameters().slice(1);
            parameters.forEach((_parameter, i) => {
                let param = command!.options.parameters![i];
                let option = interaction.options.get(_parameter, param.required);
                if (!option) return;
                args.push(option.value as string);
            });
            let context = new CommandContext(this.client, {
                command,
                args,
                author: interaction.user,
                channel: interaction.channel,
                guild: interaction.guild,
                isInteraction: true,
                message: interaction,
            });

            command?._execute(context);
        }
    }
}
