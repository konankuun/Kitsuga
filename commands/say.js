const Discord = require("discord.js")

module.exports = {
    name: "say",
    description: "Message de bot",
    utilisation: "/say <message>",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "string",
            name: "texte",
            description: "Texte",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args){
        
        let text = args.getString("texte")
        if(!text) return message.reply("Veuillez préciser un message")
        message.reply({content: "Le message a bien été envoyé.", ephemeral: true})
        await message.channel.send(text)


    }
}