const Discord = require("discord.js")

module.exports = {
    name: "support",
    description: "Envoie mon support",
    utilisation: "/support",
    permission: "Aucune",
    dm: true,
    autocomplete: true,
    category: "Information",
    options: [],

    async run(bot, message, args){

        let Embed = new Discord.EmbedBuilder()
        .setTitle("Mon serveur de support")
        .setColor(bot.color)
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .setDescription("Si vous avez des questions ou des demandes, allez voir sur mon serveur de support !")
        .setTimestamp()
        .setURL("https://discord.gg/CYXpfkPHPp")



        try{
            await message.user.send({embeds: [Embed]})
            await message.reply("Message de support envoyé en messages privés !")
        }catch(err){
            await message.reply({embeds: [Embed]})
        }


    }
}
