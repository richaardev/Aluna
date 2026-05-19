import { createSlashCommand } from "@/structures/command";

export default createSlashCommand({
  name: "ping",
  description: "Veja o meu ping atual",
  async execute(interaction) {
    interaction.reply({ content: `Pong! \`${this.ws.ping}\`ms` });
  },
});
