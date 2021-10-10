import AlunaClient from "../AlunaClient";
import YoutubeApi from "./YoutubeApi";

export default class Apis {
    youtube: YoutubeApi;

    constructor(client: AlunaClient) {
        this.youtube = new YoutubeApi(client);
    }
}
