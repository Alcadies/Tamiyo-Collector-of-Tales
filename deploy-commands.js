const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config()

const commands = [
	new SlashCommandBuilder().setName('info').setDescription('Information about a given topic').addStringOption(option =>
		option.setName('topic')
			.setDescription('What to get info about')
			.setRequired(true)
			.addChoice("Platforms", "platforms")
			.addChoice("Proxies and Counterfeits", "proxy")
			.addChoice("Scryfall Syntax", "syntax")
			.addChoice("Modern Legality", "modern")
			.addChoice("Pioneer Legality", "pioneer")
			.addChoice("Mechanical Color Pie", "colorpie")
			.addChoice("Unset and Playtest FAQ", "unsets")
			.addChoice("Chains of Mephistopheles Flowchart", "chains")
			.addChoice("Non-MTG Magic", "magician")),
	new SlashCommandBuilder().setName('update-words').setDescription('Updates which words are automatically reported or deleted.').addStringOption(option =>
		option.setName('action')
			.setDescription("Whether to add or remove a word or phrase")
			.setRequired(true)
			.addChoice("Add", "add")
			.addChoice("Remove", "remove")).addStringOption(option =>
		option.setName('type')
			.setDescription("Which list to edit. Exceptions is for innocent words that contain problematic ones.")
			.setRequired(true)
			.addChoice("Delete", "delete")
			.addChoice("Report", "report")
			.addChoice("Exceptions", "exceptions")).addStringOption(option =>
		option.setName('word')
			.setDescription("Which word or phrase to add to or remove from the list.")
			.setRequired(true)).addBooleanOption(option =>
		option.setName('leading-space')
			.setDescription("Whether to add a space beforehand")
			.setRequired(false)).addBooleanOption(option =>
		option.setName('trailing-space')
			.setDescription("Whether to add a space afterwards")
			.setRequired(false)),
	new SlashCommandBuilder().setName('unmute').setDescription('Unmutes a member').addUserOption(option =>
		option.setName('member')
			.setDescription("Who to unmute")
			.setRequired(true)).addStringOption(option =>
		option.setName('reason')
			.setDescription("Why they're being unmuted")
			.setRequired(false)),
	new SlashCommandBuilder().setName('kick').setDescription('Kicks a member from the server').addUserOption(option =>
		option.setName('member')
			.setDescription("Who to kick")
			.setRequired(true)).addStringOption(option =>
		option.setName('reason')
			.setDescription("Why they're being warned")
			.setRequired(false)),
	new SlashCommandBuilder().setName('ban').setDescription('Bans a member').addUserOption(option =>
		option.setName('member')
			.setDescription("Who to ban")
			.setRequired(true)).addStringOption(option =>
		option.setName('reason')
			.setDescription("Why they're being banned")
			.setRequired(false)).addIntegerOption(option =>
		option.setName('delete-messages')
			.setDescription("How many days worth of their messages to delete, 0 if blank")
			.setRequired(false)
			.addChoice("0", 0)
			.addChoice("1", 1)
			.addChoice("7", 7)),
	new SlashCommandBuilder().setName('mute').setDescription('Mutes a member').addUserOption(option =>
		option.setName('member')
			.setDescription("Who to mute")
			.setRequired(true)).addIntegerOption(option =>
		option.setName('time')
			.setDescription("How long to mute for, indefinite if blank. Decimals allowed.")
			.setRequired(false)).addStringOption(option =>
		option.setName('unit')
			.setDescription("What unit that number is in, hours if blank")
			.setRequired(false)
			.addChoice("Seconds", "seconds")
			.addChoice("Minutes", "minutes")
			.addChoice("Hours", "hours")
			.addChoice("Days", "days")
			.addChoice("Weeks", "weeks")).addStringOption(option =>
		option.setName('reason')
			.setDescription("Why they're being muted")
			.setRequired(false)),
	new SlashCommandBuilder().setName('role').setDescription('Adds or removes roles').addRoleOption(option =>
		option.setName('role')
			.setDescription('What role')
			.setRequired(true)).addStringOption(option =>
		option.setName('action')
			.setDescription('Whether to add or remove. Defaults to add.')
			.setRequired(false)
			.addChoice('Add', 'add')
			.addChoice('Remove', 'remove')).addUserOption(option =>
		option.setName('member')
			.setDescription('Whose roles to edit. Defaults to self.')
			.setRequired(false))
	/*new SlashCommandBuilder().setName('lfg').setDescription("Find opponents to play a game with.").addStringOption(option =>
		option.setName('platform')
			.setDescription("What platform you want to play on")
			.setRequired(true)
			.addChoice("Magic the Gathering Arena", "arena")
			.addChoice("Magic the Gathering Online", "mtgo")
			.addChoice("Spelltable", "spelltable")
			.addChoice("XMage", "xmage")
			.addChoice("Cockatrice", "cockatrice")
			.addChoice("Untap", "untap")).addStringOption(option =>
		option.setName('format')
			.setDescription("What format you want to play")
			.setRequired(true)
			.addChoice("Standard", "standard")
			.addChoice("Pioneer", "pioneer")
			.addChoice("Modern", "modern")
			.addChoice("Legacy", "legacy")
			.addChoice("Vintage", "vintage")
			.addChoice("Pauper", "pauper")
			.addChoice("Canadian Highlander", "canlander")
			.addChoice("Brawl", "brawl")
			.addChoice("Historic Brawl", "hbrawl")
			.addChoice("Alchemy", "alchemy")
			.addChoice("Commander", "commander")
			.addChoice("cEDH", "cedh")).addNumberOption(option =>
		option.setName("Duration")
			.setDescription("How long you're willing to wait before your request is cleared, in minutes.  Defaults to 60.")
			.setRequired(false)).addStringOption(option =>
		option.setName('platform2')
			.setDescription("If there's a second platform you're willing to play on")
			.setRequired(false)
			.addChoice("Magic the Gathering Arena", "arena")
			.addChoice("Magic the Gathering Online", "mtgo")
			.addChoice("Spelltable", "spelltable")
			.addChoice("XMage", "xmage")
			.addChoice("Cockatrice", "cockatrice")
			.addChoice("Untap", "untap")).addStringOption(option =>
		option.setName('format2')
			.setDescription("If there's a second format you're willing to play")
			.setRequired(false)
			.addChoice("Standard", "standard")
			.addChoice("Pioneer", "pioneer")
			.addChoice("Modern", "modern")
			.addChoice("Legacy", "legacy")
			.addChoice("Vintage", "vintage")
			.addChoice("Pauper", "pauper")
			.addChoice("Canadian Highlander", "canlander")
			.addChoice("Brawl", "brawl")
			.addChoice("Historic Brawl", "hbrawl")
			.addChoice("Alchemy", "alchemy")
			.addChoice("Commander", "commander")
			.addChoice("cEDH", "cedh")).addStringOption(option =>
		option.setName('platform3')
			.setDescription("If there's a third platform you're willing to play on")
			.setRequired(false)
			.addChoice("Magic the Gathering Arena", "arena")
			.addChoice("Magic the Gathering Online", "mtgo")
			.addChoice("Spelltable", "spelltable")
			.addChoice("XMage", "xmage")
			.addChoice("Cockatrice", "cockatrice")
			.addChoice("Untap", "untap")).addStringOption(option =>
		option.setName('format3')
			.setDescription("If there's a third format you're willing to play")
			.setRequired(true)
			.addChoice("Standard", "standard")
			.addChoice("Pioneer", "pioneer")
			.addChoice("Modern", "modern")
			.addChoice("Legacy", "legacy")
			.addChoice("Vintage", "vintage")
			.addChoice("Pauper", "pauper")
			.addChoice("Canadian Highlander", "canlander")
			.addChoice("Brawl", "brawl")
			.addChoice("Historic Brawl", "hbrawl")
			.addChoice("Alchemy", "alchemy")
			.addChoice("Commander", "commander")
			.addChoice("cEDH", "cedh")).addStringOption(option =>
		option.setName('platform4')
			.setDescription("If there's a fourth platform you're willing to play on")
			.setRequired(true)
			.addChoice("Magic the Gathering Arena", "arena")
			.addChoice("Magic the Gathering Online", "mtgo")
			.addChoice("Spelltable", "spelltable")
			.addChoice("XMage", "xmage")
			.addChoice("Cockatrice", "cockatrice")
			.addChoice("Untap", "untap")).addStringOption(option =>
		option.setName('format4')
			.setDescription("If there's a fourth format you're willing to play")
			.setRequired(true)
			.addChoice("Standard", "standard")
			.addChoice("Pioneer", "pioneer")
			.addChoice("Modern", "modern")
			.addChoice("Legacy", "legacy")
			.addChoice("Vintage", "vintage")
			.addChoice("Pauper", "pauper")
			.addChoice("Canadian Highlander", "canlander")
			.addChoice("Brawl", "brawl")
			.addChoice("Historic Brawl", "hbrawl")
			.addChoice("Alchemy", "alchemy")
			.addChoice("Commander", "commander")
			.addChoice("cEDH", "cedh"))*/
]
	.map(command => command.toJSON());



const rest = new REST({ version: '9' }).setToken(process.env.token);

rest.put(Routes.applicationCommands("631014834057641994"), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);