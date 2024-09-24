const Discord = require("discord.js")

module.exports = {
    name: "ticket",
    description: "Envoie le panneau de ticket",
    utilisation: "/ticket",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    dm: false,
    category: "Administration",
    options: [],

    async run(bot, message, args){
        let Embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setTitle("Panneau de ticket")
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .setDescription("Créer un ticket")
        .setTimestamp()
        .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})

        const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        .setCustomId("ticket")
        .setLabel("Créer un ticket")
        .setStyle(Discord.ButtonStyle.Primary)
        .setEmoji("📩"))

        message.reply({content: "Le panneau des tickets à bien été envoyé.", ephemeral: true})
        await message.channel.send({embeds: [Embed], components: [btn]})
        
    }
}