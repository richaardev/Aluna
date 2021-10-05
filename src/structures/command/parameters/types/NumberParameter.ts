import { ParameterInterface } from "./Parameter";
import { CommandContext } from "../..";

export default function number(options: NumberInterface): NumberInterface {
    return {
        ...options,
        required: options.required ?? true,
        min: options.min ?? 0,
        max: options.max ?? 100_000_000_000,
        
        parse(ctx: CommandContext, argument: string | undefined, opt: NumberInterface) {
            if (!argument) return null
        
            let num: number = +argument
            if (isNaN(num)) throw new Error("Desculpe, mas isso não é um numero válido!")
            if (num < options.min!) throw new Error(`Desculpe, mas o numero não pode ser menor que ${options.min}`)
            if (num < options.max!) throw new Error(`Desculpe, mas o numero não pode ser maior que ${options.max}`)
            
            return num
        }
    }
}

interface NumberInterface extends ParameterInterface {
    min?: number
    max?: number
}