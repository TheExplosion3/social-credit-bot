const { observer } = require('../functions.js');

module.exports = {
  name: 'typingStart',
  execute(client) {
    console.log('Observer process started...');
    const observerPromise = new Promise((resolve, reject) => {
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
    observerPromise.catch((onRejected) => {
      console.log('Observer process failed');
    })
  }
}