const { getMessages } = require('./getMessages.js');
const { postMessage } = require('./postMessage.js');
const { deleteMessage } = require('./deleteMessage.js');
const { updateMessage } = require('./updateMessage.js');

module.exports = {
  getMessages, postMessage, deleteMessage, updateMessage,
};
