import { createSlashCommand } from "@/structures/command";

import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";

export default createSlashCommand({
  name: "banner",
  description: "Veja o banner de um usuário",
  options: [
    {
      name: "user",
      description: "Usuário para ver o banner",
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  async execute(interaction) {
    const targetUser = interaction.options.getUser("user") ?? interaction.user;

    const embed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
      .setDescription(`**[Clique aqui](${targetUser.bannerURL()}) para fazer o download.**`)
      .setImage(targetUser.displayAvatarURL({ size: 2048 }))
      .setColor(0x5865f2);

    interaction.reply({ embeds: [embed] });
  },
});
