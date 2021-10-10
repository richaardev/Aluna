import AlunaClient from "../AlunaClient";

export default class ApiWrapper {
    public client: AlunaClient;
    constructor(client: AlunaClient) {
        this.client = client;

        this.load = this.load.bind(this);
        this.load();
    }
    load() {}
}
