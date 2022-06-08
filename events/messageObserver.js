const { observer } = require('../functions.js');

module.exports = {
  name: 'typingStart',
  execute(client) {
    console.log('Observer process started...');
    // create the promise, and start observer within. 
    const observerPromise = new Promise((resolve, reject) => {
      // run observer async function, upon successful completion it will resolve, otherwhise when it fails it will print the error, and most likely itll end the program, idk what it'll actually do
      observer()
        .then(_result => {
          resolve();
      })
        .catch((error) => {
          console.log(`Observer error occurred, dumping error below:\n${error}`)
          reject();
      })
    }).then(_result => {
      console.log('Observer process successfully finished.')
    });
    observerPromise.catch((_onRejected) => {
      console.log('Observer process failed');
    })
  }
}