const Discord = require("discord.js")

module.exports = {
    name: "stop",
    description: "Arrête la musique jouée",
    utilisation: "/stop",
    permission: "Aucune",
    dm: false,
    category: "Musique",
    options: [],

    async run(bot, message, args){

        const queue = await bot.player.createQueue(message.guild, {metadata: {message: message}})
        if(!queue.connection || !queue.playing) return message.reply("Je ne joue pas de musique en ce moment.")

        queue.destroy()
        message.reply("La musique a bien été arrêtée.")
    }
}