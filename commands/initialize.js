const { SlashCommandBuilder } = require('@discordjs/builders');
const { clientId, guildId} = require('../config.json');
const myId = process.env['myid'];

function sc_change(p_or_m, sc_change_amount, id) {
  const tag = await sc.findOne({ where: { id: id } });
  if(p_or_m === true) {
    await sc.update({ social_credit: tag + sc_change_amount }, { where: { name: tagName } });
  else {
    await sc.update({ social_credit: tag - sc_change_amount }, { where: { name: tagName } });
  }
}


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
          const tag = sc.create({
            name: client.users.cache.find(member => user.id === 'USER-ID'),
            id: member,
            social_credit: 10
          });
      
        }
          catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
              console.log("Not a new user, silently ignoring.");
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
