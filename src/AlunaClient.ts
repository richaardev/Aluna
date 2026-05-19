import Apis from "@/apis";
import CommandManager from "@/managers/CommandManager";
import ListenersManager from "@/managers/ListenersManager";
import type AlunaPlayerManager from "@/music/AlunaPlayerManager";

import { Client, type ClientOptions, PermissionsBitField } from "discord.js";

export default class AlunaClient<Ready extends boolean = boolean> extends Client<Ready> {
  public listenerManager: ListenersManager;
  public commandManager: CommandManager;
  public playerManager?: AlunaPlayerManager;
  public apis: Apis;

  constructor(options: ClientOptions) {
    super(options);

    this.listenerManager = new ListenersManager(this);
    this.commandManager = new CommandManager(this);
    this.apis = new Apis(this);
  }

  get inviteURL() {
    const scopes = ["bot", "applications.commands"];
    const permissions = PermissionsBitField.All;
    return `https://discord.com/api/oauth2/authorize?client_id=${this.user?.id}&permissions=${permissions}&scope=${scopes.join("%20")}`;
  }
}
