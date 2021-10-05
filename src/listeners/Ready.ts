import { CommandContext } from "../structures/command";
import { Interaction, Message } from "discord.js";
import AlunaClient from "../AlunaClient";
import Logger from "utils/Logger";

export default class Ready {
    public client: AlunaClient
    public name: string
    constructor(client: AlunaClient) {
        this.client = client
        this.name = "ready"
    }

    run(): void {
        Logger.info(`${this.client.user?.username} is now online!`)
    }
}