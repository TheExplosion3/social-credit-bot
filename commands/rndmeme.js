const baseLinks = require('../json/memelinks.json');
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const links = JSON.parse(JSON.stringify(baseLinks));

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randomeme')
		.setDescription('Replies with a random state approved meme, straight from the Glorious CCP'),
	async execute(interaction) {
		const memeLinks = links;
    const rnd = Math.floor(Math.random() * memeLinks.links.length - 1);

    try {
      response = new MessageEmbed()
        .setTitle('State Approved Meme')
        .setColor('DE2910')
        .setDescription(`Here is a state approved meme for you, ${interaction.user.username}`)
        .setThumbnail(memeLinks.mao)
        .setImage(memeLinks.links[rnd])

      interaction.reply({embeds: [response]});
    }
    catch(error) {
      console.log(`error encountered in embed creation, passing. error log below: \n${error}`);
      interaction.reply({ content: 'An error has occured comrade! Contact an admin for fixing this horrible issue, delaying the glorious progress of the CCP..jpg', ephemeral: true });
    }
	},
};