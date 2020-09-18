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
var badWords = ["gay", "fag", "retard", "cuck", "slut", "autis", "discord.gg/", "discordapp.com/invite/", "nigg", "💣"];
var badCards = ["Invoke Prejudice", "Cleanse", "Stone-Throwing Devils", "Pradesh Gypsies", "Jihad", "Imprison", "Crusade"];
var lowmessage = "";
var logChannel = ["531433553225842700", "633429050089799687", "729753384407662602"];
var botCommandChannel = ["531433553225842700", "213126280323923970"];
var modRole = "407400920746426368" /*"606659573159428169"*/;
var muteRole = "280463986531631104" /*"586432252901195777"*/;
var guildID = ["531433553225842698", "162586705524686848", "729748959991562330"]; //Testing, M&C, LGS
var leakRole = "638981519116861442";
var seriousRole = "720433065893036113";
var roleMessageID = "639173241679904771";
var roleChannelID = "407401913253101601";
var elkRole = "640599175326728203";
var modChannel = "407401913253101601";
var logMessage = "";
var deleteList = "";
var reportList = "";
var setCodes = "";
var spoilerSets = "";
var reprintList = "";

bot.on("ready", async function() {
    logger.info("Connected")
    logger.info("Logged in as: ")
    logger.info(bot.user.username + " - (" + bot.user.id + ")")
    bot.channels.get("531433553225842700").send("I know I noted this somewhere...");
})

