import CommandRequirements, { _CommandRequirements } from "./CommandRequirements";
import { ParameterInterface } from "./parameters/types/Parameter";
import CommandParameters from "./parameters/CommandParameters";
import CommandContext from "./CommandContext";
import AlunaClient from "../../AlunaClient";

export default class Command {
    public client: AlunaClient;
    public options: CommandOptions;

    constructor(client: AlunaClient, options: CommandOptions) {
        this.client = client;
        this.options = options;
    }
    execute(ctx: CommandContext, ...params: any): void {}

    async _execute(ctx: CommandContext) {
        try {
            CommandRequirements.handle(ctx, this.options.requirements)
        } catch (err: any) {
            ctx.reply(err.message)
            return;
        }

        let args: any[];
        try {
            args = CommandParameters.handle(ctx, ctx.args, this.options.parameters)!
        } catch (err: any) {
            ctx.reply(err.message)
            return;
        }
        
        args ??= []
        this.execute(ctx, ...args)
    }
}


interface CommandOptions {
    labels: string[];
    description?: string;

    requirements?: _CommandRequirements;
    parameters?: ParameterInterface[];
    category?: string;
}

export interface CommandParametersInterface {
    full?: boolean;
    type: "string" | "number" | "user" | "member";
    errorMessage: string
    required?: boolean;
    // [value: string]: any
}