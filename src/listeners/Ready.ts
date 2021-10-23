import { CommandContext } from "../structures/command";
import { ApplicationCommandOptionData, ChatInputApplicationCommandData, Interaction, Message } from "discord.js";
import AlunaClient from "../AlunaClient";
import Logger from "../utils/Logger";
import AlunaPlayerManager from "../music/AlunaPlayerManager";
import { APIApplicationCommandOption } from "discord.js/node_modules/discord-api-types";

export default class Ready {
    public client: AlunaClient;
    public name: string;
    constructor(client: AlunaClient) {
        this.client = client;
        this.name = "ready";
    }

    async run() {
        this.client.playerManager = new AlunaPlayerManager(this.client, {
            user: this.client.user!.id,
            shards: 1,
        });
        await this.client.playerManager.connect();

        let cmds: string[] = [];
        let commands: any[] = [];
        this.client.commandManager.forEach((command) => {
            if (cmds.includes(command.options.labels[0])) return;
            cmds.push(command.options.labels[0]);

            let parameters = command.execute.getParameters().slice(1);
            let options: any[] = [];
            parameters.forEach((_parameter, i) => {
                let param = command.options.parameters![i];
                options.push({
                    type: param.type ?? "STRING",
                    required: param.required,
                    name: _parameter,
                    description: "Not Provided Description",
                });
            });

            commands.push({
                name: command.options.labels[0],
                description: command.options.description ?? "Nenhuma descrição",
                options,
            });
        });
        
        this.client.application?.commands.set(commands)
        Logger.info(`${this.client.user?.username} is now online!`);
    }
    

}
