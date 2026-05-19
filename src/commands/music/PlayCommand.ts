import type { Message } from "discord.js";
import type AlunaClient from "../../AlunaClient";
import type AlunaGuildPlayer from "../../music/structures/AlunaGuildPlayer";
import type { CommandContext } from "../../structures/command";

import { setTimeout } from "node:timers/promises";

import { Command } from "../../structures/command";
import string from "../../structures/command/parameters/types/StringParameter";
import AlunaEmbed from "../../utils/AlunaEmbed";
import Emojis from "../../utils/Emojis";

export default class PlayCommand extends Command {
  constructor(client: AlunaClient) {
    super(client, {
      labels: ["play", "tocar", "p"],
      description: "Faça-me tocar uma musica ou adicione uma musica na playlist",
      requirements: {
        voiceChannelOnly: true,
      },
      parameters: [
        string({
          errorMessage: "Você precisa indicar uma musica para tocar!",
          full: true,
        }),
      ],
    });
  }
  async execute(ctx: CommandContext, song: string) {
    if (ctx.guildPlayer) {
      ctx.guildPlayer!.getSong(ctx.author.id, song).then((song) => {
        ctx.guildPlayer?._play(song);
        const youtube = this.client.apis.youtube;
        youtube.getVideoInfo(song.identifier).then((video) => {
          const embed = new AlunaEmbed()
            .setThumbnail(youtube.getBestThumbnail(video.snippet?.thumbnails!)!)
            .setTitle("**Musica adicionada na fila**")
            .addField(":tv: Nome", `\`${song.title}\``)
            .addField("⏰ Duração", `\`${song.time}\``, true)
            .addField(":+1: Likes", `\`${video.statistics?.likeCount?.abbreviate()}\``, true)
            .addField(":-1: Deslikes", `\`${video.statistics?.dislikeCount?.abbreviate()}\``, true)
            .addField(":tv: Visualizações", `\`${video.statistics?.viewCount?.abbreviate()}\``, true);

          ctx.reply({
            embeds: [embed],
          });
        });
      });
    } else {
      this.client.playerManager
        ?.joinChannel(ctx.voice!.channel!)
        .then(async (player) => {
          await ctx.channel.send(`🎧 **|** Eu entrei em \`${ctx.voice?.channel!.name}\``);
          await ctx.channel.send(`🔎 **|** Pesquisando a musica \`${song}\``);
          player.getSong(ctx.author.id, song).then((song) => {
            player._play(song);
          });
          this.startSongFeedback(ctx, player);
        })
        .catch((err) => ctx.channel.send(`${Emojis.error} **|** Não consegui entrar no canal de voz! `));
    }
  }

  startSongFeedback(ctx: CommandContext, player: AlunaGuildPlayer) {
    const messages: Message[] = [];
    const send = async (emoji: string, msg: string, deletable: boolean = false) => {
      const newMsg = await ctx.channel.send({
        content: `${emoji} **|** ${msg}`,
        allowedMentions: {
          parse: [],
          repliedUser: false,
        },
      });
      const old_message = messages.shift();
      if (old_message && deletable) await old_message.delete();
      if (deletable) messages.push(newMsg);

      return newMsg;
    };

    player.on("start", () =>
      send(
        "🔊",
        `Tocando agora **${player.queue.nowPlaying?.title}** solicitado por <@!${player.queue.nowPlaying?.requestedBy}>`,
        true,
      ),
    );
    player.on("end", async ({ reason }) => {
      switch (reason) {
        case "FINISHED":
        case "STOPPED":
        case "REPLACED":
          if (player.queue.hasNext) {
            player.queue.playNext();
          } else {
            send("💿", `Todas as musicas acabaram!`);
            await setTimeout(5 * 60 * 1000);
            if (player.playing) return;
            player.manager.leave(player.id);
            player.destroy();
          }
          break;
      }
    });
  }
}