bot.once("ready", async function() {
    logMessage = await bot.channels.get(logChannel[1]).fetchMessage("633472791982768158");
    //await logMessage.edit(logMessage.content.replace(/\n\n/g, "\n").replace(/\r\n\r\n/g, "\r\n").replace(/\r\r/g, "\r").replace(/\n\r\n\r/g, "\n\r"));
    var str = await logMessage.content;
    while (str.includes("\n") && str.length > 2) {
        str = str.slice(str.indexOf("\n") + 1);
        var timeIn = 0;
        if (!str.includes("\n")) {
            timeIn = str.split(" ")[1];
        }
        else {
            timeIn = str.substring(str.indexOf(" ") + 1, str.indexOf("\n"));
        }
        var mutedID = str.split(" ")[0];
        var d = new Date();
        var timer = 0;
        if (str.includes("\n")) { timer = parseInt(str.substring(str.indexOf(" ") + 1, str.indexOf("\n"))); }
        else { timer = parseInt(str.substring(str.indexOf(" "))); }
        timer -= d.getTime();
        if (timer <= 0) { unmute(mutedID); }
        else {
            setTimeout(function () {
                unmute(mutedID);
            }, timer)
        }
    }
    /*else {
        var logs = logMessage.content;
        var newLog = logs.slice(0, logs.indexOf(str.split(" ")[0]) - 1) + logs.slice(logs.indexOf(str.split(" ")[0]) + str.split(" ")[0].length + 14);
        logMessage.edit(newLog);
    }*/
    deleteList = await bot.channels.get(logChannel[2]).fetchMessage("729754971947663381");
    reportList = await bot.channels.get(logChannel[2]).fetchMessage("729755004054798379");
    setCodes = await bot.channels.get(logChannel[0]).fetchMessage("751124446701682708");
    spoilerSets = await bot.channels.get("407401913253101601").fetchMessage("639173870472921118");
    reprintList = await bot.channels.get(logChannel[0]).fetchMessage("756507174200541255");
    bot.channels.get(roleChannelID).fetchMessage(roleMessageID);
    watchingMessage();
    bot.channels.get("531433553225842700").send("I have arrived to observe this plane.");
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

async function badWordsReporter(message, messageMember, isEdit) {
    if (message.channel.id == modChannel || (message.guild != null && message.guild.id != guildID[1])) { return; }
    var badWordsLog = "";
    lowmessage = lowmessage.replace(/:gwomogay:/g, "").replace(/https:\/\/deckstats.net\/decks\/143801\/1486600-bad-lightsworns?share_key=0skv3mlfagytghja/g, "").replace(":heart_eyes_gay", "");
    var reporting = false;
    for (let i = 0; i < badWords.length; i++) {
        if (lowmessage.indexOf(badWords[i]) != -1) {
            reporting = true;
            break;
        }
    }
    if (reporting) {
        badWordsLog += messageMember.displayName;
        badWordsLog += " (id ";
        badWordsLog += messageMember.id;
        badWordsLog += ")";
        if (isEdit) { badWordsLog += await " edited a message to say"; }
        else { badWordsLog += await " said"; }
        badWordsLog += " the following here <";
        badWordsLog += message.url;
        badWordsLog += ">: ```";
        badWordsLog += message.cleanContent;
        badWordsLog += "```"
        badWordsLog = new Discord.RichEmbed().setAuthor(messageMember.displayName + " (" + messageMember.id + ")", messageMember.user.displayAvatarURL).setTitle("Questionable Content:").addField(messageMember.displayName + " (" + message.author.id + ")", message.channel + ": " + message.content).addField("Context:", message.url).setColor('RED');
    }
    if (badWordsLog != "") {await bot.channels.get(logChannel[1]).send(badWordsLog);}
}

async function mute(message, isMod) {
    if (lowmessage.indexOf(",mute") == 0) {
        if (isMod) {
            if (message.mentions.users.size != 0) {
                var muteHours = lowmessage.split(" ")[1];
                var shift = 0;
                if (muteHours.indexOf("<@") == 0) {
                    muteHours = lowmessage.split(" ")[message.mentions.users.size + 1];
                    shift = 1;
                }
                message.mentions.users.forEach(async function(value, key) {
                    var muteMember = await message.guild.fetchMember(value)
                    if (!isNaN(muteHours)) {
                        setTimeout(function () {
                            unmute(muteMember.id);
                        }, muteHours * 3600000)
                        if (logMessage.content.includes(key)) {
                            var logs = logMessage.content;
                            var newLog = logs.split("\n")[0];
                            for (var x = 1; x < logs.split("\n").length; x++) {
                                if (!logs.split("\n")[x].includes(key)) { newLog += "\n" + logs.split("\n")[x]; }
                            }
                            logMessage.edit(newLog);
                        }
                        d = new Date();
                        unmuteTime = muteHours * 3600000 + d.getTime();
                        logMessage.edit(logMessage.content + "\n" + key + " " + unmuteTime);
                        await message.channel.send("Member " + muteMember.displayName + " (id " + key + ") muted for " + muteHours + " hours.");
                    }
                    else {
                        await message.channel.send("Member " + muteMember.displayName + " (id " + key + ") muted indefinitely. To set a duration, please use `,mute HOURS @MEMBER`.");
                    }
                    await muteMember.addRole(message.guild.roles.get(muteRole));
                    var muteMessage = "";
                    if (!isNaN(muteHours)) { muteMessage = await "You have been muted for " + muteHours + " hours"; }
                    else { muteMessage = await "You've been muted indefinitely"; }
                    if (message.content.includes("Reason: ")) { muteMessage += await " with reason \"" + message.content.split("Reason: ")[1] + "\""; }
                    else if (message.content.includes("reason: ")) { muteMessage += await " with reason \"" + message.content.split("reason: ")[1] + "\""; }
                    else if (message.content.includes("REASON: ")) { muteMessage += await " with reason \"" + message.content.split("REASON: ")[1] + "\""; }
                    else if (message.content.split(">")[message.mentions.users.size + shift].length > 1) { muteMessage += await " with reason \"" + message.content.split(">")[message.mentions.users.size + shift] + "\""; }
                    else { muteMessage += await "."; }
                    await value.send(muteMessage);
                })
            }
            else { message.channel.send("Please include a mention for the person you would like to mute. If they do not have access to this channel, that can be done with <@ID>."); }
        }
        else { message.channel.send("You must be a mod or admin to use this function."); }
    }
}

async function unmute(id) {
    if (!bot.guilds.get(guildID[1]).members.has(id)) {
        bot.channels.get(logChannel[1]).send("Member <@" + id + "> has left before scheduled unmute time.");
    }
    else {
        member = await bot.guilds.get(guildID[1]).fetchMember(id);
        member.removeRole(member.guild.roles.get(muteRole));
        bot.channels.get(logChannel[1]).send("Member " + member.displayName + " (id " + member.id + ") unmuted.");
    }
    var logs = logMessage.content;
    var newLog = logs.split("\n")[0];
    for (var x = 1; x < logs.split("\n").length; x++) {
        if (!logs.split("\n")[x].includes(id)) { newLog += "\n" + logs.split("\n")[x]; }
    }
    logMessage.edit(newLog);
}

function manualReset(isMod) {
    if (lowmessage.indexOf(",resetlog") == 0 && isMod) {
        logMessage.edit("Muted members and unmute times:");
    }
}

function kick(message, isMod) {
    if (lowmessage.indexOf(",kick") == 0) {
        if (isMod) {
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

async function ban(message, isMod) {
    if (lowmessage.indexOf(",ban") == 0) {
        if (isMod) {
            if (message.mentions.users.size == 0) {
                message.channel.send("Please include a mention for the person or people you would like to ban.  If they cannot see this channel, this can be accomplished with `<@ID>`.");
            }
            else {
                message.mentions.users.forEach(async function(value, key) {
                    if (bot.guilds.get(guildID[1]).members.has(key)) {
                        var banMember = await bot.guilds.get(guildID[1]).fetchMember(key);
                        if (banMember.roles.has(modRole)) {
                            message.channel.send("I'm sorry, I won't ban another mod or admin.");
                        }
                        if (banMember.bannable) {
                            if (message.content.substring(message.content.lastIndexOf(">")).length > 1) { await banMember.send("You've been banned from *Magic & Chill* for the following reason: " + message.content.substring(message.content.lastIndexOf(">"))); }
                            await banMember.ban(message.content.substring(message.content.lastIndexOf("> ")));
                            await message.channel.send("Member " + banMember.displayName + " (id " + key + ") banned.");
                        }
                    }
                    else {
                        bot.guilds.get(guildID[1]).ban(value);
                    }
                });
            }
        }
        else {
            message.channel.send("You must be a mod or admin to use this function.");
        }
    }
}

function role(message, messageMember) {
    if (lowmessage.indexOf(",role") == 0 || lowmessage.indexOf(",leak") == 0) {
        if (lowmessage.includes("leak")) {
            if (message.channel.id != botCommandChannel[1]) {
                message.channel.send("There's an anomoly at this location.  Please try in <#" + botCommandChannel[1] + ">.");
                return;
            }
            if (messageMember.roles.has(leakRole)) {
                messageMember.removeRole(message.guild.roles.get(leakRole));
                message.channel.send("Leaks role removed!")
            }
            else {
                messageMember.addRole(message.guild.roles.get(leakRole));
                message.channel.send("Leaks role added!")
            }
        }
    }
    if (lowmessage.indexOf(",role") == 0 || lowmessage.indexOf(",serious") == 0) {
        if (lowmessage.includes("serious")) {
            if (message.channel.id != botCommandChannel[1]) {
                message.channel.send("There's an anomoly at this location.  Please try in <#" + botCommandChannel[1] + ">.");
                return;
            }
            if (messageMember.roles.has(seriousRole)) {
                messageMember.removeRole(message.guild.roles.get(seriousRole));
                message.channel.send("Serious Discussion role removed!")
            }
            else {
                messageMember.addRole(message.guild.roles.get(seriousRole));
                message.channel.send("Serious Discussion role added!")
            }
        }
    }
}

function links(message) {
    if (lowmessage.indexOf(",unsanctioned") == 0) { message.channel.send("Unsanctioned FAQTIKPWAMOMBSIATHTTASTTTETMOTWSTAAA: https://magic.wizards.com/en/articles/archive/feature/unsanctioned-faq-2020-02-25"); }
    if (lowmessage.indexOf(",unstable") == 0) { message.channel.send("Unstable FAQAWASLFAQPAFTIDAWABIAJTBT: https://magic.wizards.com/en/articles/archive/news/unstable-faqawaslfaqpaftidawabiajtbt-2017-12-06"); }
    if (lowmessage.indexOf(",unhinged") == 0) { message.channel.send("Unhinged FAQTIWDAWCC: https://magic.wizards.com/en/articles/archive/feature/unhinged-faqtiwdawcc"); }
    if (lowmessage.indexOf(",unglued") == 0) { message.channel.send("Unglued QAS: https://magic.wizards.com/en/articles/archive/feature/unglued-qas-questions-asked-sometimes"); }
    if (lowmessage.indexOf(",colorpie") == 0) { message.channel.send("Mechanical Color Pie 2017: https://magic.wizards.com/en/articles/archive/making-magic/mechanical-color-pie-2017-2017-06-05\nMajor changes since then:\nGreen is now secondary in haste and black is tertiary in it.\nBlack is secondary in flash.\nBlack is now allowed to cause opponents to sacrifice enchantments."); }
    if (lowmessage.indexOf(",pioneer") == 0) { message.channel.send("Return to Ravnica, Gatecrash, Dragon's Maze, Magic 2014\nTheros, Born of the Gods, Journey Into Nyx, Magic 2015\nKhans of Tarkir, Fate Reforged, Dragons of Tarkir, Magic Origins\nBattle for Zendikar, Oath of the Gatewatch, Shadows Over Innistrad, Eldritch Moon\nKaladesh, Aether Revolt, Amonkhet, Hour of Devastation\nIxalan, Rivals of Ixalan, Dominaria, Magic 2019\nGuilds of Ravnica, Ravnica Allegiance, War of the Spark, Magic 2020\nThrone of Eldraine, Theros: Beyond Death, Ikoria: Lair of Behemoths, Magic 2021"); }
    if (lowmessage.indexOf(",modern") == 0) { message.channel.send("Modern Horizons\nEighth Edition, Mirrodin, Darksteel, Fifth Dawn\nChampions of Kamigawa, Betrayers of Kamigawa, Saviors of Kamigawa, Ninth Edition\nRavnica: City of Guilds, Dissention, Guildpact, Coldsnap\nTime Spiral, Planar Chaos, Future Sight, Tenth Edition\nLorwyn, Morningtide, Shadowmoor, Eventide\nShards of Alara, Conflux, Alara Reborn, Magic 2010\nZendikar, Worldwake, Rise of the Eldrazi, Magic 2011\nScars of Mirrodin, Mirrodin Besieged, New Phyrexia, Magic 2012\nInnistrad, Dark Ascension, Avacyn Restored, Magic 2013\nReturn to Ravnica, Gatecrash, Dragon's Maze, Magic 2014\nTheros, Born of the Gods, Journey Into Nyx, Magic 2015\nKhans of Tarkir, Fate Reforged, Dragons of Tarkir, Magic Origins\nBattle for Zendikar, Oath of the Gatewatch, Shadows Over Innistrad, Eldritch Moon\nKaladesh, Aether Revolt, Amonkhet, Hour of Devastation\nIxalan, Rivals of Ixalan, Dominaria, Magic 2019\nGuilds of Ravnica, Ravnica Allegiance, War of the Spark, Magic 2020\nThrone of Eldraine, Theros: Beyond Death, Ikoria: Lair of Behemoths, Magic 2021"); }
    if (lowmessage.indexOf(",xmage") == 0 || lowmessage.indexOf(",cockatrice") == 0) { message.channel.send("XMage and Cockatrice are the two most common ways to play *Magic* for free online.  Both support using (almost) any card and a variety of formats.  The major difference is that XMage has rules enforcement, similar to MTGO or Arena, while Cockatrice does not.  They can be found at https://xmage.de/ and https://cockatrice.github.io/"); }
    if (lowmessage.indexOf(",proxy") == 0 || lowmessage.indexOf(",counterfeit") == 0) { message.channel.send(new Discord.RichEmbed().setTitle("Proxies vs Counterfeits").setImage("https://media.discordapp.net/attachments/375903183563915265/724555752974581770/image0.png").addField("Proxy Types:", "There are several different ways to make proxies for casual play.  Here are a few:\n\nYou can print out an image of the card on a slip of paper and put it over a real card (Overgrown Tomb, Black Lotus, Misty Rainforest).  No one, no matter how unfamiliar with authenticity, will think this is real if they pull it out of the sleeve, but it looks nice and is probably the most readable option.  The downside is the printer ink can be expensive to print out so many images.").addField("Proxies Cont.", "You can write the name (and if you want also the rules text) out by hand on a piece of paper and put it over a real card (Rest in Peace, Troll Ascetic, Scattered Groves).  It's even easier than the above to tell this is not real and is incredibly cheap to do, but it also doesn't look as nice.\n\nYou can write the name (and if you want also the rules text) directly on a real card (Wall of Omens).  It will permanently mark the card you use and again is very easy to tell is not a real version of what it's proxying, but it's also the least likely to shuffle any different as there's no second thing in the sleeve.").addField("Counterfeits:", "Counterfeits on the other hand look like real cards.  Depending on the quality of the counterfeit and how knowledgeable the examiner is, it may be noticeable in a sleeve, when you're holding it, upon very close examination, or not at all.  However in all cases it will likely pass as real to someone who doesn't know to look for it or what to look for.  No matter why you have counterfeits, knowingly acquiring them is supporting their ability to make more and deceive people into buying full price fakes.\n\nRemember, just because you think it can't be faked doesn't mean people aren't trying.").setColor('RED'));}
    if (lowmessage.indexOf(",syntax") == 0) { message.channel.send("Scryfall search syntax, also used by <@240537940378386442>: https://scryfall.com/docs/syntax"); }
}

function raidBan(message, messageMember) {
    if (messageMember.roles.size == 1 && message.mentions.users.size > 20) {
        messageMember.ban({
            days: 1,
            reason: "Mention spam"
        });
        bot.channels.get(logChannel[guildID.indexOf(message.guild.id)]).send(messageMember.displayName + " (id " + messageMember.id + ") banned for spamming mentions.  Message: ```" + message.cleanContent + "```");
    }
}

async function dmReporter(message) {
    var messageMember = await bot.guilds.get(guildID[1]).fetchMember(message.author);
    if (messageMember.roles.has(muteRole)) {
        bot.channels.get(logChannel[1]).send("Muted member " + messageMember.displayName + " (id " + messageMember.id + ") said this in DM: ```" + message.cleanContent + "```");
    }
}

async function deleteReporter(message, forced) {
    if (message.guild === null) {return;}
    if (!message.guild.available) {return;}
    if (message.guild.id != guildID[1]) {return;}
    if (message.author.bot && !forced) {
        if (message.author.id == bot.user.id && logChannel[1] == message.channel.id) {
            message.channel.send("One of my logs was deleted from here.");
        }
        return;
    }
    if (message.content.length < 5 && message.attachments.array().length == 0) {return;}
    if ((message.content.includes("[[") || message.content.includes("]]") || message.content.toLowerCase().includes("!card") || message.content.toLowerCase().includes("!cr") || message.content.toLowerCase().includes("!mtr") || message.content.toLowerCase().includes("!ipg") || message.content.toLowerCase().includes("!price") || message.content.toLowerCase().includes("!legal") || message.content.toLowerCase().includes("!rul") || message.content.toLowerCase().includes("!jar") || message.content.toLowerCase().includes("!help") || message.content.toLowerCase().includes("!define")) && message.channel.id != "205775955434668032") {return;}
    var channelToNotify = logChannel[1];
    if (message.channel.id == logChannel[1] && message.author.id == "657605267709493265") {
        await message.channel.send("One of my logs was deleted from here.");
        return;
    }
    const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
    let user = ""
    if (entry.extra.channel.id === message.channel.id
      && (entry.target.id === message.author.id)
      && (entry.createdTimestamp > (Date.now() - 5000))
      && (entry.extra.count >= 1)) {
        user = entry.executor;
    } else {
        user = message.author;
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
    deleteLog += user.username;
    if (message.cleanContent != "") {
        deleteLog += ": ```";
        deleteLog += message.cleanContent.replace(/```/g, "​`​`​`​");
        deleteLog += "```";
    }
    messageMember = await message.guild.fetchMember(message.author);
    var deleteMember = await message.guild.fetchMember(user);
    if (messageMember.id == deleteMember.id) { deleteLog = new Discord.RichEmbed().setAuthor(messageMember.displayName + " (" + messageMember.id + ")", messageMember.user.displayAvatarURL).addField("Deletion", message.channel + ": " + message.content); }
    else { deleteLog = new Discord.RichEmbed().setAuthor(messageMember.displayName + " (" + messageMember.id + ")", messageMember.user.displayAvatarURL).setFooter("Deleted by " + deleteMember.displayName + " (" + deleteMember.id + ")", deleteMember.user.displayAvatarURL).addField("Deletion", message.channel + ": " + message.content); }
    if (attaches.length == 0) {
        bot.channels.get(channelToNotify).send(deleteLog);
    }
    else if (attaches.length == 1) {
        deleteLog.setImage(attaches[0].proxyURL);
        bot.channels.get(channelToNotify).send(deleteLog);
    }
    else {
        bot.channels.get(channelToNotify).send("The following " + attachmessage, deleteLog);
    }
}

async function offlineChecker(channel) {
    var judgebot = await bot.fetchUser("240537940378386442");
    var scryfall = await bot.fetchUser("268547439714238465");
    if (judgebot.presence.status == "offline" && (lowmessage.includes("!card") || lowmessage.includes("!cr") || lowmessage.includes("!mtr") || lowmessage.includes("!ipg") || lowmessage.includes("!jar") || lowmessage.includes("!help") || lowmessage.includes("!define"))) {
        if (scryfall.presence.status != "offline") {
            channel.send("<@240537940378386442> appears to be offline.  Try using <@268547439714238465> instead, with [[`CARDNAME`]] or [[`CARDNAME`|`SET`]].  You can also do [[!`CARDNAME`]] or [[!`CARDNAME`|`SET`]] for just the image.");
        }
        else {
            channel.send("Both our bots seem to be offline at the moment.  Please try again later or use a browser to find the card online and post the link or image.");
            return;
        }
    }
    if (judgebot.presence.status == "offline" && lowmessage.includes("!legal")) {
        if (scryfall.presence.status != "offline") {
            channel.send("<@240537940378386442> appears to be offline.  Try using <@268547439714238465> instead, with [[#`CARDNAME`]].");
        }
        else {
            channel.send("Both our bots seem to be offline at the moment.  Please try again later or use a browser to find the card online and post the link or image.");
            return;
        }
    }
    if (judgebot.presence.status == "offline" && lowmessage.includes("!price")) {
        if (scryfall.presence.status != "offline") {
            channel.send("<@240537940378386442> appears to be offline.  Try using <@268547439714238465> instead, with [[$`CARDNAME`]] or [[$`CARDNAME`|`SET`]].");
        }
        else {
            channel.send("Both our bots seem to be offline at the moment.  Please try again later or use a browser to find the card online and post the link or image.");
            return;
        }
    }
    if (judgebot.presence.status == "offline" && lowmessage.includes("!rul")) {
        if (scryfall.presence.status != "offline") {
            channel.send("<@240537940378386442> appears to be offline.  Try using <@268547439714238465> instead, with [[?`CARDNAME`]].");
        }
        else {
            channel.send("Both our bots seem to be offline at the moment.  Please try again later or use a browser to find the card online and post the link or image.");
            return;
        }
    }
    if (scryfall.presence.status == "offline" && lowmessage.includes("[[") && lowmessage.includes("]]")) {
        if (judgebot.presence.status != "offline") {
            if (lowmessage.includes("[[$")) {
                channel.send("<@268547439714238465> appears to be offline.  Try using <@240537940378386442> instead, with !price `NAME OR SCRYFALL SYNTAX`!, and for more info on full Scryfall syntax see https://scryfall.com/docs/syntax.");
            }
            else if (lowmessage.includes("[[?")) {
                channel.send("<@268547439714238465> appears to be offline.  Try using <@240537940378386442> instead, with !rulings `NAME OR SCRYFALL SYNTAX`!, and for more info on full Scryfall syntax see https://scryfall.com/docs/syntax.");
            }
            else if (lowmessage.includes("[[#")) {
                channel.send("<@268547439714238465> appears to be offline.  Try using <@240537940378386442> instead, with !legality `NAME OR SCRYFALL SYNTAX`!, and for more info on full Scryfall syntax see https://scryfall.com/docs/syntax.");
            }
            else {
                channel.send("<@268547439714238465> appears to be offline.  Try using <@240537940378386442> instead, with !card `NAME OR SCRYFALL SYNTAX`!, and for more info on full Scryfall syntax see https://scryfall.com/docs/syntax.");
            }
        }
        else {
            channel.send("Both our bots seem to be offline at the moment.  Please try again later or use a browser to find the card online and post the link or image.")
        }
    }
}

function help(channel, isMod) {
    if (lowmessage.indexOf(",help") == 0) {
        var helpMessage = "I will provide a link to Scryfall search syntax with `,syntax`\nI will provide links to the Un-set FAQs with `,unglued`, `,unhinged`, `,unstable`, or `,unsanctioned`.\nI will provide a link to the Mechanical Color Pie and relevant changes since with `,colorpie`.\nI can tell you the sets legal in Pioneer with `,pioneer` or in Modern with `,modern`.\nI will give or remove the leak role with `,leak` and the serious discussion role with `,serious`.\nI will give a brief description of both programs with `,xmage` or `,cockatrice`.\nI will educate you on the differences between a `,counterfeit` and a `,proxy` with either command.\nIf either <@268547439714238465> or <@240537940378386442> is offline, I will point you to the other one with some basic syntax for similar functions.\nI will provide a full image of a card with exact Scryfall command but `<<>>`, like so: <<Avacyn, the Purifier|SOI>>.  Notably, this **can** get the back of a double faced card.";
        if ((isMod && channel.guild == null) || channel.id == modChannel) {
            helpMessage = "Mute: `,mute 24 <@631014834057641994> Reason: Imprisoning Emrakul` would mute me for 24 hours and DM me `You've been muted for 24 hours with reason \"Imprisoning Emrakul\"`.\nBan, kick, or unmute: Just send `,ban @MENTION`, `,kick @MEMBER`, or `,unmute @MENTION`\n`,addspoiler LEA` `,removespoiler LEA`: Mark or unmark set code LEA as spoilers to be automatically removed outside of appropriate channels.\nCurrent bad words list to report: `" + badWords + "`. If you wish to add or remove anything from this list, please @ Ash K. and it will be done.\nDelete message logging: Deletions will be logged *unless* one of the following is true and it contains no attachments: The message was from a bot, the message contained a typical bot call (`!card`, `[[`, `]]`, etc.), or the message was less than five characters long.  If you have any suggestions on improvements on catching only relevant deletions, feel free to suggest them.\nAny current spoilers from other bots are automatically deleted outside spoiler or leak channel, and the removed cards outside serious discussions.\n\n" + helpMessage;
        }
        else {
            helpMessage += "\nI assist the moderators with various things.";
        }
        helpMessage += "\n\nAll commands are case insensitive. If you have suggestions for new or improved commands, please @ Ash K. with them."
        channel.send(helpMessage);
    }
}

function cache(message) {
    if (lowmessage.indexOf(",cache ") == 0 && !isNaN(lowmessage.split(" ")[1]) && bot.channels.has(lowmessage.split(" ")[1]) && !isNaN(lowmessage.split(" ")[2])) {
        bot.channels.get(lowmessage.split(" ")[1]).fetchMessage(lowmessage.split(" ")[2]);
    }
}

function designChallenge(message) {
    if (lowmessage.indexOf(",challenge") == 0) {
        var num = Math.floor(Math.random() * 1)
        if (lowmessage.split(" ")[1] && !isNaN(lowmessage.split(" ")[1])) { num = lowmessage.split(" ")[1]; }
        switch (num) {
            case 0: message.channel.send("make a 2 mana blue cantrip that's modern relevant but wouldn't break standard"); break;
        }
    }
}

async function spoilerUpdate(message, isMod) {
    if (lowmessage.indexOf(",addspoiler ") == 0 && isMod) {
        var newSpoilerSets = spoilerSets.content;
        newSpoilerSets += "\n" + lowmessage.split(",addspoiler ")[1].toUpperCase();
        spoilerSets.edit(newSpoilerSets);
        message.channel.send("`" + lowmessage.split(",addspoiler ")[1].toUpperCase() + "` added to list of sets treated treated as spoilers.");
        spoilerSets = await bot.channels.get("407401913253101601").fetchMessage("639173870472921118");
    }
    if (lowmessage.indexOf(",removespoiler ") == 0 && spoilerSets.content.toUpperCase().split("\n").indexOf(lowmessage.split(",removespoiler ")[1].toUpperCase()) > 0 && isMod) {
        var newSpoilerSets = spoilerSets.content.split("\n")[0];
        for (var x = 1; x < spoilerSets.content.split("\n").length; x++) {
            if (!spoilerSets.content.toUpperCase().split("\n")[x] == lowmessage.split(",removespoiler ")[1].toUpperCase()) { newSpoilerSets += "\n" + spoilerSets.content.split("\n")[x]; }
        }
        spoilerSets.edit(newSpoilerSets);
        message.channel.send("`" + lowmessage.split(",removespoiler ")[1].toUpperCase() + "` removed from list of sets treated as spoilers.");
        spoilerSets = await bot.channels.get("407401913253101601").fetchMessage("639173870472921118");
    }
    if (message.content.indexOf(",addreprint ") == 0 && isMod) {
        var newReprintList = reprintList.content;
        newReprintList += "\n" + message.content.split(",addreprint ")[1];
        reprintList.edit(newReprintList);
        message.channel.send("`" + message.content.split(",addreprint ")[1] + "` added to list of reprints exempt from spoiler policy.");
        reprintList = await bot.channels.get(logChannel[0]).fetchMessage("756507174200541255");
    }
}

function spoilerCleaner(message) {
    for (var x = 1; x < reprintList.content.split("\n").length; x++) {
        var cardName = reprintList.content.split("\n")[x];
        if (message.embeds[0] != undefined && message.embeds[0].title.split(":")[0] == cardName + " ") { return; }
        cardName = cardName.toLowerCase().replace(/û/g, "%C3%BB").replace(/,/g, "").replace(/\./g, "").replace(/\'/g, "").replace(/`/g, "").replace(/®/g, "").replace(/:registered:/, "").replace(/"/g, "").replace(/\?/g, "%3F").replace(/!/g, "").replace(/ /g, "-");
        if (message.content.includes("/" + cardName + "?"))
    }
    for (var x = 1; x < spoilerSets.content.split("\n").length; x++) {
        if ((lowmessage.includes("/" + spoilerSets.content.split("\n")[x].toLowerCase() + "/") || (message.embeds[0] != undefined && message.embeds[0].description != undefined && message.embeds[0].description.includes("(" + spoilerSets.content.split("\n")[x].toUpperCase() + " "))) /* || lowmessage.includes("/znr/") || (message.embeds[0] != undefined && message.embeds[0].description != undefined && message.embeds[0].description.includes("(ZNR ")))*/ && message.channel.id != "641920724856078336" && message.channel.id != "298465947319140353" && message.channel.id != "720436488247967754" ) {
            message.delete();
            deleteReporter(message, true);
            message.channel.send("Please keep all spoilers to <#641920724856078336>, or if the discussion also involves leaked cards, <#298465947319140353>.")
        }
    } 
    if (message.channel.id != "720436488247967754") {
        for (var x = 0; x < badCards.length; x++) {
            var scryfallURL = "/" + badCards[x].toLowerCase().replace(/û/g, "%C3%BB").replace(/,/g, "").replace(/\./g, "").replace(/\'/g, "").replace(/`/g, "").replace(/®/g, "").replace(/:registered:/, "").replace(/"/g, "").replace(/\?/g, "%3F").replace(/!/g, "").replace(/ /g, "-") + "?";
            if (lowmessage.includes(scryfallURL) || (message.embeds[0] != undefined && message.embeds[0].title != undefined && message.embeds[0].title.split(" <")[0] == badCards[x])) {
                message.delete();
                deleteReporter(message, true);
                message.channel.send("This cards has been banned in all formats for issues about serious topics. To discuss those topics, please see rule 8 (or for more details, <https://discordapp.com/channels/162586705524686848/162587160942346241/720436510368858152>).")
            }
        }
    }
}

function updateWords(message) {
    if (lowmessage.indexOf(",banword ") == 0) {
        var newDeleteList = deleteList.content;
        newDeleteList += "\n" + lowmessage.split(",banword ")[1]
        deleteList.edit(newDeleteList);
        message.channel.send("`" + lowmessage.split(",banword ")[1] + "` added to list of words/phrases to immediately delete.");
    }
    if (lowmessage.indexOf(",reportword ") == 0) {
        var newDeleteList = reportList.content;
        newDeleteList += "\n" + lowmessage.split(",banword ")[1]
        reportList.edit(newDeleteList);
        message.channel.send("`" + lowmessage.split(",reportword ")[1] + "` added to list of words/phrases to report.");
    }
    if (lowmessage.indexOf(",unbanword ") == 0 && deleteList.content.split("\n").indexOf(lowmessage.split(",unbanword ")[1]) > 0) {
        var newDeleteList = deleteList.content.split("\n")[0];
        for (var x = 1; x < deleteList.content.split("\n").length; x++) {
            if (!deleteList.content.split("\n")[x] == lowmessage.split(",unbanword ")[1]) { newDeleteList += "\n" + deleteList.content.split("\n")[x]; }
        }
        deleteList.edit(newDeleteList);
        message.channel.send("`" + lowmessage.split(",unbanword ")[1] + "` removed from list of words/phases to immediately delete.");
    }
    if (lowmessage.indexOf(",unreportword ") == 0 && deleteList.content.split("\n").indexOf(lowmessage.split(",unreportword ")[1]) > 0) {
        var newDeleteList = reportList.content.split("\n")[0];
        for (var x = 1; x < reportList.content.split("\n").length; x++) {
            if (!reportList.content.split("\n")[x] == lowmessage.split(",unreportword ")[1]) { newDeleteList += "\n" + reportList.content.split("\n")[x]; }
        }
        reportList.edit(newDeleteList);
        message.channel.send("`" + lowmessage.split(",unreportword ")[1] + "` removed from list of words/phases to report.");
    }
}

async function badWordsReporterLGS(message, messageMember, isEdit) {
    var badWordsLog = "";
    var messageToLink = message;
    var reporting = false;
    var deleteWords = await deleteList.content.split("\n");
    var reportWords = await reportList.content.split("\n");
    for (let i = 1; i < deleteWords.length; i++) {
        if (lowmessage.indexOf(deleteWords[i]) != -1) {
            reporting = true;
            await message.delete();
            messageToLink = await message.channel.send("")
            break;
        }
    }
    for (let i = 1; i < reportWords.length; i++) {
        if (lowmessage.indexOf(reportWords[i]) != -1) {
            reporting = true;
            break;
        }
    }
    if (reporting) {
        badWordsLog = new Discord.RichEmbed().setAuthor(messageMember.displayName + " (" + messageMember.id + ")", messageMember.user.displayAvatarURL).setTitle("Questionable Content:").addField(messageMember.displayName + " (" + message.author.id + ")", message.channel + ": " + message.content).addField("Context:", message.url).setColor('RED');
        if (isEdit) { badWordsLog.setFooter("This was an edit."); }
        await bot.channels.get(logChannel[guildID.indexOf(message.guild.id)]).send(badWordsLog);
    }
}

function magicCardFetcher(message) {
    if (lowmessage.indexOf("<<") != -1 && lowmessage.lastIndexOf(">>") != -1 && lowmessage.indexOf("|") != -1) {
        magicCardPoster(message.cleanContent, message.channel);
    }
}

function magicCardPoster(input, channel) {
    var request = input.replace(/\<\</g, "🦌🦌").replace(/\|/g, "🦌🦌").replace(/>>/g, "🦌🦌");
    if (request.split("🦌🦌").length < 2) {return;}
    var cardName = request.split("🦌🦌")[1];
    var cardSet = request.split("🦌🦌")[2];
    var fetched = false;
    if (cardSet.length > 5 || cardSet.length < 2) {return;}
    if (request.split("🦌🦌")[3].length > 0 && !isNaN(request.split("🦌🦌")[3]) && request.split("🦌🦌")[3].indexOf(" ") == -1) {
        var cardNumber = request.split("🦌🦌")[3];
        cardName = cardName.toLowerCase().replace(/û/g, "%C3%BB").replace(/,/g, "").replace(/\./g, "").replace(/\'/g, "").replace(/`/g, "").replace(/®/g, "").replace(/:registered:/, "").replace(/"/g, "").replace(/\?/g, "%3F").replace(/!/g, "").replace(/ /g, "-");
        channel.send("https://scryfall.com/card/" + cardSet.toLowerCase() +"/" + cardNumber + "/" + cardName + "?utm_source=discord");
        fetched = true;
    }
    if (cardName == "Mine, Mine, Mine" || cardName == "Incoming" || cardName == "Kill! Destroy") {cardName += "!";}
    cardSet = cardSet.toUpperCase();
    for (var x = 1; x < setCodes.content.split("\n").length; x++) {
        cardSet = cardSet.replace(setCodes.content.split("\n")[x].split(" ")[0], setCodes.content.split("\n")[x].split(" ")[1]);
    }
    cardName = cardName.replace(/ /g, "%2B").replace(/,/g, "%252C").replace(/\./, "%252E").replace(/û/g, "u").replace(/\'/g, "%2527").replace(/`/g, "%2527").replace(/®/g, "%25C2%25AE").replace(/:registered:/g, "%25C2%25AE").replace(/&/g, "%2526").replace(/"/g, "%2522").replace(/!/g, "%2521").replace(/\?/g, "%253F");
    if (!fetched) {channel.send("https://cdn1.mtggoldfish.com/images/gf/" + cardName + "%2B%255B" + cardSet + "%255D.jpg"); }
    if (input.indexOf(">>") != input.lastIndexOf(">>")) { magicCardPoster(input.substring(input.indexOf(">>") + 2), channel); } 
}

bot.on("message", async function(message) {
    lowmessage = message.content.toLowerCase();

    if (message.author.id == "135999597947387904" && message.content.indexOf(",eval ") == 0 && message.channel.id != "531433553225842700") {
        message.channel.send("```javascript\n" + eval(message.content.split(",eval ")[1]) + "```");
    }

    if (message.author.id == "135999597947387904" && message.content.indexOf(",teval ") == 0 && message.channel.id == "531433553225842700") {
        message.channel.send("```javascript\n" + eval(message.content.split(",teval ")[1]) + "```");
    }

    if (message.guild != null && message.guild.id == guildID[2]) {
        var isMod = false;
        var messageMember = await message.guild.fetchMember(message.author);
        if (messageMember.permissions.has("ADMINISTRATOR")) { isMod = true; }

        await offlineChecker(message.channel);

        await raidBan(message, messageMember);

        await links(message);

        await badWordsReporterLGS(message, messageMember, false);

        if (isMod) {
            updateWords(message);
        }
    }

    await spoilerCleaner(message);

    if (message.author.bot) {return;}

    var isMod = false;
    var messageMember = await bot.guilds.get(guildID[1]).fetchMember(message.author);
    if (messageMember.roles.has(modRole)) { isMod = true; }

    await links(message);

    await mute(message, isMod);

    await kick(message, isMod);

    await ban(message, isMod);

    await offlineChecker(message.channel);

    await help(message.channel, isMod);

    await cache(message);

    await manualReset(isMod);

    await spoilerUpdate(message, isMod);

    if (isMod && message.content.indexOf(",unmute") == 0 && message.mentions.users.size != 0) {
        message.mentions.users.forEach(async function(value, key) {
            await unmute(key);
        });
    }

    if (message.guild == null) {
        await dmReporter(message);

        return;
    }

    await role(message, messageMember);

    await raidBan(message, messageMember);

    await magicCardFetcher(message);

    await badWordsReporter(message, messageMember, false);
})

bot.on("messageUpdate", async function(oldMessage, newMessage) {
    lowmessage = newMessage.content.toLowerCase();
    var messageMember = await newMessage.guild.fetchMember(newMessage.author);
    await badWordsReporter(newMessage, messageMember, true);
})

bot.on("guildMemberAdd", function(member) {
    if (logMessage.content.includes(member.id + " ")) { member.addRole(member.guild.roles.get(muteRole)); }
    var d = new Date();
    var newBlood = new Discord.RichEmbed().setAuthor(member.displayName + " (" + member.id + ")", member.user.displayAvatarURL).addField("Joined", d).setColor('GREEN');
    bot.channels.get("693709957014749196").send(newBlood);
})

bot.on("guildMemberRemove", async function(member) {
    var d = new Date();
    if (member.roles.has(muteRole) && !logMessage.content.includes(member.id + " ")) {
        var unmuteTime = d.getTime() + 604800000;
        logMessage.edit(logMessage.content + "\n" + member.id + " " + unmuteTime);
        bot.channels.get(logChannel[1]).send(member.displayName + " (id " + member.id + ") left while muted with no fixed duration and has been muted for one week in case they return. If you wish to change the duration, please use `,mute HOURS <@" + member.id + ">`.");
    }
    var newBlood = new Discord.RichEmbed().setAuthor(member.displayName + " (" + member.id + ")", member.user.displayAvatarURL).addField("Left", d).setColor('RED');
    const entry = await member.guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())
    const entry2 = await member.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first())
    if (entry != null && (entry.target.id === member.id) && (entry.createdTimestamp > (Date.now() - 5000))) {
        await newBlood.setFooter("Banned by " + entry.executor.username, entry.executor.displayAvatarURL);
    }
    else if (entry2 != null && (entry2.target.id === member.id) && (entry2.createdTimestamp > (Date.now() - 5000))) {
        await newBlood.setFooter("Kicked by " + entry2.executor.username, entry2.executor.displayAvatarURL);
    }
    await bot.channels.get("693709957014749196").send(newBlood);
})

bot.on("guildMemberUpdate", function(oldMember, newMember) {
    if (newMember.roles.has(muteRole) && newMember.roles.has(leakRole)) { newMember.removeRole(leakRole); }
    if (newMember.roles.has(muteRole) && newMember.roles.has(seriousRole)) { newMember.removeRole(seriousRole); }
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

bot.on("messageDelete", async function(message) {
    deleteReporter(message, false);
})

bot.on("messageDeleteBulk", async function(messages) {
    messages.forEach(async function(value, key) {
        await deleteReporter(value, false);
    });
})

bot.on("presenceUpdate", function(oldMember, newMember) {
    if (newMember.id == "695434707264995350" || newMember.id == "676989741173964800") {
        if (newMember.presence.status == "offline") {
            bot.channels.get("531433553225842700").send("<@135999597947387904>, <@" + newMember.id + "> appears to be offline.");
        }
    }
})

bot.login(process.env.token)
