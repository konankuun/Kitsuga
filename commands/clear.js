const Discord = require("discord.js")

module.exports = {
    name: "clear",
    description: "Effacer un nombre spécifique de messages",
    utilisation: "/clear <nombre de messages> <salon>",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "number",
            name: "nombre",
            description: "Le nombre de message à supprimer",
            required: true,
            autocomplete: false
        }, {
            type: "channel",
            name: "salon",
            description: "Le salon où effacer les messages",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args){

        let channel = args.getChannel("salon")
        if(!channel) channel = message.channel;
        if(channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) return message.reply("Pas de salon spécifié.")

        let number = args.getNumber("nombre")
        if(parseInt(number) <= 0 || parseInt(number) > 100) return message.reply("Veuillez entrer un nombre entre 0 et 100.")

        await message.deferReply()

        try{
            let messages = await channel.bulkDelete(parseInt(number))

            await message.followUp({content: `Vous avez supprimé(e) **${messages.size}** message(s) dans **${channel}**.`, ephemeral: true})
        }catch(err){
            let messages = [...(await channel.messages.fetch()).filter(msg => !msg.interaction && (Date.now() - msg.createdAt) <= 1209600000).values()]
            if(messages.length <= 0) return message.followUp("Vous n'avez pas pu supprimé de messages car ils datent de plus de 14 jours.")
            await channel.bulkDelete(messages)

            await message.followUp({content: `Vous avez pu supprimé(e) seulement **${messages.length}** message(s) dans **${channel}** car les anciens messages dataient de plus de 14 jours.`, ephemeral: true})
        }
    }
}