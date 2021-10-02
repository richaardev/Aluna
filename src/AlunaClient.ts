import { Client, ClientOptions } from "eris";
import CommandManager from "./managers/CommandManager";
import ListenersManager from "./managers/ListenersManager";
export default class AlunaClient extends Client {
    public commandManager: CommandManager;
    public listenerManager: ListenersManager;

    constructor (token: string, options: ClientOptions) {
        super(token, options); 

        this.commandManager = new CommandManager(this)
        this.listenerManager = new ListenersManager(this)

    }
}