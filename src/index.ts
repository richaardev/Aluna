import AlunaClient from "./AlunaClient";
import * as dotenv from "dotenv";
import { MessageMentions } from "discord.js";
import Logger from "./utils/Logger";
dotenv.config();

Logger.info("Starting...");
let client = new AlunaClient({
    intents: 32767,
    shards: "auto",
    allowedMentions: {
        parse: ["roles", "users"],
        repliedUser: true,
    },
});

client.login(process.env.TOKEN!);
