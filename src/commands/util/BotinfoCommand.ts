import { createSlashCommand } from "@/structures/command";
import AlunaEmbed from "@/utils/AlunaEmbed";

export default createSlashCommand({
  name: "botinfo",
  description: "Veja as minhas informações",
  async execute(interaction) {
    const embed = new AlunaEmbed()
      .setTitle("**Minhas informações**")
      .setDescription(
        [
          `・Olá, meu nome é **${this.user.username}**, sou um bot para trazer simplicidade e facilidade para meus diversos comandos!`,
          `・Fui criada em **[TypeScript](https://www.typescriptlang.org/)** por **richaard5 🎃#0585**`,
          `・Estou online <t:${~~(this.readyAt.getTime() / 1000)}:R>`,
        ].join("\n"),
      )
      .addFields([
        {
          name: "> 📁 **Minhas Estatísticas**",
          value: [
            `・Estou interagindo com **${this.users.cache.size} usuários**`,
            `・Estou em **${this.guilds.cache.size} servidores**`,
            `・Tenho um total de **${this.commandManager.size} comandos**`,
          ].join("\n"),
        },
        {
          name: "> 🔗 **Links**",
          value: [`**[Me Adicione!](${this.inviteURL})**`].join("\n"),
        },
      ])
      .setFooter({
        text: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setThumbnail(this.user.displayAvatarURL());

    interaction.reply({
      embeds: [embed],
    });
  },
});
