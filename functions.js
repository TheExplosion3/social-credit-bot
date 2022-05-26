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
  // these are literally black magic do not edit (regex is hard)
  const posregex = /\b((John )?Cena)+|\b(Glorious)|\b(People'?s ?Republic ?Of ?China)|\b(All ?Hail)|\b(P\.?R\.?O\.?C\.?)|\b(C\.?C\.?P\.?)|\b(Collectivis(tic|t|m){1})|\b(Communis(tic|t|m){1})|\b(Mao( Zedong)?)|\b(Socialis(tic|t|m){1})|\b(Xi( ?Jinping)?)|\b(Little ?Red ?Book)|\b(Communist ?Manifesto)|\b(Xiaomi)|\b(Leader)/gi
  const negregex = /\b((?! ?of)(\3 ?Of ?\4)|((The)? ?United ?States)|(Americas?))|\b(U\.?\.S\.?A?\.?)|\b((The)? ?West(ern(ers)?)?)|\b(Trade(r)?s?)|\b(Tianenmen( ?Square( ?Incident(( ?Of)? ?1989| ?1989)?)?)?)|\b(Capital(ist(ivism)?|ism))|\b((Jos(ef|eph))? ?Stalin(is(t|m)?)?)|\b(((C|K)arl)? ?Marx(is(t|m)?)?)|\b(Free((ness|dom)?( ?of ?(Speech|Rights))?)?)|\b(Re(bel(lions?)?|volution(ar(ies|ys?)|s)?|sistances?))|\b(Democra(t|tic(ness)?|c(ies|ys?)))|\b((Democratic)? ?Republic ?Of ?China)|\b(Taiwan(ese(ness)?|ness)?)|\b(Tibet(ans?|ese(ness)?|ness))|\b(U\.?S\.?S\.?R\.?|C\.?C\.?C\.?P|R\.?S\.?F\.?S\.?R\.?|E\.?U\.?|N\.?A\.?T\.?O\.?)|\b(European Union)|\b((The)?Soviet ?Union)|\b(North ?Atlantic ?Treaty ?Organization)|\b(Winnie ?the ?Pooh)|\b(Class(es|ist(ness|s)?)?)/gi
  const modifieregex = /\\b(Glor((y|ious(ness)?)){1})|\b(Great(s|less(ness)?|ness)?)|\b((All ?-? ?)?(Power((less|ful)?(ness)?)))\b|\b(Wonderful)|\b((Unweak(e(r|n(ed|ings?){1}){1})?)|(Weak(lings?|e(ned|r|nings?){1}|ness(es)?)?))|\b((Un)?Smart(ness)?)|\b((Un)?Intellig(ences?|ents?)?)|\b((Un)?Wise(r|ly|ness)?)|\b(Stupids?(ity|ness)?)|\b(Horrible(s|ness)?)|\b(Idiot(ic|s)?)|\b(Bussing?s?)|\b(Clown(s|ing?)?)|\b(Poor(ness|er)?)|\b(Fail(s|ed|ings?|ures?)?)|\b(Los(s(es)?|t|ing|ers?){1})|\b(Belie(fs?|v(ing|es?)))|\b(Fault(s|ed)?)|\b(Pig(ness|s)?)|\b(Commie(s|ness)?)|\b(Bastard(ness|s)?)|\b(Lower(eds?|ness|s)?)|\b(Upper(s|ness|eds?)?)/gi
  
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