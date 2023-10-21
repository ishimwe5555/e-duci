/* eslint-disable no-unused-expressions */
import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import io from 'socket.io-client';
import app from '../index.js';
import { chats } from '../helpers';
import { chatServices } from '../services';

chai.use(chaiHttp);
const { expect } = chai;
const server = require('http').createServer();
const ioServer = require('socket.io')(server);

chats.chats(ioServer);
const PORT = 4002;
const SERVER_URL = `http://localhost:${PORT}`;

let token;
describe('chats sockets', function () {
  after(function (done) {
    sinon.restore();
    server.close(done);
  });
  before(function (done) {
    server.listen(PORT, done);
  });

  describe('isValidAuthToken()', function () {
    it('should return false when token is not provided', async function () {
      const result = await chats.isValidAuthToken(undefined);
      expect(result).to.be.equal(false);
    });

    it('should return false when token is invalid', async function () {
      const result = await chats.isValidAuthToken('invalid_token');
      expect(result).to.be.equal(false);
    });
  });
});

describe('Socket Helpers', function () {
  describe('isValidAuthToken', function () {
    it('should return false for invalid token', async function () {
      const InvalidToken = 'invalid_token';
      const result = await chats.isValidAuthToken(InvalidToken);
      expect(result).to.be.false;
    });
  });

  describe('disconnect', function () {
    it('should emit userLeft event if username is defined', function () {
      const socket = { username: 'testuser', broadcast: { emit: sinon.spy() } };
      chats.disconnect(socket);
      expect(
        socket.broadcast.emit.calledWith(
          'userLeft',
          'testuser has left the chat'
        )
      ).to.be.true;
    });

    it('should not emit userLeft event if username is undefined', function () {
      const socket = { broadcast: { emit: sinon.spy() } };
      chats.disconnect(socket);
      expect(socket.broadcast.emit.called).to.be.false;
    });
  });
});

describe('join function helpers', function () {
  let socket;
  let isValidAuthTokenStub;
  beforeEach(async function () {
    const res = await chai
      .request(app)
      .post('/users/login')
      .send({ email: 'testing@example.com', password: 'Qwert@12345' });
    token = res.body.token;
    socket = {
      handshake: {
        query: {
          authToken: token,
        },
      },
      emit: sinon.stub(),
      disconnect: sinon.stub(),
      broadcast: {
        emit: sinon.stub(),
      },
    };
    isValidAuthTokenStub = sinon
      .stub()
      .resolves({ id: 123, username: 'testuser' });
    sinon.stub(chatServices, 'findChats').resolves({
      chats: [{ id: 1, message: 'test message' }],
    });
  });

  it('should emit unauthorized event if authToken is invalid', async function () {
    socket.handshake.query.authToken = '';
    await chats.join(socket);
    expect(
      socket.emit.calledWith('unauthorized', 'Invalid authentication token')
    ).to.be.true;
    expect(socket.disconnect.calledOnce).to.be.true;
  });

  it('should emit unauthorized event if user is not found', async function () {
    isValidAuthTokenStub.rejects();
    await chats.join(socket);
    expect(
      socket.emit.calledWith('unauthorized', 'Invalid authentication token')
    ).to.be.false;
  });

  it('should emit joined event and load chats for valid token', async function () {
    socket.handshake.query.authToken = token;
    await chats.join(socket);
    expect(
      socket.emit.calledWith('joined', {
        id: '353a6ac5-656f-402e-82b9-79997fb6a04e',
        username: 'testing',
      })
    ).to.be.true;
  });
});

describe('chats', function () {
  let newToken;
  beforeEach(function () {
    io.on = sinon.stub();
    io.emit = sinon.stub();
    io.broadcast = {
      emit: sinon.stub(),
    };
  });
  afterEach(function () {
    sinon.restore();
    sinon.restore();
  });

  it('should listen for socket events', function () {
    chats.chats(io);
    expect(io.on.calledWith('connection')).to.be.true;
  });
  it('should get chats routes', async function () {
    const res = await chai
      .request(app)
      .post('/users/login')
      .send({ email: 'testing@example.com', password: 'Qwert@12345' });
    newToken = res.body.token;
    server.listen(PORT);
    io.connect(SERVER_URL, {
      query: { authToken: `${newToken}` },
    });
    const resp = await chai.request(app).get(`/chat?token=${newToken}`);
    expect(resp).to.have.status(200);
  });
  it('should get styles for frront end chats ui', async function () {
    const response = await chai.request(app).get('/chat/style.css');
    expect(response).to.have.status(200);
  });
});

describe('Socket: chats', function () {
  it('should add chat and emit message', async function () {
    const res = await chai
      .request(app)
      .post('/users/login')
      .send({ email: 'testing@example.com', password: 'Qwert@12345' });
    const userToken = res.body.token;
    const chatServicesStub = sinon.stub(chatServices, 'addChat').resolves();
    const iochats = { on: sinon.stub() };

    const userNew = await chats.isValidAuthToken(userToken);
    const message = 'Test message';
    const emitStub = sinon.stub();
    const isValidAuthTokenStub = sinon
      .stub()
      .resolves({ id: userNew.id, username: userNew.username });
    const ioNew = { emit: emitStub, ...iochats };
    chats.chats(ioNew);
    expect(isValidAuthTokenStub.calledOnceWithExactly('undefined')).to.be.false;
    expect(
      emitStub.calledOnceWithExactly(
        'message',
        sinon.match({ userId: userNew.id, username: userNew.username, message })
      )
    ).to.be.false;
    chatServicesStub.restore();
  });
});
