import { CommandContext } from "../.."
import user, { UserInterface } from "./UserParameter"

export default function member(options: UserInterface): UserInterface {
    return {
        ...options,
        required: options.required ?? true,

        parse(ctx: CommandContext, argument: string | undefined, _opt: UserInterface) {
            let opt = user(_opt)
            let u = opt.parse!(ctx, argument, opt)
            
            if (!u && !opt.required) return null
            let member = ctx.guild?.members.get(u?.id)

            if (!member && this) throw new Error("Não foi possivel encontrar esse membro no servidor!")
            return member
        }
    }
}