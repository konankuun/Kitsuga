const Discord = require("discord.js")

module.exports = {

    name: "help",
    description: "Afficher le panneau des commandes",
    utilisation: "/help <commande>",
    permission: "Aucune",
    dm: true,
    category: "Information",
    options: [
      {
        type: "string",
        name: "commande",
        description: "Commande à afficher",
        required: false,
        autocomplete: true
      }
    ],

    async run(bot, message, args) {
      let command;
      if(args.getString("commande")){
        command = bot.commands.get(args.getString("commande"));
        if(!command) return message.reply("Cette commande n'existe pas.")
      }
      if(!command){
        let categories = [];
        bot.commands.forEach(command =>{
          if(!categories.includes(command.category)) categories.push(command.category)
        })

        let Embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setTitle(`Mes commandes`)
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .setDescription(`Commandes disponibles : \`${bot.commands.size}\` \nCatégories disponibles : \`${categories.length}\``)
        .setTimestamp()
        .setFooter({text: "Commandes de Kitsuga"})

        await categories.sort().forEach(async cat =>{
          let commands = bot.commands.filter(cmd => cmd.category === cat)
          Embed.addFields({name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}`})
        })

        await message.reply({embeds: [Embed]})
      }else{
        let Embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setTitle(`Commande ${command.name}`)
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .setDescription(`Nom : \`${command.name}\`\nDescription : ${command.description}\nPermission requise : ${typeof command.permission !== "bigint" ? command.permission : new Discord.PermissionsBitField(command.permission).toArray(false)}\nCommande executable en message privé : ${command.dm ? "Oui" : "Non"}\nCatégorie : ${command.category}`)
        .setTimestamp()
        .setFooter({text: "Commandes de Kitsuga"})

        await message.reply({embeds: [Embed]})
      }
    }
}