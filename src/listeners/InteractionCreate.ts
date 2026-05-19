import type AlunaClient from "@/AlunaClient";

import { type Interaction } from "discord.js";

export default class InteractionCreate {
  public client: AlunaClient;
  public name: string;
  constructor(client: AlunaClient) {
    this.client = client;
    this.name = "interactionCreate";
  }

  run(interaction: Interaction): void {
    if (interaction.isPrimaryEntryPointCommand()) return;
    if (!interaction.isCommand()) return;

    const command = this.client.commandManager.get(interaction.commandName);
    if (!command) return;

    console.log(command);
    if (command.data.type === interaction.commandType) {
      const executor = command.execute.bind(this.client as AlunaClient<true>);
      executor(interaction);
    }
  }
}
