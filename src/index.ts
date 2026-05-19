import "dotenv/config";

import AlunaClient from "@/AlunaClient";
import Logger from "@/utils/Logger";

import { GatewayIntentBits, Partials } from "discord.js";

import "@/utils/Prototypes";
import "moment-duration-format";
import { env } from "@/env";

Logger.info("Starting...");

const client = new AlunaClient({
  intents:
    GatewayIntentBits.Guilds |
    GatewayIntentBits.GuildMembers |
    GatewayIntentBits.GuildMessages |
    GatewayIntentBits.GuildVoiceStates |
    GatewayIntentBits.MessageContent,
  partials: [Partials.Channel, Partials.GuildMember],
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users"],
    repliedUser: true,
  },
});

client.login(env.DISCORD_BOT_TOKEN);
