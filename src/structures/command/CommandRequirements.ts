import PermissionUtils from "../../utils/PermissionsUtils";
import { PermissionString } from "discord.js";
import { CommandContext } from ".";


export interface _CommandRequirements {
    botPermission?: PermissionString[] | null
    permissions?: PermissionString[] | null

    devOnly?: boolean | null
}

export default class CommandRequirements {
    static handle(ctx: CommandContext, requirements: _CommandRequirements = {}) {

        if (requirements.devOnly && !PermissionUtils.isDeveloper(ctx.author)) {
            throw new Error("Você não pode executar esse comando!")
        }
    }
}