const Discord = require("discord.js")

module.exports = {
    name: "userinfo",
    description: "Affiche le panneau d'informations utilisateur",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, interaction) {
        const member = interaction.options.getMember('membre');
        const user = member.user;

        const userInfoEmbed =  new Discord.EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Informations sur ${user.tag}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Nom d\'utilisateur', value: user.username, inline: true },
                { name: 'ID', value: `${user.id}`, inline: true },
                { name: 'Création du compte (timestamp)', value: `${Math.floor(user.createdTimestamp / 1000)}`, inline: true },
                { name: 'A rejoint le serveur (timestamp)', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true }
            );

        if (member.nickname) {
            userInfoEmbed.addFields('Surnom sur le serveur', member.nickname, true);
        }

        interaction.followUp({ embeds: [userInfoEmbed] });
    },
};