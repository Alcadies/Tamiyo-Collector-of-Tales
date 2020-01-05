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
var badWords = ["gay", "fag", "retard", "cuck", "slut", "autis", "discord.gg/", "discordapp.com/invite/", "nigg"];
var lowmessage = "";
var logChannel = "633429050089799687" /*"531433553225842700"*/;
var modRole = "407400920746426368" /*"606659573159428169"*/;
var muteRole = "280463986531631104" /*"586432252901195777"*/;
var guildID = "162586705524686848";
var leakRole = "638981519116861442";
var roleMessageID = "639173241679904771";
var roleChannelID = "407401913253101601";
var elkRole = "640599175326728203";
var logMessage = "";

bot.on("ready", async function() {
    logger.info("Connected")
    logger.info("Logged in as: ")
    logger.info(bot.user.username + " - (" + bot.user.id + ")")
    logMessage = await bot.channels.get(logChannel).fetchMessage("633472791982768158");
    var str = logMessage.content;
    while (str.includes("\n") && str.length > 2) {
        str = str.slice(str.indexOf("\n") + 1);
        var timeIn = 0;
        if (!str.includes("\n")) {
            timeIn = str.split(" ")[1];
        }
        else {
            timeIn = str.substring(str.indexOf(" ") + 1, str.indexOf("\n"));
        }
        var mutedID = await bot.fetchUser(str.split(" ")[0]);
        var mutedOne = await bot.guilds.get(guildID).fetchMember(mutedID);
        var d = new Date();
        var timer = 0;
        if (str.includes("\n")) { timer = parseInt(str.substring(str.indexOf(" ") + 1, str.indexOf("\n"))); }
        else { timer = parseInt(str.substring(str.indexOf(" "))); }
        timer -= d.getTime();
        if (mutedOne != null && str.indexOf(mutedID) == str.lastIndexOf(mutedID)) {
            if (timer <= 0) { unmute(mutedOne); }
            else {
                setTimeout(function () {
                    unmute(mutedOne);
                }, timer)
            }
        }
        else {
            var logs = logMessage.content;
            var newLog = logs.slice(0, logs.indexOf(str.split(" ")[0]) - 1) + logs.slice(logs.indexOf(str.split(" ")[0]) + str.split(" ")[0].length + 14);
            logMessage.edit(newLog);
        }
    }
    bot.channels.get(roleChannelID).fetchMessage(roleMessageID);
    bot.user.setActivity("Always Watching in Shadows Over Innistrad limited");
})

async function badWordsReporter(message, messageAuthor, isEdit) {
    if (message.channel.id == "407401913253101601") { return; }
    var badWordsLog = "";
    for (let i = 0; i < badWords.length; i++) {
        lowmessage = lowmessage.replace(/:gwomogay:/g, "");
        if (lowmessage.includes(badWords[i]) && !message.author.bot && message.guild != null && badWordsLog == "") {
            badWordsLog += messageAuthor.displayName;
            badWordsLog += " (id ";
            badWordsLog += messageAuthor.id;
            badWordsLog += ")";
            if (isEdit) { badWordsLog += await " edited a message to say"; }
            else { badWordsLog += await " said"; }
            badWordsLog += " the following here <";
            badWordsLog += message.url;
            badWordsLog += ">: ```";
            badWordsLog += message.cleanContent;
            badWordsLog += "```"
        }
    }
    if (badWordsLog != "") {await bot.channels.get(logChannel).send(badWordsLog);}
}

