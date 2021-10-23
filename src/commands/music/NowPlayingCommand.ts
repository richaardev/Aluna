import { createCanvas, loadImage } from "canvas";
import { MessageAttachment } from "discord.js";
import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";

export default class NowPlayingCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["nowplaying", "np"],
            description: "Veja qual musica está tocando agora",
            requirements: {
                voiceChannelOnly: true,
                needsGuildPlayer: true,
            },
        });
    }
    async execute(ctx: CommandContext) {
        const _canvas = createCanvas(1080, 1280);
        const c = _canvas.getContext("2d");
        const youtube = this.client.apis.youtube;
        const video = await youtube.getVideoInfo(ctx.guildPlayer?.queue.nowPlaying?.identifier!);
        const song = ctx.guildPlayer?.queue.nowPlaying!;

        const thumbnail = await loadImage(youtube.getBestThumbnail(video.snippet?.thumbnails!));
        const play = await loadImage(`src/assets/${ctx.guildPlayer?.paused ? "play" : "pause"}.png`);
        const start = await loadImage("src/assets/start.png");
        const end = await loadImage("src/assets/end.png");

        const repeat = await loadImage(`src/assets/repeat${""}.png`);
        const shuffle = await loadImage(`src/assets/shuffle${""}.png`);

        c.fillStyle = "rgba(23, 24, 41, 0.98)";
        c.drawBlurredImage(thumbnail, 50, (_canvas.width - 1280 * (16 / 9)) / 2, 0, 1280 * (16 / 9), 1280);
        c.fillRect(0, 0, _canvas.width, _canvas.height);
        c.fillStyle = "white";

        let BASE_HEIGHT = 0;
        c.textAlign = "center";
        c.font = "50px Mat Saleh";
        c.fillStyle = "white";
        BASE_HEIGHT += 100;
        c.fillText("TOCANDO AGORA", _canvas.width / 2, BASE_HEIGHT);

        // thumb
        let resolution = 750;
        BASE_HEIGHT += 50;
        c.drawImage(thumbnail, (_canvas.width - resolution) / 2, BASE_HEIGHT, resolution, resolution * (9 / 16));
        BASE_HEIGHT += resolution * (9 / 16) + 100;

        //autor
        c.fillStyle = "rgba(200, 200, 200, 1)";
        c.fillText(ctx.guildPlayer?.queue.nowPlaying?.author!, _canvas.width / 2, BASE_HEIGHT);
        BASE_HEIGHT += 80;

        //titulo
        c.font = "50px Mat Saleh";
        c.fillStyle = "white";
        let lines = c.getLines(ctx.guildPlayer?.queue.nowPlaying?.title!, 1000);
        lines.forEach((text) => {
            c.fillText(text, _canvas.width / 2, BASE_HEIGHT);
            BASE_HEIGHT += 65;
        });

        // barra
        c.fillStyle = "rgba(0, 0, 0, 0.1)";
        let BAR_WIDTH = _canvas.width - 50 * 2;
        c.roundRect(50, BASE_HEIGHT, BAR_WIDTH, 20, 15);

        c.fillStyle = "rgba(25, 255, 125, 0.5)";
        let ELAPSED_WIDTH = (ctx.guildPlayer?.state.position! / song.length) * BAR_WIDTH;
        c.roundRect(50, BASE_HEIGHT, ELAPSED_WIDTH, 20, 15);
        c.fillStyle = "#19ff7d";
        c.roundRect(ELAPSED_WIDTH + 30, BASE_HEIGHT - 5, 30, 30, 15);

        // tempo
        BASE_HEIGHT += 70;
        c.fillStyle = "rgba(200, 200, 200, 1)";
        c.font = "40px Mat Saleh";
        c.textAlign = "left";
        c.fillText(ctx.guildPlayer?.queue.currentTime!, 60, BASE_HEIGHT);
        c.textAlign = "right";
        c.fillText(ctx.guildPlayer?.queue.nowPlaying?.time!, _canvas.width - 50, BASE_HEIGHT);

        // botões
        BASE_HEIGHT += 50;
        let [[s, sS], [h, hH]] = [
            [125, 25],
            [BASE_HEIGHT, 15],
        ];
        c.drawImage(play, (_canvas.width - s) / 2, h, s, s);

        s -= sS;
        h += hH;
        c.drawImage(start, (_canvas.width - s) / 2 - 200, h, s, s);
        c.drawImage(end, (_canvas.width - s) / 2 + 200, h, s, s);

        s -= sS;
        h += hH;
        c.drawImage(shuffle, (_canvas.width - s) / 2 - 425, h, s, s);
        c.drawImage(repeat, (_canvas.width - s) / 2 + 425, h, s, s);

        const canvas = createCanvas(1080, BASE_HEIGHT + 200);
        const z = canvas.getContext("2d");
        z.drawImage(_canvas, 0, 0, 1080, _canvas.height);
        const buffer = canvas.toBuffer();
        const attachment = new MessageAttachment(buffer, "nowplaying.png");

        ctx.reply({
            files: [attachment],
        });
    }
}
