// eslint-disable-next-line import/no-cycle
import { redisClient } from '../helpers';

async function getNotifications(userId) {
  const Notes = await redisClient.get(`noti_${userId}`);
  return JSON.parse(Notes);
}

async function markAllNotificationsAsRead(userId) {
  const allNotifications = await getNotifications(userId);
  for (let i = 0; i < allNotifications.length; i += 1) {
    allNotifications[i].read = true;
  }

  await redisClient.set(`noti_${userId}`, JSON.stringify(allNotifications));
  const allreadNotifications = await redisClient.get(`noti_${userId}`);

  return JSON.parse(allreadNotifications);
}

async function markOneNotificationAsRead(userId, notificationId) {
  const allNotifications = await getNotifications(userId);
  for (let i = 0; i < allNotifications.length; i += 1) {
    // eslint-disable-next-line eqeqeq
    if (allNotifications[i].notificationId == notificationId) {
      allNotifications[i].read = true;
    }
  }

  await redisClient.set(`noti_${userId}`, JSON.stringify(allNotifications));
  const allreadNotifications = await redisClient.get(`noti_${userId}`);
  const parsed = JSON.parse(allreadNotifications);
  const readNotification = parsed.filter(
    (notification) => notification.notificationId === notificationId
  );
  return readNotification;
}

export default {
  getNotifications,
  markAllNotificationsAsRead,
  markOneNotificationAsRead,
};
