import AlunaClient from "../AlunaClient";
import { Permissions } from "discord.js";

class AlunaUtils {
    private client: AlunaClient;
    constructor(client: AlunaClient) {
        this.client = client;
    }

    get inviteURL() {
        let scopes = ["bot", "applications.commands"];
        let permissions = Permissions.ALL;
        return `https://discord.com/api/oauth2/authorize?client_id=${this.client.user?.id}&permissions=${permissions}&scope=${scopes.join("%20")}`;
    }

    abbreviateNumber(number: string | number, precision = 2) {
        number = parseInt(number as string);
        const suffsFromZeros = { 0: "", 3: "k", 6: "M", 9: "B", 12: "T" };
        const { length } = number.toString();
        const lengthThird = length % 3;
        const divDigits = length - (lengthThird || lengthThird + 3);
        const calc = "" + (number / 10 ** divDigits).toFixed(precision);

        const keyTyped = divDigits as keyof typeof suffsFromZeros;
        return number < 1000 ? "" + number : (calc.indexOf(".") === calc.length - 3 ? calc.replace(/\.00/, "") : calc) + suffsFromZeros[keyTyped];
    }
}

export default AlunaUtils;
