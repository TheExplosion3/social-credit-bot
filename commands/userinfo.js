const { SlashCommandBuilder } = require('@discordjs/builders');
const { clientId, guildId } = require('../json/config.json');
const sc = require('../sc.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Replies with a user\'s social credit'),
  async execute(interaction) {

    let name = interaction.options.getString('name');
    if(name == null) {
      const userSc = sc.findOne({ where: { id: interaction.author.id } });  
      name = interaction.author.username();
    }
    else {
      const userSc = sc.findOne({ where: { name: name } });
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
        }
      )      

    interaction.reply(response);
  },
};