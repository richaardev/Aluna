import { ParameterInterface } from "./Parameter";
import { CommandContext } from "../..";

export default function string(options: StringInterface): StringInterface {
    return {
        ...options,
        required: options.required ?? true,

        type: "STRING",
        parse(ctx: CommandContext, argument: string | undefined, opt: StringInterface) {
            argument = argument ? (typeof argument === "string" ? argument : (argument as string)) : undefined;
            if (opt.required && !argument) throw new Error(opt.errorMessage);

            return argument;
        },
    };
}

interface StringInterface extends ParameterInterface {}
