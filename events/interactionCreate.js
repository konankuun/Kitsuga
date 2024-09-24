const Discord = require("discord.js")

module.exports = async(bot, interaction) =>{

    if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete){

        let entry = interaction.options.getFocused()

        if(interaction.commandName === "help"){

            let choices = bot.commands.filter(cmd => cmd.name.includes(entry))
            await interaction.respond(entry === "" ? bot.commands.map(cmd =>({name: cmd.name, value: cmd.name})) : choices.map(choice => ({name: choice.name, value: choice.name})))
        }

        if(interaction.commandName === "captcha" || interaction.commandName === "antiraid"){

            let choices = ["on", "off"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c =>({name: c, value: c})) : sortie.map(c => ({name: c, value: c})))
        }
    }

    if(interaction.type === Discord.InteractionType.ApplicationCommand){

        let command = require(`../commands/${interaction.commandName}`)
        command.run(bot, interaction, interaction.options, bot.db)
    }

    if(interaction.isButton()){
        if(interaction.customId === "ticket"){
            let channel = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                type: Discord.ChannelType.GuildText
            })
            await channel.setParent(interaction.channel.parent.id)

            await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                ViewChannel: false
            })

            await channel.permissionOverwrites.create(interaction.user, {
                ViewChannel: true,
                EmbedLinks: true,
                SendMessages: true,
                AttachFiles: true,
                ReadMessageHistory: true
            })

            await channel.setTopic(interaction.user.id)
            await interaction.reply({content: `Votre ticket a été créé : ${channel}`, ephemeral: true})

            let Embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle("Panneau de ticket")
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Ticket de ${interaction.user}`)
            .setTimestamp()
            .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})

            const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
            .setCustomId("close")
            .setLabel("Fermer le ticket")
            .setStyle(Discord.ButtonStyle.Danger)
            .setEmoji("🚩"))

            await channel.send({embeds: [Embed], components: [btn]})
            channel.send("Des modérateurs vont venir prendre en charge votre tickets. Le temps de votre attente, nous vous offrons ce cafée > ☕️")
        }
        if(interaction.customId === "close"){
            let user = bot.users.cache.get(interaction.channel.topic)
            try{await user.send(`Votre ticket à été fermé sur le serveur : ${interaction.guild.name}`)} catch(err){}

            await interaction.channel.delete()
        }
    }
}