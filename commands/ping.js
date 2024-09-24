const Discord = require("discord.js")

module.exports = {

    name: "ping",
    description: "Affiche la latance",
    utilisation: "</ping>",
    permission: "Aucune",
    category: "Information",
    dm: true,
    autocomplete: true,

    async run(bot, message) {
        await message.reply(`Mon ping est de \`${bot.ws.ping}\``)
    }
}