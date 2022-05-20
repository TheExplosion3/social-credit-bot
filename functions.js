const { SlashCommandBuilder } = require('@discordjs/builders');
const myId = process.env['myid'];

function sc_change(p_or_m, sc_change_amount, id) {
  const scamt =  sc.findOne({ where: { id: id } });
  if(p_or_m === true) {
     sc.update({ social_credit: scamt + sc_change_amount }, { where: { id: id } });
  }
  else {
     sc.update({ social_credit: scamt - sc_change_amount }, { where: { id: id } });
  }
}