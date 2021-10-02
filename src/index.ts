import AlunaClient from './AlunaClient'
import * as dotenv from "dotenv";
dotenv.config()


let client = new AlunaClient(process.env.TOKEN!, {
    intents: 32767
});
client.connect()
