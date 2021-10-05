import Collection from "@discordjs/collection";
import AlunaClient from "../AlunaClient";

export default class Manager<K, V> extends Collection<K, V> {
    public client: AlunaClient;
    constructor(client: AlunaClient) {
        super();
        this.client = client;
        this._load = this._load.bind(this)
        this._load()
    }
    _load() {}
}