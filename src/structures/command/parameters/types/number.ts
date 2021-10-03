import { CommandContext } from "../.."

let defVar = (o: any, b: string, c: any) => (typeof o[b] === "undefined" ? c : o[b])
export default class Number {
    static parseOptions(options: NumberInterface) {
        return {
            ...options,
            errorMessage: options.errorMessage,
            min: defVar(options, "min", 0),
            max: defVar(options, "max", 1000000000)
        }
    }
    static parse(arg: string | undefined, ctx: CommandContext, opt: NumberInterface) {
        let options = this.parseOptions(opt)
        if (!arg) return null
        
        let num: number = +arg
        if (isNaN(num)) throw new Error("Desculpe, mas isso não é um numero válido!")
        if (num < options.min) throw new Error(`Desculpe, mas o numero não pode ser menor que ${options.min}`)
        if (num < options.max) throw new Error(`Desculpe, mas o numero não pode ser maior que ${options.max}`)
        
        return num
    }
}

interface NumberInterface {
    errorMessage?: string,
    required?: boolean
}