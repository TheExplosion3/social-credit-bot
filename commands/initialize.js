const { SlashCommandBuilder } = require('@discordjs/builders');
const { botId } = require('../json/config.json');
const { sc_change } = require('../functions.js');
const Sequelize = require('sequelize');
const myId = process.env['myid'];

const sequelize = new Sequelize('username', 'id', 'socialcredit', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'db/database.sqlite',
});

const sc = require('../sc.js')(sequelize)

module.exports = {
  data: new SlashCommandBuilder()
		.setName('initialize')
		.setDescription('Initializes all new civilians into the Glorious Social Credit System.'),
  async execute(interaction) {
    
    let currentNewMembers = [];
    let newUserCount = 0;
    let ctr = 0;

    await interaction.guild.members.fetch().then(members => {   

      const memberIDs = members.map((member) => member.id);
      let sqlid;
      
        // Loop through every members
      memberIDs.forEach(member => {
        
        sqlid = sc.findOne({ where: { id: member } });
        
        if(sqlid !== null || sqlid !== undefined) {  
          currentNewMembers.push(member);
          newUserCount++;      
        }
        
      });
    });

    if(interaction.user.id === myId) {
      currentNewMembers.forEach(id => {
        const scId = sc.findOne({ where: { id: id } });
        const name = interaction.client.users.cache.find(members => members.username == 'USERNAME')
        if(!scId && scId !== botId) {
          try {
            sc.create({
              username: name,
              id: id,
              socialcredit: 10
            });
          }
          catch (error) {
            if(error.name === 'SequelizeUniqueConstraintError') {
              console.log('Not a new user, silently ignoring.');
            }
          }
        }
      })
      await interaction.reply(newUserCount + " new civilians added.")
    }
    else {
      await interaction.reply('Admin Priviliges Not Found, Deducting Social Credit...');
      sc_change(false, 10, interaction.user.id)
    }
  }
};
