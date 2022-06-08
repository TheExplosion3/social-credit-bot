// Use this with node to redeploy commands, and add any new ones made.

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId } = require('../json/config.json');
const token = process.env['token'];

const commands = [
	new SlashCommandBuilder()
    .setName('randomeme') 
    .setDescription('Replies with a random state approved meme, straight from the Glorious CCP'),
	new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Replies with a user\'s social credit'),
  new SlashCommandBuilder()
    .setName('initialize')
    .setDescription('Initializes the bot\'s database for CCP use. (Only usable by creator)')
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);