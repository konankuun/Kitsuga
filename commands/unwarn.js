const Discord = require("discord.js")

module.exports = {
    name: "unwarn",
    description: "Retirer un avertissemet",
    utilisation: "/unwarn <membre> <ID Warn>",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à retirer l'avertissement",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "warn_id",
            description: "L'identifiant du warn",
            required: true,
            autocomplete: false
        }
    ],


    async run(bot, message, args, db) {
        let user = args.getUser("membre");
        if (!user) return message.reply("Pas de membre spécifié.");

        let member = message.guild.members.cache.get(user.id);
        if (!member) return message.reply("Le membre n'existe pas");

        let warnID = args.getString("warn_id");
        if (!warnID) return message.reply("Pas d'ID d'avertissement spécifié.");

        try {
            // Supprime l'avertissement avec l'ID spécifié de votre base de données
            await db.query("DELETE FROM warns WHERE warn = ?", [warnID]);
            
            await message.reply(`Avertissement avec l'ID ${warnID} retiré pour ${user.tag}.`);
        } catch (error) {
            console.error("Erreur lors de la suppression de l'avertissement :", error);
            return message.reply("Une erreur s'est produite lors de la suppression de l'avertissement.");
        }
    }
}



