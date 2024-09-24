const Discord = require("discord.js")

module.exports = {

    name: "react",
    description: "Réagir a un message",
    utilisation: "/react <commande>",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: true,
    category: "Modération",
    options: [
        {
            type: "string",
            name: "reaction",
            description: "La réaction à ajouter",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "message_id",
            description: "L'identifiant du message",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, interaction) {
        const reaction = interaction.options.getString('reaction');
        const messageId = interaction.options.getString('message_id');

        if (!reaction || !messageId) {
            return interaction.reply({ content: 'Veuillez fournir une réaction et un identifiant de message.', ephemeral: true });
        }

        const message = await interaction.channel.messages.fetch(messageId);

        if (!message) {
            return interaction.reply({ content: 'Le message avec l\'ID spécifié est introuvable.', ephemeral: true });
        }

        // Ajouter la réaction au message
        try {
            await message.react(reaction);
            interaction.reply({ content: `Réaction ${reaction} ajoutée au message avec l'ID ${messageId}.`, ephemeral: true });
        } catch (error) {
            interaction.reply({ content: `Impossible d'ajouter la réaction ${reaction}.`, ephemeral: true });
        }
    }
};