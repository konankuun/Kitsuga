const Discord = require("discord.js")

module.exports = {

    name: "avatar",
    description: "Affiche la photo de profil d'un membre",
    utilisation: "/avatar <membre>",
    permission: "Aucune",
    category: "Information",
    dm: true,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre cible",
            autocomplete: true,
            required: false
        }
    ],

    async run(bot, message, args){
        let user = args.getUser("membre")
        if(!user){
            user = message.member
        }
        if(!message.guild.members.cache.get(user.id)){
            user = message.member
        }
        if(!user) return message.channel.send("Aucun membre spécifié")
        
        await message.reply(user.displayAvatarURL({dynamic: true}))
    }
}