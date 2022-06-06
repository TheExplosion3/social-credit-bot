const { observer } = require('../functions.js');

module.exports = {
  name: 'typingStart',
  execute(client) {
    console.log('Observer process started...');
    observer()
    console.log('Observer process finished...');
  }
}