function mute(message, messageAuthor) {
    if (lowmessage.indexOf(",mute") == 0) {
        if (messageAuthor.roles.has(modRole)) {
            if (message.mentions.members.length != 0) {
                if (!isNaN(lowmessage.split(" ")[1])) {
                    setTimeout(function () {
                        unmute(message.mentions.members.first());
                    }, lowmessage.split(" ")[1] * 3600000)
                    if (logMessage.content.includes(message.mentions.members.first().id)) {
                        var logs = logMessage.content;
                        var newLog = logs.slice(0, logs.indexOf(message.mentions.members.first().id.toString()) - 1) + logs.slice(logs.indexOf(message.mentions.members.first().id.toString()) + message.mentions.members.first().id.toString().length + 14);
                        logMessage.edit(newLog);
                    }
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
    var newLog = logs.slice(0, logs.indexOf(member.user.id.toString()) - 1) + logs.slice(logs.indexOf(member.user.id.toString()) + member.user.id.toString().length + 14);
    logMessage.edit(newLog);
    if (member.deleted) {
        bot.channels.get(logChannel).send("Member " + member.user.username + " (id " + member.user.id + ") has left before scheduled unmute time.");
        return;
    }
    member.removeRole(member.guild.roles.get(muteRole));
    bot.channels.get(logChannel).send("Member " + member.displayName + " (id " + member.id + ") unmuted.");
}

function kick(message, messageAuthor) {
    if (lowmessage.indexOf(",kick") == 0) {
        if (messageAuthor.roles.has(modRole)) {
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

function ban(message, messageAuthor) {
    if (lowmessage.indexOf(",ban") == 0) {
        if (messageAuthor.roles.has(modRole)) {
            if (message.mentions.members.first().roles.has(modRole)) {
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

function role(message, messageAuthor) {
    if (lowmessage.indexOf(",role") == 0 || lowmessage.indexOf(",leak") == 0) {
        if (lowmessage.includes("leak")) {
            if (messageAuthor.roles.has(leakRole)) {
                messageAuthor.removeRole(message.guild.roles.get(leakRole));
                message.channel.send("Leaks role removed!")
            }
            else {
                messageAuthor.addRole(message.guild.roles.get(leakRole));
                message.channel.send("Leaks role added!")
            }
        }
    }
}

function links(message, messageAuthor) {
    if (lowmessage.indexOf(",unstable") == 0) { message.channel.send("Unstable FAQAWASLFAQPAFTIDAWABIAJTBT: https://magic.wizards.com/en/articles/archive/news/unstable-faqawaslfaqpaftidawabiajtbt-2017-12-06"); }
    if (lowmessage.indexOf(",unhinged") == 0) { message.channel.send("Unhinged FAQTIWDAWCC: http://www.wizards.com/default.asp?x=magic%2Ffaq%2Funhinged"); }
    if (lowmessage.indexOf(",unglued") == 0) { message.channel.send("Unglued QAS (archive): http://archive.is/20121210142816/www.vic.com/~dbd/NFd/faqs/Unglued.QAS"); }
    if (lowmessage.indexOf(",colorpie") == 0) { message.channel.send("Mechanical Color Pie 2017: https://magic.wizards.com/en/articles/archive/making-magic/mechanical-color-pie-2017-2017-06-05\nMajor changes since then:\nGreen is now secondary in haste and black is tertiary in it.\nBlack is secondary in flash.")}
}

bot.on("message", async function(message) {
    lowmessage = message.content.toLowerCase();

    if (message.guild == null || message.guild.id != guildID) {return;}

    var messageAuthor = await message.guild.fetchMember(message.author);

    await links(message, messageAuthor);

    await badWordsReporter(message, messageAuthor, false);

    await mute(message, messageAuthor);

    await kick(message, messageAuthor);

    await ban(message, messageAuthor);

    await role(message, messageAuthor);

    if (messageAuthor.roles.has(modRole) && message.content.indexOf(",unmute") == 0 && message.mentions.members.length != 0) {
        unmute(message.mentions.members.first());
    }
})

bot.on("messageUpdate", async function(oldMessage, newMessage) {
    lowmessage = newMessage.content.toLowerCase();
    var messageAuthor = await newMessage.guild.fetchMember(newMessage.author);
    await badWordsReporter(newMessage, messageAuthor, true);
})

bot.on("guildMemberAdd", function(member) {
    if (logMessage.content.includes(member.id + " ")) { member.addRole(member.guild.roles.get(muteRole)); } 
})

bot.on("guildMemberUpdate", function(oldMember, newMember) {
    if (newMember.roles.has(muteRole) && newMember.roles.has(leakRole)) { newMember.removeRole(leakRole); }
})

bot.on("messageReactionAdd", function(messageReaction, user) {
    if (messageReaction.message.id == roleMessageID) {
        messageReaction.message.channel.send("You have reacted to this with ```" + messageReaction.emoji.name + "```");
        if (messageReaction.emoji.name == "🙉") { messageReaction.message.channel.send("No evil shall be heard."); }
    }
})

bot.on("messageReactionRemove", function(messageReaction, user) {
    if (messageReaction.message.id == roleMessageID) {
        messageReaction.message.channel.send("You have un-reacted to this with ```" + messageReaction.emoji.name + "```");
        if (messageReaction.emoji.name == "🙉") { messageReaction.message.channel.send("No evil shall be heard."); }
    }
})

bot.login(process.env.token)
