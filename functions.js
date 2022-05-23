const { SlashCommandBuilder } = require('@discordjs/builders');
const myId = process.env['myid'];
const wJson = require ('./words.json');
const sc = require('./sc.js');

const words = JSON.parse(JSON.stringify(wJson));

function sc_change(p_or_m, sc_change_amount, id) {
  
  const scamt =  sc.findOne({ where: { id: id } });
  if(p_or_m === true) {
     sc.update({ social_credit: scamt + sc_change_amount }, { where: { id: id } });
  }
  else {
     sc.update({ social_credit: scamt - sc_change_amount }, { where: { id: id } });
  }
}

async function observer() {
  
  const filter = m => m.content.includes('');
  const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });
  
  let arr = [];
  
  collector.on('collect', m => {
    arr.push(m.content.author.id);
  });

  collector.on('end', collected => {
    let str = [];
    let ctr = 0;
    let idx = 0;
    let previous_was_positive = false;

    for(let m in collected) {

      ctr++;
      idx = 0;
      
      str = m.split(' ')
      for(let w in str) {
        if(!words.has(w)) {
          str.splice(idx, idx + 1);
        }
        idx++;
      }
    }
    for(let m in str) {
      if(words.positivewords.has(m)) {
        sc_change(true, words.wordscore, str[ctr]);
        previous_was_positive = true;
      }
      else if(words.negativewords.has(m)) {
        sc_change(false, words.wordscore, str[ctr]);
        previous_was_positive = false;
      }
      else if(words.modifiers.has(m)) {
        if(previous_was_positive === false) { 
          const temp = words["modifiers"][m] * -1;
          sc_change(true, temp, str[ctr]);
        }
        sc_change(true, words["modifiers"][m], str[ctr]);
      }
      else {
        console.log('Failed to find word in list, continuing.');
      }
    }
  });        
}