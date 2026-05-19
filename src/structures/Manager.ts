import type AlunaClient from "@/AlunaClient";

import { Collection } from "discord.js";

export default class Manager<K, V> extends Collection<K, V> {
  public client: AlunaClient;
  constructor(client: AlunaClient) {
    super();
    this.client = client;
    this._load = this._load.bind(this);
    this._load();
  }
  _load() {}
}
