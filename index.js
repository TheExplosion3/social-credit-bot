// imports
const { Client, Collection, Intents } = require('discord.js');
const token = process.env['token'];
const myId = process.env['myid'];
const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const Sequelize = require('sequelize');
const express = require('express');

// webserver code
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Social Credit Bot Server Running...'));

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const sc = sequelize.define('social-credit', {
	username: {
		type: Sequelize.STRING,
		unique: true,
	},
	id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true
  },
	social_credit: {
		type: Sequelize.INTEGER,
		defaultValue: 10,
		allowNull: false,
	},
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
  sc.sync();
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
  
  	const command = client.commands.get(interaction.commandName);
    
  
  	if (!command) return;
  
  	try {
  		await command.execute(interaction);
  	}
    catch (error) {
  		console.error(error);
  		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  	}
});

// Login to Discord with your client's token
client.login(token);