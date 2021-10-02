import { CommandContext } from "../.."

let defVar = (o: any, b: string, c: any) => (typeof o[b] === "undefined" ? c : o[b])
export default class String {
    static parseOptions(options: _String) {
        return {
            ...options,
            required: defVar(options, 'required', true),
            errorMessage: options.errorMessage
        }
    }
    static parse(arg: string | undefined, ctx: CommandContext, opt: _String) {
        let options = this.parseOptions(opt)


        arg = arg ? (typeof arg === 'string' ? arg : arg as string) : undefined
        if (options.required && !arg) throw new Error(options.errorMessage)

        return arg
    }
}


export interface _String {
    errorMessage: string,
    required?: boolean
}