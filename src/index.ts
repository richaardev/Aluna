import AlunaClient from './AlunaClient'
import * as dotenv from "dotenv";
dotenv.config()


let client = new AlunaClient({
    intents: 32767,
    shards: "auto",
    
});

client.login(process.env.TOKEN!)
