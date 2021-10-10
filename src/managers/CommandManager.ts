import { Command } from "../structures/command";
import Manager from "../structures/Manager";
import { readdirSync } from "fs";
import path from "path";

export default class CommandManager extends Manager<string, Command> {
    _load() {
        const baseDir = path.resolve(__dirname, "../", "commands");
        readdirSync(baseDir).forEach((dir) => {
            const commandsf = readdirSync(path.resolve(baseDir, `${dir}`));
            for (let file of commandsf) {
                this.loadCommand(`${baseDir}/${dir}/${file}`, dir);
            }
        });
    }

    loadCommand(dir: string, category: string) {
        import(dir).then((_command) => {
            let command = new _command.default(this.client);
            command.options.category = category;
            command.options.dir = dir;
            command.options.labels.forEach((label: string) => this.set(label, command));
        });
    }

    reloadCommand(commandName: string): boolean {
        let cmd = this.get(commandName);
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
