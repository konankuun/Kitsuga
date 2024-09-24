const Discord = require("discord.js")

module.exports = {
    name: "ban",
    description: "Bannir un membre",
    utilisation: "/ban <membre> <raison>",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à bannir",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du banissement",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args){
        try{

            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply("Aucun membre à bannir.")
            let member = message.guild.members.cache.get(user.id)

            let reason = args.getString("raison").value;
            if(!reason) reason = "Aucune raison fournie."

            if(message.user.id === user.id) return message.reply("Vous ne pouvez pas vous bannir.")
            if((await message.guild.fetchOwner()).id === user.id) return message.reply("Vous ne pouvez pas bannir le propriétaire.")
            if(member && !member.bannable) return message.reply("Je ne peux pas bannir ce membre.")
            if(member &&  message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Impossible de bannir un membre au même niveau que vous")
            if ((await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre est déjà banni.")

            try{await user.send(`Vous avez été banni(e) du serveur ${message.guild.name} par ${message.user.tag}, pour la raison : "\`${reason}\`"`)}catch(err){}

            await message.reply(`${message.user} a banni **${user.tag}** pour la raison : "**\`${reason}\`**"`)

            await message.guild.bans.create(user.id, {reason: reason})

        }catch (err){
            return message.channel.send("Aucun membre à bannir")
        }
    }
}