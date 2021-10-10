import { createCanvas, loadImage } from "canvas";
import { MessageAttachment } from "discord.js";
import Emojis from "../../utils/Emojis";
import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";
import CanvasUtils from "../../utils/CanvasUtils";

export default class NowPlayingCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["nowplaying", "np"],
            requirements: {
                voiceChannelOnly: true,
                needsGuildPlayer: true,
            },
        });
    }
    async execute(ctx: CommandContext) {
        const canvas = createCanvas(1080, 1280);
        const c = canvas.getContext("2d");
        const youtube = this.client.apis.youtube;
        const video = await youtube.getVideoInfo(ctx.guildPlayer?.queue.nowPlaying?.identifier!);
        const background = await loadImage(youtube.getBestThumbnail(video.snippet?.thumbnails!));

        CanvasUtils.drawBlurredImage(c, background, 20, (canvas.width - 1280 * 1.8) / 2, 0, 1280 * 1.8, 720 * 1.8);
        c.fillStyle = "#17181F";
        c.fillRect(0, 0, canvas.width, canvas.height);
        c.fillStyle = "white";

        CanvasUtils.roundImage(c, background, (canvas.width - 640) / 2, 100, 640, 360, 300);

        const buffer = canvas.toBuffer();
        const attachment = new MessageAttachment(buffer, "nowplaying.png");

        ctx.reply({
            files: [attachment],
        });
        // let song = ctx.guildPlayer!.queue.nowPlaying!
        // ctx.reply(`💿 Estou tocando agora: \`${song.title}\`\n⏰ Tempo de musica: \`${ctx.guildPlayer!.queue.currentTime}/${song.duration}\``)
    }
}
