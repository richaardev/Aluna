import { Constants, Member, TextChannel, User } from "eris";



export default class PermissionUtils {
    static isDeveloper(author: User) {
        let owners = JSON.parse(process.env.OWNERS!);
        if (owners.includes(author.id)) {
            return true;
        }
        return false;
    }

    static hasPermissions(permissions: (keyof Constants["Permissions"])[], member: Member, channel: TextChannel) {
        let Permissions = Constants["Permissions"]
        let perms = channel.permissionsOf(member.id);
        let allPerms = Object.keys(perms.json);
        for (let i of permissions) {
            if (allPerms.includes(i)) continue;
            else return false;
        }
        return true;
    }
}