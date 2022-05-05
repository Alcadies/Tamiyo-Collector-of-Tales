const Discord = require("discord.js")
const Intents = Discord.Intents;
const Permissions = Discord.Permissions;
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
var bot = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_PRESENCES], partials: ['MESSAGE', 'CHANNEL', 'REACTION'], allowedMentions: { parse: ['users', 'roles'], repliedUser: true } });
var badWords = ["gay", "fag", "retard", "cuck", "slut", "autis", "discord.gg/", "discordapp.com/invite/", "nigg", "💣", "cunt"];
var badCards = ["Invoke Prejudice", "Cleanse", "Stone-Throwing Devils", "Pradesh Gypsies", "Jihad", "Imprison", "Crusade"];
var lowmessage = "";
var logChannel = ["531433553225842700", "633429050089799687", "729753384407662602"];
var botCommandChannel = ["531433553225842700", "213126280323923970"];
var modRole = "407400920746426368" /*"606659573159428169"*/;
var muteRole = "280463986531631104" /*"586432252901195777"*/;
var guildId = ["531433553225842698", "162586705524686848", "729748959991562330", "778058673783046155"]; //Testing, M&C, LGS, M&CBeta
var roleReact = ["💧", "🧙", "🧙‍♀️", "🧙‍♂️", "⛔"];
var roleId = ["638981519116861442", "788827820830490634", "788827799837474896", "788827774541889566", "720433065893036113"];
var roleReactLGS = ["🧙", "🧙‍♀️", "🧙‍♂️", "💸", "🎲", "🧊", "📦", "🇸", "🧑‍🚀", "🇲", "🇵", "🇱", "🇨", "DandD", "fleshandblood", "mtg", "pokeball", "ssb", "🏠", "🔓"];
var roleIdLGS = ["865861704042545162", "865861650120572939", "865861476409409576", "865863180428378122", "865862019550019594", "865862047619350539", "865862116334239745", "865861745746640956", "865861790096424961", "865861837811482684", "865861891268018196", "865861934703443968", "865861969378803713", "958886784580845659", "958886862255181845", "958886446540922900", "958886689449840660", "958889669557375046", "958871797204406324", "958891658123018270"];
var lfgFormat = ["Standard", "Pioneer", "Modern", "Legacy", "Vintage", "Pauper", "EDH", "Canlander", "Historic", "Brawl", "BHrawl", "cEDH"];
var lfgPlayerCount = [2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 4]
var lfgPlatform = ["Arena", "MTGO", "XMage", "Cockatrice", "Spelltable", "Untap", "Tabletop"];
var lfgPost = [["778206375921975297", 0, 0, 0, 0, 0, 0, 0, "", "", "", 0], ["778206460991635466", "", "", "", "", "", "778206512077602816", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", ""]]
var lfgSuper = "";
var lfg2channel = "788823431428309052";
var leakRole = "638981519116861442";
var seriousRole = "720433065893036113";
var roleMessageId = "788829000860041236";
var roleChannelId = "788822921694281749";
var roleMessageIdLGS = ["865864634875379713", "960268264401952788", "958876127265435688"];
var roleChannelIdLGS = "864322761270624266";
var elkRole = "640599175326728203";
var modChannel = ["280511995734917120", "407401913253101601", "729755366371491953"];
var logMessage = "";
var deleteListMC = "";
var reportListMC = "";
var exceptionListMC = "";
var deleteListLGS = "";
var reportListLGS = "";
var exceptionListLGS = "";
var setCodes = "";
var spoilerSets = "";
var reprintList = "";
var leakList = "";
var memeList = ["https://c1.scryfall.com/file/scryfall-cards/large/front/f/e/fec6b189-97e7-4627-9785-a9ce2f1ad89f.jpg?1562537398", "https://c1.scryfall.com/file/scryfall-cards/large/front/5/a/5a5841fa-4f30-495a-b840-3ef5a2af8fad.jpg?1562494149", "https://c1.scryfall.com/file/scryfall-cards/large/front/e/b/eb9963e0-a22a-4a64-aa0c-b7c67c5fee96.jpg?1629919504", "https://c1.scryfall.com/file/scryfall-cards/large/front/f/3/f3da28f3-2b23-47ad-975a-6b7b204efecb.jpg?1601874070", "https://c1.scryfall.com/file/scryfall-cards/large/front/7/f/7f7aa8e1-ada6-491a-b96f-43e89dae7834.jpg?1627082881", "https://c1.scryfall.com/file/scryfall-cards/large/front/6/f/6f75946b-1690-43cc-993c-d4e451a1a41c.jpg?1562921261", "https://c1.scryfall.com/file/scryfall-cards/large/front/9/6/96c9c4d1-dd43-4156-b25f-0e707b6c4b23.jpg?1616400037", "https://c1.scryfall.com/file/scryfall-cards/large/front/e/d/edc71122-2951-43eb-8ca8-1cda6d231013.jpg?1562861827", "https://c1.scryfall.com/file/scryfall-cards/large/front/f/1/f11f2e82-4970-4298-a3a7-c42cb1780eb5.jpg?1644526972", "https://c1.scryfall.com/file/scryfall-cards/large/front/d/2/d28056c7-c58d-4986-a45c-c9e55aed23a1.jpg?1555040601"]

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
        var mutedId = str.split(" ")[0];
        var d = new Date();
        var timer = 0;
        if (str.includes("\n")) { timer = parseInt(str.substring(str.indexOf(" ") + 1, str.indexOf("\n"))); }
        else { timer = parseInt(str.substring(str.indexOf(" "))); }
        timer -= d.getTime();
        if (timer <= 0) { unmute(mutedId); }
        else {
            setTimeout(function () {
                unmute(mutedId);
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
        var messageId = str.split(" ")[0];
        var d = new Date();
        var timer = 0;
        if (str.includes("\n")) { timer = parseInt(str.substring(str.indexOf(" ") + 1, str.indexOf("\n"))); }
        else { timer = parseInt(str.substring(str.indexOf(" "))); }
        timer -= d.getTime();
        if (timer <= 0) { lfg2End(messageId); }
        else {
            setTimeout(function () {
                lfg2End(messageId);
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
    deleteListLGS = await bot.channels.cache.get(logChannel[2]).messages.fetch("729754971947663381");
    reportListLGS = await bot.channels.cache.get(logChannel[2]).messages.fetch("729755004054798379");
    exceptionListLGS = await bot.channels.cache.get(logChannel[2]).messages.fetch("958855188851077190");
    deleteListMC = await bot.channels.cache.get(logChannel[1]).messages.fetch("958844796066209834");
    reportListMC = await bot.channels.cache.get(logChannel[1]).messages.fetch("958844796552769536");
    exceptionListMC = await bot.channels.cache.get(logChannel[1]).messages.fetch("958844796858925086");
    setCodes = await bot.channels.cache.get(logChannel[0]).messages.fetch("751124446701682708");
    spoilerSets = await bot.channels.cache.get("407401913253101601").messages.fetch("639173870472921118");
    reprintList = await bot.channels.cache.get(logChannel[0]).messages.fetch("756507174200541255");
    leakList = await bot.channels.cache.get(botCommandChannel[0]).messages.fetch("791694141335404584");
    bot.channels.cache.get(roleChannelId).messages.fetch(roleMessageId);
    //watchingMessage();
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
    let watchingType = Math.floor(Math.random() * 45)
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
        case 43: observing = "New Capenna"; break;
        case 44: playingMessage(); return;
    }
    bot.user.setActivity(observing, { type: 'WATCHING'});
    setTimeout(function() {
        watchingMessage();
    }, duration)
}

/*async function badWordsReporter(message, messageMember, isEdit) {
    if (message.channel.id == modChannel || !message.guild || message.guild.id != guildId[1]) { return; }
    lowmessage = lowmessage.replace(/:gwomogay:/g, "").replace(/https:\/\/deckstats.net\/decks\/143801\/1486600-bad-lightsworns?share_key=0skv3mlfagytghja/g, "").replace(":heart_eyes_gay", "");
    var reporting = false;
    for (let i = 0; i < badWords.length; i++) {
        if (lowmessage.indexOf(badWords[i]) != -1) {
            reporting = true;
            break;
        }
    }
    if (reporting) {
        let badWordsLog = new Discord.MessageEmbed().setAuthor(messageMember.displayName + " (" + messageMember.id + ")", messageMember.user.displayAvatarURL()).setTitle("Questionable Content:").addField(messageMember.displayName + " (" + message.author.id + ")", "<#" + message.channel.id + ">: " + message.content).addField("Context:", message.url).setColor('RED');
        if (isEdit) {
            badWordsLog.setFooter("This is an edit.")
        }
        await bot.channels.cache.get(logChannel[1]).send({ embeds: [badWordsLog] });
    }
}*/

function badWordsReporter(message, messageMember, isEdit) {
    try {
        if (modChannel.includes(channel.id) || !message.guild) { return; }
        let server = guildId.indexOf(message.guild.id);
        if (server == 1) {
            deleteList = deleteListMC;
            reportList = reportListMC;
            exceptionList = exceptionListMC;
        }
        else if (server == 2) {
            deleteList = deleteListLGS;
            reportList = reportListLGS;
            exceptionList = exceptionListLGS;
        }
        else {
            return;
        }
        let messageCon = " " + message.content.toLowerCase().replaceAll(":heart_eyes_gay", "").replaceAll("á", "a").replaceAll("â", "a").replaceAll("ä", "a").replaceAll("å", "a").replaceAll("ã", "a").replaceAll("à", "a").replaceAll("è", "e").replaceAll("ê", "e").replaceAll("é", "e").replaceAll("ë", "e").replaceAll("ì", "i").replaceAll("í", "i").replaceAll("ï", "i").replaceAll("î", "i").replaceAll("ñ", "n").replaceAll("ò", "o").replaceAll("õ", "o").replaceAll("ø", "o").replaceAll("ô", "o").replaceAll("ö", "o").replaceAll("ó", "o").replaceAll("ù", "u").replaceAll("ú", "u").replaceAll("û", "u").replaceAll("ü", "u").replaceAll("ÿ", "y").replaceAll("æ", "ae").replaceAll("©", "c").replaceAll("®", "r").replaceAll("œ", "oe").replaceAll("¥", "y").replaceAll("ƒ", "f").replaceAll("ª", "a").replaceAll("ç", "c").replaceAll("¢", "c").replaceAll("†", "t").replaceAll("ﬁ", "fi").replaceAll("ﬂ", "fl") + " ";

        if (!message.author) {return;}
        if (message.author.bot) {return;}
        let badWordsLog = "";
        let badWordFound = "";
        var reporting = false;
        for (var i = 1; i < exceptionList.content.split("\n").length; i++) {
            messageCon = messageCon.replaceAll(exceptionList.content.split("\n")[i], "🛑");
        }
        for (var j = 1; j < deleteList.content.split("\n").length; j++) {
            if (messageCon.includes(deleteList.content.split("\n")[j])) {
                message.delete();
                reporting = true;
                if (badWordFound) {
                    badWordFound += ", "
                }
                badWordFound += deleteList.content.split("\n")[j];
            }
        }
        for (var k = 1; k < reportList.content.split("\n").length; k++) {
            if (messageCon.includes(reportList.content.split("\n")[k])) {
                reporting = true;
                if (badWordFound) {
                    badWordFound += ", "
                }
                badWordFound += reportList.content.split("\n")[k];
            }
        }
        if (reporting) {
            badWordsLog = new Discord.MessageEmbed().setAuthor(messageMember.displayName + " (" + messageMember.id + ")", messageMember.user.displayAvatarURL()).setTitle("Questionable Content:").addField(messageMember.displayName + " (" + message.author.id + ")", "<#" + message.channel + ">: " + message.content).addField("Context:", message.url).setColor('RED');
            if (isEdit) {
                badWordsLog.setFooter("This is an edit.");
            }
            if (badWordFound) {
                badWordsLog.addField("Term(s) contained:", badWordFound);
            }
            bot.channels.cache.get(logChannel[server]).send({ embeds: [badWordsLog] });
        }
    }
    catch(err) {
        logger.error("Something went wrong reporting message: " + message.url);
    }
}

/*async function mute(message, isMod) {
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
}*/

async function muteCommand(interaction) {
    try {
        let muteTime = 8.64e15;
        if (interaction.options.getNumber('time')) {
            let n = interaction.options.getNumber('time');
            let x = 3600000;
            if (!interaction.options.getString('unit')) {
                switch(interaction.options.getString('unit')) {
                    case 'seconds':
                    x = 1000;
                    break;
                    case 'minutes':
                    x = 60000;
                    break;
                    case 'hours':
                    x = 3600000;
                    break;
                    case 'days':
                    x = 86400000;
                    break;
                    case 'weeks':
                    x = 604800000;
                    break;
                }
            }
            let muteTime = Math.min((Date.now() + (n * x)), muteTime);
        }
        let muteMember = await interaction.guild.members.fetch(interaction.options.getUser('member'));
        if (interaction.options.getString('reason')) {
            await muteMember.disableCommunicationUntil(muteTime, interaction.options.getString('reason'));
            interaction.reply({ content: "Member <@" + muteMember.id + "> muted until " + new Date(muteTime) + " for " + interaction.options.getString('reason') + "."});
        }
        else {
            await muteMember.disableCommunicationUntil(muteTime);
            interaction.reply({ content: "Member <@" + muteMember.id + "> muted until " + new Date(muteTime) + "."});
        }
    }
    catch(err) {
        logger.error("Something went wrong with muteCommand.");
    }
}

async function unmuteCommand(interaction) {
    try {
        let muteMember = await interaction.guild.members.fetch(interaction.options.getUser('member'));
        let unmuted = false;
        if (muteMember.roles.has(muteRole)) {
            muteMember.roles.remove(muteRole);
            unmuted = true;
        }
        if (muteMember.communicationDisabledUntilTimestamp) {
            if(interaction.options.getString('reason')) {
                muteMember.disableCommunicationUntil(null, interaction.options.getString('reason'));
                unmuted = true;
            }
            else {
                muteMember.disableCommunicationUntil(null);
                unmuted = true;
            }
        }
        if (!unmuted) {
            interaction.reply({ content: "That member does not appear to be muted right now.", ephemeral: true });
            return;
        }
        if (interaction.options.getString('reason')) {
                await muteMember.disableCommunicationUntil(muteTime, interaction.options.getString('reason'));
                interaction.reply({ content: "Member <@" + muteMember.id + "> unmuted for " + interaction.options.getString('reason') + "."});
            }
            else {
                await muteMember.disableCommunicationUntil(muteTime);
                interaction.reply({ content: "Member <@" + muteMember.id + "> unmuted."});
            }
        }
    }
    catch(err) {
        logger.error("Something went wrong with unmuteCommand");
    }
}

async function banCommand(interaction) {
    try {
        let muteMember = await interaction.guild.members.fetch(interaction.options.getUser('member'));
        if (!muteMember.bannable) {
            interaction.reply({ content: "I am unable to ban this member.", ephemeral: true });
            return;
        }
        let day = 0;
        if (interaction.options.getNumber('delete-messages')) {
            day = interaction.options.getNumber('delete-messages');
        }
        if (interaction.options.getString('reason')) {
            muteMember.ban({ days: day, reason: interaction.options.getString('reason')});
            interaction.reply({ content: "Member <@" + muteMember.id + "> banned for " + interaction.options.getString('reason') + "."});
        }
        else {
            muteMember.ban({ days: day })
            interaction.reply({ content: "Member <@" + muteMember.id + "> banned."});
        }
    }
    catch(err) {
        logger.error("Something went wrong with banCommand.");
    }
}

async function kickCommand(interaction) {
    try {
        let muteMember = await interaction.guild.members.fetch(interaction.options.getUser('member'));
        if (!muteMember.kickable) {
            interaction.reply({ content: "I am unable to kick this member.", ephemeral: true });
            return;
        }
        if (interaction.options.getString('reason')) {
            muteMember.ban(interaction.options.getString('reason'));
            interaction.reply({ content: "Member <@" + muteMember.id + "> kicked for " + interaction.options.getString('reason') + "."});
        }
        else {
            muteMember.ban()
            interaction.reply({ content: "Member <@" + muteMember.id + "> kicked."});
        }
    }
    catch(err) {
        logger.error("Something went wrong with kickCommand.");
    }
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
    if (!bot.guilds.cache.get(guildId[1]).members.cache.has(id)) {
        bot.channels.cache.get(logChannel[1]).send("Member <@" + id + "> has left before scheduled unmute time.");
    }
    else {
        member = await bot.guilds.cache.get(guildId[1]).members.fetch(id);
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
                message.channel.send("Please include a mention for the person or people you would like to ban.  If they cannot see this channel, this can be accomplished with `<@Id>`.");
            }
            else {
                message.mentions.users.forEach(async function(value, key) {
                    if (bot.guilds.cache.get(guildId[1]).members.cache.has(key)) {
                        var banMember = await bot.guilds.cache.get(guildId[1]).members.fetch(key);
                        if (banMember.roles.cache.has(modRole)) {
                            message.channel.send("I'm sorry, I won't ban another mod or admin.");
                        }
                        if (banMember.bannable) {
                            if (message.content.substring(message.content.lastIndexOf(">")).length > 1) { await banMember.send("You've been banned from *Magic & Chill* for the following reason: " + message.content.substring(message.content.lastIndexOf(">"))); }
                            await bot.guilds.cache.get(guildId[1]).members.ban(banMember.user, { reason: message.content.substring(message.content.lastIndexOf("> ")) });
                            await message.channel.send("Member " + banMember.displayName + " (id " + key + ") banned.");
                        }
                    }
                    else {
                        bot.guilds.cache.get(guildId[1]).members.ban(value);
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

async function links(interaction) {
    const data = interaction.options.getString('topic');
    switch (data) {
        case 'chains':
        await interaction.reply({ embeds: [new Discord.MessageEmbed().setTitle("Follow this __once__ per draw for Chains of Mephistopheles").setImage("https://media.discordapp.net/attachments/205775955434668032/776476567144366080/tumblr_moqdowzQCw1s0l902o1_r1_1280.png")]});
        break;
        case 'syntax':
        await interaction.reply("Scryfall search syntax, also used by <@240537940378386442>: https://scryfall.com/docs/syntax");
        break;
        case 'proxy':
        await interaction.reply({ embeds: [new Discord.MessageEmbed().setTitle("Proxies vs Counterfeits").setImage("https://media.discordapp.net/attachments/375903183563915265/724555752974581770/image0.png").addField("Proxy Types:", "There are several different ways to make proxies for casual play.  Here are a few:\n\nYou can print out an image of the card on a slip of paper and put it over a real card (Overgrown Tomb, Black Lotus, Misty Rainforest).  No one, no matter how unfamiliar with authenticity, will think this is real if they pull it out of the sleeve, but it looks nice and is probably the most readable option.  The downside is the printer ink can be expensive to print out so many images.").addField("Proxies Cont.", "You can write the name (and if you want also the rules text) out by hand on a piece of paper and put it over a real card (Rest in Peace, Troll Ascetic, Scattered Groves).  It's even easier than the above to tell this is not real and is incredibly cheap to do, but it also doesn't look as nice.\n\nYou can write the name (and if you want also the rules text) directly on a real card (Wall of Omens).  It will permanently mark the card you use and again is very easy to tell is not a real version of what it's proxying, but it's also the least likely to shuffle any different as there's no second thing in the sleeve.").addField("Counterfeits:", "Counterfeits on the other hand look like real cards.  Depending on the quality of the counterfeit and how knowledgeable the examiner is, it may be noticeable in a sleeve, when you're holding it, upon very close examination, or not at all.  However in all cases it will likely pass as real to someone who doesn't know to look for it or what to look for.  No matter why you have counterfeits, knowingly acquiring them is supporting their ability to make more and deceive people into buying full price fakes.\n\nRemember, just because you think it can't be faked doesn't mean people aren't trying.").setColor('RED')]});
        break;
        case 'colorpie':
        await interaction.reply("Mechanical Color Pie 2021: https://magic.wizards.com/en/articles/archive/making-magic/mechanical-color-pie-2021-10-18");
        break;
        case 'platforms':
        await interaction.reply({ embeds: [new Discord.MessageEmbed().setTitle("MTG Platforms:").addField("Arena:", "An official platform with rules enforcement that is free-to-play, though allows in-app purchases. Cards are obtained by gameplay or spending in game currencies. Has all Standard sets starting with *Ixalan* and a variety of other cards. Only supports games with two players. Available on Windows, Mac, Android, and iOS. https://magic.wizards.com/en/mtgarena").addField("Magic: the Gathering Online", "Often called MTGO or MODO. Another official platform with rules enforcement. Has almost all cards in Magic. Cards are mostly obtained through purchases via real-world currency. Only available on Windows. https://magic.wizards.com/en/mtgo").addField("Spelltable", "An official website that facilitates webcam play with paper Magic decks. Can directly display life totals, commander damage, and some other info, as well as being able to display a larger version of cards. https://spelltable.wizards.com").addField("XMage", "An unofficial platform with rules enforcement. Has almost every card as well as a few custom cards and allows players to use cards without needing to acquire them. Works on any computer with Java. https://xmage.de/").addField("Cockatrice", "An unofficial platform without rules enforcement. Players can play any card without needing to acquire them, and can support custom cards. Available on any computer. https://cockatrice.github.io").addField("Untap", "An unofficial website without rules enforcement. Players can play any card without needing to acquire them. Can upgrade to premium for extra perks. https://untap.in").addField("Tabletop Simulator", "A Steam application (about $20 USD when not on sale) designed for playing any sort of tabletop game.  There are several mods for Magic, which generally don't have any form of rules enforcement but use Tabletop Simulator to directly simulate a physical table.")] });
        break;
        case 'modern':
        await interaction.reply({ embeds: [new Discord.MessageEmbed().setTitle("Modern Legal Sets:").addField("Non-Pioneer", "Modern Horizons, Modern Horizons 2\nEighth Edition, Mirrodin, Darksteel, Fifth Dawn\nChampions of Kamigawa, Betrayers of Kamigawa, Saviors of Kamigawa, Ninth Edition\nRavnica: City of Guilds, Dissention, Guildpact, Coldsnap\nTime Spiral, Planar Chaos, Future Sight, Tenth Edition\nLorwyn, Morningtide, Shadowmoor, Eventide\nShards of Alara, Conflux, Alara Reborn, Magic 2010\nZendikar, Worldwake, Rise of the Eldrazi, Magic 2011\nScars of Mirrodin, Mirrodin Besieged, New Phyrexia, Magic 2012\nInnistrad, Dark Ascension, Avacyn Restored, Magic 2013").addField("Pioneer", "\nReturn to Ravnica, Gatecrash, Dragon's Maze, Magic 2014\nTheros, Born of the Gods, Journey Into Nyx, Magic 2015\nKhans of Tarkir, Fate Reforged, Dragons of Tarkir, Magic Origins\nBattle for Zendikar, Oath of the Gatewatch, Shadows Over Innistrad, Eldritch Moon\nKaladesh, Aether Revolt, Amonkhet, Hour of Devastation\nIxalan, Rivals of Ixalan, Dominaria, Magic 2019\nGuilds of Ravnica, Ravnica Allegiance, War of the Spark, Magic 2020\nThrone of Eldraine, Theros: Beyond Death, Ikoria: Lair of Behemoths, Magic 2021\nZendikar Rising, Kaldheim, Strixhaven: School of Mages, Dungeons & Dragons: Adventures in Forgotten Realms\nInnistrad: Midnight Hunt, Innistrad: Crimson Vow, Kamigawa: Neon Dynasty")]});
        break;
        case 'pioneer':
        await interaction.reply({ embeds: [new Discord.MessageEmbed().addField("Pioneer", "\nReturn to Ravnica, Gatecrash, Dragon's Maze, Magic 2014\nTheros, Born of the Gods, Journey Into Nyx, Magic 2015\nKhans of Tarkir, Fate Reforged, Dragons of Tarkir, Magic Origins\nBattle for Zendikar, Oath of the Gatewatch, Shadows Over Innistrad, Eldritch Moon\nKaladesh, Aether Revolt, Amonkhet, Hour of Devastation\nIxalan, Rivals of Ixalan, Dominaria, Magic 2019\nGuilds of Ravnica, Ravnica Allegiance, War of the Spark, Magic 2020\nThrone of Eldraine, Theros: Beyond Death, Ikoria: Lair of Behemoths, Magic 2021\nZendikar Rising, Kaldheim, Strixhaven: School of Mages, Dungeons & Dragons: Adventures in Forgotten Realms\nInnistrad: Midnight Hunt, Innistrad: Crimson Vow, Kamigawa: Neon Dynasty")]});
        break;
        case 'unsets':
        await interaction.reply("Unglued QAS: https://magic.wizards.com/en/articles/archive/feature/unglued-qas-questions-asked-sometimes\nUnhinged FAQTIWDAWCC: https://magic.wizards.com/en/articles/archive/feature/unhinged-faqtiwdawcc\nUnstable FAQAWASLFAQPAFTIDAWABIAJTBT: https://magic.wizards.com/en/articles/archive/news/unstable-faqawaslfaqpaftidawabiajtbt-2017-12-06\nUnsanctioned FAQTIKPWAMOMBSIATHTTASTTTETMOTWSTAAA: https://magic.wizards.com/en/articles/archive/feature/unsanctioned-faq-2020-02-25\nMystery Booster release notes: https://magic.wizards.com/en/articles/archive/feature/mystery-booster-release-notes-2019-11-11");
        break;
    }
    /*if (lowmessage.indexOf(",mystery") == 0 || lowmessage.indexOf(",mb1") == 0 || lowmessage.indexOf(",cmb1") == 0) { message.channel.send("Mystery Booster release notes: https://magic.wizards.com/en/articles/archive/feature/mystery-booster-release-notes-2019-11-11")}
    if (lowmessage.indexOf(",unsanctioned") == 0) { message.channel.send("Unsanctioned FAQTIKPWAMOMBSIATHTTASTTTETMOTWSTAAA: https://magic.wizards.com/en/articles/archive/feature/unsanctioned-faq-2020-02-25"); }
    if (lowmessage.indexOf(",unstable") == 0) { message.channel.send("Unstable FAQAWASLFAQPAFTIDAWABIAJTBT: https://magic.wizards.com/en/articles/archive/news/unstable-faqawaslfaqpaftidawabiajtbt-2017-12-06"); }
    if (lowmessage.indexOf(",unhinged") == 0) { message.channel.send("Unhinged FAQTIWDAWCC: https://magic.wizards.com/en/articles/archive/feature/unhinged-faqtiwdawcc"); }
    if (lowmessage.indexOf(",unglued") == 0) { message.channel.send("Unglued QAS: https://magic.wizards.com/en/articles/archive/feature/unglued-qas-questions-asked-sometimes"); }
    if (lowmessage.indexOf(",colorpie") == 0) { message.channel.send("Mechanical Color Pie 2017: https://magic.wizards.com/en/articles/archive/making-magic/mechanical-color-pie-2017-2017-06-05\nMajor changes since then:\nGreen is now secondary in haste and black is tertiary in it.\nBlack is secondary in flash.\nBlack is now allowed to cause opponents to sacrifice enchantments."); }
    if (lowmessage.indexOf(",pioneer") == 0) { message.channel.send("Return to Ravnica, Gatecrash, Dragon's Maze, Magic 2014\nTheros, Born of the Gods, Journey Into Nyx, Magic 2015\nKhans of Tarkir, Fate Reforged, Dragons of Tarkir, Magic Origins\nBattle for Zendikar, Oath of the Gatewatch, Shadows Over Innistrad, Eldritch Moon\nKaladesh, Aether Revolt, Amonkhet, Hour of Devastation\nIxalan, Rivals of Ixalan, Dominaria, Magic 2019\nGuilds of Ravnica, Ravnica Allegiance, War of the Spark, Magic 2020\nThrone of Eldraine, Theros: Beyond Death, Ikoria: Lair of Behemoths, Magic 2021\nZendikar Rising, Kaldheim, Strixhaven: School of Mages"); }
    if (lowmessage.indexOf(",modern") == 0) { message.channel.send("Modern Horizons\nEighth Edition, Mirrodin, Darksteel, Fifth Dawn\nChampions of Kamigawa, Betrayers of Kamigawa, Saviors of Kamigawa, Ninth Edition\nRavnica: City of Guilds, Dissention, Guildpact, Coldsnap\nTime Spiral, Planar Chaos, Future Sight, Tenth Edition\nLorwyn, Morningtide, Shadowmoor, Eventide\nShards of Alara, Conflux, Alara Reborn, Magic 2010\nZendikar, Worldwake, Rise of the Eldrazi, Magic 2011\nScars of Mirrodin, Mirrodin Besieged, New Phyrexia, Magic 2012\nInnistrad, Dark Ascension, Avacyn Restored, Magic 2013\nReturn to Ravnica, Gatecrash, Dragon's Maze, Magic 2014\nTheros, Born of the Gods, Journey Into Nyx, Magic 2015\nKhans of Tarkir, Fate Reforged, Dragons of Tarkir, Magic Origins\nBattle for Zendikar, Oath of the Gatewatch, Shadows Over Innistrad, Eldritch Moon\nKaladesh, Aether Revolt, Amonkhet, Hour of Devastation\nIxalan, Rivals of Ixalan, Dominaria, Magic 2019\nGuilds of Ravnica, Ravnica Allegiance, War of the Spark, Magic 2020\nThrone of Eldraine, Theros: Beyond Death, Ikoria: Lair of Behemoths, Magic 2021\nZendikar Rising, Kaldheim, Strixhaven: School of Mages"); }
    if (lowmessage.indexOf(",xmage") == 0 || lowmessage.indexOf(",cockatrice") == 0) { message.channel.send("XMage and Cockatrice are the two most common ways to play *Magic* for free online.  Both support using (almost) any card and a variety of formats.  The major difference is that XMage has rules enforcement, similar to MTGO or Arena, while Cockatrice does not.  They can be found at http://xmage.de/ and http://cockatrice.github.io/"); }
    if (lowmessage.indexOf(",proxy") == 0 || lowmessage.indexOf(",counterfeit") == 0) { message.channel.send({ embeds: [new Discord.MessageEmbed().setTitle("Proxies vs Counterfeits").setImage("https://media.discordapp.net/attachments/375903183563915265/724555752974581770/image0.png").addField("Proxy Types:", "There are several different ways to make proxies for casual play.  Here are a few:\n\nYou can print out an image of the card on a slip of paper and put it over a real card (Overgrown Tomb, Black Lotus, Misty Rainforest).  No one, no matter how unfamiliar with authenticity, will think this is real if they pull it out of the sleeve, but it looks nice and is probably the most readable option.  The downside is the printer ink can be expensive to print out so many images.").addField("Proxies Cont.", "You can write the name (and if you want also the rules text) out by hand on a piece of paper and put it over a real card (Rest in Peace, Troll Ascetic, Scattered Groves).  It's even easier than the above to tell this is not real and is incredibly cheap to do, but it also doesn't look as nice.\n\nYou can write the name (and if you want also the rules text) directly on a real card (Wall of Omens).  It will permanently mark the card you use and again is very easy to tell is not a real version of what it's proxying, but it's also the least likely to shuffle any different as there's no second thing in the sleeve.").addField("Counterfeits:", "Counterfeits on the other hand look like real cards.  Depending on the quality of the counterfeit and how knowledgeable the examiner is, it may be noticeable in a sleeve, when you're holding it, upon very close examination, or not at all.  However in all cases it will likely pass as real to someone who doesn't know to look for it or what to look for.  No matter why you have counterfeits, knowingly acquiring them is supporting their ability to make more and deceive people into buying full price fakes.\n\nRemember, just because you think it can't be faked doesn't mean people aren't trying.").setColor('RED')]});}
    if (lowmessage.indexOf(",syntax") == 0) { message.channel.send("Scryfall search syntax, also used by <@240537940378386442>: https://scryfall.com/docs/syntax"); }
    if (lowmessage.indexOf(",chains") == 0) { message.channel.send({ embeds: [new Discord.MessageEmbed().setTitle("Follow this __once__ per draw for Chains of Mephistopheles").setImage("https://media.discordapp.net/attachments/205775955434668032/776476567144366080/tumblr_moqdowzQCw1s0l902o1_r1_1280.png")]});}*/
}

function raidBan(message, messageMember) {
    if (messageMember.roles.size == 1 && message.mentions.users.size > 20) {
        message.guild.members.ban(messageMember.user, {
            days: 1,
            reason: "Mention spam"
        });
        bot.channels.cache.get(logChannel[guildId.indexOf(message.guild.id)]).send(messageMember.displayName + " (id " + messageMember.id + ") banned for spamming mentions.  Message: ```" + message.cleanContent + "```");
    }
    /*const count = message.channel.messages.cache.filter(m => !m.system && m.author.id === message.author.id && m.createdTimestamp > Date.now() - 2000).size;
    if(count > 5 && !messageMember.user.bot) {
        message.guild.members.ban(messageMember.user, {
            days: 1,
            reason: "Message spam from non-member"
        });
        bot.channels.cache.get(logChannel[guildId.indexOf(message.guild.id)]).send(messageMember.displayName + " (id " + messageMember.id + ") banned for spamming messages.  Last message: ```" + message.cleanContent + "```");
    }*/
}

async function dmReporter(message) {
    var messageMember = await bot.guilds.cache.get(guildId[1]).members.fetch(message.author);
    if (messageMember.roles.cache.has(muteRole)) {
        bot.channels.cache.get(logChannel[1]).send("Muted member " + messageMember.displayName + " (id " + messageMember.id + ") said this in DM: ```" + message.cleanContent + "```");
    }
}

async function deleteReporter(message, forced) {
    let channelToNotify = null;
    if (!message.guild) {return;}
    if (!message.guild.available) {return;}
    if (message.guild.id == guildId[1]) {
        channelToNotify = logChannel[1];
    }
    else if (message.guild.id == guildId[2]) {
        channelToNotify = logChannel[2];
    }
    else {return;}
    if (!channelToNotify) {return;}
    if (message.system) {return;}
    if (!message.author) {return;}
    if (message.author.bot && !forced) {
        if (message.author.id == bot.user.id && channelToNotify == message.channel.id) {
            message.channel.send("One of my logs was deleted from here.");
        }
        return;
    }
    if (message.content.length < 5 && message.attachments.size == 0 && message.guild.id == guildId [1]) {return;}
    if ((message.content.includes("[[") || message.content.includes("]]") || message.content.toLowerCase().includes("!card") || message.content.toLowerCase().includes("!cr") || message.content.toLowerCase().includes("!mtr") || message.content.toLowerCase().includes("!ipg") || message.content.toLowerCase().includes("!price") || message.content.toLowerCase().includes("!legal") || message.content.toLowerCase().includes("!rul") || message.content.toLowerCase().includes("!jar") || message.content.toLowerCase().includes("!help") || message.content.toLowerCase().includes("!define")) && message.channel.id != "205775955434668032" && message.guild.id == guildId[1]) {return;}
    if (message.channel.id == channelToNotify && message.author.id == "657605267709493265") {
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
    var attaches = [...message.attachments.values()];
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
    if (message.guild.members.cache.has(message.author.id)) { messageMember = await message.guild.members.fetch(message.author); }
    var deleteMember = await message.guild.members.fetch(user);
    if (messageMember.id == deleteMember.id) {
        deleteLog = new Discord.MessageEmbed().setAuthor(messageMember.displayName + " (" + messageMember.id + ")", messageMember.user.displayAvatarURL());
    }
    else {
        deleteLog = new Discord.MessageEmbed().setAuthor(messageMember.displayName + " (" + messageMember.id + ")", messageMember.user.displayAvatarURL()).setFooter("Deleted by " + deleteMember.displayName + " (" + deleteMember.id + ")", deleteMember.user.displayAvatarURL());
    }
    if (message.content.length < 1024) { deleteLog.addField("Deletion", "<#" + message.channel.id + ">: " + message.content); }
    else { deleteLog.addField("Deletion", "<#" + message.channel.id + ">: " + message.content.substring(0, 1000)).addField("Deletion cont.", message.content.substring(1000))}
    if (attaches.length == 0) {
        bot.channels.cache.get(channelToNotify).send({ embeds: [deleteLog] });
    }
    else if (attaches.length == 1) {
        deleteLog.setImage(attaches[0].proxyURL);
        bot.channels.cache.get(channelToNotify).send({ embeds: [deleteLog] });
    }
    else {
        bot.channels.cache.get(channelToNotify).send({ content: "The following " + attachmessage, embeds: [deleteLog]});
    }
}

async function offlineChecker(channel) {
    var judgebot = await bot.guilds.cache.get(guildId[1]).members.fetch("240537940378386442");
    var scryfall = await bot.guilds.cache.get(guildId[1]).members.fetch("268547439714238465");
    if ((!judgebot.presence || judgebot.presence.status == "offline") && (lowmessage.includes("!card") || lowmessage.includes("!cr") || lowmessage.includes("!mtr") || lowmessage.includes("!ipg") || lowmessage.includes("!jar") || lowmessage.includes("!help") || lowmessage.includes("!define"))) {
        if (scryfall.presence && scryfall.presence.status != "offline") {
            channel.send("<@240537940378386442> appears to be offline.  Try using <@268547439714238465> instead, with [[`CARDNAME`]] or [[`CARDNAME`|`SET`]].  You can also do [[!`CARDNAME`]] or [[!`CARDNAME`|`SET`]] for just the image.");
        }
        else {
            channel.send("Both our bots seem to be offline at the moment.  Please try again later or use a browser to find the card online and post the link or image.");
            return;
        }
    }
    if ((!judgebot.presence || judgebot.presence.status == "offline") && lowmessage.includes("!legal")) {
        if (scryfall.presence && scryfall.presence.status != "offline") {
            channel.send("<@240537940378386442> appears to be offline.  Try using <@268547439714238465> instead, with [[#`CARDNAME`]].");
        }
        else {
            channel.send("Both our bots seem to be offline at the moment.  Please try again later or use a browser to find the card online and post the link or image.");
            return;
        }
    }
    if ((!judgebot.presence || judgebot.presence.status == "offline") && lowmessage.includes("!price")) {
        if (scryfall.presence && scryfall.presence.status != "offline") {
            channel.send("<@240537940378386442> appears to be offline.  Try using <@268547439714238465> instead, with [[$`CARDNAME`]] or [[$`CARDNAME`|`SET`]].");
        }
        else {
            channel.send("Both our bots seem to be offline at the moment.  Please try again later or use a browser to find the card online and post the link or image.");
            return;
        }
    }
    if ((!judgebot.presence || judgebot.presence.status == "offline") && lowmessage.includes("!rul")) {
        if (scryfall.presence && scryfall.presence.status != "offline") {
            channel.send("<@240537940378386442> appears to be offline.  Try using <@268547439714238465> instead, with [[?`CARDNAME`]].");
        }
        else {
            channel.send("Both our bots seem to be offline at the moment.  Please try again later or use a browser to find the card online and post the link or image.");
            return;
        }
    }
    if ((!scryfall.presence || scryfall.presence.status == "offline") && lowmessage.includes("[[") && lowmessage.includes("]]")) {
        if (judgebot.presence && judgebot.presence.status != "offline") {
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
            channel.send({ embeds: [new Discord.MessageEmbed().setTitle("Magic & Chill Looking For Game").addField("Syntax:", "`,lfg [MINUTES] PLATFORMS/FORMATS`.  [MINUTES] is how long you want to keep the request up for, defaults to 60 if unspecified.  PLATFORMS/FORMATS is what type(s) of game you're looking for.  They can be in any order and are case insensitive.  As soon as there's another request that meets at least one two player platform/format pair, or three more that match a four player platform/format pair, all of you will be pinged and you'll be removed from all your other active requests (so you don't end up in two games at once, you can re-request whenever you're ready).").addField("Examples:", "`,lfg 5 XMage Commander Spelltable Modern Pioneer` will put out requests for a game of Commander, Modern, or Pioneer on either XMage or Spelltable.  If no game starts within 5 minutes, the request will end.\n`,LFG 5 edh SPELLtable xMAGE pionEEr MODern` will function exactly the same as the above.\n`,lfg Arena Historic` will put out a request for a Historic game on Arena that will time out after 60 minutes.").addField("Recognized Formats:", lfgFormat + "\nAlso accepts Historic Brawl, Commander, and Canadian Highlander as valid aliases for their respective formats.").addField("Recognized Platforms:", lfgPlatform + "\nAlso accepts MTGA and MODO as valid aliases for their respective platforms.").addField("Other:", "This function will only work in <#788823431428309052>.  All of my posts with platforms and formats in one line and numbers in the following line(s) represent active requests if you're curious what's currently requested (they're deleted when they time out or start a game).  If you have any suggestions for improvements or additional platforms/formats, <@135999597947387904> with them.")] });
            return;
        }
        var helpMessage = "See `,help lfg` for Looking for Game explanation.\nI will provide a link to Scryfall search syntax with `,syntax`\nI will provide links to the Un-set FAQs with `,unglued`, `,unhinged`, `,unstable`, or `,unsanctioned` and Mystery Booster with `,mystery`.\nI will provide a link to the Mechanical Color Pie and relevant changes since with `,colorpie`.\nI can tell you the sets legal in Pioneer with `,pioneer` or in Modern with `,modern`.\nI will give or remove the leak role with `,leak` and the serious discussion role with `,serious`.\nI will give a brief description of both programs with `,xmage` or `,cockatrice`.\nI will educate you on the differences between a `,counterfeit` and a `,proxy` with either command.\nI will provide the chart for Chains of Mephistopheles with `,chains`\nIf either <@268547439714238465> or <@240537940378386442> is offline, I will point you to the other one with some basic syntax for similar functions.\nI will provide a full image of a card with exact Scryfall command but `<<>>`, like so: <<Avacyn, the Purifier|SOI>>.  Notably, this **can** get the back of a double faced card.";
        var helpEmbed = new Discord.MessageEmbed().addField("Links and Explanations:", "I will provide a link to Scryfall search syntax with `,syntax`\nI will provide links to the Un-set FAQs with `,unglued`, `,unhinged`, `,unstable`, or `,unsanctioned` and Mystery Booster with `,mystery`.\nI will provide a link to the Mechanical Color Pie and relevant changes since with `,colorpie`.\nI can tell you the sets legal in Pioneer with `,pioneer` or in Modern with `,modern`.\nI will give or remove the leak role with `,leak` and the serious discussion role with `,serious`.\nI will give a brief description of both programs with `,xmage` or `,cockatrice`.\nI will educate you on the differences between a `,counterfeit` and a `,proxy` with either command.\nI will provide the chart for Chains of Mephistopheles with `,chains`");
        if ((isMod && !channel.guild) || modChannel.includes(channel.id)) {
            helpEmbed.setTitle("Mod Help").addField("Moderator Commands:", "Mute: `,mute 24 <@631014834057641994> Reason: Imprisoning Emrakul` would mute me for 24 hours and DM me `You've been muted for 24 hours with reason \"Imprisoning Emrakul\"`.\nBan, kick, or unmute: Just send `,ban @MENTION`, `,kick @MEMBER`, or `,unmute @MENTION`\n`,addspoiler LEA` `,removespoiler LEA`: Mark or unmark set code LEA as spoilers to be automatically removed outside of appropriate channels.").addField("Other Moderator Functions:", "Current bad words list to report: `" + badWords + "`. If you wish to add or remove anything from this list, please @ Ash K. and it will be done.\nDelete message logging: Deletions will be logged *unless* one of the following is true and it contains no attachments: The message was from a bot, the message contained a typical bot call (`!card`, `[[`, `]]`, etc.), or the message was less than five characters long.  If you have any suggestions on improvements on catching only relevant deletions, feel free to suggest them.\nAny current spoilers from other bots are automatically deleted outside spoiler or leak channel, and the removed cards outside serious discussions.");
        }
        else {
            helpEmbed.setTitle("Help").addField("Other Functions:", "If either <@268547439714238465> or <@240537940378386442> is offline, I will point you to the other one with some basic syntax for similar functions.\nI will provide a full image of a card with exact Scryfall command but `<<>>`, like so: <<Avacyn, the Purifier|SOI>>.  Notably, this **can** get the back of a double faced card.\nI assist the moderators with various things.");
        }
        helpEmbed.setFooter("\n\nAll commands are case insensitive. If you have suggestions for new or improved commands, please @ Ash K. with them.");
        channel.send({ embeds: [helpEmbed] });
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
    if (!message.channel.permissionOverwrites || !message.channel.permissionOverwrites.cache.has(roleId[4]) || message.channel.permissionOverwrites.cache.get(roleId[4]).allow.has("READ_MESSAGES")) {
        for (var x = 0; x < badCards.length; x++) {
            var scryfallURL = "/" + badCards[x].toLowerCase().replace(/û/g, "%C3%BB").replace(/,/g, "").replace(/\./g, "").replace(/\'/g, "").replace(/`/g, "").replace(/®/g, "").replace(/:registered:/, "").replace(/"/g, "").replace(/\?/g, "%3F").replace(/!/g, "").replace(/ /g, "-") + "?";
            if (lowmessage.includes(scryfallURL) || (message.embeds[0] != undefined && message.embeds[0].title != undefined && message.embeds[0].title.split(" <")[0] == badCards[x])) {
                message.delete();
                deleteReporter(message, true);
                message.channel.send("This card has been banned in all formats for issues about serious topics. For more details, see <https://discordapp.com/channels/162586705524686848/162587160942346241/720436510368858152>.")
            }
        }
    }
}

function updateWords(message) {
    if (lowmessage.indexOf(",banword ") == 0 && message.guild.id == guildId[1]) {
        var newDeleteList = deleteListMC.content;
        newDeleteList += "\n" + lowmessage.split(",banword ")[1]
        deleteListMC.edit(newDeleteList);
        message.channel.send("`" + lowmessage.split(",banword ")[1] + "` added to list of words/phrases to immediately delete.");
    }
    if (lowmessage.indexOf(",reportword ") == 0 && message.guild.id == guildId[1]) {
        var newDeleteList = reportListMC.content;
        newDeleteList += "\n" + lowmessage.split(",banword ")[1]
        reportListMC.edit(newDeleteList);
        message.channel.send("`" + lowmessage.split(",reportword ")[1] + "` added to list of words/phrases to report.");
    }
    if (lowmessage.indexOf(",unbanword ") == 0 && message.guild.id == guildId[1] && deleteList.content.split("\n").indexOf(lowmessage.split(",unbanword ")[1]) > 0) {
        var newDeleteList = deleteListMC.content.split("\n")[0];
        for (var x = 1; x < deleteListMC.content.split("\n").length; x++) {
            if (!deleteListMC.content.split("\n")[x] == lowmessage.split(",unbanword ")[1]) { newDeleteList += "\n" + deleteListMC.content.split("\n")[x]; }
        }
        deleteListMC.edit(newDeleteList);
        message.channel.send("`" + lowmessage.split(",unbanword ")[1] + "` removed from list of words/phases to immediately delete.");
    }
    if (lowmessage.indexOf(",unreportword ") == 0 && message.guild.id == guildId[1] && deleteList.content.split("\n").indexOf(lowmessage.split(",unreportword ")[1]) > 0) {
        var newDeleteList = reportListMC.content.split("\n")[0];
        for (var x = 1; x < reportListMC.content.split("\n").length; x++) {
            if (!reportListMC.content.split("\n")[x] == lowmessage.split(",unreportword ")[1]) { newDeleteList += "\n" + reportListMC.content.split("\n")[x]; }
        }
        reportListMC.edit(newDeleteList);
        message.channel.send("`" + lowmessage.split(",unreportword ")[1] + "` removed from list of words/phases to report.");
    }
}

async function updateWordsCommand(interaction) {
    try {
        if (!interaction.memberPermissions.has("MANAGE_SERVER")) {return;}
        var theLog;
        let theWord = ""
        if (interaction.options.getBoolean('leading-space')) {
            theWord += " ";
        }
        theWord += interaction.options.getString('word');
        if (interaction.options.getBoolean('trailing-space')) {
            theWord += " ";
        }
        if (interaction.guildId == guildId[1]) {
            switch (interaction.options.getString('type')) {
                case "delete":
                theLog = deleteListMC;
                break;
                case "report":
                theLog = reportListMC;
                break;
                case "exceptions":
                theLog = exceptionListMC;
                break;
            }
        }
        else if (interaction.guildId == guildId [2]) {
            switch (interaction.options.getString('type')) {
                case "delete":
                theLog = deleteListLGS;
                break;
                case "report":
                theLog = reportListLGS;
                break;
                case "exceptions":
                theLog = exceptionListLGS;
                break;
            }
        }
        else {
            interaction.reply({ content: "This doesn't appear to be a supported server for that command.  If you believe this to be in error, please contact <@135999597947387904>.", ephemeral: true });
            return;
        }
        if (interaction.options.getString('action') == "add") {
            await theLog.edit(theLog.content + "\n" + theWord.toLowerCase());
            interaction.reply({ content: "`" + theWord + "` successfully added to the " + interaction.options.getString('type') + " list.", ephemeral: true });
        }
        else {
            if (theLog.content.includes("\n" + theWord.toLowerCase())) {
                let newLog = theLog.content.split("\n")[0];
                for (x = 1; x < theLog.content.split("\n").length; x++) {
                    if (theLog.content.split("\n")[x] != theWord.toLowerCase()) {
                        newLog += "\n" + theLog.content.split("\n")[x];
                    }
                }
                await theLog.edit(newLog);
                interaction.reply({ content: "`" + theWord + "` successfully removed from the " + interaction.options.getString('type') + " list.", ephemeral: true });
            }
            else {
                interaction.reply({ content: "`" + theWord + "` not found on the " + interaction.options.getString('type') + " list.  Please confirm you typed it exactly as it appears, including all special characters (though not case sensitive).", ephemeral: true });
            }
        }
        deleteList = await bot.channels.cache.get("922350419005558834").messages.fetch("934010882965512232");
        reportList = await bot.channels.cache.get("922350419005558834").messages.fetch("934011065317085225");
        exceptionList = await bot.channels.cache.get("922350419005558834").messages.fetch("934011123412381706");
    }
    catch(err) {
        logger.error("Something went wrong with updateWordsCommand.");
    }
}

/*async function badWordsReporterLGS(message, messageMember, isEdit) {
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
        await bot.channels.cache.get(logChannel[guildId.indexOf(message.guild.id)]).send({ embeds: [badWordsLog] });
    }
}*/

function magicCardFetcher(message) {
    if (lowmessage.indexOf("<<") != -1 && lowmessage.lastIndexOf(">>") != -1 && lowmessage.indexOf("|") != -1) {
        magicCardPoster(message.cleanContent, message.channel);
    }
}

function magicCardPoster(input, channel) {
    var request = input.replace(/\<\</g, "🦌🦌").replace(/\|/g, "🦌🦌").replace(/>>/g, "🦌🦌");
    if (request.split("🦌🦌").length < 2) {return;}
    var cardName = request.split("🦌🦌")[1];
    if (badCards.includes(cardName) && (!message.channel.permissionOverwrites || !message.channel.permissionOverwrites.cache.has(roleId[4]) || message.channel.permissionOverwrites.cache.get(roleId[4]).allow.has("READ_MESSAGES"))) {
        channel.send("This card has been banned in all formats for issues about serious topics.");
        return;
    }
    var cardSet = request.split("🦌🦌")[2];
    var fetched = false;
    if (cardSet.length > 5 || cardSet.length < 2) {return;}
    if (request.split("🦌🦌")[3].length > 0 && !isNaN(request.split("🦌🦌")[3]) && request.split("🦌🦌")[3].indexOf(" ") == -1) {
        var cardNumber = request.split("🦌🦌")[3];
        cardName = cardName.toLowerCase().replace(/û/g, "%C3%BB").replace(/,/g, "").replace(/\./g, "").replace(/\'/g, "").replace(/`/g, "").replace(/®/g, "").replace(/:registered:/, "").replace(/"/g, "").replace(/\?/g, "%3F").replace(/!/g, "").replace(/ /g, "-").replace(/\+/g, "%2B").replace(/ö/g, "o");
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

function prank(message) {
    let d = new Date();
    let rand = Math.floor(Math.random() * 10);
    let rand2 = Math.floor(Math.random() * memeList.length);
    if (message.guild.id == guildId[1] && message.channel.id != "205775955434668032" && d.getDate() == 1 && d.getMonth() == 3 && message.author.id == "268547439714238465" && rand == 1) {
        message.reply("Sorry, that card just isn't good.  Here's a better one: " + memeList[rand2]);
    }
}

function selfCleaner(message) {
    message.delete();
}

bot.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    switch (commandName) {
        case 'info':
        await links(interaction);
        break;
        case 'update-words':
        await updateWordsCommand(interaction);
        break;
        case 'mute':
        await muteCommand(interaction);
        break;
        case 'ban':
        await banCommand(interaction);
        break;
        case 'unmute':
        await unmuteCommand(interaction);
        break;
        case 'kick':
        await kickCommand(interaction);
        break;
    }
})

bot.on("messageCreate", async function(message) {
    if (message.system) {return;}
    lowmessage = message.content.toLowerCase();

    if (message.author.id == "135999597947387904" && message.content.indexOf(",eval ") == 0 && message.channel.id != "531433553225842700") {
        message.channel.send("```javascript\n" + eval(message.content.split(",eval ")[1]) + "```");
    }

    if (message.author.id == "135999597947387904" && message.content.indexOf(",teval ") == 0 && message.guild.id == guildId[0]) {
        message.channel.send("```javascript\n" + eval(message.content.split(",teval ")[1]) + "```");
    }

    if (message.guild && message.guild.id == guildId[2]) {
        var isMod = false;
        var messageMember = await message.guild.members.fetch(message.author);
        if (messageMember.permissions.has("ADMINISTRATOR")) { isMod = true; }

        await offlineChecker(message.channel);

        await raidBan(message, messageMember);

        //await links(message);

        await badWordsReporter(message, messageMember, false);

        if (isMod) {
            updateWords(message);
        }

        if (!message.channel.permissionOverwrites || !message.channel.permissionOverwrites.cache.has(roleId[4]) || message.channel.permissionOverwrites.cache.get(roleId[4]).allow.has("READ_MESSAGES")) {
            for (var x = 0; x < badCards.length; x++) {
                var scryfallURL = "/" + badCards[x].toLowerCase().replace(/û/g, "%C3%BB").replace(/,/g, "").replace(/\./g, "").replace(/\'/g, "").replace(/`/g, "").replace(/®/g, "").replace(/:registered:/, "").replace(/"/g, "").replace(/\?/g, "%3F").replace(/!/g, "").replace(/ /g, "-") + "?";
                if (lowmessage.includes(scryfallURL) || (message.embeds[0] != undefined && message.embeds[0].title != undefined && message.embeds[0].title.split(" <")[0] == badCards[x])) {
                    if (message.channel.id == "739760080932569088") {
                        bot.channels.get(logChannel[2]).send({ embeds: [new Disocrd.MessageEmbed().addField(badCards[x] + " was discussed in <#739760080932569088>", "Context: " + message.url)] });
                    }
                    else {
                        message.delete();
                        deleteReporter(message, true);
                        message.channel.send("This card has been banned in all formats for issues about serious topics.")
                    }
                }
            }
        }
    }    

    await prank(message);

    await spoilerCleaner(message);
    
    await leakCleaner(message);

    if (message.author.bot) {return;}

    var isMod = false;
    var messageMember = await bot.guilds.cache.get(guildId[1]).members.fetch(message.author);
    if (messageMember.roles.cache.has(modRole)) { isMod = true; }

    //await links(message);

    await mute(message, isMod);

    await kick(message, isMod);

    await ban(message, isMod);

    await offlineChecker(message.channel);

    await help(message.channel, isMod);

    await cache(message);

    await manualReset(isMod);

    await spoilerUpdate(message, isMod);
    
    await leakUpdate(message, isMod);

    if (message.channel.id == "788824774389399573") {
        if (message.attachments.size == 0 && !message.content.includes("https://") && !message.content.includes("http://")) {
            message.delete();
        }
        else {
            message.react("✅");
        }
    }

    if (isMod && message.content.indexOf(",unmute") == 0 && message.mentions.users.size != 0) {
        message.mentions.users.forEach(async function(value, key) {
            await unmute(key);
        });
    }

    if (!message.guild) {
        await dmReporter(message);

        return;
    }

    await role(message, messageMember);

    await raidBan(message, messageMember);

    await magicCardFetcher(message);

    await badWordsReporter(message, messageMember, false);

    await lfgTest2(message);

    if (message.guild.id == guildId[3]) {
        await lfgTest1(message);

        
    }
})

/*bot.on("messageUpdate", async function(oldMessage, newMessage) {
    if (!newMessage.content) {return;}
    lowmessage = newMessage.content.toLowerCase();
    var messageMember = await newMessage.guild.members.fetch(newMessage.author);
    await badWordsReporter(newMessage, messageMember, true);
})*/

bot.on("messageUpdate", async function(oldMessage, newMessage) {
    try {
        if (newMessage.partial || oldMessage.partial) {
            try {
                newMessage = await newMessage.fetch();
            } catch (error) {
                logger.error('Something went wrong when fetching the message: ', error)
                return;
            }
            if (!newMessage.channel.guild || !newMessage.channel.guild.available || (newMessage.channel.guild.id != guildId[1] && newMessage.channel.guild.id != guildId[2]) {return;}
            messageMember = await newMessage.channel.guild.members.fetch(newMessage.author.id);
            badWordsReporter(newMessage, messageMember, true);
            return;
        }
        let diff = ss.compareTwoStrings(oldMessage.content, newMessage.content);
        if (!newMessage.channel.guild) {return;}
        if (!newMessage.channel.guild.available) {return;}

        let messageMember = await newMessage.channel.guild.members.fetch(newMessage.author);
        if (newMessage.channel.guild.id == guildId[1] || newMessage.channel.guild.id == guildId[2]) {
            badWordsReporter(newMessage, messageMember, true);
        }
        if (newMessage.channel.guild.id != guildId[2]) {return;}
        let channelToNotify = logChannel[2];
        if (!newMessage.author) {return;}
        if (oldMessage.content == newMessage.content) {return;}
        if (newMessage.author.bot) {
            /*if (!oldMessage.partial && newMessage.author.id == bot.user.id) {
                bot.channels.cache.get().send({ embeds: [new Discord.MessageEmbed().setThumbnail(bot.user.displayAvatarURL()).setTitle("Edited message from " + bot.user.displayName + " (" + oldMessage.author.id + ")").addField("Channel:", "<#" + oldMessage.channel.id + ">").addField("Original Message:", oldMessage.content).addField("New Message:", newMessage.content).setColor('BLUE')] });
            }*/
            return;
        }
        let deleteLog = ""
        /*if (oldMessage.partial) {
            deleteLog = new Discord.MessageEmbed().setThumbnail(messageMember.user.displayAvatarURL()).setTitle("Uncached edited message from " + messageMember.displayName + " (" + newMessage.author.id + ")").addField("Channel:", "<#" + newMessage.channel + ">").setColor('BLUE').setURL(newMessage.url);
            if (newMessage.content.length < 1024) { deleteLog.addField("New Message:", newMessage.content) }
            else { deleteLog.addField("New Message:", newMessage.content.substring(0, 1000)).addField("New Message cont.:", newMessage.content.substring(1000))}
        }
        else*/ if (oldMessage.content && newMessage.content) {
            deleteLog = new Discord.MessageEmbed().setThumbnail(messageMember.user.displayAvatarURL()).setTitle("Edited message from " + messageMember.displayName + " (" + oldMessage.author.id + ")").addField("Channel:", "<#" + oldMessage.channel.id + ">").setColor('BLUE').setURL(newMessage.url);
            if (oldMessage.content.length < 1024) { deleteLog.addField("Original Message:", oldMessage.content) }
            else { deleteLog.addField("Original Message:", oldMessage.content.substring(0, 1000)).addField("Original Message cont.:", oldMessage.content.substring(1000))}
            if (newMessage.content.length < 1024) { deleteLog.addField("New Message:", newMessage.content) }
            else { deleteLog.addField("New Message:", newMessage.content.substring(0, 1000)).addField("New Message cont.:", newMessage.content.substring(1000))}
        }
        else if (newMessage.content) {
            deleteLog = new Discord.MessageEmbed().setThumbnail(messageMember.user.displayAvatarURL()).setTitle("Edited textless message from " + messageMember.displayName + " (" + newMessage.author.id + ")").addField("Channel:", "<#" + newMessage.channel + ">").setColor('BLUE').setURL(newMessage.url);
            if (newMessage.content.length < 1024) { deleteLog.addField("New Message:", newMessage.content) }
            else { deleteLog.addField("New Message:", newMessage.content.substring(0, 1000)).addField("New Message cont.:", newMessage.content.substring(1000))}
        }
        await bot.channels.cache.get(channelToNotify).send({ embeds: [deleteLog] });
    }
    catch(err) {
        logger.error("Something went wrong logging an edited message");
    }
})

bot.on("guildMemberAdd", function(member) {
    if (logMessage.content.includes(member.id + " ")) { member.roles.add(member.guild.roles.cache.get(muteRole)); }
    var d = new Date();
    var newBlood = new Discord.MessageEmbed().setAuthor(member.displayName + " (" + member.id + ")", member.user.displayAvatarURL()).addField("Joined", d.toString()).setColor('GREEN');
    bot.channels.cache.get("693709957014749196").send({ embeds: [newBlood] });
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
    if (member.guild.id == guildId[1]) {
        var d = new Date();
        if (member.roles.cache.has(muteRole) && !logMessage.content.includes(member.id + " ")) {
            var unmuteTime = d.getTime() + 604800000;
            logMessage.edit(logMessage.content + "\n" + member.id + " " + unmuteTime);
            bot.channels.cache.get(logChannel[1]).send(member.displayName + " (id " + member.id + ") left while muted with no fixed duration and has been muted for one week in case they return. If you wish to change the duration, please use `,mute HOURS <@" + member.id + ">`.");
        }
        var newBlood = new Discord.MessageEmbed().setAuthor(member.displayName + " (" + member.id + ")", member.user.displayAvatarURL()).addField("Left", d.toString()).setColor('RED');
        const entry = await member.guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())
        const entry2 = await member.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first())
        if (entry != null && (entry.target.id === member.id) && (entry.createdTimestamp > (Date.now() - 5000))) {
            await newBlood.setFooter("Banned by " + entry.executor.username, entry.executor.displayAvatarURL());
        }
        else if (entry2 != null && (entry2.target.id === member.id) && (entry2.createdTimestamp > (Date.now() - 5000))) {
            await newBlood.setFooter("Kicked by " + entry2.executor.username, entry2.executor.displayAvatarURL());
        }
        await bot.channels.cache.get("693709957014749196").send({ embeds: [newBlood] });
    }
})

bot.on("guildMemberUpdate", function(oldMember, newMember) {
    if (newMember.roles.cache.has(muteRole) && newMember.roles.cache.has(leakRole)) { newMember.roles.remove(leakRole); }
    if ((newMember.roles.cache.has(muteRole) || newMember.roles.cache.has("796526525498523648")) && newMember.roles.cache.has(seriousRole)) { newMember.roles.remove(seriousRole); }
})

bot.on("messageReactionAdd", async function(messageReaction, user) {
    try {
        if (messageReaction.message.id == roleMessageId) {
            member = await messageReaction.message.guild.members.fetch(user);
            if((messageReaction.emoji.name == "⛔" || messageReaction.emoji.name == "💧") && member.roles.cache.has("796526525498523648")) {
                return;
            }
            if(roleReact.includes(messageReaction.emoji.name)) {
                member.roles.add(roleId[roleReact.indexOf(messageReaction.emoji.name)]);
            }
        }
        if (roleMessageIdLGS.includes(messageReaction.message.id)) {
            member = await messageReaction.message.guild.members.fetch(user);
            if (roleReactLGS.includes(messageReaction.emoji.name)) {
                member.roles.add(roleIdLGS[roleReactLGS.indexOf(messageReaction.emoji.name)]);
            }
        }
        if (messageReaction.message.channel.id == "788824774389399573" && messageReaction.emoji.name == "✅") {
            member = await messageReaction.message.guild.members.fetch(user);
            if (member.roles.cache.has(modRole)) {
                if (messageReaction.message.crosspostable) {
                    messageReaction.message.crosspost();
                }
                messageReaction.remove();
            }
        }
    }
    catch(err) {
        if (messageReaction && messageReaction.message && messageReaction.message.url) {
            logger.error("Something went wrong with a reaction on message " + messageReaction.message.url);
        }
        else {
            logger.error("Something went wrong with a message reaction");
        }
    }
})

bot.on("messageReactionRemove", async function(messageReaction, user) {
    if (messageReaction.message.id == roleMessageId) {
        if(roleReact.includes(messageReaction.emoji.name)) {
            member = await messageReaction.message.guild.members.fetch(user);
            member.roles.remove(roleId[roleReact.indexOf(messageReaction.emoji.name)]);
        }
    }
    if (roleMessageIdLGS.includes(messageReaction.message.id)) {
        if(roleReactLGS.includes(messageReaction.emoji.name)) {
            member = await messageReaction.message.guild.members.fetch(user);
            member.roles.remove(roleIdLGS[roleReactLGS.indexOf(messageReaction.emoji.name)]);
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
    if (newPresence.userId == "695434707264995350" || newPresence.userId == "676989741173964800" || newPresence.userId == "531429270451519490" || newPresence.userId == "933212401522851901") {
        if (newPresence.status == "offline") {
            bot.channels.cache.get("531433553225842700").send("<@135999597947387904>, <@" + newPresence.userId + "> appears to be offline.");
        }
    }
})

bot.login(process.env.token)
