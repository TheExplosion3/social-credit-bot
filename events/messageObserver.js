const { observer } = require('../functions.js');

module.exports = {
  name: 'typingStart',
  execute(client) {
    console.log('Observer started...');
    observer()
    console.log('Observer finished...');
  }
}