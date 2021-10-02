import { Constants } from "eris";
import { CommandContext } from ".";
import PermissionUtils from "../../utils/PermissionsUtils";

export interface _CommandRequirements {
    botPermission?: (keyof Constants["Permissions"])[] | null
    permissions?: (keyof Constants["Permissions"])[] | null

    devOnly?: boolean | null
}

export default class CommandRequirements {
    static handle(ctx: CommandContext, requirements: _CommandRequirements = {}) {

        if (requirements.devOnly && !PermissionUtils.isDeveloper(ctx.author)) {
            throw new Error("Você não pode executar esse comando!")
        }
    }
}