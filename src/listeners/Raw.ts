import type AlunaClient from "@/AlunaClient";

export default class Raw {
  public client: AlunaClient;
  public name: string;

  constructor(client: AlunaClient) {
    this.client = client;
    this.name = "raw";
  }

  async run(data: any) {
    // Forward raw Discord events to Lavalink manager for voice state tracking
    this.client.playerManager?.sendRawData(data);
  }
}
