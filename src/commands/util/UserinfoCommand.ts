import { GuildMember, MessageEmbed } from "discord.js";
import AlunaClient from "../../AlunaClient";
import { Command, CommandContext } from "../../structures/command";
import member from "../../structures/command/parameters/types/MemberParameter";

export default class UserinfoCommand extends Command {
    constructor(client: AlunaClient) {
        super(client, {
            labels: ["userinfo", "memberinfo", "ui"],
            requirements: {},
            parameters: [
                member({
                    required: false,
                    errorMessage: "",
                }),
            ],
        });
    }
    async execute(ctx: CommandContext, member: GuildMember) {
        member ??= ctx.member!;
        console.log(member.presence?.clientStatus);

        let embed = new MessageEmbed()
            .setAuthor(member.user.username, member.displayAvatarURL({ dynamic: true }))
            .addField("> Informações básicas", `- Tag: **${member.user.tag}**\n- ID: **${member.id}**\n- Conta criada há: **${calcDate(new Date(), member.user.createdAt).days} dias**\n- Entrou no servidor faz: **${calcDate(new Date(), member.joinedAt!).days} dias**`)
            .addField("> Informações adicionais", `- Status: ${checkStatus()}`);
        ctx.reply({ embeds: [embed] });

        function calcDate(date1: Date, date2: Date) {
            var diff = Math.floor(date1.getTime() - date2.getTime());
            var day = 1000 * 60 * 60 * 24;

            var days = Math.floor(diff / day);

            return { days };
        }

        function checkStatus() {
            switch (member.presence?.status) {
                case "dnd":
                    return (member.presence?.status).replace("dnd", "Ocupado");
                    break;
                case "online":
                    return (member.presence?.status).replace("online", "Online");
                    break;
                case "idle":
                    return (member.presence?.status).replace("idle", "Ausente");
                    break;
                case "invisible":
                    return (member.presence?.status).replace("invisible", "Offline");
                    break;
            }
        }
    }
}
