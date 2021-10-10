import ListenersManager from "./managers/ListenersManager";
import CommandManager from "./managers/CommandManager";
import { Client, ClientOptions } from "discord.js";
import AlunaUtils from "./utils/AlunaUtils";
import AlunaPlayerManager from "./music/AlunaPlayerManager";
import Apis from "./apis";

export default class AlunaClient extends Client {
    public listenerManager: ListenersManager;
    public commandManager: CommandManager;
    public playerManager?: AlunaPlayerManager;
    public utils: AlunaUtils;
    public apis: Apis;

    constructor(options: ClientOptions) {
        super(options);

        this.listenerManager = new ListenersManager(this);
        this.commandManager = new CommandManager(this);
        this.utils = new AlunaUtils(this);
        this.apis = new Apis(this);
    }
}
