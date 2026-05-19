import { createSlashCommand } from "@/structures/command";

import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";

export default createSlashCommand({
  name: "invite",
  description: "Me adicione em seu servidor",
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x5865f2)
      .setThumbnail(this.user?.displayAvatarURL()!)
      .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
      .setDescription(
        `Quer me adicionar em outros servidores/guilds do discord?\n Então **clique [aqui](${this.inviteURL})** ou no botão abaixo para me adicionar!`,
      );
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel("Clique aqui para me adicionar!")
        .setURL(this.inviteURL),
    );

    interaction.reply({
      embeds: [embed],
      components: [row],
    });
  },
});
