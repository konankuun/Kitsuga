const Discord = require("discord.js")

module.exports = {
    name: "play",
    description: "Joue de la musique",
    utilisation: "/play <nom de la musique>",
    permission: "Aucune",
    dm: false,
    category: "Musique",
    options: [
        {
            type: "string",
            name: "musique",
            description: "Le nom de la musique à jouer",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args){

        let song = args.getString("musique")
        if(!message.member.voice.channel) return message.reply("Vous n'êtes pas connecté dans un salon vocal")
        if((await message.guild.members.fetchMe()).voice.channel && (await message.guild.members.fetchMe()).voice.channel.id !== message.member.voice.channel.id) return message.reply("Nous ne sommes pas dans les mêmes salons vocaux.")

        message.deferReply()

        const queue = await bot.player.createQueue(message.guild, {metadata: {message: message}})

        const track = await bot.player.search(song, {requestBy: message.user}).then(x => x.tracks[0])
        if(!track) return message.reply("Aucune musique trouvée.")

        if(!queue.connection) await queue.connect(message.member.voice.channel)
        await queue.play(track)
        message.followUp(`La musique ${track.title} a été ajoutée à la file d'attente avec succès !`)
    }
}