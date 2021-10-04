import { CommandContext } from "..";
import { CommandParametersInterface } from "../Command";
import types from "./types";
import { ParameterInterface } from "./types/Parameter";

export default class CommandParameters {
    static handle(ctx: CommandContext, args: string[], paramArray?: ParameterInterface[]) {
        let result = [];
        if (paramArray && paramArray !== null) {
            for (let i = 0; i < paramArray.length; i++) {
                let param = paramArray[i];
                let arg = args[i];
                if (param.full) arg = args.slice(i).join(" ");

                if (!arg && param.required) throw new Error(param.errorMessage)
                let parsed = param.parse!(ctx, arg, param);
                result.push(parsed);
            }
            return result;
        }
    }
};
