const { SlashCommandBuilder } = require('@discordjs/builders');
const { clientId, guildId } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Replies with a user\'s social credit, representing their faith and trust in the all-powerful china and glorious CCP.'),
  async execute(interaction) {

    const userSc = sc.findOne({ where: { id: message.author.id } });
    
    let response = new Discord.MessageEmbed()
      .setTitle('Social Credit Score')
      .setColor('DE2910')
      .addFields(
        {
          name: 'User: ',
          value: message.author.username,
          inline: true
        },
        
        {
          name: 'Social Credit: ',
          value: userSc,
          inline: true
        }
      )      

    message.reply(response);
  },
};