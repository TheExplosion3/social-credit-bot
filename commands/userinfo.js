const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('username', 'id', 'socialcredit', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'db/database.sqlite',
});

const sc = require('../sc.js')(sequelize)

const phrases = new Map()

// theres definitely a better way to do this, i just dont know how.
phrases.set(0, "Your execution date will be soon, traitor.")
phrases.set(1, "Your social credit is too low! Your execution date will be soon if you don't do better, my friend!")
phrases.set(2, "Good job my friend! You have a good social credit score!")
phrases.set(3, "The CCP honors you, my friend.")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Replies with a user\'s social credit.'),
  async execute(interaction) {
    const avatarUrl = interaction.user.displayAvatarURL()
    let name;
    let userSc = sc.findOne({
      where: { 
        id: interaction.user.id
      } 
    })
    userSc = 'temp';
    let maoResponse = 'test';
    name = 'test';
    try {
      response = new MessageEmbed()
        .setTitle('Social Credit Score')
        .setColor('DE2910')
        .setDescription('Here is your social credit score, straight from the glorious CCP, my friend!')
        // image to mao portrait lmao
        .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTCQ239dDx27JAGoiCRZIKhFLhwPaI1CIi5gaETen9N2bzal2IU3xPaDpfzAA41ixZFDA:https://upload.wikimedia.org/wikipedia/commons/e/e8/Mao_Zedong_portrait.jpg&usqp=CAU')
        .setImage(avatarUrl)
        .addFields(
          {
            name: 'User: ',
            value: name,
            inline: true
          },
          
          { 
            name: '\u200b',
            value: '\u200b',
            inline: true
          },
          
          {
            name: 'Social Credit: ',
            value: userSc,
            inline: true
          },
          
          {
            name: 'A message from Mao: ',
            value: maoResponse,
            inline: true
          }
        )  
      interaction.reply({embeds: [response]});
      }
    catch(error) {
      console.log('error encountered in embed creation, passing.')
      interaction.reply({ content: 'An error has occured comrade! Contact an admin for fixing this horrible issue, delaying the glorious progress of the CCP.', ephemeral: true });
    }
  },
};