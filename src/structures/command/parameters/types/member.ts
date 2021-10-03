import { urlToHttpOptions } from "url"
import { CommandContext } from "../.."
import User, { UserInterface } from "./user"

let defVar = (o: any, b: string, c: any) => (typeof o[b] === "undefined" ? c : o[b])
export default class Member {
    static parse(arg: string | undefined, ctx: CommandContext, opt: UserInterface) {
        let user = User.parse(arg, ctx, opt)!
        if (!user && !opt.required) return null
        let member = ctx.guild?.members.get(user?.id)

        if (!member && this) throw new Error("Não foi possivel encontrar esse membro no servidor!")
        return member
    }
}
