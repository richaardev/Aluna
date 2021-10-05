import { Guild, Message, MessageOptions, MessagePayload, TextChannel, User } from "discord.js";
import AlunaClient from "../../AlunaClient";
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

    reply (options: string | MessagePayload | MessageOptions): Promise<Message>{
        return this._message.reply(options)
    }
}