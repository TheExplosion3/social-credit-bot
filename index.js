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
const sc = require('./sc.js');

//---------------------------------------------------------------------------\\

// webserver code
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Social Credit Bot Server Running...'));

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

//----------------------------------------------------------------------------\\

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

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} 
  else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Login to Discord with your client's token
client.login(token);