const Discord = require("discord.js")

module.exports = {
    name: "captcha",
    description: "Charger un captcha",
    utilisation: "/captcha on - off <rôle à donner> <salon du captcha>",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    dm: false,
    category: "Administration",
    options: [
        {
            type: "string",
            name: "état",
            description: "Etat du captcha (on / off)",
            required: true,
            autocomplete: true
        },{
            type: "role",
            name: "role",
            description: "Rôle du captcha",
            required: false,
            autocomplete: false
        }, {
            type: "channel",
            name: "salon",
            description: "Salon du captcha",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db){

        let etat = args.getString("état")
        if(etat !== "on" && etat !== "off") return message.reply("Etat non valide, veuillez spécifié /captcha on ou /captcha off.")

        

        if(etat === "off"){
            db.query(`UPDATE server SET captcha = 'false' WHERE guild = '${message.guildId}'`)
            await message.reply("Le captcha à été désactivé.")
        }else{
            let role = args.getRole("role")
            if(!role) return message.reply("Role non spécifié.")
            if(!message.guild.roles.cache.get(role.id)) return message.reply("Aucun rôle trouvé dans le serveur.")

            let channel = args.getChannel("salon")
            if(!channel){
                channel = message.channel
            }
            if(!channel) return message.reply("Veuillez indiquer le salon du captcha")
            
            channel = message.guild.channels.cache.get(channel.id)
            if(!channel) return message.reply("Aucun salon trouvé.")

            db.query(`UPDATE server SET captcha = '${channel.id}' WHERE guild = '${message.guildId}'`)
            db.query(`UPDATE server SET role = '${role.id}' WHERE guild = '${message.guildId}'`)
            await message.reply(`Le captcha à été activé sur le salon ${channel} avec comme rôle ${role}.`)
        }
    }
}