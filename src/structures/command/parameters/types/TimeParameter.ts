import { ParameterInterface } from "./Parameter";
import { CommandContext } from "../..";
import ms from "ms";

export default function time(options: ParameterInterface): ParameterInterface {
    return {
        ...options,
        required: options.required ?? true,

        type: "STRING",
        parse(ctx: CommandContext, argument: string | undefined, opt: ParameterInterface) {
            if (!argument) return null;

            const result = ms(argument);
            if (!result) throw new Error("Indique um tempo válido! Ex: <10s, 3m, 1d>");
            return result;
        },
    };
}
