import type AlunaClient from "../../AlunaClient";
import type CommandContext from "./CommandContext";
import type { _CommandRequirements } from "./CommandRequirements";
import type { ParameterInterface } from "./parameters/types/Parameter";

import Emojis from "src/utils/Emojis";

import CommandRequirements from "./CommandRequirements";
import CommandParameters from "./parameters/CommandParameters";

export default class Command {
  constructor(
    public client: AlunaClient,
    public options: CommandOptions,
  ) {
    this.client = client;
    this.options = options;
  }

  execute(_ctx: CommandContext, ..._params: any): void {}
  async _execute(ctx: CommandContext) {
    try {
      CommandRequirements.handle(ctx, this.options.requirements);
    } catch (err: any) {
      ctx.beautifulReply(Emojis.error, err.message);
      return;
    }

    let args: any[];
    try {
      args = CommandParameters.handle(ctx, ctx.args, this.options.parameters)!;
    } catch (err: any) {
      ctx.beautifulReply(Emojis.error, err.message);
      return;
    }
    try {
      args ??= [];
      this.execute(ctx, ...args);
    } catch (err: any) {
      ctx.reply(err.message);
      return;
    }
  }
}

interface CommandOptions {
  labels: string[];
  description: string;

  requirements?: _CommandRequirements;
  parameters?: ParameterInterface[];
  category?: string;

  dir?: string;
}

export interface CommandParametersInterface {
  full?: boolean;
  type: "string" | "number" | "user" | "member";
  errorMessage: string;
  required?: boolean;
  // [value: string]: any
}
