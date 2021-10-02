import { CommandContext } from "..";
import { CommandParametersInterface } from "../Command";
import types from "./types";

export default class CommandParameters {
    static handle(ctx: CommandContext, args: string[], paramArray?: CommandParametersInterface[]) {
        let result = [];
        if (paramArray && paramArray !== null) {
            for (let i = 0; i < paramArray.length; i++) {
                let param = paramArray[i];
                let arg = args[i];
                if (param.full) arg = args.slice(i).join(" ");
                let tipo = types[param.type];

                let parsed = tipo.parse(arg, ctx, param);
                result.push(parsed);
            }
            return result;
        }
    }
};
