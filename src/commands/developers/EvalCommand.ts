import type AlunaClient from "../../AlunaClient";
import type { CommandContext } from "../../structures/command";

import util from "node:util";

import { Command } from "../../structures/command";
import string from "../../structures/command/parameters/types/StringParameter";

export default class EvalCommand extends Command {
  constructor(client: AlunaClient) {
    super(client, {
      labels: ["eval"],
      description: "Execute codigos JavaScript",
      requirements: {
        devOnly: true,
      },
      parameters: [
        string({
          errorMessage: "é necessário que informe um código!! Tente novamente.",
          full: true,
        }),
      ],
    });
  }
  async execute(ctx: CommandContext, code: string) {
    try {
      if (code.startsWith("```js\n")) code = code.substring(5, code.length - 3);
      let evaled = await eval(code);
      evaled = util.inspect(evaled, { depth: 0 });
      evaled = this.clean(evaled.replace(new RegExp(`${process.env.TOKEN}`, "g"), "undefined"));
      if (evaled.length > 1900) evaled = `${evaled.slice(0, 1800)}...`;
      evaled = `\`\`\`js\n${evaled}\`\`\``;
      await ctx.reply(evaled);
    } catch (err) {
      await ctx.reply(`\`\`\`js\n${util.inspect(err, { depth: 1 }).slice(0, 1800)}\`\`\``);
    }
  }
  clean(text: string) {
    const blankSpace = String.fromCharCode(8203);
    return typeof text === "string"
      ? text.replace(/`/g, "`" + blankSpace).replace(/@/g, "@" + blankSpace)
      : text;
  }
}
