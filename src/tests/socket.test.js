import chai from 'chai';
import chaiHttp from 'chai-http';
import io from 'socket.io-client';
import sockets from '../helpers/notifications';
import app from '../index.js';
import notificationServices from '../services/notification.services.js';

chai.use(chaiHttp);

const { expect } = chai;
const PORT = 4004;

// Define the URL of the Socket.IO server
const SERVER_URL = `http://localhost:${PORT}`;

// Create a Socket.IO server
const server = require('http').createServer();
const ioServer = require('socket.io')(server);

sockets(ioServer);
describe('sockets', function () {
  let client;
  before(function (done) {
    server.listen(PORT, done);
  });

  it('should emit an error if an invalid auth token is provided', function (done) {
    client = io.connect(SERVER_URL);
    // Emit a `join` event with an invalid auth token
    client.emit('join', { authToken: 'invalid' });

    // Listen for the `unauthorized` event
    client.on('unauthorized', (message) => {
      expect(message).to.equal('Invalid authentication token');
      done();
    });
  });

  it('should emit a `joined` event if a valid auth token is provided', function (done) {
    chai
      .request(app)
      .post('/users/login')
      .send({ email: 'testing@example.com', password: 'Qwert@12345' })
      .end((err, res) => {
        const { token } = res.body;
        client = io.connect(SERVER_URL, {
          query: { authToken: `${token}` },
        });
        client.emit('join');
        notificationServices.sendNotification(
          '353a6ac5-656f-402e-82b9-79997fb6a04e',
          'Testing',
          'Testing',
          'high'
        );
        client.on('joined', (data) => {
          notificationServices.sendNotification(data.id, 'Hello');
          expect(data.id);
          expect(data.username);
          client.emit('all-notifications', data);
          done();
        });
      });
  });
});
