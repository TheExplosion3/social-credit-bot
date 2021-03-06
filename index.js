// imports
const { Client, Collection, Intents } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const express = require('express');
const token = process.env['token'];
const Sequelize = require('sequelize');

const sequelize = new Sequelize('username', 'id', 'socialcredit', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'db/database.sqlite',
});

const sc = require('./sc.js')(sequelize);

//---------------------------------------------------------------------------\\
// express server

// webserver code
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send(`<p style="color:8650ac;"><strong>Social Credit Bot Server Running on Port ${port}</strong></p>`))

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

//----------------------------------------------------------------------------\\
// client creation

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

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

//----------------------------------------------------------------------------\\
// event intialization

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

//----------------------------------------------------------------------------\\
// login

// Login to Discord with token
client.login(token);