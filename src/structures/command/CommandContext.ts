import { CommandInteraction, Guild, GuildMember, Message, MessageOptions, MessagePayload, TextChannel, User, VoiceState } from "discord.js";
import AlunaGuildPlayer from "../../music/structures/AlunaGuildPlayer";
import AlunaEmbed from "../../utils/AlunaEmbed";
import { Command } from ".";
import AlunaClient from "../../AlunaClient";

export default class CommandContext {
    public client: AlunaClient;
    public isInteraction: boolean;

    public message?: Message | CommandInteraction;
    public args: string[];
    public command: Command;

    public guild: Guild | undefined;
    public channel: TextChannel;
    public author: User;
    public member?: GuildMember;

    public voice?: VoiceState;
    public guildPlayer?: AlunaGuildPlayer;

    constructor(client: AlunaClient, options: any) {
        this.client = client;
        this.isInteraction = options.isInteraction || false;

        this.message = options.message;
        this.args = options.args;
        this.command = options.command;

        this.guild = options.guild;
        this.channel = options.channel;
        this.author = options.author;
        this.member = options.member ?? this.guild?.members.cache.get(this.author.id);

        // Music
        this.voice = this.member?.voice;
        this.guildPlayer = (this.client.playerManager?.players.get(this.guild?.id!) as AlunaGuildPlayer) ?? undefined;
    }

    reply(options: string | MessagePayload | MessageOptions): void {
        if (this.message instanceof CommandInteraction && this.isInteraction) {
            this.message?.reply(options);
            return;
        }
        if (this.message !== null) {
            this.message!.reply(options);
            return;
        }
        this.channel.send(options);
        return;
    }

    beautifulReply(emoji: string, message: string) {
        return this.reply({
            content: `${emoji} **|** ${message}`,
        });
    }
}
