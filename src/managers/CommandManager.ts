import type { Command } from "../structures/command";

import { readdirSync } from "node:fs";
import path from "node:path";

import Manager from "../structures/Manager";

export default class CommandManager extends Manager<string, Command> {
  _load() {
    const baseDir = path.resolve(__dirname, "../", "commands");
    readdirSync(baseDir).forEach((dir) => {
      const commandsf = readdirSync(path.resolve(baseDir, `${dir}`));
      for (const file of commandsf) {
        this.loadCommand(`${baseDir}/${dir}/${file}`, dir);
      }
    });
  }

  loadCommand(dir: string, category: string) {
    import(dir).then((_command) => {
      const command = new _command.default(this.client);
      command.options.category = category;
      command.options.dir = dir;
      command.options.labels.forEach((label: string) => this.set(label, command));
    });
  }

  reloadCommand(commandName: string): boolean {
    const cmd = this.get(commandName);
    if (cmd) {
      cmd.options.labels.forEach((label) => this.delete(label));

      const dir = cmd?.options.dir!;
      delete require.cache[require.resolve(dir)];

      this.loadCommand(dir, cmd.options.category!);
      return true;
    }

    return false;
  }
}
