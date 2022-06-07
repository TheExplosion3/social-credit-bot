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

const sc = require('../sc.js')(sequelize);


let newUserCount = 0;

module.exports = {
  data: new SlashCommandBuilder()
		.setName('initialize')
		.setDescription('Initializes all new civilians into the Glorious Social Credit System.'),
  async execute(interaction) {
    newUserCount = 0;
    let currentNewMembers = [];
    let isAdmin = true;

    await interaction.guild.members.fetch().then(members => {   

      
      const memberIDs = members.map((member) => member.id);
      let sqlid;
      let complete = [];
      let idx = 0;
      let temp = 0;

      /*
        this can be simplified probably to make it more efficient but idk how, right now its either O(n^2) or O(n log n), but yeah.
        tbh it could also be O(2^n) due to how its iteration is so poorly designed.
        for some reason it chooses to iterate in a really scuffed way, through every ID even if its already been used, but i dont know how to fix that due to the required use of promises.
        i don't know how to use them very well yet, so yeah.
        summary: this is very slow lmao, i can tell even without testing it.
      */

      const defSC = 10;
      const p = new Promise((resolve, reject) => {
        for(const mid of memberIDs) {
          
          sqlid = sc.findOne({ where: { id: mid } });
      
          sqlid.then(response => {
  
            sqlid = response;
            if(sqlid === null || sqlid === undefined) {  
              currentNewMembers.push(mid);
            }
              if(idx === memberIDs.length) {
                newUserCount = idx; 
                resolve();
              }
  
            if(interaction.user.id === myId) {
  
              let name;
  
              for(const id of currentNewMembers) {
  
                if(complete.includes(id) === false) {
                  let scId = sc.findOne({ where: { id: id } });
                  
                  scId.then(response => {
                    
                    scId = response;
                    // this doesnt work for some reason, it can't find the user id or user tag. dunno why.
                    for (const member of members) {
                      console.log(temp)
                      temp++;
                      if(member.user.id === id) {
                        name = member.user.tag;                        
                        console.log(member.user.tag)
                      }
                    }
                    if(!scId && scId !== botId && !complete.includes(scId)) {
                      try {
                        sc.create({
                          username: name,
                          id: id,
                          socialcredit: defSC
                        });               
                      }
                      catch (SequelizeUniqueConstraintError) {
                        if(error.name === 'SequelizeUniqueConstraintError') {
                          console.log('Not a new user, silently ignoring.');
                        }
                      }
                      complete.push(id);
                    }
                  }); 
                }           
              };           
            }
            else {
              isAdmin = false;
            }
          });
          idx++;
        };
      }).then(result => {
        if(!isAdmin) {
          interaction.reply('Admin Priviliges Not Found, Deducting Social Credit...');
          sc_change(false, defSC, interaction.user.id);
        }
        // below c.log is for debug purposes
        console.log(newUserCount);
        interaction.reply(newUserCount + " new civilians added.");
      }); 
    });
  }
};
