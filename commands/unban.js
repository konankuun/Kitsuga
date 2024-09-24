const Discord = require("discord.js")

module.exports = {
    name: "unban",
    description: "Débannir un membre",
    utilisation: "/unban <membre ou id> <raison>",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à débannir",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du débanissement",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args){
        try{
            let user = args.getUser("membre")
            if(!user) return message.reply("Aucun membre spécifié.")

            let reason = args.getString("reason")
            if(!reason) reason = "Pas de raison founie.";

            if(!(await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre n'est pas banni.")

            try{await user.send(`Tu a été débanni(e) du serveur **${message.guild.name}** par **${message.user.tag}** pour la raison : "**${reason}**"`)} catch(err) {}

            await message.reply(`${message.user} a débanni **${user.tag}** pour la raison : "**${reason}**"`)
            await message.guild.members.unban(user, reason)
        }catch(err){
            return message.reply("Aucun de membre trouvé.")
        }         
    }
}