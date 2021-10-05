import ListenersManager from "./managers/ListenersManager";
import CommandManager from "./managers/CommandManager";
import { Client, ClientOptions } from "discord.js";

export default class AlunaClient extends Client {
    public listenerManager: ListenersManager;
    public commandManager: CommandManager;

    constructor (options: ClientOptions) {
        super(options); 

        this.listenerManager = new ListenersManager(this)
        this.commandManager = new CommandManager(this)
    }
}