// socketIo.js (CommonJS module)
const socketIo = require('socket.io');
const server = require('./httpServer'); // Import the HTTP server from the previous module

const io = socketIo(server);

module.exports = io;
