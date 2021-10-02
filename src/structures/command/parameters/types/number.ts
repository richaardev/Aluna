import { CommandContext } from "../.."

let defVar = (o: any, b: string, c: any) => (typeof o[b] === "undefined" ? c : o[b])
export default class Number {
    static parseOptions(options: NumberInterface) {
        return {
            ...options,
            required: defVar(options, 'required', true),
            errorMessage: options.errorMessage
        }
    }
    static parse(arg: string | undefined, ctx: CommandContext, opt: NumberInterface) {
        let options = this.parseOptions(opt)


        arg = arg ? (typeof arg === 'string' ? arg : arg as string) : undefined
        if (options.required && !arg) throw new Error(options.errorMessage)

        return arg
    }
}


export interface NumberInterface {
    errorMessage?: string,
    required?: boolean
}