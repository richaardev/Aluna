import { CommandContext } from "../.."

let defVar = (o: any, b: string, c: any) => (typeof o[b] === "undefined" ? c : o[b])
export default class String {
    static parseOptions(options: StringInterface) {
        return {
            ...options,
            errorMessage: options.errorMessage
        }
    }
    static parse(arg: string | undefined, ctx: CommandContext, opt: StringInterface) {
        let options = this.parseOptions(opt)


        arg = arg ? (typeof arg === 'string' ? arg : arg as string) : undefined
        if (options.required && !arg) throw new Error(options.errorMessage)

        return arg
    }
}

interface StringInterface {
    errorMessage: string,
    required?: boolean
}