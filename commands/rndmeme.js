const baseLinks = require('../json/memelinks.json')
const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const links = JSON.parse(JSON.stringify(baseLinks))

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
        .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTCQ239dDx27JAGoiCRZIKhFLhwPaI1CIi5gaETen9N2bzal2IU3xPaDpfzAA41ixZFDA:https://upload.wikimedia.org/wikipedia/commons/e/e8/Mao_Zedong_portrait.jpg&usqp=CAU')
        .setImage(memeLinks.links[rnd])

      interaction.reply({embeds: [response]});
    }
    catch(error) {
      console.log(`error encountered in embed creation, passing. error log below: \n${error}`)
      interaction.reply({ content: 'An error has occured comrade! Contact an admin for fixing this horrible issue, delaying the glorious progress of the CCP..jpg', ephemeral: true });
    }
	},
};