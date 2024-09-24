
const Discord = require("discord.js")
const DBD = require("discord-dashboard")
const Theme = require('dbd-capriham-theme');
const loadDatabase = require("../loader/loadDatabase")
const loadSlashCommand = require("../loader/loadSlashCommand")
const config = require("../config/config.json")

module.exports = async bot =>{
    bot.db = await loadDatabase()
    bot.db.connect(function(err){
        if(err) console.log(err)
        console.log("Database connected !")
    })
    setInterval(()=>{
        bot.db.query(`SELECT * FROM anticrash WHERE anticrash = ? `, ["anticrash"], async (err, req) => {
            const channel = bot.channels.cache.get("1049080402834370560")
            channel.send(`**${req[0].nombre}ème __AntiCrash Effectué !__**`);
            bot.db.query(`UPDATE anticrash SET nombre = nombre +? WHERE anticrash = ?`, [1, "anticrash"])  
    })}, 3600000);

    await loadSlashCommand(bot)

    let allcomands = [];
    await bot.commands.forEach(command => allcomands.push({commandName: command.name, commandUsage: command.utilisation, commandDescription: command.description}))

    console.log(`${bot.user.tag} READY`)
    bot.user.setActivity("Kitsuga V.2 > /help")

    
    



    const activities = [
        { name: `la télévision`, type: 3 } 
    ];


    const status = [
        'online'
    ];
    let i = 0;


    setInterval(() => {
        if(i >= activities.length) i = 0
        bot.user.setActivity(activities[i])
        i++;
    }, 5000);
    
    let s = 0;
    setInterval(() => {
        if(s >= activities.length) s = 0
        bot.user.setStatus(status[s])
        s++;
    }, 30000);







    await DBD.useLicense(config.license)
    DBD.Dashboard = DBD.UpdatedClass()

    const Dashboard = new DBD.Dashboard({
        port: 8080,
        client: {
            id: bot.user.id,
            secret:  config.secret
        },
        redirectUri: "http://localhost:8080/discord/callback",
        domain: "http://localhost",
        useCategorySet: true,
        minimalizedConsoleLogs: true,
        acceptPrivacyPolicy: true,
        bot: bot,
        theme: Theme({
            websiteName: "Kitsuga",
            iconURL: "https://cdn.discordapp.com/attachments/809131957640364143/1048560784789229590/kitsuga_logo.png",
            index: {
                card: {
                    title: "Kitsuga, laissez l'air du Kitsune vous mener...",
                    description: "Ajoutez moi vous ne serez pas déçu !"
                },
                information: {
                    title: "Information du bot",
                    description: "Kitsuga est multifonction, modération, informations commande fun..."
                },
                feeds: {
                    title: "Feeds",
                    list: [
                        {
                            icon: "fa fa-user",
                            text: "Nouvel utilisateur connecté",
                            timeText: "Maintenant",
                            bg: "bg-light-info"
                            
                        },
                        {
                            icon: "fa fa-server",
                            text: "Liste des serveurs",
                            timeText: "Il y à 3 minutes",
                            bg: "bg-light-danger"
                        }
                    ]
                }
            },
            commands: {
                pageTitle: "Commandes de Kitsuga",
                table: {
                    title: "Intégralité des commandes",
                    subTitle: "Voici mes commandes !",
                    list: allcomands
                }
            }
        }),
        settings: [
            {
                categoryId: "admin",
                categoryName: "Administration",
                categoryDescription: "Gère le paramétrage d'administration",
                getActualSet: async =>({guild}) =>{
                    const antiraid = new Promise((resolve, reject) =>{
                        bot.db.query(`SELECT * FROM server WHERE guild = '${guild.id}'`, async(err, req) =>{
                            if(req[0].antiraid === "true") resolve(true)
                            else resolve(false)
                        })
                    })
                    return await [{optionId: "antiraid", data: antiraid}]
                },
                categoryOptionsList: [
                    {
                        optionId: "antiraid",
                        optionName: "Antiraid",
                        optionDescription: "Active ou désactive l'antiraid",
                        optionType: DBD.formTypes.switch(false)
                    }
                ]
            }
        ]
    })
    Dashboard.init()
}