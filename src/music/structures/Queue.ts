import { MessageEmbed, TextChannel } from "discord.js";
import moment from "moment";
import AlunaGuildPlayer from "./AlunaGuildPlayer";
import Song from "./Song";

export default class Queue {
    public readonly player: AlunaGuildPlayer;
    public songs: Song[];
    public nowPlaying?: Song;
    public loop: boolean;
    public textChannel?: TextChannel;

    constructor(player: AlunaGuildPlayer) {
        this.songs = [];
        this.player = player;
        this.loop = false;
    }

    play(song: Song) {
        this.nowPlaying = song;
        return this.player.play(song.track);
    }

    add(song: Song) {
        this.songs.push(song);
    }
    get hasNext() {
        const isEmpty = (arr: any[]) => !Array.isArray(arr) || arr.length === 0;
        return !isEmpty(this.songs);
    }
    get currentTime() {
        return moment.duration(this.player.state.position).format(`${this.player.state.position! >= 3600000 ? "hh:" : ""}mm:ss`, {
            trim: false
        });
    }
    playNext() {
        let song = this.songs.shift();
        if (song) {
            this.nowPlaying = song;
            this.player.play(song.track);
            return Promise.resolve(song);
        }
    }
}
