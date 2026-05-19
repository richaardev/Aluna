import "dotenv/config";

import AlunaClient from "./AlunaClient";
import Logger from "./utils/Logger";

import("./utils/Prototypes");
import("moment-duration-format");

Logger.info("Starting...");
const client = new AlunaClient({
  intents: 32767,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users"],
    repliedUser: true,
  },
});

client.login(process.env.TOKEN!);
