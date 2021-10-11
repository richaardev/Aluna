import { TrackData } from "lavacord";
import moment from "moment";

export default class Song {
    public readonly identifier: string;
    public readonly isSeekable: boolean;
    public readonly author: string;
    public readonly length: number;
    public readonly isStream: boolean;
    public readonly position: number;
    public readonly title: string;
    public readonly uri: string;
    public readonly track: string;
    public readonly requestedBy: string;

    constructor(track: TrackData, requestedBy: string) {
        this.track = track.track;

        this.requestedBy = requestedBy;
        this.identifier = track.info.identifier;
        this.isSeekable = track.info.isSeekable;
        this.author = track.info.author;
        this.length = track.info.length;
        this.isStream = track.info.isStream;
        this.position = track.info.position;
        this.title = track.info.title;
        this.uri = track.info.uri;
    }

    get time() {
        if (this.isStream) return "∞";
        return moment.duration(this.length).format(`hh:mm:ss`);
    }
}
