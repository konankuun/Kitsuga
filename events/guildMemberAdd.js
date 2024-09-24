const Discord = require("discord.js");


module.exports = async (bot, member) => {
    try{
        let db = bot.db;
        
        db.query(`SELECT * FROM server WHERE guild = '${member.guild.id}'`, async(err, req) =>{

            if(req.length < 1) return;

            if(req[0].antiraid === "true"){
            try{await member.user.send(`Vous ne pouvez pas rejoindre le serveur \`${member.guild.name}\` car l'antiraid est activé.`)} catch(err){}
            await member.kick("Antiraid activé")
            }
            if(req[0].captcha === "false") return;
            let channel = await member.guild.channels.cache.get(req[0].captcha)
            if(!channel) return console.log("Pas de channel")
            
            await channel.permissionOverwrites.create(member.user, {
                SendMessages: true,
                ViewChannel: true,
                ReadMessageHistory: true
            })

            let captcha = await bot.function.generateCaptcha()
            let msg = await channel.send({
                content: `${member}, vous avez 2 minutes pour compléter le captcha, si vous échouez, vous serez expulser du serveur.`,
                files: [new  Discord.AttachmentBuilder((await captcha.canvas).toBuffer(), {name: "captcha.png"})]
            })
            
            try{
                let filter = m => m.author.id === member.user.id;
                let response = (await channel.awaitMessages({filter, max: 1, time: 120000, errors: ["time"]})).first()

                if(response.content === captcha.text){

                    await msg.delete()
                    await response.delete()
                    try{await member.user.send(`Vous avez réussi le captcha, bienvenue sur ${member.guild.name}`)}catch(err){}
                    await channel.permissionOverwrites.delete(member.user.id)
                    if(!req[0].role) return;
                    const role = member.guild.roles.cache.get(req[0].role)
                    if(!role) return;
                    await member.guild.members.addRole({user: member.user, role: role, reason: "Rôle du captcha"})


                }else{
                    
                    await msg.delete()
                    await response.delete()
                    try{await member.user.send(`Capctha non résussi, vous avez donc été expulsé du serveur.`)}catch(err){}
                    await channel.permissionOverwrites.delete(member.user.id)
                    await member.kick("Captcha non réussi")
                }
                
            } catch(err){

                await msg.delete()
                try{await member.user.send("Vous avez dépassé le temps impartit pour remplir le captcha.")} catch(err){}
                await channel.permissionOverwrites.delete(member.user.id)
                await member.kick("Captcha non complété")
            }
        })
    }catch(err){console.log(err)}
}