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
    let isAdmin = true;

    await interaction.guild.members.fetch().then(members => {   

      const memberIDs = members.map((member) => member.id);
      let sqlid;
      let complete = [];

      
        // this can be simplified probably to make it more efficient but idk how
      memberIDs.forEach(member => {
        
        sqlid = sc.findOne({ where: { id: member } });
    
        sqlid.then(response => {
          sqlid = response;
          if(sqlid === null || sqlid === undefined) {  
            currentNewMembers.push(member);
          }
          newUserCount = currentNewMembers.length;
          if(interaction.user.id === myId) {
            let name;
            currentNewMembers.forEach(id => {
              let scId = sc.findOne({ where: { id: id } });
              scId.then(response => {
                scId = response
                members.forEach(member => {
                if(member.id === id) {
                  name = member.user.tag;
                  }
                })
                if((!scId && scId !== botId) && complete.includes(id) === false) {
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
                  complete.push(id)
                }
              });   
            });           
          }
          else {
            isAdmin = false;
          }
        });
      });
    });
    if(!isAdmin) {
      await interaction.reply('Admin Priviliges Not Found, Deducting Social Credit...');
      sc_change(false, 10, interaction.user.id)
    }
    console.log(newUserCount)
    await interaction.reply(newUserCount + " new civilians added.")
    
  }

};
