const Discord = require("discord.js")
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    name: 'rec',
    description: 'Enregistrer les membres dans le salon vocal de l\'utilisateur',
    utilisation: '/rec',
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: 'Modération',

    async run(bot, message, args, db) {
        // Vérifie si l'auteur du message est dans un salon vocal
        if (!message.member.voice.channel) {
            return message.reply('Vous devez être dans un salon vocal pour utiliser cette commande.');
        }

        // Récupérez le salon vocal de l'auteur du message
        const voiceChannel = message.member.voice.channel;

        try {
            // Vérifie s'il y a déjà une connexion au salon vocal
            const connection = getVoiceConnection(voiceChannel.guild.id);
            if (connection) {
                return message.reply('Le bot est déjà connecté à un salon vocal.');
            }

            const voiceConnection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });

            message.reply(`Connecté au salon vocal ${voiceChannel.name}.`);

            // Enregistrez pendant 30 secondes
            setTimeout(() => {
                voiceConnection.destroy();
                message.reply('Enregistrement terminé. Déconnecté.');
            }, 30000);
        } catch (error) {
            console.error('Erreur lors de la connexion au salon vocal :', error);
            return message.reply('Une erreur s\'est produite lors de la connexion au salon vocal.');
        }
    }
};