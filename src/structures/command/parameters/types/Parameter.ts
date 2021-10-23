export interface ParameterInterface {
    full?: boolean;
    errorMessage: string;
    required?: boolean;

    parse?: Function;
    type?: string;
}
