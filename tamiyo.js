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
    watchingMessage();
})

function playingMessage() {
    let formatNum = Math.floor(Math.random() * 9)
    let duration = Math.floor(Math.random() * 1080000)
    switch (formatNum) {
        case 0: format = "Shadows Over Innistrad limited"; break;
        case 1: format = "Eldritch Moon limited"; break;
        case 2: format = "Pioneer"; break;
        case 3: format = "Modern"; break;
        case 4: format = "Legacy"; break;
        case 5: format = "Vintage"; break;
        case 6: format = "Cube"; break;
        case 7: format = "Commander"; break;
        case 8: format = "Canadian Highlander"; break;
    }
    bot.user.setActivity("Always Watching in " + format);
    setTimeout(function() {
        watchingMessage();
    }, duration)
}

function watchingMessage() {
    let watchingType = Math.floor(Math.random() * 44)
    let duration = Math.floor(Math.random() * 600000)
    switch (watchingType) {
        case 0: observing = "Everything"; break;
        case 1: observing = "Innistrad"; break;
        case 2: observing = "Ravnica"; break;
        case 3: observing = "Dominaria"; break;
        case 4: observing = "Mirrodin"; break;
        case 5: observing = "Kamigawa"; break;
        case 6: observing = "Ixalan"; break;
        case 7: observing = "Alara"; break;
        case 8: observing = "Lorwyn"; break;
        case 9: observing = "Zendikar"; break;
        case 10: observing = "Mercadia"; break;
        case 11: observing = "Rath"; break;
        case 12: observing = "Theros"; break;
        case 13: observing = "Ikoria"; break;
        case 14: observing = "Kaladesh"; break;
        case 15: observing = "Regatha"; break;
        case 16: observing = "Bant"; break;
        case 17: observing = "Naya"; break;
        case 18: observing = "Esper"; break;
        case 19: observing = "Jund"; break;
        case 20: observing = "Grixis"; break;
        case 21: observing = "Equilor"; break;
        case 22: observing = "Shandalar"; break;
        case 23: observing = "Eldraine"; break;
        case 24: observing = "Amonkhet"; break;
        case 25: observing = "Magic & Chill"; break;
        case 26: observing = "You"; break;
        case 27: observing = "The Multiverse"; break;
        case 28: observing = "a Magic: the Gathering tournament"; break;
        case 29: observing = "Vryn"; break;
        case 30: observing = "Phyrexia"; break;
        case 31: observing = "New Phyrexia"; break;
        case 32: observing = "Rabiah"; break;
        case 33: observing = "Segovia"; break;
        case 34: observing = "Serra's Realm"; break;
        case 35: observing = "Ulgrotha"; break;
        case 36: observing = "Meditation Plane"; break;
        case 37: observing = "Shadowmoor"; break;
        case 38: observing = "Fiora"; break;
        case 39: observing = "Kaldheim"; break;
        case 40: observing = "Kylem"; break;
        case 41: observing = "Bablovia"; break;
        case 42: observing = "Skalla"; break;
        case 43: playingMessage(); return;
    }
    bot.user.setActivity(observing, { type: 'WATCHING'});
    setTimeout(function() {
        watchingMessage();
    }, duration)
}

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

async function mute(message, messageAuthor) {
    if (lowmessage.indexOf(",mute") == 0) {
        if (messageAuthor.roles.has(modRole)) {
            if (message.mentions.users.size != 0) {
                message.mentions.users.forEach(function(value, key) {
                    var muteMember = message.guild.fetchMember(value)
                    if (!isNaN(lowmessage.split(" ")[1])) {
                        setTimeout(function () {
                            unmute(muteMember);
                        }, lowmessage.split(" ")[1] * 3600000)
                        if (logMessage.content.includes(key)) {
                            var logs = logMessage.content;
                            var newLog = logs.slice(0, logs.indexOf(key) - 1) + logs.slice(logs.indexOf(key) + key.length + 14);
                            logMessage.edit(newLog);
                        }
                        d = new Date();
                        unmuteTime = lowmessage.split(" ")[1] * 3600000 + d.getTime();
                        logMessage.edit(logMessage.content + "\n" + key + " " + unmuteTime);
                    }
                    value.addRole(message.guild.roles.get(muteRole));
                    message.channel.send("Member " + value.displayName + " (id " + key + ") muted for " + lowmessage.split(" ")[1] + " hours.");
                    var muteMessage = "You have been muted for " + lowmessage.split(" ")[1] + " hours";
                    if (message.content.includes("Reason: ")) { muteMessage += " with reason \"" + message.content.split("Reason: ")[1] + "\""; }
                    else if (message.content.includes("reason: ")) { muteMessage += " with reason \"" + message.content.split("reason: ")[1] + "\""; }
                    else if (message.content.includes("REASON: ")) { muteMessage += " with reason \"" + message.content.split("REASON: ")[1] + "\""; }
                    else { muteMessage += "."; }
                    value.send(muteMessage);
                })
            }
            else { message.channel.send("Please include a mention for the person you would like to mute."); }
        }
        else { message.channel.send("You must be a mod or admin to use this function.")}
    }
}

