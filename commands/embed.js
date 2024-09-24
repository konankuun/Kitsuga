const Discord = require("discord.js")

module.exports = {
    name: "embed",
    description: "Envoie un embed",
    utilisation: "",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    dm: false,
    autocomplete: false,
category: "Administration",
    options: [
        {
            type: "string",
            name: "titre",
            description: "Titre de l'embed",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "description",
            description: "Description de l'embed",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "footer",
            description: "Auteur de l'embed",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args){

        let title = args.getString("titre")
        let desc = args.getString("description")
        let foot = args.getString("footer")
        let url = args.getString("thumbnail")
        if(!title) return message.reply("Pas de titre spécifié.")
        if(!desc) return message.reply("Pas de description spécifié.")

        let Embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setTitle(title)
        .setDescription(desc)
        .setTimestamp()
        .setFooter({text: `${foot}`})

        await message.channel.send({embeds: [Embed]})

        message.reply({content: "Le message embed a bien été envoyé.", ephemeral: true})
    }
}