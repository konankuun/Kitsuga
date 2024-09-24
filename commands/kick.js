const Discord = require("discord.js")

module.exports = {
    name: "kick",
    description: "Expulser un membre",
    utilisation: "/kick <membre> <raison>",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à expulser",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison de la sannction",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args){

        let user = args.getUser("membre")
        if(!user) return message.reply("Aucun membre à expulser.")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Aucun membre spécifié.")

        let reason = args.getString("raison")
        if(!reason) reason = "Aucune raison fournie."

        if(message.user.id === user.id) return message.reply("Vous ne pouvez pas vous expulser.")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Vous ne pouvez pas expulser le propriétaire.")
        if(member && !member?.kickable) return message.reply("Je ne peux pas expulser cet utilisateur.")
        if(member &&  message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Impossible d'expulser un utilisateur au même niveau que vous")

        try{await user.send(`Vous avez été expulsé(e) du serveur **${message.guild.name}** par **${message.user.tag}**, pour la raison : "**\`${reason}\`**"`)}catch(err){}

        await message.reply(`${message.user} a expulsé(e) **${user.tag}**, pour la raison : "**\`${reason}\`**"`)

        await member.kick(reason)
    }
}
