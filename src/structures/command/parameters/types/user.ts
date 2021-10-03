import { CommandContext } from "../.."

let defVar = (o: any, b: string, c: any) => (typeof o[b] === "undefined" ? c : o[b])
export default class User {
    static parseOptions(options: UserInterface): UserInterface {
        return {
            ...options,
            errorMessage: options.errorMessage,
            denyBot: defVar(options, 'denyBot', false),
            denySelf: defVar(options, 'denySelf', false)
        }
    }
    static parse(arg: string | undefined, ctx: CommandContext, opt: UserInterface) {
        let options = this.parseOptions(opt)
        if (!arg) {
            if (options.required) throw new Error(options.errorMessage)
            return null
        }

        arg = arg!.replace(/[<>@!]/g, "");
        const findMember = arg
        ? ctx.guild?.members.find(m => m.user.username.toLowerCase().includes(arg!)) : null
        
        const user = ctx.client.users.get(arg) || (!!findMember && findMember.user)
        if (!user && !options.required) return null
        if (!user) throw new Error("Desculpe, mas não foi possivel encontrar esse usuário")
        if (options.denyBot) throw new Error("Desculpe, mas você só pode mencionar `usuários` válidos!")
        if (options.denySelf && user.id === ctx.author.id) throw new Error("Desculpe, mas você não pode mencionar á si mesmo!")
        
        return user
    }
}


export interface UserInterface {
    errorMessage?: string,
    required?: boolean,
    denyBot?: boolean
    denySelf?: boolean
}