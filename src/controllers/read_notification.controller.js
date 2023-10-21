import { readNotificationService } from '../services';

const markAllAsRead = async (req, res) => {
  const read = await readNotificationService.markAllNotificationsAsRead(
    req.user.id
  );

  return res.status(200).json({
    code: 200,
    message: 'All notification marked as read',
    read,
  });
};

const markOneAsRead = async (req, res) => {
  const { notificationId } = req.params;
  const oneRead = await readNotificationService.markOneNotificationAsRead(
    req.user.id,
    notificationId
  );

  return res.status(200).json({
    code: 200,
    message: 'One notification marked as read',
    oneRead,
  });
};

export default { markAllAsRead, markOneAsRead };
