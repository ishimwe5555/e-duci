import express from 'express';
import { roleControllers } from '../controllers/index.mjs';
import isAuthenticated from '../middleware/authentication/authentication';
import validateRole from '../utils/roleValidator';
import checkPermission from '../middleware/checkPermission.middleware';
import { asyncWrapper } from '../helpers';

const router = express.Router();
router.patch(
  '/:userId/role',
  isAuthenticated,
  checkPermission('ADMIN'),
  validateRole,
  asyncWrapper(roleControllers)
);

export default router;
