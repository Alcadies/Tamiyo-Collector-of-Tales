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
var bot = new Discord.Client({ disableMentions: 'everyone' })
var badWords = ["gay", "fag", "retard", "cuck", "slut", "autis", "discord.gg/", "discordapp.com/invite/", "nigg", "💣"];
var badCards = ["Invoke Prejudice", "Cleanse", "Stone-Throwing Devils", "Pradesh Gypsies", "Jihad", "Imprison", "Crusade"];
var lowmessage = "";
var logChannel = ["531433553225842700", "633429050089799687", "729753384407662602"];
var botCommandChannel = ["531433553225842700", "213126280323923970"];
var modRole = "407400920746426368" /*"606659573159428169"*/;
var muteRole = "280463986531631104" /*"586432252901195777"*/;
var guildID = ["531433553225842698", "162586705524686848", "729748959991562330", "778058673783046155"]; //Testing, M&C, LGS, M&CBeta
var roleReact = ["💧", "🧙", "🧙‍♀️", "🧙‍♂️", "⛔"];
var roleID = ["638981519116861442", "788827820830490634", "788827799837474896", "788827774541889566", "720433065893036113"];
var lfgFormat = ["Standard", "Pioneer", "Modern", "Legacy", "Vintage", "Pauper", "EDH", "Canlander", "Historic", "Brawl", "BHrawl", "cEDH"];
var lfgPlayerCount = [2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 4]
var lfgPlatform = ["Arena", "MTGO", "XMage", "Cockatrice", "Spelltable", "Untap", "Tabletop"];
var lfgPost = [["778206375921975297", 0, 0, 0, 0, 0, 0, 0, "", "", "", 0], ["778206460991635466", "", "", "", "", "", "778206512077602816", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", ""]]
var lfgSuper = "";
var lfg2channel = "788823431428309052";
var leakRole = "638981519116861442";
var seriousRole = "720433065893036113";
var roleMessageID = "788829000860041236";
var roleChannelID = "788822921694281749";
var elkRole = "640599175326728203";
var modChannel = "407401913253101601";
var logMessage = "";
var deleteList = "";
var reportList = "";
var setCodes = "";
var spoilerSets = "";
var reprintList = "";
var leakList = "";

bot.on("ready", async function() {
    logger.info("Connected")
    logger.info("Logged in as: ")
    logger.info(bot.user.username + " - (" + bot.user.id + ")")
    bot.channels.cache.get("531433553225842700").send("I know I noted this somewhere...");
})

bot.once("ready", async function() {
    logMessage = await bot.channels.cache.get(logChannel[1]).messages.fetch("633472791982768158");
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
    lfgSuper = await bot.channels.cache.get(lfg2channel).messages.fetch("788838965461254164");
    var str = await lfgSuper.content;
    while (str.includes("\n") && str.length > 2) {
        str = str.slice(str.indexOf("\n") + 1);
        var timeIn = 0;
        if (!str.includes("\n")) {
            timeIn = str.split(" ")[1];
        }
        else {
            timeIn = str.substring(str.indexOf(" ") + 1, str.indexOf("\n"));
        }
        var messageID = str.split(" ")[0];
        var d = new Date();
        var timer = 0;
        if (str.includes("\n")) { timer = parseInt(str.substring(str.indexOf(" ") + 1, str.indexOf("\n"))); }
        else { timer = parseInt(str.substring(str.indexOf(" "))); }
        timer -= d.getTime();
        if (timer <= 0) { lfg2End(messageID); }
        else {
            setTimeout(function () {
                lfg2End(messageID);
            }, timer)
        }
    }
    /*for (var x = 1; x < lfgSuper.content.split("\n").length; x++) {
        var d = new Date();
        setTimeout(function () {
            lfg2End(lfgSuper.content.split("\n")[x].split(" ")[0])
        }, Math.max(lfgSuper.content.split("\n")[x].split(" ")[1] - d, 0))
    }*/
    /*else {
        var logs = logMessage.content;
        var newLog = logs.slice(0, logs.indexOf(str.split(" ")[0]) - 1) + logs.slice(logs.indexOf(str.split(" ")[0]) + str.split(" ")[0].length + 14);
        logMessage.edit(newLog);
    }*/
    deleteList = await bot.channels.cache.get(logChannel[2]).messages.fetch("729754971947663381");
    reportList = await bot.channels.cache.get(logChannel[2]).messages.fetch("729755004054798379");
    setCodes = await bot.channels.cache.get(logChannel[0]).messages.fetch("751124446701682708");
    spoilerSets = await bot.channels.cache.get("407401913253101601").messages.fetch("639173870472921118");
    reprintList = await bot.channels.cache.get(logChannel[0]).messages.fetch("756507174200541255");
    leakList = await bot.channels.cache.get(botCommandChannel[0]).messages.fetch("791694141335404584");
    bot.channels.cache.get(roleChannelID).messages.fetch(roleMessageID);
    watchingMessage();
    bot.channels.cache.get("531433553225842700").send("I have arrived to observe this plane.");
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
        badWordsLog = new Discord.MessageEmbed().setAuthor(messageMember.displayName + " (" + messageMember.id + ")", messageMember.user.displayAvatarURL()).setTitle("Questionable Content:").addField(messageMember.displayName + " (" + message.author.id + ")", message.channel + ": " + message.content).addField("Context:", message.url).setColor('RED');
    }
    if (badWordsLog != "") {await bot.channels.cache.get(logChannel[1]).send(badWordsLog);}
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
                    var muteMember = await message.guild.members.fetch(value)
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
                    await muteMember.roles.add(message.guild.roles.cache.get(muteRole));
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
    if (!bot.guilds.cache.get(guildID[1]).members.has(id)) {
        bot.channels.cache.get(logChannel[1]).send("Member <@" + id + "> has left before scheduled unmute time.");
    }
    else {
        member = await bot.guilds.cache.get(guildID[1]).members.fetch(id);
        member.roles.remove(member.guild.roles.cache.get(muteRole));
        bot.channels.cache.get(logChannel[1]).send("Member " + member.displayName + " (id " + member.id + ") unmuted.");
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
            if (message.mentions.members.first().roles.cache.has(modRole)) {
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
                    if (bot.guilds.cache.get(guildID[1]).members.has(key)) {
                        var banMember = await bot.guilds.cache.get(guildID[1]).members.fetch(key);
                        if (banMember.roles.cache.has(modRole)) {
                            message.channel.send("I'm sorry, I won't ban another mod or admin.");
                        }
                        if (banMember.bannable) {
                            if (message.content.substring(message.content.lastIndexOf(">")).length > 1) { await banMember.send("You've been banned from *Magic & Chill* for the following reason: " + message.content.substring(message.content.lastIndexOf(">"))); }
                            await bot.guilds.cache.get(guildID[1]).members.ban(banMember.user, { reason: message.content.substring(message.content.lastIndexOf("> ")) });
                            await message.channel.send("Member " + banMember.displayName + " (id " + key + ") banned.");
                        }
                    }
                    else {
                        bot.guilds.cache.get(guildID[1]).members.ban(value);
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
    /*if (lowmessage.indexOf(",role") == 0 || lowmessage.indexOf(",leak") == 0) {
        if (lowmessage.includes("leak")) {
            if (message.channel.id != botCommandChannel[1]) {
                message.channel.send("There's an anomoly at this location.  Please try in <#" + botCommandChannel[1] + ">.");
                return;
            }
            if (messageMember.roles.cache.has(leakRole)) {
                messageMember.roles.remove(message.guild.roles.cache.get(leakRole));
                message.channel.send("Leaks role removed!")
            }
            else {
                messageMember.roles.add(message.guild.roles.cache.get(leakRole));
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
            if (messageMember.roles.cache.has(seriousRole)) {
                messageMember.roles.remove(message.guild.roles.cache.get(seriousRole));
                message.channel.send("Serious Discussion role removed!")
            }
            else {
                messageMember.roles.add(message.guild.roles.cache.get(seriousRole));
                message.channel.send("Serious Discussion role added!")
            }
        }
    }*/
}

function links(message) {
    if (lowmessage.indexOf(",mystery") == 0 || lowmessage.indexOf(",mb1") == 0 || lowmessage.indexOf(",cmb1") == 0) { message.channel.send("Mystery Booster release notes: https://magic.wizards.com/en/articles/archive/feature/mystery-booster-release-notes-2019-11-11")}
    if (lowmessage.indexOf(",unsanctioned") == 0) { message.channel.send("Unsanctioned FAQTIKPWAMOMBSIATHTTASTTTETMOTWSTAAA: https://magic.wizards.com/en/articles/archive/feature/unsanctioned-faq-2020-02-25"); }
    if (lowmessage.indexOf(",unstable") == 0) { message.channel.send("Unstable FAQAWASLFAQPAFTIDAWABIAJTBT: https://magic.wizards.com/en/articles/archive/news/unstable-faqawaslfaqpaftidawabiajtbt-2017-12-06"); }
    if (lowmessage.indexOf(",unhinged") == 0) { message.channel.send("Unhinged FAQTIWDAWCC: https://magic.wizards.com/en/articles/archive/feature/unhinged-faqtiwdawcc"); }
    if (lowmessage.indexOf(",unglued") == 0) { message.channel.send("Unglued QAS: https://magic.wizards.com/en/articles/archive/feature/unglued-qas-questions-asked-sometimes"); }
    if (lowmessage.indexOf(",colorpie") == 0) { message.channel.send("Mechanical Color Pie 2017: https://magic.wizards.com/en/articles/archive/making-magic/mechanical-color-pie-2017-2017-06-05\nMajor changes since then:\nGreen is now secondary in haste and black is tertiary in it.\nBlack is secondary in flash.\nBlack is now allowed to cause opponents to sacrifice enchantments."); }
    if (lowmessage.indexOf(",pioneer") == 0) { message.channel.send("Return to Ravnica, Gatecrash, Dragon's Maze, Magic 2014\nTheros, Born of the Gods, Journey Into Nyx, Magic 2015\nKhans of Tarkir, Fate Reforged, Dragons of Tarkir, Magic Origins\nBattle for Zendikar, Oath of the Gatewatch, Shadows Over Innistrad, Eldritch Moon\nKaladesh, Aether Revolt, Amonkhet, Hour of Devastation\nIxalan, Rivals of Ixalan, Dominaria, Magic 2019\nGuilds of Ravnica, Ravnica Allegiance, War of the Spark, Magic 2020\nThrone of Eldraine, Theros: Beyond Death, Ikoria: Lair of Behemoths, Magic 2021\nZendikar Rising, Kaldheim, Strixhaven: School of Mages"); }
    if (lowmessage.indexOf(",modern") == 0) { message.channel.send("Modern Horizons\nEighth Edition, Mirrodin, Darksteel, Fifth Dawn\nChampions of Kamigawa, Betrayers of Kamigawa, Saviors of Kamigawa, Ninth Edition\nRavnica: City of Guilds, Dissention, Guildpact, Coldsnap\nTime Spiral, Planar Chaos, Future Sight, Tenth Edition\nLorwyn, Morningtide, Shadowmoor, Eventide\nShards of Alara, Conflux, Alara Reborn, Magic 2010\nZendikar, Worldwake, Rise of the Eldrazi, Magic 2011\nScars of Mirrodin, Mirrodin Besieged, New Phyrexia, Magic 2012\nInnistrad, Dark Ascension, Avacyn Restored, Magic 2013\nReturn to Ravnica, Gatecrash, Dragon's Maze, Magic 2014\nTheros, Born of the Gods, Journey Into Nyx, Magic 2015\nKhans of Tarkir, Fate Reforged, Dragons of Tarkir, Magic Origins\nBattle for Zendikar, Oath of the Gatewatch, Shadows Over Innistrad, Eldritch Moon\nKaladesh, Aether Revolt, Amonkhet, Hour of Devastation\nIxalan, Rivals of Ixalan, Dominaria, Magic 2019\nGuilds of Ravnica, Ravnica Allegiance, War of the Spark, Magic 2020\nThrone of Eldraine, Theros: Beyond Death, Ikoria: Lair of Behemoths, Magic 2021\nZendikar Rising, Kaldheim, Strixhaven: School of Mages"); }
    if (lowmessage.indexOf(",xmage") == 0 || lowmessage.indexOf(",cockatrice") == 0) { message.channel.send("XMage and Cockatrice are the two most common ways to play *Magic* for free online.  Both support using (almost) any card and a variety of formats.  The major difference is that XMage has rules enforcement, similar to MTGO or Arena, while Cockatrice does not.  They can be found at http://xmage.de/ and http://cockatrice.github.io/"); }
    if (lowmessage.indexOf(",proxy") == 0 || lowmessage.indexOf(",counterfeit") == 0) { message.channel.send(new Discord.MessageEmbed().setTitle("Proxies vs Counterfeits").setImage("https://media.discordapp.net/attachments/375903183563915265/724555752974581770/image0.png").addField("Proxy Types:", "There are several different ways to make proxies for casual play.  Here are a few:\n\nYou can print out an image of the card on a slip of paper and put it over a real card (Overgrown Tomb, Black Lotus, Misty Rainforest).  No one, no matter how unfamiliar with authenticity, will think this is real if they pull it out of the sleeve, but it looks nice and is probably the most readable option.  The downside is the printer ink can be expensive to print out so many images.").addField("Proxies Cont.", "You can write the name (and if you want also the rules text) out by hand on a piece of paper and put it over a real card (Rest in Peace, Troll Ascetic, Scattered Groves).  It's even easier than the above to tell this is not real and is incredibly cheap to do, but it also doesn't look as nice.\n\nYou can write the name (and if you want also the rules text) directly on a real card (Wall of Omens).  It will permanently mark the card you use and again is very easy to tell is not a real version of what it's proxying, but it's also the least likely to shuffle any different as there's no second thing in the sleeve.").addField("Counterfeits:", "Counterfeits on the other hand look like real cards.  Depending on the quality of the counterfeit and how knowledgeable the examiner is, it may be noticeable in a sleeve, when you're holding it, upon very close examination, or not at all.  However in all cases it will likely pass as real to someone who doesn't know to look for it or what to look for.  No matter why you have counterfeits, knowingly acquiring them is supporting their ability to make more and deceive people into buying full price fakes.\n\nRemember, just because you think it can't be faked doesn't mean people aren't trying.").setColor('RED'));}
    if (lowmessage.indexOf(",syntax") == 0) { message.channel.send("Scryfall search syntax, also used by <@240537940378386442>: https://scryfall.com/docs/syntax"); }
    if (lowmessage.indexOf(",chains") == 0) { message.channel.send(new Discord.MessageEmbed().setTitle("Follow this __once__ per draw for Chains of Mephistopheles").setImage("https://media.discordapp.net/attachments/205775955434668032/776476567144366080/tumblr_moqdowzQCw1s0l902o1_r1_1280.png"));
}
}

function raidBan(message, messageMember) {
    if (messageMember.roles.size == 1 && message.mentions.users.size > 20) {
        message.guild.members.ban(messageMember.user, {
            days: 1,
            reason: "Mention spam"
        });
        bot.channels.cache.get(logChannel[guildID.indexOf(message.guild.id)]).send(messageMember.displayName + " (id " + messageMember.id + ") banned for spamming mentions.  Message: ```" + message.cleanContent + "```");
    }
    const count = message.channel.messages.filter(m => m.author.id === message.author.id && m.createdTimestamp > Date.now() - 2000).size;
    if(count > 5 && !messageMember.user.bot) {
        message.guild.members.ban(messageMember.user, {
            days: 1,
            reason: "Message spam from non-member"
        });
        bot.channels.cache.get(logChannel[guildID.indexOf(message.guild.id)]).send(messageMember.displayName + " (id " + messageMember.id + ") banned for spamming messages.  Last message: ```" + message.cleanContent + "```");
    }
}

async function dmReporter(message) {
    var messageMember = await bot.guilds.cache.get(guildID[1]).members.fetch(message.author);
    if (messageMember.roles.cache.has(muteRole)) {
        bot.channels.cache.get(logChannel[1]).send("Muted member " + messageMember.displayName + " (id " + messageMember.id + ") said this in DM: ```" + message.cleanContent + "```");
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
    messageMember = message.author.username;
    if (message.guild.members.has(message.author.id)) { messageMember = await message.guild.members.fetch(message.author); }
    var deleteMember = await message.guild.members.fetch(user);
    if (messageMember.id == deleteMember.id) { deleteLog = new Discord.MessageEmbed().setAuthor(messageMember.displayName + " (" + messageMember.id + ")", messageMember.user.displayAvatarURL()).addField("Deletion", message.channel + ": " + message.content); }
    else { deleteLog = new Discord.MessageEmbed().setAuthor(messageMember.displayName + " (" + messageMember.id + ")", messageMember.user.displayAvatarURL()).setFooter("Deleted by " + deleteMember.displayName + " (" + deleteMember.id + ")", deleteMember.user.displayAvatarURL()).addField("Deletion", message.channel + ": " + message.content); }
    if (attaches.length == 0) {
        bot.channels.cache.get(channelToNotify).send(deleteLog);
    }
    else if (attaches.length == 1) {
        deleteLog.setImage(attaches[0].proxyURL);
        bot.channels.cache.get(channelToNotify).send(deleteLog);
    }
    else {
        bot.channels.cache.get(channelToNotify).send("The following " + attachmessage, deleteLog);
    }
}

async function offlineChecker(channel) {
    var judgebot = await bot.users.fetch("240537940378386442");
    var scryfall = await bot.users.fetch("268547439714238465");
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
        if (lowmessage.includes("lfg")) {
            channel.send(new Discord.MessageEmbed().setTitle("Magic & Chill Looking For Game").addField("Syntax:", "`,lfg [MINUTES] PLATFORMS/FORMATS`.  [MINUTES] is how long you want to keep the request up for, defaults to 60 if unspecified.  PLATFORMS/FORMATS is what type(s) of game you're looking for.  They can be in any order and are case insensitive.  As soon as there's another request that meets at least one two player platform/format pair, or three more that match a four player platform/format pair, all of you will be pinged and you'll be removed from all your other active requests (so you don't end up in two games at once, you can re-request whenever you're ready).").addField("Examples:", "`,lfg 5 XMage Commander Spelltable Modern Pioneer` will put out requests for a game of Commander, Modern, or Pioneer on either XMage or Spelltable.  If no game starts within 5 minutes, the request will end.\n`,LFG 5 edh SPELLtable xMAGE pionEEr MODern` will function exactly the same as the above.\n`,lfg Arena Historic` will put out a request for a Historic game on Arena that will time out after 60 minutes.").addField("Recognized Formats:", lfgFormat + "\nAlso accepts Historic Brawl, Commander, and Canadian Highlander as valid aliases for their respective formats.").addField("Recognized Platforms:", lfgPlatform + "\nAlso accepts MTGA and MODO as valid aliases for their respective platforms.").addField("Other:", "This function will only work in <#788823431428309052>.  All of my posts with platforms and formats in one line and numbers in the following line(s) represent active requests if you're curious what's currently requested (they're deleted when they time out or start a game).  If you have any suggestions for improvements or additional platforms/formats, <@135999597947387904> with them."));
            return;
        }
        var helpMessage = "See `,help lfg` for Looking for Game explanation.\nI will provide a link to Scryfall search syntax with `,syntax`\nI will provide links to the Un-set FAQs with `,unglued`, `,unhinged`, `,unstable`, or `,unsanctioned` and Mystery Booster with `,mystery`.\nI will provide a link to the Mechanical Color Pie and relevant changes since with `,colorpie`.\nI can tell you the sets legal in Pioneer with `,pioneer` or in Modern with `,modern`.\nI will give or remove the leak role with `,leak` and the serious discussion role with `,serious`.\nI will give a brief description of both programs with `,xmage` or `,cockatrice`.\nI will educate you on the differences between a `,counterfeit` and a `,proxy` with either command.\nI will provide the chart for Chains of Mephistopheles with `,chains`\nIf either <@268547439714238465> or <@240537940378386442> is offline, I will point you to the other one with some basic syntax for similar functions.\nI will provide a full image of a card with exact Scryfall command but `<<>>`, like so: <<Avacyn, the Purifier|SOI>>.  Notably, this **can** get the back of a double faced card.";
        var helpEmbed = new Discord.MessageEmbed().addField("Links and Explanations:", "I will provide a link to Scryfall search syntax with `,syntax`\nI will provide links to the Un-set FAQs with `,unglued`, `,unhinged`, `,unstable`, or `,unsanctioned` and Mystery Booster with `,mystery`.\nI will provide a link to the Mechanical Color Pie and relevant changes since with `,colorpie`.\nI can tell you the sets legal in Pioneer with `,pioneer` or in Modern with `,modern`.\nI will give or remove the leak role with `,leak` and the serious discussion role with `,serious`.\nI will give a brief description of both programs with `,xmage` or `,cockatrice`.\nI will educate you on the differences between a `,counterfeit` and a `,proxy` with either command.\nI will provide the chart for Chains of Mephistopheles with `,chains`");
        if ((isMod && channel.guild == null) || channel.id == modChannel) {
            helpEmbed.setTitle("Mod Help").addField("Moderator Commands:", "Mute: `,mute 24 <@631014834057641994> Reason: Imprisoning Emrakul` would mute me for 24 hours and DM me `You've been muted for 24 hours with reason \"Imprisoning Emrakul\"`.\nBan, kick, or unmute: Just send `,ban @MENTION`, `,kick @MEMBER`, or `,unmute @MENTION`\n`,addspoiler LEA` `,removespoiler LEA`: Mark or unmark set code LEA as spoilers to be automatically removed outside of appropriate channels.").addField("Other Moderator Functions:", "Current bad words list to report: `" + badWords + "`. If you wish to add or remove anything from this list, please @ Ash K. and it will be done.\nDelete message logging: Deletions will be logged *unless* one of the following is true and it contains no attachments: The message was from a bot, the message contained a typical bot call (`!card`, `[[`, `]]`, etc.), or the message was less than five characters long.  If you have any suggestions on improvements on catching only relevant deletions, feel free to suggest them.\nAny current spoilers from other bots are automatically deleted outside spoiler or leak channel, and the removed cards outside serious discussions.");
        }
        else {
            helpEmbed.setTitle("Help").addField("Other Functions:", "If either <@268547439714238465> or <@240537940378386442> is offline, I will point you to the other one with some basic syntax for similar functions.\nI will provide a full image of a card with exact Scryfall command but `<<>>`, like so: <<Avacyn, the Purifier|SOI>>.  Notably, this **can** get the back of a double faced card.\nI assist the moderators with various things.");
        }
        helpEmbed.setFooter("\n\nAll commands are case insensitive. If you have suggestions for new or improved commands, please @ Ash K. with them.");
        channel.send(helpEmbed);
    }
}

function cache(message) {
    if (lowmessage.indexOf(",cache ") == 0 && !isNaN(lowmessage.split(" ")[1]) && bot.channels.has(lowmessage.split(" ")[1]) && !isNaN(lowmessage.split(" ")[2])) {
        bot.channels.cache.get(lowmessage.split(" ")[1]).messages.fetch(lowmessage.split(" ")[2]);
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
        spoilerSets = await bot.channels.cache.get("407401913253101601").messages.fetch("639173870472921118");
    }
    if (lowmessage.indexOf(",removespoiler ") == 0 && spoilerSets.content.toUpperCase().split("\n").indexOf(lowmessage.split(",removespoiler ")[1].toUpperCase()) > 0 && isMod) {
        var newSpoilerSets = spoilerSets.content.split("\n")[0];
        for (var x = 1; x < spoilerSets.content.split("\n").length; x++) {
            if (!spoilerSets.content.toUpperCase().split("\n")[x] == lowmessage.split(",removespoiler ")[1].toUpperCase()) { newSpoilerSets += "\n" + spoilerSets.content.split("\n")[x]; }
        }
        spoilerSets.edit(newSpoilerSets);
        message.channel.send("`" + lowmessage.split(",removespoiler ")[1].toUpperCase() + "` removed from list of sets treated as spoilers.");
        spoilerSets = await bot.channels.cache.get("407401913253101601").messages.fetch("639173870472921118");
    }
    if (message.content.indexOf(",addreprint ") == 0 && isMod) {
        var newReprintList = reprintList.content;
        newReprintList += "\n" + message.content.split(",addreprint ")[1];
        reprintList.edit(newReprintList);
        message.channel.send("`" + message.content.split(",addreprint ")[1] + "` added to list of reprints exempt from spoiler policy.");
        reprintList = await bot.channels.cache.get(logChannel[0]).messages.fetch("756507174200541255");
    }
}

function spoilerCleaner(message) {
    if (!reprintList.content) {return;}
    for (var x = 1; x < reprintList.content.split("\n").length; x++) {
        var cardName = reprintList.content.split("\n")[x];
        if (message.embeds[0] != undefined && message.embeds[0].title instanceof String && message.embeds[0].title.split(":")[0] == cardName + " ") { return; }
        cardName = cardName.toLowerCase().replace(/û/g, "%C3%BB").replace(/,/g, "").replace(/\./g, "").replace(/\'/g, "").replace(/`/g, "").replace(/®/g, "").replace(/:registered:/, "").replace(/"/g, "").replace(/\?/g, "%3F").replace(/!/g, "").replace(/ /g, "-");
        if (message.content.includes("/" + cardName + "?")) { return; }
    }
    for (var x = 1; x < spoilerSets.content.split("\n").length; x++) {
        if ((lowmessage.includes("/" + spoilerSets.content.split("\n")[x].toLowerCase() + "/") || (message.embeds[0] != undefined && message.embeds[0].description != undefined && message.embeds[0].description.includes("(" + spoilerSets.content.split("\n")[x].toUpperCase() + " "))) /* || lowmessage.includes("/znr/") || (message.embeds[0] != undefined && message.embeds[0].description != undefined && message.embeds[0].description.includes("(ZNR ")))*/ && message.channel.id != "641920724856078336" && message.channel.id != "298465947319140353" && message.channel.id != "720436488247967754" && message.channel.id != "788824774389399573" ) {
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
        badWordsLog = new Discord.MessageEmbed().setAuthor(messageMember.displayName + " (" + messageMember.id + ")", messageMember.user.displayAvatarURL()).setTitle("Questionable Content:").addField(messageMember.displayName + " (" + message.author.id + ")", message.channel + ": " + message.content).addField("Context:", message.url).setColor('RED');
        if (isEdit) { badWordsLog.setFooter("This was an edit."); }
        await bot.channels.cache.get(logChannel[guildID.indexOf(message.guild.id)]).send(badWordsLog);
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
    if (badCards.includes(cardName)) {
        channel.send("This card has been banned in all formats for issues about serious topics.");
        return;
    }
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
    cardName = cardName.replace(/ /g, "%2B").replace(/,/g, "%252C").replace(/\./, "%252E").replace(/û/g, "u").replace(/\'/g, "%2527").replace(/`/g, "%2527").replace(/®/g, "%25C2%25AE").replace(/:registered:/g, "%25C2%25AE").replace(/&/g, "%2526").replace(/"/g, "%2522").replace(/!/g, "%2521").replace(/\?/g, "%253F").replace(/<showcase>/gi, "%253Cshowcase%253E").replace(/\[showcase]/gi, "%253Cshowcase%253E").replace(/\(showcase\)/gi, "%253Cshowcase%253E").replace(/ showcase/gi, " %253Cshowcase%253E").replace(/<borderless>/gi, "%253Cborderless%253E").replace(/\[borderless]/gi, "%253Cborderless%253E").replace(/\(borderless\)/gi, "%253Cborderless%253E").replace(/ borderless/gi, " %253Cborderless%253E").replace(/</g, "%253C").replace(/>/g, "%253E");
    if (!fetched) {channel.send("https://cdn1.mtggoldfish.com/images/gf/" + cardName + "%2B%255B" + cardSet + "%255D.jpg"); }
    if (input.indexOf(">>") != input.lastIndexOf(">>")) { magicCardPoster(input.substring(input.indexOf(">>") + 2), channel); } 
}

async function lfgTest1(message) {
    if ((lowmessage.indexOf(",lfg") == 0 || lowmessage.indexOf("-lfg") == 0) && message.channel.id == "778206142299897877") {
        lowmessage = lowmessage.replace(/modo/g, "mtgo").replace(/commander/g, "edh").replace(/mtga/g, "arena").replace(/canadian highlander/g, "canlander").replace(/historic brawl/g, "hbrawl");
        for (var x = 0; x < lfgFormat.length; x++) {
            if (lowmessage.includes(lfgFormat[x].toLowerCase())) {
                for (var y = 0; y < lfgPlatform.length; y++) {
                    if (lowmessage.includes(lfgPlatform[y].toLowerCase())) {
                        if (lfgPost[y][x] === 0) {
                            var response = await message.channel.send("My records indicate " + lfgPlatform[y] + " " + lfgFormat[x] + " doesn't exist.");
                            setTimeout(function() {
                                selfCleaner(response);
                            }, 30000);
                        }
                        else if (lfgPost[y][x] === "") {
                            var response = await message.channel.send("I don't currently support seeking " + lfgPlatform[y] + " " + lfgFormat[x] + " games.");
                            setTimeout(function() {
                                selfCleaner(response);
                            }, 30000);
                        }
                        else {
                            var theList = await bot.channels.cache.get("778206142299897877").messages.fetch(lfgPost[y][x]);
                            if (lowmessage.indexOf(",lfg") == 0) {
                                if (theList.content.includes(message.author.id)) {
                                    var response = await message.channel.send("You seem to already be on the list for " + lfgPlatform[y] + " " + lfgFormat[x] + ".");
                                    setTimeout(function() {
                                        selfCleaner(response);
                                    }, 30000);
                                }
                                if (theList.content.split("\n").length >= lfgPlayerCount[x]) {
                                    var thePings = "<@" + message.author.id + ">";
                                    for (var i = 1; i < lfgPlayerCount[x]; i++) {
                                        thePings += "<@" + theList.content.split("\n")[i] + "> ";
                                    }
                                    message.channel.send(thePings + " you've been matched for a game of " + lfgPlatform[y] + " " + lfgFormat[x] + "!");
                                    theList.edit(theList.content.split("\n")[0]);
                                    theList.unpin();
                                }
                                else {
                                    theList.edit(theList.content + "\n" + message.author.id);
                                }
                            }
                            else {
                                var newList = theList.content.split("\n")[0];
                                for (var z = 1; z < theList.content.split("\n").length; z++) {
                                    if (!theList.content.split("\n")[z].includes(message.author.id)) { newList += await "\n" + theList.content.split("\n")[z]; }
                                }
                                theList.edit(newList);
                                if(!theList.pinned) {
                                    theList.pin();
                                }
                            }
                        }
                    }
                }
            }
        }
        //message.delete();
    }
}

async function lfgTest2(message) {
    if (message.channel.id == lfg2channel) {
        if (lowmessage.indexOf(",lfg") == 0) {
            lowmessage = lowmessage.replace(/modo/g, "mtgo").replace(/commander/g, "edh").replace(/mtga/g, "arena").replace(/canadian highlander/g, "canlander").replace(/historic brawl/g, "bhrawl").replace(/hbrawl/g, "bhrawl").replace(/untap.in/g, "untap");
            var timer = 60;
            if (!isNaN(lowmessage.split(" ")[1]) && lowmessage.split(" ")[1] > 0) {
                timer = lowmessage.split(" ")[1];
            }
            var d = new Date();
            var timeEnd = (timer * 60000) + d.getTime();
            var found = [];
            for (var x = 1; x < lfgSuper.content.split("\n").length; x++) {
                var thePost = await bot.channels.cache.get(lfg2channel).messages.fetch(lfgSuper.content.split("\n")[x].split(" ")[0]);
                if (!thePost.content.includes(message.author.id)) {
                    var matchedFormats = [];
                    var matchedPlatforms = [];
                    if (thePost.content.includes("EDH")) {
                        if (lowmessage.includes("edh")) {
                            if (lowmessage.includes(thePost.content.split(",")[1].toLowerCase())) {
                                if (thePost.content.split("\n").length == 4) {
                                    message.channel.send("<@" + thePost.content.split("\n")[1] + "> <@" + thePost.content.split("\n")[2] + "> <@" + thePost.content.split("\n")[3] + "> <@" + message.author.id + ">, you have been matched for a game of " + thePost.content.split(",")[1] + " " + thePost.content.split(",")[0] + ".");
                                    /*var newSuper = lfgSuper.content.split("\n")[0];
                                    for (var z = 1; z < lfgSuper.content.split("\n").length; z++) {
                                        if (z != x) {
                                            newSuper += "\n" + lfgSuper.content.split("\n")[z];
                                        }
                                    }
                                    lfgSuper.edit(newSuper);
                                    lfgSuper = await bot.channels.cache.get(lfg2channel).messages.fetch("788838965461254164");*/
                                    lfg2cleaner([thePost.content.split("\n")[1], thePost.content.split("\n")[2], thePost.content.split("\n")[3], message.author.id]);
                                    return;
                                }
                                else {
                                    found.push(thePost.content.split("\n")[0]);
                                    thePost.edit(thePost.content + "\n" + message.author.id + " " + timeEnd);
                                    if (lfgSuper.content.split("\n")[x].split(" ")[1] > timeEnd) {
                                        var newSuper = lfgSuper.content.split("\n")[0];
                                        for (var z = 1; z < lfgSuper.content.split("\n").length; z++) {
                                            if (z != x) {
                                                newSuper += "\n" + lfgSuper.content.split("\n")[z];
                                            }
                                            else {
                                                newSuper += "\n" + thePost.id + " " + timeEnd;
                                            }
                                        }
                                        lfgSuper.edit(newSuper);
                                        lfgSuper = await bot.channels.cache.get(lfg2channel).messages.fetch("788838965461254164");
                                        setTimeout(function () {
                                            lfg2End(thePost.id)
                                        }, timer * 60000);
                                    }
                                    //thePost = await bot.channels.cache.get(lfg2channel).messages.fetch(lfgSuper.content.split("\n")[x].split(" ")[0]);
                                }
                            }
                        }
                    }
                    //for (var y = 0; y < thePost.content.split(":")[0].split("\n").length; y++) {
                    else {
                        for (var y = 0; y < thePost.content.split(",").length; y++) {
                        //if (!lowmessage.includes("edh")) {
                            /*if (lowmessage.includes(thePost.content.split(":")[0].split("\n")[y].split(" ")[0].toLowerCase()) && lowmessage.includes(thePost.content.split(":")[0].split("\n")[y].split(" ")[1].toLowerCase())) {
                                if (thePost.content.split(":")[1].split("\n").length >= lfgPlayerCount[lfgFormat.indexOf(thePost.content.split(":")[0].split("\n")[y].split(" ")[1])) {
                                    matchedFormats.push(thePost.content.split("\n")[y]);
                                }
                            }*/
                            if (lowmessage.includes(thePost.content.split(",")[y].toLowerCase())) {
                                if (lfgFormat.includes(thePost.content.split(",")[y])) {
                                    matchedFormats.push(thePost.content.split(",")[y]);
                                }
                                else {
                                    matchedPlatforms.push(thePost.content.split(",")[y]);
                                }
                            }
                        }
                    }
                    if (matchedPlatforms.includes("Arena") && !(matchedFormats.includes("Standard") || matchedFormats.includes("Brawl") || matchedFormats.includes("HBrawl") || matchedFormats.includes("Historic"))) {
                        matchedPlatforms.splice(matchedPlatforms.indexOf("Arena"), 1);
                    }
                    if (matchedFormats.length > 0 && matchedPlatforms.length > 0 && (matchedPlatforms != ["Arena"] || matchedFormats.includes("Standard") || matchedFormats.includes("Brawl") || matchedFormats.includes("HBrawl") || matchedFormats.includes("Historic"))) {
                        message.channel.send("<@" + message.author.id + "> <@" + thePost.content.split("\n")[1].split(" ")[0] + ">, you have been matched for a game of one of `" + matchedFormats + "` on one of `" + matchedPlatforms + "`.");
                        /*var newSuper = lfgSuper.content.split("\n")[0];
                        for (var z = 1; z < lfgSuper.content.split("\n").length; z++) {
                            if (z != x) {
                                newSuper += "\n" + lfgSuper.content.split("\n")[z];
                            }
                        }
                        lfgSuper.edit(newSuper);
                        lfgSuper = await bot.channels.cache.get(lfg2channel).messages.fetch("788838965461254164");*/
                        await lfg2cleaner([message.author.id, thePost.content.split("\n")[1].split(" ")[0]])
                        return;
                    }
                }
                else {
                    if (thePost.content.includes("EDH")) {
                        found.push(thePost.content.split("\n")[0]);
                    }
                }
            }
            var formats = [];
            var platforms = [];
            var commands = [];
            for (var x = 0; x < lfgFormat.length; x++) {
                if (lowmessage.includes(lfgFormat[x].toLowerCase())) {
                    if (lfgPlayerCount[x] == 2) {
                        formats.push(lfgFormat[x]);
                    }
                    else {
                        if (x > 6 || lowmessage.includes(" edh")) {
                            commands.push(lfgFormat[x]);
                        }
                    }
                }
            }
            for (var y = 0; y < lfgPlatform.length; y++) {
                if (lowmessage.includes(lfgPlatform[y].toLowerCase())) {
                    platforms.push(lfgPlatform[y]);
                }
            }
            if ((formats.length == 0 && commands.length == 0) || platforms.length == 0) {
                message.channel.send("You must specify at least one format and at least one platform.");
                return;
            }
            if (commands.length > 0) {
                var newSuper = lfgSuper.content;
                for (var z = 0; z < commands.length; z++) {
                    for (var i = 0; i < platforms.length; i++) {
                        if (platforms[i] != "Arena" && !found.includes(commands[z] + "," + platforms[i] + ",")) {
                            var newPost = await bot.channels.cache.get(lfg2channel).send(commands[z] + "," + platforms[i] + ",\n" + message.author.id + " " + timeEnd);
                            newSuper += "\n" + newPost.id + " " + timeEnd;
                            setTimeout(function () {
                                lfg2End(newPost.id)
                            }, timer * 60000);
                        }
                    }
                }
                if (newSuper != lfgSuper.content) {
                    lfgSuper.edit(newSuper);
                    lfgSuper = await bot.channels.cache.get(lfg2channel).messages.fetch("788838965461254164");
                }
            }
            if (formats.length == 0) {
                return;
            }
            var newPost = await bot.channels.cache.get(lfg2channel).send(formats + "," + platforms + ",\n" + message.author.id);
            lfgSuper.edit(lfgSuper.content + "\n" + newPost.id + " " + timeEnd);
            lfgSuper = await bot.channels.cache.get(lfg2channel).messages.fetch("788838965461254164");
            setTimeout(function () {
                lfg2End(newPost.id)
            }, timer * 60000);
            message.delete();
        }
    }
}

async function lfg2End(id) {
    if (lfgSuper.content.includes(id)) {
        thePost = await bot.channels.cache.get(lfg2channel).messages.fetch(id);
        if (thePost.content.split("\n").length > 2) {
            var d = new Date();
            var newPost = thePost.content.split("\n")[0];
            var times = [];
            for (var x = 1; x < thePost.content.split("\n").length; x++) {
                if (d < thePost.content.split("\n")[x].split(" ")[1]) {
                    newPost += "\n" + thePost.content.split("\n")[x];
                    times.push(thePost.content.split("\n")[x].split(" ")[1])
                }
            }
            if (newPost.split("\n").length > 1) {
                thePost.edit(newPost);
                var newSuper = lfgSuper.content.split("\n")[0];
                for (var z = 1; z < lfgSuper.content.split("\n").length; z++) {
                    if (lfgSuper.content.split("\n")[z].split(" ")[0] != id) {
                        newSuper += "\n" + lfgSuper.content.split("\n")[z];
                    }
                    else {
                        newSuper += "\n" + id + " " + Math.min(...times);
                    }
                }
                lfgSuper.edit(newSuper);
                lfgSuper = await bot.channels.cache.get(lfg2channel).messages.fetch("788838965461254164");
                setTimeout(function () {
                    lfg2End(thePost.id)
                }, Math.min(...times) - d);
                return;
            }
        }
        selfCleaner(thePost);
        var newSuper = lfgSuper.content.split("\n")[0];
        for (var z = 1; z < lfgSuper.content.split("\n").length; z++) {
            if (lfgSuper.content.split("\n")[z].split(" ")[0] != id) {
                newSuper += "\n" + lfgSuper.content.split("\n")[z];
            }
        }
        lfgSuper.edit(newSuper);
        lfgSuper = await bot.channels.cache.get(lfg2channel).messages.fetch("788838965461254164");
    }
}

async function lfg2cleaner(ids) {
    var newSuper = lfgSuper.content.split("\n")[0];
    for (var x = 1; x < lfgSuper.content.split("\n").length; x++) {
        var thePost = await bot.channels.cache.get(lfg2channel).messages.fetch(lfgSuper.content.split("\n")[x].split(" ")[0]);
        var newPost = thePost.content.split("\n")[0];
        var times = [];
        for (var y = 1; y < thePost.content.split("\n").length; y++) {
            if (!ids.includes(thePost.content.split("\n")[y].split(" ")[0])) {
                newPost += "\n" + thePost.content.split("\n")[y];
                if (thePost.includes("EDH")) {
                    times.push(thePost.content.split("\n")[y].split(" ")[1]);
                }
            }
        }
        if (newPost != thePost.content) {
            if (newPost.split("\n").length < 2) {
                lfg2End(thePost.id);
            }
            else {
                thePost.edit(newPost);
                newSuper += "\n" + thePost.id;
                if (times.length > 0) {
                    newSuper += " " + Math.min(...times);
                }
            }
        }
        else {
            newSuper += lfgSuper.content.split("\n")[x];
        }
    }
    if (newSuper != lfgSuper.content) {
        lfgSuper.edit(newSuper);
        lfgSuper = await bot.channels.cache.get(lfg2channel).messages.fetch("788838965461254164");
    }
}

async function leakCleaner(message) {
    if (message.channel.id == "641920724856078336") {
        for (var x = 1; x < leakList.content.split("\n").length; x++) {
            if (lowmessage.includes(leakList.content.split("\n")[x].toLowerCase())) {
                message.delete();
                message.channel.send("My records indicate this is a leak and belongs in <#298465947319140353>. If you can't see that channel, please check the <#360574122436329483> for how to access it. If this card has been officially spoiled recently, please ping an available mod and tell them to use the command `,removeleak CARDNAME`.");
            }
        }
    }
}

async function leakUpdate(message, isMod) {
    if (isMod && lowmessage.indexOf(",addleak ") == 0) {
        await leakList.edit(leakList.content + "\n" + message.substring(9));
        leakList = await bot.channels.cache.get(botCommandChannel[0]).messages.fetch("791694141335404584");
    }
    if (isMod && lowmessage.indexOf(",removeleak ") == 0) {
        var newLeakList = leakList.content.split("\n")[0];
        for (var x = 1; x < leakList.content.split("\n").length; x++) {
            if (!lowmessage.includes(leakList.content.split("\n")[x].toLowerCase())) {
                newLeakList += "\n" + leakList.content.split("\n")[x];
            }
        }
        leakList.edit(newLeakList);
        leakList = await bot.channels.cache.get(botCommandChannel[0]).messages.fetch("791694141335404584");
    }
}

function selfCleaner(message) {
    message.delete();
}

bot.on("message", async function(message) {
    lowmessage = message.content.toLowerCase();

    if (message.author.id == "135999597947387904" && message.content.indexOf(",eval ") == 0 && message.channel.id != "531433553225842700") {
        message.channel.send("```javascript\n" + eval(message.content.split(",eval ")[1]) + "```");
    }

    if (message.author.id == "135999597947387904" && message.content.indexOf(",teval ") == 0 && message.guild.id == guildID[0]) {
        message.channel.send("```javascript\n" + eval(message.content.split(",teval ")[1]) + "```");
    }

    if (message.guild != null && message.guild.id == guildID[2]) {
        var isMod = false;
        var messageMember = await message.guild.members.fetch(message.author);
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
    
    await leakCleaner(message);

    if (message.author.bot) {return;}

    var isMod = false;
    var messageMember = await bot.guilds.cache.get(guildID[1]).members.fetch(message.author);
    if (messageMember.roles.cache.has(modRole)) { isMod = true; }

    await links(message);

    await mute(message, isMod);

    await kick(message, isMod);

    await ban(message, isMod);

    await offlineChecker(message.channel);

    await help(message.channel, isMod);

    await cache(message);

    await manualReset(isMod);

    await spoilerUpdate(message, isMod);
    
    await leakUpdate(message, isMod);

    if (message.channel.id == "788824774389399573" && message.attachments.size == 0) {
        message.delete();
    }

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

    await lfgTest2(message);

    if (message.guild.id == guildID[3]) {
        await lfgTest1(message);

        
    }
})

bot.on("messageUpdate", async function(oldMessage, newMessage) {
    lowmessage = newMessage.content.toLowerCase();
    var messageMember = await newMessage.guild.members.fetch(newMessage.author);
    await badWordsReporter(newMessage, messageMember, true);
})

bot.on("guildMemberAdd", function(member) {
    if (logMessage.content.includes(member.id + " ")) { member.roles.add(member.guild.roles.cache.get(muteRole)); }
    var d = new Date();
    var newBlood = new Discord.MessageEmbed().setAuthor(member.displayName + " (" + member.id + ")", member.user.displayAvatarURL()).addField("Joined", d).setColor('GREEN');
    bot.channels.cache.get("693709957014749196").send(newBlood);
    if (member.user.username.toLowerCase().includes("girls are not human")) {
        member.ban();
        bot.channels.cache.get(logChannel[1]).send("New member " + member.user.username + " (" + member.id + ") banned for intolerant username.");
    }
    if (member.user.username.toLowerCase().includes("twitter.com/h0nde")) {
        member.ban();
        bot.channels.cache.get(logChannel[1]).send("New member " + member.user.username + " (" + member.id + ") banned for being a raid bot.");
    }
})

bot.on("guildMemberRemove", async function(member) {
    var d = new Date();
    if (member.roles.cache.has(muteRole) && !logMessage.content.includes(member.id + " ")) {
        var unmuteTime = d.getTime() + 604800000;
        logMessage.edit(logMessage.content + "\n" + member.id + " " + unmuteTime);
        bot.channels.cache.get(logChannel[1]).send(member.displayName + " (id " + member.id + ") left while muted with no fixed duration and has been muted for one week in case they return. If you wish to change the duration, please use `,mute HOURS <@" + member.id + ">`.");
    }
    var newBlood = new Discord.MessageEmbed().setAuthor(member.displayName + " (" + member.id + ")", member.user.displayAvatarURL()).addField("Left", d).setColor('RED');
    const entry = await member.guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())
    const entry2 = await member.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first())
    if (entry != null && (entry.target.id === member.id) && (entry.createdTimestamp > (Date.now() - 5000))) {
        await newBlood.setFooter("Banned by " + entry.executor.username, entry.executor.displayAvatarURL());
    }
    else if (entry2 != null && (entry2.target.id === member.id) && (entry2.createdTimestamp > (Date.now() - 5000))) {
        await newBlood.setFooter("Kicked by " + entry2.executor.username, entry2.executor.displayAvatarURL());
    }
    await bot.channels.cache.get("693709957014749196").send(newBlood);
})

bot.on("guildMemberUpdate", function(oldMember, newMember) {
    if (newMember.roles.cache.has(muteRole) && newMember.roles.cache.has(leakRole)) { newMember.roles.remove(leakRole); }
    if ((newMember.roles.cache.has(muteRole) || newMember.roles.cache.has("796526525498523648")) && newMember.roles.cache.has(seriousRole)) { newMember.roles.remove(seriousRole); }
})

bot.on("messageReactionAdd", async function(messageReaction, user) {
    if (messageReaction.message.id == roleMessageID) {
        member = await messageReaction.message.guild.members.fetch(user);
        if(messageReaction.emoji.name == "⛔" && member.roles.cache.has("796526525498523648")) {
            return;
        }
        if(roleReact.includes(messageReaction.emoji.name)) {
            member.roles.add(roleID[roleReact.indexOf(messageReaction.emoji.name)]);
        }
    }
})

bot.on("messageReactionRemove", async function(messageReaction, user) {
    if (messageReaction.message.id == roleMessageID) {
        if(roleReact.includes(messageReaction.emoji.name)) {
            member = await messageReaction.message.guild.members.fetch(user);
            member.roles.remove(roleID[roleReact.indexOf(messageReaction.emoji.name)]);
        }
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

bot.on("presenceUpdate", function(oldPresence, newPresence) {
    if (newPresence.userID == "695434707264995350" || newPresence.userID == "676989741173964800") {
        if (newPresence.status == "offline") {
            bot.channels.cache.get("531433553225842700").send("<@135999597947387904>, <@" + newPresence.userID + "> appears to be offline.");
        }
    }
})

bot.login(process.env.token)
