import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";
import AlunaEmbed from "../../utils/AlunaEmbed";

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
        let songs = ctx.guildPlayer!.queue.songs.map((song, i) => `**${i}.** \`${song.title} ${song.duration}\` - <@!${song.requestedBy}>`).join("\n");
        if (songs === "" || !songs) songs = "**Nenhuma musica na fila!**";
        songs = `**Tocando agora: \`${ctx.guildPlayer?.queue.nowPlaying?.title}\` - <@!${ctx.guildPlayer?.queue.nowPlaying?.requestedBy}>** \n\n${songs}`;
        let embed = new AlunaEmbed().setDescription(songs);

        ctx.reply({
            embeds: [embed],
        });
    }
}
