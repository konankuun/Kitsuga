const Discord = require("discord.js")

module.exports = {
    name: "warn",
    description: "Avertir un membre",
    utilisation: "/warn <membre> <raison>",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à avertir",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison de l'avertissement",
            required: false,
            autocomplete: false
        }
    ],


async run(bot, message, args, db){

    let user = args.getUser("membre")
    if(!user) return message.reply("Pas de membre spécifié.")
    
    let member = message.guild.members.cache.get(user.id)
    if(!member) return message.reply("Le membre n'existe pas")

    let reason = args.getString("raison")
    if(!reason) reason = "Pas de raison fournie.";

    if(message.user.id === user.id) return message.reply("Vous ne pouvez pas vous avertir.")
    if((await message.guild.fetchOwner()).id === user.id) return message.reply("Vous ne pouvez pas avertir le propriétaire.")
    if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Impossible d'avertir un utilisateur au même niveau que vous")
    if((await message.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Je ne peux pas avertir ce membre")

    try{await user.send(`${message.user} vous à averti sur le serveur ${message.guild.name} pour la raison : "${reason}"`)} catch(err){}

    await message.reply(`Vous avez averti ${user.tag} pour la raison : "${reason}"`)

    let ID = await bot.function.createID("WARN")

    db.query(`INSERT INTO warns (guild, user, author, warn, reason, date) VALUES('${message.guild.id}', '${user.id}', '${message.user.id}', '${ID}', '${reason.replace(/'/g, "\\'")}', '${Date.now()}')`)
    }
}



