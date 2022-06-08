const { SlashCommandBuilder } = require('@discordjs/builders');
const Sequelize = require('sequelize');
const wJson = require ('./json/words.json');
const words = JSON.parse(JSON.stringify(wJson));

const sequelize = new Sequelize('username', 'id', 'socialcredit', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'db/database.sqlite',
});

const sc = require('./sc.js')(sequelize);

//----------------------------------------------------------------------------\\

// for use in observer() function
function striterator(input, arr, ctr) {
  for (str of arr) {
    if(words.modifiers.has(str)) {
      ctr++;
      input += words.modifiers[str];
    }
  }
  return input;
}

//----------------------------------------------------------------------------\\

// stuff for observer (i dont feel like wasting memory by having it be redefined every time the function is called)
const raiser = 500;
const logInt = 142.927;
const expval = 1.04;
// these are literally black magic do not edit (regex is hard)
const posregex = /\b((John )?Cena)+|\b(Glorious)|\b(People'?s ?Republic ?Of ?China)|\b(All ?Hail)|\b(P\.?R\.?O\.?C\.?)|\b(C\.?C\.?P\.?)|\b(Collectivis(tic|t|m){1})|\b(Communis(tic|t|m){1})|\b(Mao( Zedong)?)|\b(Socialis(tic|t|m){1})|\b(Xi( ?Jinping)?)|\b(Little ?Red ?Book)|\b(Communist ?Manifesto)|\b(Xiaomi)|\b(Leader)/gi;

const negregex = /\b((?! ?of)(\3 ?Of ?\4)|((The)? ?United ?States)|(America(n?s?)?))|\b(U\.?\.S\.?A?\.?)|\b((The)? ?West(ern(ers)?)?)|\b(Trad(er|ing|e){1}s?)|\b(Tianenmen( ?Square( ?Incident(( ?Of)? ?1989| ?1989)?)?)?)|\b(Capital(ist(ivism)?|ism))|\b((Jos(ef|eph))? ?Stalin(is(t|m)?)?)|\b(((C|K)arl)? ?Marx(is(t|m)?)?)|\b(Free((ness|dom)?( ?of ?(Speech|Rights))?)?)|\b(Re(bel(lions?)?|volution(ar(ies|ys?)|s)?|sistances?))|\b(Democra(t|tic(ness)?|c(ies|ys?)))|\b((Democratic)? ?Republic ?Of ?China)|\b(Taiwan(ese(ness)?|ness)?)|\b(Tibet(ans?|ese(ness)?|ness))|\b(U\.?S\.?S\.?R\.?|C\.?C\.?C\.?P|R\.?S\.?F\.?S\.?R\.?|E\.?U\.?|N\.?A\.?T\.?O\.?)|\b(European Union)|\b((The)?Soviet ?Union)|\b(North ?Atlantic ?Treaty ?Organization)|\b(((Winnie ?)?(the ?)?){0,2}Pooh)|\b(Winnie)|\b(Class(es|ist(ness|s)?)?)/gi;

const modifierregex = /\\b(Glor((y|ious(ness)?)){1})|\b(Great(s|less(ness)?|ness)?)|\b((All ?-? ?)?(Power((less|ful)?(ness)?)))\b|\b(Wonderful)|\b((Unweak(e(r|n(ed|ings?){1}){1})?)|(Weak(lings?|e(ned|r|nings?){1}|ness(es)?)?))|\b((Un)?Smart(ness)?)|\b((Un)?Intellig(ences?|ents?)?)|\b((Un)?Wise(r|ly|ness)?)|\b(Stupids?(ity|ness)?)|\b(Horrible(s|ness)?)|\b(Idiot(ic|s)?)|\b(Bussing?s?)|\b(Clown(s|ing?)?)|\b(Poor(ness|er)?)|\b(Fail(s|ed|ings?|ures?)?)|\b(Los(s(es)?|t|ing|ers?){1})|\b(Belie(fs?|v(ing|es?)))|\b(Fault(s|ed)?)|\b(Pig(ness|s)?)|\b(Commie(s|ness)?)|\b(Bastard(ness|s)?)|\b(Lower(eds?|ness|s)?)|\b(Upper(s|ness|eds?)?)/gi;

//----------------------------------------------------------------------------\\

// changes the amount of social credit in the database, according to whether or not its pos or neg via pm, its change value as amt, and the id in the database as id.
const sc_change = (pm, amt, id) => {

  const scamt =  sc.findOne({ where: { id: id } });

  if(pm === true && scamt !== null) {
    sc.update({ social_credit: scamt + amt }, { where: { id: id } });
  }
  else if(pm === false && scamt !== null) {
    sc.update({ social_credit: scamt - amt }, { where: { id: id } });
  }
  else {
    console.log("scamt failed to find a proper id, continuing silently.");
  }
}

//----------------------------------------------------------------------------\\

const observer = async () => {

  const filter = msg => msg.content.includes('');
  const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });

  let arr = [];
  let msgidcredit = new Map();
  let lastWasPositive = false;

  collector.on('collect', msg => {
    console.log('${m.content} was received from user ID ${m.content.author.id}')
    arr.push(msg.content.author.id);
  });

  collector.on('end', collected => {
    let ctr = 0;
    let newVal = 0;

    if(collected !== null) {
      for(let msg in collected) {

        const modstring = msg;
        let currentarr;
        // changes social credit additively based upon num of pos words, increasing by 5 for each one
        newVal = (msg.matchAll(posregex).length - 1) * words.wordscore;

        while(true) {
          // defines the current array of matches to currentarr, modified string to modstring (sliced string down to final posregex match)
          currentarr = msg.matchAll(posregex);
          modstring = msg.slice(idxtwo, msg.matchAll(posregex).length - 1);
          lastWasPositive = true;

          if(modstring.match(negregex) !== null) {
            // sets wordscore based upon negative words, reducing if theyre found
            newVal = msgidcredit.get(idx) - (modstring.match(negregex).length - 1) * words.wordscore;
            lastWasPositive = false;

            // if modifiers are found, foreach through all of them and change social credit accordingly.
            if(modstring.match(modifierregex) !== null) {
              currentarr = modstring.match(modifierregex);
              newVal = Math.round(expval ** (striterator(newVal, currentarr, ctr)/(1 - Math.LOG10E)));
              if(newVal > 500) {
                /*
                  142.927 is the y val of 500 for the exp, + 500 raises it by 500. im using ln because i dont feel like using change of base equation, so yeah. it also just works well enough.
                  equations: y1 = rnd((1.04^x)/1-log e)
                            y2 = rnd(ln(y1 - 142.927) + 500)
                */
                newVal = Math.round(Math.log(newVal - logInt) + raiser);
              }
            }
            ctr++;
          }
          else if(modstring.match(modifierregex) == true) {
            currentarr = modstring.match(modifierregex);
            if(lastWasPositive === true) {
              newVal = Math.round(expval ** (striterator(newVal, currentarr, ctr)/(1 - Math.LOG10E)));
              if(newVal > 500) {
                newVal = Math.round(Math.log(newVal - logInt) + raiser);
              }
            }
          }
          else {
            msgidcredit.set(arr[idx], newVal);
            idx++;
            idxtwo = 0;
          }
          if(ctr === collected.length - 1) {
            break;
          }
        }
      }
    }
    for(const [id, credit] of msgidcredit.entries()) {
      sc_change(true, credit, id);
    }
  });
}

//----------------------------------------------------------------------------\\

module.export = {
  observer,
  sc_change
}