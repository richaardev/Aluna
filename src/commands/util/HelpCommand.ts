import type AlunaClient from "@/AlunaClient";
import { Command, type CommandContext } from "@/structures/command";

import { MessageEmbed } from "discord.js";

export default class HelpCommand extends Command {
  constructor(client: AlunaClient) {
    super(client, {
      labels: ["help"],
      description: "Veja todos os meus comandos disponiveis para uso!",
      requirements: {},
    });
  }
  async execute(ctx: CommandContext) {
    const embed = new MessageEmbed()
      .setAuthor(ctx.author.username, ctx.author.displayAvatarURL())
      .setThumbnail(this.client.user?.displayAvatarURL()!)
      .addField("Musica", this.mapCommands("music"))
      .addField("Utilidades", this.mapCommands("util"))
      .addField("Moderação", this.mapCommands("moderation"))
      .setColor("RANDOM");

    ctx.reply({
      embeds: [embed],
    });
  }

  mapCommands(category: string) {
    const u: Command[] = [];
    this.client.commandManager.forEach((command) => {
      if (!u.includes(command) && command.options.category === category) u.push(command);
    });
    return u.map((a) => `\`${a.options.labels[0]}\``).join(" ");
  }
}
