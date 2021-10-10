import { GuildMember, PermissionString, TextChannel, User } from "discord.js";

export default class PermissionUtils {
    static isDeveloper(author: User) {
        let owners = JSON.parse(process.env.OWNERS!);
        if (owners.includes(author.id)) {
            return true;
        }
        return false;
    }

    /**
     * * Isso é uma forma que eu fiz para verificar se o usuario tem todas as permissões exigidas no "@param permissions"
     */
    static hasPermissions(permissions: PermissionString[], member: GuildMember, channel: TextChannel) {
        for (let i of permissions) {
            if (member.permissions.has(i)) continue;
            else return false;
        }
        return true;
    }
}
