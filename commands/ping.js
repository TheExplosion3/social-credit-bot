const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong! (this is only a test command i dont feel like deleting it lmao)'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};