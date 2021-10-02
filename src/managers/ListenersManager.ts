import { readdirSync } from "fs"
import path from "path"
import AlunaClient from "../AlunaClient"
import Manager from "../structures/Manager" // que?
import Logger from "../utils/Logger"

export default class EventsManager extends Manager<string, any> {
    _load() {
        const baseDir = path.resolve(__dirname, "../", "listeners")
        readdirSync(baseDir).forEach(dir => {
            import(`${baseDir}\\${dir}`).then(_listener => {
                let listener = new _listener.default(this.client)
                Logger.debug(`${listener.name} listener successfully loaded!`)
                this.client.on(listener.name, (...args) => listener.run(...args))
            })
        })
    }
}