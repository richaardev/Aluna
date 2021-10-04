import AlunaClient from "@/AlunaClient";
import { Guild, Message, TextChannel, User } from "eris";
import { Command } from ".";

export default class CommandContext {
    public client: AlunaClient;
    private _message: Message;
    public args: string[];
    public guild: Guild | undefined;
    public channel: TextChannel;
    public author: User;
    public command: Command;

    constructor (client: AlunaClient, options: any) {
        this.client = client;
        this._message = options.message;
        this.command = options.command;
        this.channel = options.channel;
        this.author = options.author;
        this.guild = options.guild;
        this.args = options.args;
    }
}