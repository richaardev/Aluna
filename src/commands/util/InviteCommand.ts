import type AlunaClient from "@/AlunaClient";
import { Command, type CommandContext } from "@/structures/command";

import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";

export default class InviteCommand extends Command {
  constructor(client: AlunaClient) {
    super(client, {
      labels: ["invite", "convite"],
      description: "Me adicione em seu servidor",
      requirements: {},
    });
  }
  async execute(ctx: CommandContext) {
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(this.client.user?.displayAvatarURL()!)
      .setAuthor(ctx.author.tag, ctx.author.displayAvatarURL())
      .setDescription(
        `Quer me adicionar em outros servidores/guilds do discord?\n Então **clique [aqui](${this.client.inviteURL})** ou no botão abaixo para me adicionar!`,
      );
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("LINK")
        .setLabel("Clique aqui para me adicionar!")
        .setURL(this.client.inviteURL),
    );

    ctx.reply({
      embeds: [embed],
      components: [row],
    });
  }
}
