import AlunaClient from "../AlunaClient";
import AlunaPlayerManager from "../music/AlunaPlayerManager";
import Logger from "../utils/Logger";

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
        Logger.info(`${this.client.user?.username} is now online!`);
    }

    registerSlashCommands() {
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
                    description: "-",
                });
            });

            commands.push({
                name: command.options.labels[0],
                description: command.options.description ?? "Nenhuma descrição",
                options,
            });
        });

        this.client.application?.commands.set(commands);
    }
}
