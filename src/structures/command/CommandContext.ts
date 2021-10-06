import { CommandInteraction, Guild, Message, MessageOptions, MessagePayload, TextChannel, User } from "discord.js";
import { Command } from ".";
import AlunaClient from "../../AlunaClient";

export default class CommandContext {
    public client: AlunaClient;
    public message?: Message | CommandInteraction;
    public args: string[];
    public guild: Guild | undefined;
    public channel: TextChannel;
    public author: User;
    public command: Command;
    public isInteraction: boolean

    constructor(client: AlunaClient, options: any) {
        this.client = client;
        this.isInteraction = options.isInteraction || false;
        this.message = options.message;
        this.command = options.command;
        this.channel = options.channel;
        this.author = options.author;
        this.guild = options.guild;
        this.args = options.args;
    }

    reply(options: string | MessagePayload | MessageOptions): void {
        if (this.message instanceof CommandInteraction && this.isInteraction) {
            this.message?.reply(options)
            return
        }
        if (this.message !== null) {
            this.message!.reply(options)
            return
        }
        this.channel.send(options)
        return;
    }
}