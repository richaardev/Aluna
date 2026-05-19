import { createSlashCommand } from "@/structures/command";
import { requireGuildPlayer, requireVoiceChannel } from "@/structures/command/middlewares";

import { ActionRowBuilder, ComponentType, InteractionContextType, StringSelectMenuBuilder } from "discord.js";

export default createSlashCommand<"cached">({
  name: "bassboost",
  description: "Melhore o grave da musica em até 1000x",
  contexts: [InteractionContextType.Guild],
  middlewares: [requireVoiceChannel, requireGuildPlayer],
  async execute(interaction) {
    const guildPlayer = this.playerManager?.getPlayer(interaction.guildId);
    if (!guildPlayer) return interaction.reply({ content: "Não há nenhum player ativo!" });

    const values = {
      off: { name: "🔇 Desligado", gain: 0, level: 0 },
      low: { name: "🔉 Baixo", gain: 0.2, level: 1 },
      medium: { name: "🔊 Médio", gain: 0.35, level: 2 },
      high: { name: "📢 Alto", gain: 0.5, level: 3 },
      ultra: { name: "🎚️ Ultra", gain: 0.75, level: 4 },
      insane: { name: "💥 INSANOOOOO", gain: 1, level: 5 },
    };

    const selectMenu = new StringSelectMenuBuilder({
      customId: "BassBoostSelector",
      placeholder: "Escolha o nível de bass boost",
      options: Object.entries(values).map(([k, v]) => ({
        label: v.name,
        value: k,
        default: (guildPlayer?.currentBassBoostLevel ?? 0) === v.level,
      })),
    });

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu);

    const response = await interaction.reply({
      content: `Nível atual: **${Object.values(values)[guildPlayer?.currentBassBoostLevel ?? 0]?.name}**\n\nSelecione o nível de bass boost que deseja colocar:`,
      components: [row],
    });

    const collector = response.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
      time: 60_000,
    });

    collector.on("collect", async (i) => {
      if (i.user.id !== interaction.user.id)
        return i.reply({ content: "Apenas quem executou o comando pode alterar!", ephemeral: true });

      const selected = i.values[0];
      const config = values[selected as keyof typeof values];

      if (config.level === 0) await guildPlayer.clearBassboost();
      else await guildPlayer.setBassboost(config.gain, config.level);

      await i.update({
        content: `🔊 O bassboost foi alterado para **${config.name}**`,
        components: [],
      });

      collector.stop();
    });

    collector.on("end", (collected, reason) => {
      if (reason === "time" && collected.size === 0) {
        interaction.editReply({ content: "⏱️ Tempo esgotado!", components: [] }).catch(() => {});
      }
    });
  },
});
