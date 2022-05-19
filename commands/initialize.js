const { SlashCommandBuilder } = require('@discordjs/builders');
const { clientId, guildId} = require('../config.json');
const myId = process.env['myid'];

module.exports = {
  data: new SlashCommandBuilder()
		.setName('initialize')
		.setDescription('Initializes all new civilians into the Glorious Social Credit System.'),
  async execute(interaction) {
    let currentNewMembers = [];
    let newUserCount = 0;
    const guild = interaction.client.guilds.cache.get(guildId);
    guild.members.fetch().then(members => {
        let tag;
          // Loop through every members
        members.forEach(member => {
          tag = sc.findOne({ where: { id: member } });
          if(!tag) {  
            currentNewMembers.push(member);
            newUserCount++;
          }
        });
      });
    
    if (interaction.user.id === myId) {
      currentNewMembers.forEach(member => {
        const list = guild.members.cache.keys();
        const scId = sc.findOne({ where: { id: member } });
        if(scId) {
           try {
          // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
          const tag = sc.create({
            name: name,
            id: member,
            social_credit: 10
          });
      
        }
          catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
              console.log();
            }
          }
        }
      })
      await interaction.reply(newUserCount + " new civilians added.")
    }
    else {
      await interaction.reply('Admin Priviliges Not Found, Deducting Social Credit...');
    }
  }
};
