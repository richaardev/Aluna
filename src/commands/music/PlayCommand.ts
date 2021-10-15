import { CommandInteraction, Message } from "discord.js";
import AlunaGuildPlayer from "../../music/structures/AlunaGuildPlayer";
import string from "../../structures/command/parameters/types/StringParameter";
import { setTimeout } from "timers/promises";
import AlunaEmbed from "../../utils/AlunaEmbed";
import Emojis from "../../utils/Emojis";
import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";

export default class PlayCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["play", "tocar", "p"],
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
                let youtube = this.client.apis.youtube;
                youtube.getVideoInfo(song.identifier).then((video) => {
                    let embed = new AlunaEmbed()
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
            let newMsg = await ctx.channel.send({
                content: `${emoji} **|** ${msg}`,
                allowedMentions: {
                    parse: [],
                    repliedUser: false,
                },
            });
            let old_message = messages.shift();
            if (old_message && deletable) await old_message.delete();
            if (deletable) messages.push(newMsg);

            return newMsg;
        };

        player.on("start", () => send("🔊", `Tocando agora **${player.queue.nowPlaying?.title}** solicitado por <@!${player.queue.nowPlaying?.requestedBy}>`, true));
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
