import { Manager, ManagerOptions } from "@lavacord/discord.js";
import AlunaClient from "AlunaClient";
import { StageChannel, TextChannel, VoiceChannel } from "discord.js";
import AlunaGuildPlayer from "./structures/AlunaGuildPlayer";
const nodes = JSON.parse(process.env.LAVALINK_NODES!);

export default class AlunaPlayerManager extends Manager {
    constructor(client: AlunaClient, options: ManagerOptions = {}) {
        options.player = AlunaGuildPlayer;
        super(client, nodes, options);
    }

    async joinChannel(channel?: VoiceChannel | StageChannel): Promise<AlunaGuildPlayer> {
        return new Promise((resolve, reject) => {
            if (!channel) return reject("Invalid Voice Channel");
            this.join(
                {
                    guild: channel.guild.id,
                    channel: channel.id,
                    node: "1",
                },
                { selfdeaf: true },
            )
                .then((player) => resolve(player as AlunaGuildPlayer))
                .catch(reject);
        });
    }

    get getIdealHost() {
        return nodes[0];
    }
}
