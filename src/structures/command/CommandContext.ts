import type AlunaClient from "@/AlunaClient";
import type AlunaGuildPlayer from "@/music/structures/AlunaGuildPlayer";
import type Emojis from "@/utils/Emojis";

import {
  CommandInteraction,
  type Guild,
  type GuildMember,
  type Message,
  type MessageOptions,
  type MessagePayload,
  type TextChannel,
  type User,
  type VoiceState,
} from "discord.js";

import { type Command } from ".";

export default class CommandContext {
  public client: AlunaClient;
  public isInteraction: boolean;

  public message?: Message | CommandInteraction;
  public args: string[];
  public command: Command;

  public emojis: Emojis;

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

    this.emojis = options.Emojis;

    this.guild = options.guild;
    this.channel = options.channel;
    this.author = options.author;
    this.member = options.member ?? this.guild?.members.cache.get(this.author.id);

    // Music
    this.voice = this.member?.voice;
    this.guildPlayer =
      (this.client.playerManager?.players.get(this.guild?.id!) as AlunaGuildPlayer) ?? undefined;
  }

  reply(options: string | MessagePayload | MessageOptions) {
    if (typeof options === "string") options = this.replacePlaceholders(options);

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
      content: `${emoji} **› @${this.author.username}**, ${message}`,
    });
  }

  private replacePlaceholders(msg: string): string {
    return msg.replaceAll("{user}", this.author.toString());
  }
}
