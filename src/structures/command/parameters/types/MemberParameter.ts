import type { CommandContext } from "../..";
import type { UserInterface } from "./UserParameter";

import user from "./UserParameter";

export default function member(options: UserInterface): UserInterface {
  return {
    ...options,
    required: options.required ?? true,
    type: "USER",

    parse(ctx: CommandContext, argument: string | undefined, _opt: UserInterface) {
      const opt = user(_opt);
      const u = opt.parse!(ctx, argument, opt);

      if (!u && !opt.required) return null;
      const member = ctx.guild?.members.cache.get(u?.id);
      if (!member) throw new Error("Não foi possivel encontrar esse membro no servidor!");
      return member;
    },
  };
}
