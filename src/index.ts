import * as dotenv from "dotenv";
import AlunaClient from "./AlunaClient";
import Logger from "./utils/Logger";
dotenv.config();
import("./utils/Prototypes")
import("moment-duration-format")

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
