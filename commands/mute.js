const Discord = require("discord.js")
const ms = require("ms")

module.exports = {

    name: "mute",
    description: "Rendre muet un membre",
    utilisation: "/mute <membre> <temps> <raison>",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "L'utilisateur à rendre muet",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "temps",
            description: "Temps de mute",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du mute",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {
        let user = args.getUser("membre")
        if(!user) return message.reply("Pas de membre spécifié.")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Aucun membre trouvé.")

        let time = args.getString("temps")
        if(!time) return message.reply("Pas de temps spécifié.")
        if(isNaN(ms(time))) return message.reply("Le temps n'est pas valide.")
        if(ms(time) > 86400000) return message.reply("Le mute ne peut pas durer plus de 28 jours.")

        let reason = args.getString("raison")
        if(!reason) reason = "Pas de raison fournie.";

        if(message.user.id == user.id) return message.reply("Vous ne pouvez pas vous rendre muet.")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Vous ne pouvez pas rendre muet le propriétaire")
        if(!member.moderatable) return message.reply("Vous ne pouvez pas rendre muet ce membre")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Impossible de rendre muet un membre au même niveau que vous.")
        if(member.isCommunicationDisabled()) return message.reply("Ce membre est déjà muet.")

        try{await user.send(`Vous avez été rendu muet sur le serveur **${message.guild.name}** par **${message.user.tag}** pendant **${time}**, pour la raison : "**\`${reason}\`**"`)}catch(err){}

        await message.channel.send(`${message.user} a rendu(e) muet **${user.tag}** pendant **${time}** pour la raison : "**\`${reason}\`**"`)

        await member.timeout(ms(time), reason)
        
    }
}