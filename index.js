const Discord = require("discord.js");
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({intents});
const loadCommand = require("./loader/loadCommands");
const loadEvents = require("./loader/loadEvent");
const config = require("./config/config.json");

bot.commands = new Discord.Collection();
bot.color = "#9e0909";
bot.function = {
    creatId: require("./functions/createID")
}

bot.login(config.token)
loadCommand(bot)
loadEvents(bot)