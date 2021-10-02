import { Channel, Guild, GuildChannel, Message, TextChannel, User } from "eris";
import AlunaClient from "../../AlunaClient";

export default class CommandContext {
    public client: AlunaClient;
    private _message: Message;
    public args: string[];
    public guild: Guild | undefined;
    public channel: TextChannel;
    public author: User;
    
    constructor (client: AlunaClient, options: any) {
        this.client = client;
        this.args = options.args;
        this._message = options.message;
        this.channel = options.channel;
        this.guild = options.guild;
        this.author = options.author;
    }
}