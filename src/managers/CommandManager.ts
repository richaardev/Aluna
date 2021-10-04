import { Command } from "@/structures/command";
import Manager from "@/structures/Manager";
import Logger from "@/utils/Logger";
import { readdirSync } from "fs";
import path from "path";

export default class CommandManager extends Manager<string, Command> {
    _load() {
        const baseDir = path.resolve(__dirname, "@/", "commands")
        readdirSync(baseDir).forEach(dir => {
            const commandsf = readdirSync(path.resolve(baseDir, `${dir}`))
            for(let file of commandsf) {
                import(`${baseDir}\\${dir}\\${file}`).then(_command => {
                    let command = new _command.default(this.client)
                    Logger.debug(`${command.options.labels[0]} command successfully loaded!`)
                    command.options.labels.forEach((label: string) => this.set(label, command));
                })
            } 
        })
    }
}