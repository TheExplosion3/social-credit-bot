const { SlashCommandBuilder } = require('@discordjs/builders');
const myId = process.env['myid'];
const wJson = require ('./json/words.json');
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

//----------------------------------------------------------------------------\\

function observer() {
  
  const filter = m => m.content.includes('');
  const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });
  
  let arr = [];
  //regexes lol
  const posregex = /\b((John )?Cena)+|\b(Glorious)|\b(People'?s ?Republic ?Of ?China)|\b(All ?Hail)|\b(P\.?R\.?O\.?C\.?)|\b(C\.?C\.?P\.?)|\b(Collectivis(tic|t|m){1})|\b(Communis(tic|t|m){1})|\b(Mao( Zedong)?)|\b(Socialis(tic|t|m){1})|\b(Xi( ?Jinping)?)|\b(Little ?Red ?Book)|\b(Communist ?Manifesto)|\b(Xiaomi)|\b(Leader)/gi
  const negregex = /(placeholder)/gi
  const modifieregex = /\b(Glorious)|\b(Great)|\b(All ?-? ?Powerful)\b|(Wonderful)|\b((Unweak(e(r|n(ed|ings?){1}){1}){0,1})|(Weak(lings?|e(ned|r|nings?){1}|ness(es)?){0,1}))|\b((Un)?Smart(ness)?)|\b((Un)?Intellig(ence|ent)?)|\b((Un)?Wiser?)|\b(Power(ful|less))|\b(Stupid(ity|ness)?)|\b(Horrible(ness)?)|\b(Idiot(ic|s)?)|\b(Bussing?)|\b(Clown(ing?)?)|\b(Poor(ness|er)?)|\b(Commie)|\b(Fail(ings?|ures?){0,1})|\b(Los(t|ing|ers?){1})/gi
  
  collector.on('collect', m => {
    console.log('${m.content} was received from user ID ${m.content.author.id}')
    arr.push(m.content.author.id);
  });

  collector.on('end', collected => {
    let idx = 0;
    let idxtwo = 0;
    let previous_was_positive = false;

    for(let m in collected) {

      let mfull = m;

      ctr++;
      idx = 0;

      // checks for positive words and modifiers, changes score accordingly.
      while(true) {
        idx = m.search(posregex)
        if(idx === -1) {
          break;
        }
        else {
          sc_change(true, words.wordscore, interaction.author.id)
          m = m.slice(idx, m.length)
          if(idx + 1 >= m.length) {
            break;
          }
          else {
            idx++;
          }
        }
      }
      // checks for negative words and modifiers, changes score accordingly.
      while(true) {
        idx = m.search(negregex)
        if(idx === -1) {
          break;
        }
        else {
          sc_change(false, words.wordscore, interaction.author.id)
          m = m.slice(idx, m.length)
          if(idx + 1 >= m.length) {
            break;
          }
          else {
            idx++;
          }
        }
      }
    }
  });        
}