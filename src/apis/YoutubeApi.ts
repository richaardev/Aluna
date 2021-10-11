import * as api from "googleapis";
import ApiWrapper from "./ApiWrapper";

export default class YoutubeApi extends ApiWrapper {
    getVideoInfo(id: string): Promise<api.youtube_v3.Schema$Video> {
        // @ts-ignore
        return this.youtube.videos.list({ id: id, part: "snippet,statistics" }).then((a) => a.data.items[0]);
    }
    getBestThumbnail(thumbnails: api.youtube_v3.Schema$ThumbnailDetails): string {
        if (!thumbnails) return "";
        const { high, maxres, medium, standard } = thumbnails;
        return maxres?.url || medium?.url || high?.url || standard?.url || thumbnails.default?.url!;
    }

    get youtube() {
        return api.google.youtube({
            version: "v3",
            auth: process.env.YOUTUBE_API_KEY,
        });
    }
}
