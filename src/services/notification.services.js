/* eslint-disable import/no-cycle */
import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line import/no-cycle
import { redisClient } from '../helpers';

const notificationEmitter = new EventEmitter();

function sendNotification(user, msg, title, level) {
  const Obj = {
    id: user,
    notificationId: uuidv4(),
    title: title || 'Notification',
    message: msg,
    level: level || 'mid',
    read: false,
    date: new Date(),
  };
  notificationEmitter.emit('notification', Obj);
}

async function storeNotification(notifications) {
  let isSet = await redisClient.get(`noti_${notifications.id}`);
  if (!isSet) {
    await redisClient.set(`noti_${notifications.id}`, JSON.stringify([]));
  }
  isSet = await redisClient.get(`noti_${notifications.id}`);
  const MyNotis = JSON.parse(isSet);
  MyNotis.push(notifications);
  await redisClient.set(`noti_${notifications.id}`, JSON.stringify(MyNotis));
  if (isSet) {
    return true;
  }
  throw new Error('Not set');
}

async function getNotifications(userId) {
  const Notes = await redisClient.get(`noti_${userId}`);
  return JSON.parse(Notes) || [];
}

notificationEmitter.on('notification', async (notification) => {
  await storeNotification(notification);
});

export default { sendNotification, notificationEmitter, getNotifications };
