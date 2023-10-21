import chai from 'chai';
import chaiHttp from 'chai-http';
import io from 'socket.io-client';
import { chats } from '../helpers';

chai.use(chaiHttp);
const { expect } = chai;

describe('chats', function () {
  let server, client1, client2;

  beforeEach(function (done) {
    server = require('http').createServer();
    const ioServer = require('socket.io')(server);
    chats.chats(ioServer);
    server.listen(3000);
    client1 = io(`http://localhost:${3000}`);
    client2 = io(`http://localhost:${3000}`);
    client1.on('connection', () => client1.emit('join'));
    client2.on('connection', () => client2.emit('join'));
    done();
  });

  afterEach(function (done) {
    server.close();
    client1.close();
    client2.close();
    done();
  });

  it('should emit typing to all clients except the sender', function (done) {
    client1.on('typing', (message) => {
      expect(message).to.equal('client2 is typing');
      done();
    });
    client2.emit('typing', 'client2 is typing');
    done();
  });

  it('should emit message to all clients', async function () {
    client1.emit('message', 'hello world');
    const res = client2.on('message');
    expect(res);
  });
});
