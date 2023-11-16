import Chat from '../database/models/categories.model.mjs';

async function createChat(room) {
  const newRoom = await Chat.create({ room });
  return newRoom;
}

async function findChats(room) {
  let chats = await Chat.findOne({ where: { room } });
  if (!chats) {
    await createChat(room);
  }
  chats = await Chat.findOne({ where: { room } });
  return chats;
}

async function addChat(room, chat) {
  try {
    const chats = await findChats(room);
    chats.chats.push(chat);
    const newChat = await Chat.update(
      { chats: chats.chats },
      { where: { room } }
    );
    return newChat;
  } catch (error) {
    throw new Error(error);
  }
}

export default { findChats, addChat, createChat };
