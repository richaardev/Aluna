import { ParameterInterface } from "./Parameter";
import { CommandContext } from "../..";

export default function user(options: UserInterface): UserInterface {
    return {
        ...options,
        required: options.required ?? true,
        errorMessage: options.errorMessage ?? "Você precisa mencionar um usuário!",

        denyBot: options.denyBot ?? false,
        denySelf: options.denySelf ?? false,

        parse(ctx: CommandContext, argument: string | undefined, opt: UserInterface) {
            if (!argument) {
                if (options.required) throw new Error(options.errorMessage);
                return null;
            }

            argument = argument!.replace(/[<>@!]/g, "");
            const findMember = argument ? ctx.guild?.members.cache.find((m) => m.user.username.toLowerCase().includes(argument!)) : null;

            const user = ctx.client.users.cache.get(argument) || (!!findMember && findMember.user);
            if (!user && !options.required) return null;
            if (!user) throw new Error("Desculpe, mas não foi possivel encontrar esse usuário");
            if (options.denyBot) throw new Error("Desculpe, mas você só pode mencionar `usuários` válidos!");
            if (options.denySelf && user.id === ctx.author.id) throw new Error("Desculpe, mas você não pode mencionar á si mesmo!");

            return user;
        },
    };
}

export interface UserInterface extends ParameterInterface {
    denyBot?: boolean;
    denySelf?: boolean;
}
