const { SlashCommandBuilder } = require('@discordjs/builders');
const { clientId, guildId } = require('../json/config.json');
const sc = require('../sc.js');

const phrases = new Map()
const thirdphrases = new Map();

// theres definitely a better way to do this, i just dont know how.
phrases.set(0, "Your execution date will be soon, traitor.")
phrases.set(1, "Your social credit is too low! Your execution date will be soon if you don't do better, my friend!")
phrases.set(2, "Good job my friend! You have a good social credit score!")
phrases.set(3, "The CCP honors you, my friend.")

thirdphrases.set(0, "Your traitorous friend's execution date will be soon. Thank you for reporting his treason to the glorious CCP, my friend.")
thirdphrases.set(1, "Your friend's social credit is too low! Their execution date will be soon if they don't do better, my friend!")
thirdphrases.set(2, "Your friend has a great social credit score! You should strive to be like them, my friend!")
thirdphrases.set(3, "This person is honorable, my friend, you should strive to be like them.")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Replies with a user\'s social credit')
    .addStringOption(option =>
      option.setName('other user')
      .setDescription('Shows another user\'s glorious credit score.')
      .setRequired(false),
     ),
  async execute(interaction) {
    
    let name = interaction.options.getString('name');
    let maoresponse;
    
    if(name == null) {
      const userSc = sc.findOne({ where: { id: interaction.author.id } });  
      name = interaction.author.username();
    }
    else {
      const userSc = sc.findOne({ where: { name: name } });
    }

    if(option === null) {
      if(userSc <= 30) {
        maoresponse = phrases[1]
      }
      else if(31 <= userSc < 99) {
        maoresponse = phrases[2]
      }
      else if(100 <= userSc < 300) {
        maoresponse = phrases[3]
      }
      else {
        maoresponse = phrases[0]
      }
    }
    else {
      if(userSc <= 30) {
        maoresponse = thirdphrases[1]
      }
      else if(31 <= userSc < 99) {
        maoresponse = thirdphrases[2]
      }
      else if(100 <= userSc < 300) {
        maoresponse = thirdphrases[3]
      }
      else {
        maoresponse = thirdphrases[0]
      }
    }
    
    let response = new Discord.MessageEmbed()
      .setTitle('Social Credit Score')
      .setColor('DE2910')
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
          value: maoresponse,
          inline: true
        }
      )  
    interaction.reply(response);
  },
};