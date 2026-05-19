import { readdirSync } from "node:fs";
import path from "node:path";

import Manager from "../structures/Manager"; // que?

export default class EventsManager extends Manager<string, any> {
  _load() {
    const baseDir = path.resolve(__dirname, "../", "listeners");
    readdirSync(baseDir).forEach((dir) => {
      import(`${baseDir}/${dir}`).then((_listener) => {
        const listener = new _listener.default(this.client);
        this.client.on(listener.name, (...args) => listener.run(...args));
      });
    });
  }
}
