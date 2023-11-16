import { Router } from 'express';
import path from 'path';
import { isAuthenticated } from '../middleware';
import { asyncWrapper } from '../helpers';
import notificationServices from '../services/notification.services';
import { readNotificationController } from '../controllers/index.mjs';

const router = Router();

router.get('/', (req, res) => {
  res.sendFile(path.resolve('src/public/index.html'));
});

router.get('/style.css', (req, res) => {
  res.sendFile(path.resolve('src/public/css/n-styles.css'));
});

router.get(
  '/all',
  isAuthenticated,
  asyncWrapper(async (req, res) => {
    const Notifications = await notificationServices.getNotifications(
      req.user.id
    );
    return res.status(200).json({
      code: 200,
      message: `Nofications For ${req.user.username}`,
      Notifications,
    });
  })
);

router.post(
  '/read',
  isAuthenticated,
  asyncWrapper(readNotificationController.markAllAsRead)
);

router.post(
  '/:notificationId/read',
  isAuthenticated,
  asyncWrapper(readNotificationController.markOneAsRead)
);

export default router;
