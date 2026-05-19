import { readdirSync } from "node:fs";
import path from "node:path";
import { type AlunaCommand } from "@/structures/command";
import Manager from "@/structures/Manager";

export default class CommandManager extends Manager<string, AlunaCommand> {
  _load() {
    const baseDir = path.resolve(__dirname, "../", "commands");
    readdirSync(baseDir).forEach((dir) => {
      const commandsf = readdirSync(path.resolve(baseDir, `${dir}`));
      for (const file of commandsf) {
        this.loadCommand(`${baseDir}/${dir}/${file}`);
      }
    });
  }

  loadCommand(dir: string) {
    import(dir).then((_command) => {
      const command = _command.default as AlunaCommand;

      this.set(command.data.name, command);
    });
  }
}
