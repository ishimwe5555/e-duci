import chai from 'chai';
import chaiHttp from 'chai-http';
import { v4 as uuidv4 } from 'uuid';
import { chatServices } from '../services';
import Chat from '../database/models/chats.model';

chai.use(chaiHttp);
const { expect } = chai;

describe('chatServices', function () {
  beforeEach(async function () {
    await Chat.destroy({ where: {} });
  });

  describe('findChats', function () {
    it('should create a new chat room if one does not exist', async function () {
      const room = 'test-room';
      const chats = await chatServices.findChats(room);
      expect(chats.room).to.equal(room);
    });

    it('should return an existing chat room', async function () {
      const room = 'test-room';
      const chatData = { room, chats: [] };
      await Chat.create(chatData);
      const chats = await chatServices.findChats(room);
      expect(chats.room).to.equal(room);
    });
  });

  describe('addChat', function () {
    it('should add a new chat to the specified room', async function () {
      const chat = {
        userId: uuidv4(),
        username: 'test-user',
        message: 'test-message',
        date: new Date(),
      };
      const chatsMessage = await chatServices.addChat('public', chat);
      expect(chatsMessage).to.be.an('array');
    });
  });
});
