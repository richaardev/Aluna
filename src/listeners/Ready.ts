import { CommandContext } from "../structures/command";
import { Interaction, Message } from "discord.js";
import AlunaClient from "../AlunaClient";
import Logger from "../utils/Logger";
import AlunaPlayerManager from "../music/AlunaPlayerManager";

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
}
