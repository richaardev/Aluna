import type AlunaClient from "@/AlunaClient";
import Logger from "@/utils/Logger";

import { type Client } from "discord.js";

export default class Ready {
  public client: AlunaClient;
  public name: string;

  constructor(client: AlunaClient) {
    this.client = client;
    this.name = "ready";
  }

  async run(client: Client<true>) {
    await this.client.playerManager.init({ id: client.application.id });
    Logger.info(`${this.client.user?.username} is now online!`);

    this.registerSlashCommands();
  }

  registerSlashCommands() {
    // const commands = this.client.commandManager.map((c) => c.toApplicationCommandData());
    // this.client.application?.commands.set(commands);
  }
}
