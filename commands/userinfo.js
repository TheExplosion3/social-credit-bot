const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('username', 'id', 'socialcredit', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'db/database.sqlite',
});

const sc = require('../sc.js')(sequelize);

const phrases = new Map([
  [0, 'Your death will be a victory for our nation, you capitalist filth.'],
  [1, 'Your execution date will be soon, traitor.'],
  [2, 'Your social credit is too low! Your execution date will be soon if you don\'t do better, my friend!'],
  [3, 'My friend, you\'re doing alright, but you can do better! The CCP believes in you!'],
  [4, 'Good job my friend! You have a good social credit score!'],
  [5, 'The CCP honors you, my friend.'],
  [6, 'You are an example for all of us, the CCP strives to be as great as you.'],
  [7, 'You are all powerful, and you are an example for all of us. You should lead the CCP next, my friend, you would guide us along our path well and true']
])

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Replies with a user\'s social credit.'),
  async execute(interaction) {
    
    const avatarUrl = interaction.user.displayAvatarURL();
    let maoResponse;
    let name = interaction.user.username;
    let userSc = sc.findOne({
      where: { 
        id: interaction.user.id
      } 
    }).then(_result => {

      // dunno why i put this in hex, i sorta just felt like it.
      if(userSc <= -50) {
        maoResponse = phrases.get(0);
      }
      else if(userSc > 0x0) {
        maoResponse = phrases.get(1);
      }
      else if(userSc >= 0xa) {
        maoResponse = phrases.get(2);
      }
      else if(userSc >= 0x3e8) {
        maoResponse = phrases.get(3);
      }
      else if(userSc >= 0x2710) {
        maoResponse = phrases.get(4);
      }
      else if(userSc >= 0x88b8) {
        maoResponse = phrases.get(5);
      }
      else if(userSc >= 0x88b9 && userSc <= 0x16e35f) {
        maoRespone = phrases.get(6)
      }
      else {
        maoResponse = phrases.get(7);
      }

      try {
        response = new MessageEmbed()
          .setTitle('Social Credit Score')
          .setColor('DE2910')
          .setDescription(`Here is your social credit score, straight from the glorious CCP, ${name}!`)
          // image link to mao portrait lmao
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
              name: 'A Message from Mao: ',
              value: maoResponse,
              inline: true
            }
          )  
        interaction.reply({embeds: [response]});
        }
      catch(error) {
        console.log(`error encountered in embed creation, passing. error log below: \n${error}`)
        interaction.reply({ content: 'An error has occured comrade! Contact an admin for fixing this horrible issue, delaying the glorious progress of the CCP.', ephemeral: true });
      }
    });
  },
};