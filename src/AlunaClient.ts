import ListenersManager from "./managers/ListenersManager";
import CommandManager from "./managers/CommandManager";
import { Client, ClientOptions, Permissions } from "discord.js";
import AlunaPlayerManager from "./music/AlunaPlayerManager";
import Apis from "./apis";

export default class AlunaClient extends Client {
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
        let scopes = ["bot", "applications.commands"];
        let permissions = Permissions.ALL;
        return `https://discord.com/api/oauth2/authorize?client_id=${this.user?.id}&permissions=${permissions}&scope=${scopes.join("%20")}`;
    }
}
