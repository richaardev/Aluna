import PermissionUtils from "../../utils/PermissionsUtils";
import { Options, PermissionString } from "discord.js";
import { CommandContext } from ".";

export interface _CommandRequirements {
    botPermission?: PermissionString[] | null;
    permissions?: PermissionString[] | null;
    voiceChannelOnly?: boolean;
    needsGuildPlayer?: boolean;

    devOnly?: boolean | null;
}

export default class CommandRequirements {
    static handle(ctx: CommandContext, options: _CommandRequirements = {}) {
        let requirements: _CommandRequirements = {
            permissions: options.permissions || null,
            botPermission: options.botPermission || null,
            devOnly: options.devOnly || false,
            needsGuildPlayer: options.needsGuildPlayer || false,
            voiceChannelOnly: options.voiceChannelOnly || false,
        };

        if (requirements.devOnly && !PermissionUtils.isDeveloper(ctx.author)) {
            throw new Error("Você não pode executar esse comando!");
        }

        if (requirements.voiceChannelOnly && ctx.member?.voice === null) {
            throw new Error("Você precisa estar em canal de voz para executar esse comando!");
        }
        if (requirements.needsGuildPlayer && !ctx.guildPlayer) {
            throw new Error("Eu não estou tocando nada no momento!");
        }
    }
}
