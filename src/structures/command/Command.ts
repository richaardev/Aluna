import AlunaClient from "../../AlunaClient";
import CommandContext from "./CommandContext";
import CommandRequirements, { _CommandRequirements } from "./CommandRequirements";
import CommandParameters from "./parameters/CommandParameters";
import { _String } from "./parameters/types/string";


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
            ctx.channel.createMessage(err.message)
            return;
        }

        let args: any[];
        try {
            args = CommandParameters.handle(ctx, ctx.args, this.options.parameters)!
        } catch (err: any) {
            ctx.channel.createMessage(err.message)
            return;
        }

        this.execute(ctx, ...args)
    }
}


interface CommandOptions {
    labels: string[];
    requirements?: _CommandRequirements
    parameters?: CommandParametersInterface[]
}

export interface CommandParametersInterface extends _String {
    full?: boolean;
    type: "string" | "number";
}