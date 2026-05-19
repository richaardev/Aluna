import { createSlashCommand } from "@/structures/command";

import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";

export default createSlashCommand({
  name: "avatar",
  description: "Veja o avatar de um usuário",
  options: [
    {
      name: "user",
      description: "Usuário para ver o avatar",
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  async execute(interaction) {
    const targetUser = interaction.options.getUser("user") ?? interaction.user;
    const embed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
      .setDescription(
        `**[Clique aqui](${targetUser.displayAvatarURL({
          size: 2048,
        })}) para fazer o download.**`,
      )
      .setImage(targetUser.displayAvatarURL({ size: 2048 }))
      .setColor(0x5865f2);

    interaction.reply({ embeds: [embed] });
  },
});
