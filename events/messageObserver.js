const { observer } = require('../functions.js');

module.exports = {
  name: 'typingStart',
  execute(client) {
    observer()
  }
}