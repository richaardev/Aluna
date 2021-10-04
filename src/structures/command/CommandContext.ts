import { AdvancedMessageContent, Guild, Message, MessageContent, MessageFile, TextChannel, User } from "eris";
import { createContext } from "vm";
import { Command } from ".";
import AlunaClient from "../../AlunaClient";

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

    reply (_content: MessageContent, file?: MessageFile | MessageFile[]): Promise<Message<TextChannel>> {
        let u = (typeof _content === "string") ? _content : _content.content
        let content: AdvancedMessageContent = {
            content: u,
            messageReference: {
                messageID: this._message.id,
            },
            allowedMentions: {
                repliedUser: true
            }
        }
        if (typeof _content === "object") Object.assign(content, _content)
        return this.channel.createMessage(content, file)
    }
}