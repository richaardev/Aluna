import { LavalinkNode, Player, Rest, TrackResponse } from "@lavacord/discord.js";
import Queue from "./Queue";
import Song from "./Song";

export default class AlunaGuildPlayer extends Player {
    public readonly queue: Queue;
    public bassboost: boolean;
    public loop: boolean;

    constructor(node: LavalinkNode, id: string) {
        super(node, id);

        this.queue = new Queue(this);
        this.bassboost = false;
        this.loop = false;
    }

    loadTracks(songName: string, provider = "ytsearch:"): Promise<TrackResponse> {
        return Rest.load(this.node, `${provider}${songName}`);
    }

    getSong(requestedBy: string, songName: string): Promise<Song> {
        return this.loadTracks(songName).then((songs) => {
            return new Song(songs.tracks[0], requestedBy);
        });
    }

    _play(song: Song, forcePlay = false) {
        if (this.playing && !forcePlay) {
            this.queue.add(song);
            return;
        }

        this.queue.play(song);
        this.volume(50);
    }

    setBassboost(gain: number) {
        let state = !this.bassboost;
        this.equalizer(
            Array(6)
                .fill(0)
                .map((n, i) => ({ band: i, gain })),
        );
        this.bassboost = state;

        return state;
    }
}
