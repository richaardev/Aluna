import type AlunaClient from "@/AlunaClient";

import {
  ApplicationCommandType,
  ApplicationIntegrationType,
  type CacheType,
  type ChatInputApplicationCommandData,
  type ChatInputCommandInteraction,
  InteractionContextType,
  type MessageApplicationCommandData,
  type MessageContextMenuCommandInteraction,
  type UserApplicationCommandData,
  type UserContextMenuCommandInteraction,
} from "discord.js";

import { type CommandMiddleware } from "./middlewares";

type UserCommand = UserApplicationCommandData;
type MessageCommand = MessageApplicationCommandData;
type ChatInputCommand = ChatInputApplicationCommandData;

type CommandData = UserCommand | MessageCommand | ChatInputCommand;

export type UserCommandExecutor<Cached extends CacheType> = (
  this: AlunaClient<true>,
  interaction: UserContextMenuCommandInteraction<Cached>,
) => void;
export type MessageCommandExecutor<Cached extends CacheType> = (
  this: AlunaClient<true>,
  interaction: MessageContextMenuCommandInteraction<Cached>,
) => void;
export type ChatInputCommandExecutor<Cached extends CacheType> = (
  this: AlunaClient<true>,
  interaction: ChatInputCommandInteraction<Cached>,
) => void;

type CommandDatas = {
  [ApplicationCommandType.User]: UserCommand;
  [ApplicationCommandType.Message]: MessageCommand;
  [ApplicationCommandType.ChatInput]: ChatInputCommand;
};

type CommandExecutors<Cached extends CacheType = CacheType> = {
  [ApplicationCommandType.User]: UserCommandExecutor<Cached>;
  [ApplicationCommandType.Message]: MessageCommandExecutor<Cached>;
  [ApplicationCommandType.ChatInput]: ChatInputCommandExecutor<Cached>;
};

export type CommandExecutor<Cached extends CacheType> =
  | UserCommandExecutor<Cached>
  | MessageCommandExecutor<Cached>
  | ChatInputCommandExecutor<Cached>;

export type CreateCommandOptions<
  Cached extends CacheType,
  CommandType extends keyof CommandExecutors<Cached> = ApplicationCommandType.ChatInput,
> = Omit<CommandDatas[CommandType], "contexts"> & {
  contexts?: Cached extends "cached" ? [InteractionContextType.Guild] : InteractionContextType[];
  middlewares?: CommandMiddleware<Cached>[];
  execute: CommandExecutors<Cached>[CommandType];
};

export type AlunaCommand<
  Cached extends CacheType = CacheType,
  CommandType extends keyof CommandDatas = ApplicationCommandType.ChatInput,
> = {
  data: CommandDatas[CommandType];

  middlewares?: CommandMiddleware<Cached>[];
  execute: CommandExecutors<Cached>[CommandType];

  toApplicationCommandData(): CommandData;
};

const DEFAULT_COMMAND_CONTEXT = [
  InteractionContextType.Guild,
  InteractionContextType.BotDM,
  InteractionContextType.PrivateChannel,
];

const DEFAULT_INTEGRATION_TYPES = [
  ApplicationIntegrationType.GuildInstall,
  ApplicationIntegrationType.UserInstall,
];

export function createSlashCommand<Cached extends CacheType = CacheType>({
  middlewares,
  execute,
  ...rest
}: CreateCommandOptions<Cached, ApplicationCommandType.ChatInput>): AlunaCommand<
  Cached,
  ApplicationCommandType.ChatInput
> {
  return {
    data: { ...rest, type: ApplicationCommandType.ChatInput },
    execute,
    middlewares: middlewares ?? [],
    toApplicationCommandData() {
      return {
        name: rest.name,
        description: rest.description,
        nameLocalizations: rest.nameLocalizations ?? {},
        descriptionLocalizations: rest.descriptionLocalizations ?? {},
        dmPermission: rest.dmPermission ?? false,
        defaultMemberPermissions: rest.defaultMemberPermissions ?? null,
        nsfw: rest.nsfw ?? false,
        contexts: rest.contexts ?? DEFAULT_COMMAND_CONTEXT,
        integrationTypes: rest.integrationTypes ?? DEFAULT_INTEGRATION_TYPES,
        options: rest.options ?? [],
        type: ApplicationCommandType.ChatInput,
      } satisfies ChatInputApplicationCommandData;
    },
  };
}
export function createMessageCommand<Cached extends CacheType = CacheType>({
  middlewares,
  execute,
  ...rest
}: CreateCommandOptions<Cached, ApplicationCommandType.Message>): AlunaCommand<
  Cached,
  ApplicationCommandType.Message
> {
  return {
    data: { ...rest, type: ApplicationCommandType.Message },
    execute,
    middlewares: middlewares ?? [],
    toApplicationCommandData() {
      return {
        name: rest.name,
        nameLocalizations: rest.nameLocalizations ?? {},
        dmPermission: rest.dmPermission ?? false,
        defaultMemberPermissions: rest.defaultMemberPermissions ?? null,
        nsfw: rest.nsfw ?? false,
        contexts: rest.contexts ?? DEFAULT_COMMAND_CONTEXT,
        integrationTypes: rest.integrationTypes ?? DEFAULT_INTEGRATION_TYPES,
        type: ApplicationCommandType.Message,
      } satisfies MessageApplicationCommandData;
    },
  };
}

export function createUserContextCommand<Cached extends CacheType = CacheType>({
  middlewares,
  execute,
  ...rest
}: CreateCommandOptions<Cached, ApplicationCommandType.User>): AlunaCommand<
  Cached,
  ApplicationCommandType.User
> {
  return {
    data: { ...rest, type: ApplicationCommandType.User },
    execute,
    middlewares: middlewares ?? [],
    toApplicationCommandData() {
      return {
        name: rest.name,
        nameLocalizations: rest.nameLocalizations ?? {},
        dmPermission: rest.dmPermission ?? false,
        defaultMemberPermissions: rest.defaultMemberPermissions ?? null,
        nsfw: rest.nsfw ?? false,
        contexts: rest.contexts ?? DEFAULT_COMMAND_CONTEXT,
        integrationTypes: rest.integrationTypes ?? DEFAULT_INTEGRATION_TYPES,
        type: ApplicationCommandType.User,
      } satisfies UserApplicationCommandData;
    },
  };
}
