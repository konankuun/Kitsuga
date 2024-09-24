const Discord = require("discord.js");

module.exports = {
    name: "skip",
    description: "Passe à la musique suivante",
    utilisation: "/skip",
    permission: "Aucune",
    dm: false,
    category: "Musique",
    options: [],

    async run(bot, message, args) {
        const queue = await bot.player.createQueue(message.guild, { metadata: { message: message } });

        if (!queue || !queue.playing) {
            return message.reply("Je ne joue pas de musique en ce moment.");
        }

        const connection = queue.connection;

        queue.skip();
        message.reply("La musique actuelle a été passée et la suivante a été lancée.");

        if (!queue.tracks.length) {connection.channel.leave();}
    }
}