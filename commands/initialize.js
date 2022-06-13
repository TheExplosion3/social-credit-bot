const { SlashCommandBuilder } = require('@discordjs/builders');
const { botId } = require('../json/config.json');
const fn = require('../functions.js');
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
const defSC = 10;

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
        for some reason it chooses to iterate in a really scuffed way, through every ID even if its already been used,
        but i dont know how to fix that due to the required use of promises in this code.
        i don't know how to use them very well yet, so yeah.
        summary: this is very slow lmao, i can tell even without testing it or even having it fully functioning.
        thats just how bad it is kek
      */

      const pI = new Promise((resolve, reject) => {
        for(const mId of memberIDs) {

          sqlid = sc.findOne({ where: { id: mId } });

          pII = sqlid.then(response => {

            sqlid = response;
            if(sqlid === null || sqlid === undefined) {
              currentNewMembers.push(mId);
            }
              if(idx === memberIDs.length) {
                newUserCount = idx;
                resolve();
              }

            if(interaction.user.id === myId) {

              let name;

              for(const newMemberId of currentNewMembers) {

                if(complete.includes(newMemberId) === false) {
                  let scId = sc.findOne({ where: { id: newMemberId } });

                  pIII = scId.then(response => {

                    scId = response;
                    // this doesnt work for some reason, it can't find the user id or user tag. dunno why.
                    for (const member of members) {
                      console.log(temp)
                      temp++;
                      if(member.user.id === newMemberId) {
                        name = member.user.tag;
                        console.log(member.user.tag)
                      }
                    }
                    if(!scId && scId !== botId && !complete.includes(scId)) {
                      try {
                        sc.create({
                          username: name,
                          id: newMemberId,
                          socialcredit: defSC
                        });
                      }
                      catch (SequelizeUniqueConstraintError) {
                        if(error.name === 'SequelizeUniqueConstraintError') {
                          console.log('Not a new user, silently ignoring.');
                        }
                      }
                      complete.push(newMemberId);
                    }
                  })
                  pIII.catch((onRejected) => {
                    console.log(`pIII failed, rejection reason listed below: ${onRejected}`);
                  })
                }
              };
            }
            else {
              isAdmin = false;
            }
          });
          pII.catch((onRejected) => {
            console.log(`pII failed, rejection reason listed below: ${onRejected}`);
          })
          idx++;
        };
      })
      pI.catch((onRejected) => {
        console.log(`Promise I rejected, rejection reason listed below: ${onRejected}`);
      })
      const promises = [pI, pII, pIII]
      Promise.allSettled(promises).then((_results) => {
        if(!isAdmin) {
          interaction.reply('Admin Priviliges Not Found, Deducting Social Credit...');
          fn.sc_change(false, defSC, interaction.user.id);
        }
        // below c.log is for debug purposes
        console.log(newUserCount);
        interaction.reply(newUserCount + " new civilians added.");
      });
    })
  }
};
