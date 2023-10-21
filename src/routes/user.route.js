import { Router } from 'express';
import '../middleware/passport';
import {
  userControllers,
  tfaEnableDisable,
  userProfileController,
  fetchUserController,
} from '../controllers';
import checkUser from '../middleware/checkUser';
import {
  LoginSchema,
  SignUpSchema,
  PasswordSchema,
  newPasswordSchema,
  userProfileSchema,
} from '../utils';
import {
  isAuthenticated,
  userEmailExists,
  userUsernameExists,
  validate,
  checkPermission,
} from '../middleware';
import { asyncWrapper } from '../helpers';

const router = Router();
router.post(
  '/signup',
  validate(SignUpSchema),
  userEmailExists,
  userUsernameExists,
  userControllers.signUp
);
router.get('/protected-route', isAuthenticated, (req, res) => {
  res
    .status(200)
    .json({ code: 200, message: `Logged In as ${req.user.email}` });
});
router.post('/login', validate(LoginSchema), userControllers.login);
router.post('/logout', isAuthenticated, userControllers.logOut);
router.post('/verify/:email', userControllers.verifyOTP);

router.patch(
  '/tfa-enable-disable',
  isAuthenticated,
  checkPermission('SELLER'),
  asyncWrapper(tfaEnableDisable)
);

router.put(
  '/profile',
  isAuthenticated,
  validate(userProfileSchema),
  asyncWrapper(userProfileController)
);

router.get('/profile', isAuthenticated, asyncWrapper(fetchUserController));

router.patch(
  '/disable/:id',
  isAuthenticated,
  checkPermission('ADMIN'),
  asyncWrapper(userControllers.disableUserAccount)
);

router.post(
  '/forgotPassword',
  checkUser,
  asyncWrapper(userControllers.forgotPassword)
);
router.put(
  '/reset-password/:token',
  validate(PasswordSchema),
  asyncWrapper(userControllers.resetPassword)
);

router.get(
  '/all',
  isAuthenticated,
  checkPermission('ADMIN'),
  asyncWrapper(userControllers.findAll)
);

router.get('/', (req, res) => {
  res.status(200).json('Hello users!');
});
router.patch(
  '/change-password',
  isAuthenticated,
  validate(newPasswordSchema),
  asyncWrapper(userControllers.changePassword)
);

export default router;
