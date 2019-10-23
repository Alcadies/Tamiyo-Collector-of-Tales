const Discord = require("discord.js")
const logger = require("winston")
const fs = require("fs")
const ss = require("string-similarity");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
})
logger.level = "debug"
// Initialize Discord Bot
var bot = new Discord.Client({ disableEveryone: true })
var badWords = ["gay", "fag", "retard", "cuck", "slut", "autis", "discord.gg/", "discordapp.com/invite/"];
var lowmessage = "";
var logChannel = "633429050089799687" /*"531433553225842700"*/;
var modRole = "407400920746426368" /*"606659573159428169"*/;
var muteRole = "280463986531631104" /*"586432252901195777"*/;
var guildID = "162586705524686848"
var logMessage = "";

bot.on("ready", async function() {
    logger.info("Connected")
    logger.info("Logged in as: ")
    logger.info(bot.user.username + " - (" + bot.user.id + ")")
    logMessage = await bot.channels.get(logChannel).fetchMessage("633472791982768158");
    var str = logMessage.content;
    while (str.includes("\n")) {
        str = str.slice(str.indexOf("\n"));
        var mutedOne = await bot.guilds.get(guildID).member(str.split(" ")[0])
        var d = new Date();
        var timer = 0;
        if (str.includes("\n")) { timer = str.substring(str.indexOf(" ") + 1, str.indexOf("\n")).parseInt(); }
        else { timer = str.substring(str.indexOf(" ")).parseInt(); }
        timer -= d.getTime();
        if (mutedOne != null) {
            if (timer <= 0) { unmute(mutedOne); }
            else {
                setTimeout(function () {
                    unmute(mutedOne);
                }, timer)
            }
        }
        else {
            var logs = logMessage.content;
            var newLog = logs.slice(0, logs.indexOf(str.split(" ")[0]) - 2) + logs.slice(logs.indexOf(str.split(" ")[0]) + str.split(" ")[0].length + 14);
            logMessage.edit(newLog);
        }
    }
})

function badWordsReporter(message, isEdit) {
    var badWordsLog = "";
    for (let i = 0; i < badWords.length; i++) {
        lowmessage = lowmessage.replace(/:gwomogay:/g, "");
        if (lowmessage.includes(badWords[i]) && !message.author.bot && message.guild != null && badWordsLog == "") {
            badWordsLog += message.member.displayName;
            badWordsLog += " (id ";
            badWordsLog += message.member.id;
            badWordsLog += ")";
            if (isEdit) { badWordsLog += " edited a message to say"; }
            else { badWordsLog += " said"; }
            badWordsLog += " the following here <";
            badWordsLog += message.url;
            badWordsLog += ">: ```";
            badWordsLog += message.cleanContent;
            badWordsLog += "```"
        }
    }
    if (badWordsLog != "") {bot.channels.get(logChannel).send(badWordsLog);}
}

function mute(message) {
    if (lowmessage.indexOf(",mute") == 0) {
        if (message.member.roles.has(modRole)) {
            if (message.mentions.members.length != 0) {
                if (!isNaN(lowmessage.split(" ")[1])) {
                    setTimeout(function () {
                        unmute(message.mentions.members.first());
                    }, lowmessage.split(" ")[1] * 3600000)
                    d = new Date();
                    unmuteTime = lowmessage.split(" ")[1] * 3600000 + d.getTime();
                    logMessage.edit(logMessage.content + "\n" + message.mentions.members.first().id + " " + unmuteTime);
                }
                message.mentions.members.first().addRole(message.guild.roles.get(muteRole));
                message.channel.send("Member " + message.mentions.members.first().displayName + " (id " + message.mentions.members.first().id + ") muted for " + lowmessage.split(" ")[1] + " hours.");
            }
            else { message.channel.send("Please include a mention for the person you would like to mute."); }
        }
        else { message.channel.send("You must be a mod or admin to use this function.")}
    }
}

function unmute(member) {
    var logs = logMessage.content;
    var newLog = logs.slice(0, logs.indexOf(member.user.id.toString()) - 2) + logs.slice(logs.indexOf(member.user.id.toString()) + member.user.id.toString().length + 14);
    logMessage.edit(newLog);
    if (member.deleted) {
        bot.channels.get(logChannel).send("Member " + member.user.username + " (id " + member.user.id + ") has left before scheduled unban time.");
        return;
    }
    member.removeRole(message.guild.roles.get(muteRole));
    bot.channels.get(logChannel).send("Member " + member.displayName + " (id " + member.id + ") unmuted.");
}

function kick(message) {
    if (lowmessage.indexOf(",kick") == 0) {
        if (message.member.roles.has(modRole)) {
            if (message.mentions.members.first().roles.has(modRole)) {
                message.channel.send("I'm sorry, I won't kick another mod or admin.")
            }
            else {
                if (!message.mentions.members.first().kickable) { return; }
                if (message.mentions.members.length != 0) {
                    message.mentions.members.first().kick(message.content.split("> ")[1]);
                    message.channel.send("Member " + message.mentions.members.first().displayName + " (id " + message.mentions.members.first().id + ") kicked.");
                }
                else { message.channel.send("Please include a mention for the person you would like to kick."); }
            }
        }
        else { message.channel.send("You must be a mod or admin to use this function.")}
    }
}

function ban(message) {
    if (lowmessage.indexOf(",ban") == 0) {
        if (message.member.roles.has(modRole)) {
            if (message.mentions.members.first().has(modRole)) {
                message.channel.send("I'm sorry, I won't ban another mod or admin.")
            }
            else {
                if (!message.mentions.members.first().bannable) { return; }
                if (message.mentions.members.length != 0) {
                    message.mentions.members.first().ban(message.content.split("> ")[1]);
                    message.channel.send("Member " + message.mentions.members.first().displayName + " (id " + message.mentions.members.first().id + ") banned.");
                }
                else { message.channel.send("Please include a mention for the person you would like to ban."); }
            }
        }
        else { message.channel.send("You must be a mod or admin to use this function.")}
    }
}

bot.on("message", function(message) {
    lowmessage = message.content.toLowerCase();
    badWordsReporter(message, false);

    mute(message);

    kick(message);

    ban(message);

    //if (lowmessage == ",initialize" && message.author.id == "135999597947387904") { bot.channels.get(logChannel).send("Muted members and unmute times:"); }
})

bot.on("messageUpdate", function(oldMessage, newMessage) {
    badWordsReporter(newMessage, true);
})

bot.on("guildMemberAdd", function(member) {
    if (logMessage.content.includes(member.id + " ")) { member.addRole(member.guild.roles.get(muteRole)); } 
})

bot.login(process.env.token)