function unmute(member) {
    var logs = logMessage.content;
    var newLog = logs.slice(0, logs.indexOf(member.user.id.toString())) + logs.slice(logs.indexOf(member.user.id.toString()) + member.user.id.toString().length + 14);
    logMessage.edit(newLog);
    if (member.deleted) {
        bot.channels.get(logChannel).send("Member " + member.user.username + " (id " + member.user.id + ") has left before scheduled unmute time.");
        return;
    }
    member.removeRole(member.guild.roles.get(muteRole));
    bot.channels.get(logChannel).send("Member " + member.displayName + " (id " + member.id + ") unmuted.");
}

function manualReset(messageAuthor) {
    if (lowmessage.indexOf(",resetLog") == 0 && (messageAuthor.id == "135999597947387904" || messageAuthor.roles.has(modRole))) {
        logMessage.edit("Muted members and unmute times:");
    }
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

function raidBan(message, messageAuthor) {
    if (messageAuthor.roles.size == 1 && message.mentions.users.size > 20) {
        messageAuthor.ban({
            days: 1,
            reason: "Mention spam"
        });
        bot.channels.get(logChannel).send(messageAuthor.displayName + " (id " + messageAuthor.id + ") banned for spamming mentions.  Message: ```" + message.cleanContent + "```");
    }
}

async function dmReporter(message) {
    var messageMember = await bot.guilds.get(guildID).fetchMember(message.author);
    if (messageMember.roles.has(muteRole)) {
        bot.channels.get(logChannel).send("Muted member " + messageMember.displayName + " (id " + messageMember.id + ") said this in DM: ```" + message.cleanContent + "```");
    }
}

async function deleteReporter(message) {
    if (message.guild === null) {return;}
    if (!message.guild.available) {return;}
    if (message.guild.id != guildID) {return;}
    if (message.author.bot) {return;}
    if (message.content.includes("[[") || message.content.includes("]]") || message.content.toLowerCase().includes("!card")) {return;}
    var channelToNotify = logChannel;
    if (message.channel.id == logChannel && message.author.id == "657605267709493265") {
        await message.channel.send("One of my logs was deleted from here.");
        return;
    }
    const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
    let user = ""
    if (entry.extra.channel.id === message.channel.id
      && (entry.target.id === message.author.id)
      && (entry.createdTimestamp > (Date.now() - 5000))
      && (entry.extra.count >= 1)) {
        user = entry.executor.username;
    } else {
        user = message.author.username;
    }
    var deleteLog = ""
    if (message.cleanContent != "") {
        deleteLog += "The following";
    } else {
        deleteLog += "A textless";
    }
    deleteLog += " message by ";
    deleteLog += message.author.username;
    deleteLog += " (id ";
    deleteLog += message.author.id;
    deleteLog += ")";
    var attachmessage = "";
    var attaches = message.attachments.array();
    var attachnames = "";
    for (i = 0; i < attaches.length; i++) {
        if (i == attaches.length -1 && i != 0) {attachnames += "and ";}
        attachnames += attaches[i].proxyURL
        if (i != attaches.length -1 && attaches.length != 2) {attachnames += ", ";}
        if (i != attaches.length -1 && attaches.length == 2) {attachnames += " ";}
    }
    if (attaches.length > 1) {attachmessage = " with attachments " + attachnames;}
    if (attaches.length == 1) {attachmessage = " with an attachment " + attachnames;}
    deleteLog += attachmessage;
    deleteLog += " was deleted from <#";
    deleteLog += message.channel.id;
    deleteLog += "> by ";
    deleteLog += user;
    if (message.cleanContent != "") {
        deleteLog += ": ```";
        deleteLog += message.cleanContent.replace(/```/g, "​`​`​`​");
        deleteLog += "```";
    }
    bot.channels.get(channelToNotify).send(deleteLog);
}

bot.on("message", async function(message) {
    lowmessage = message.content.toLowerCase();

    if (message.guild == null) {
        await dmReporter(message);

        return;
    }

    if (message.guild.id != guildID) {return;}

    var messageAuthor = await message.guild.fetchMember(message.author);

    await links(message, messageAuthor);

    await badWordsReporter(message, messageAuthor, false);

    await mute(message, messageAuthor);

    await kick(message, messageAuthor);

    await ban(message, messageAuthor);

    await role(message, messageAuthor);

    await raidBan(message, messageAuthor);

    await manualReset(messageAuthor);

    if (messageAuthor.roles.has(modRole) && message.content.indexOf(",unmute") == 0 && message.mentions.members.length != 0) {
        await unmute(message.mentions.members.first());
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

/*bot.on("guildMemberUpdate", function(oldMember, newMember) {
    if (newMember.roles.has(muteRole) && newMember.roles.has(leakRole)) { newMember.removeRole(leakRole); }
})*/

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

bot.on("messageDelete", async function(message) {
    deleteReporter(message);
})

bot.on("messageDeleteBulk", async function(messages) {
    messages.forEach(async function(value, key) {
        await deleteReporter(value);
    });
})

bot.login(process.env.token)
