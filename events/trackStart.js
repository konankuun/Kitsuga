module.exports = async (bot, queue, track) => {
    queue.metadata.message.channel.send(`La musique ${track.title} est lancée !`)

}