import Manager from "../structures/Manager" // que?
import { readdirSync } from "fs"
import path from "path"

export default class EventsManager extends Manager<string, any> {
    _load() {
        const baseDir = path.resolve(__dirname, "../", "listeners")
        readdirSync(baseDir).forEach(dir => {
            import(`${baseDir}\\${dir}`).then(_listener => {
                let listener = new _listener.default(this.client)
                this.client.on(listener.name, (...args) => listener.run(...args))
            })
        })
    }
}