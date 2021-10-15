import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";
import { createCanvas, loadImage } from "canvas";
import { MessageAttachment } from "discord.js";

export default class QueueCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["queue", "q"],
            requirements: {
                needsGuildPlayer: true,
                voiceChannelOnly: true,
            },
        });
    }
    async execute(ctx: CommandContext) {
        // let songs = ctx.guildPlayer!.queue.songs.map((song, i) => `**${i}.** \`${song.title} ${song.time}\` - <@!${song.requestedBy}>`).join("\n");
        // if (songs === "" || !songs) songs = "**Nenhuma musica na fila!**";
        // songs = `**Tocando agora: \`${ctx.guildPlayer?.queue.nowPlaying?.title}\` - <@!${ctx.guildPlayer?.queue.nowPlaying?.requestedBy}>** \n\n${songs}`;
        // let embed = new AlunaEmbed().setDescription(songs);

        // ctx.reply({
        //     embeds: [embed],
        // });

        const canvas = createCanvas(1920, 1080);
        const c = canvas.getContext("2d");
        const queue = ctx.guildPlayer?.queue!.songs.slice(0, 10);

        let BASE_HEIGHT = 0;

        queue?.forEach(async (song) => {
            console.log(song);
            let info = await this.client.apis.youtube.getVideoInfo(song.identifier);
            let thumb = await loadImage(this.client.apis.youtube.getBestThumbnail(info.snippet?.thumbnails!)!);

            let reW = 500;
            let reH = reW * (9 / 16);
            c.drawImage(thumb, 50, BASE_HEIGHT, reW, reH);

            BASE_HEIGHT += reH + 100;
        });

        const buffer = canvas.toBuffer();
        const attachment = new MessageAttachment(buffer, "queue.png");

        ctx.reply({
            files: [attachment],
        });
    }
}
