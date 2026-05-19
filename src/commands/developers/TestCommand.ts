import type { User } from "discord.js";
import type AlunaClient from "../../AlunaClient";
import type { CommandContext } from "../../structures/command";

import { Command } from "../../structures/command";
import user from "../../structures/command/parameters/types/UserParameter";

export default class TestCommand extends Command {
  constructor(client: AlunaClient) {
    super(client, {
      labels: ["test"],
      description: "Test",
      requirements: {
        devOnly: true,
      },
      parameters: [
        user({
          errorMessage: "Bruh",
          required: false,
        }),
      ],
    });
  }
  async execute(ctx: CommandContext, user: User) {
    if (!user) return ctx.reply("ninguem");
    ctx.reply(`${user.username}`);
  }
}
