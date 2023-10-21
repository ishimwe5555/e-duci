import express from 'express';
import passport from 'passport';
import '../middleware/passport.js';
import { userControllers } from '../controllers';

const userRouter = express.Router();

userRouter.get('/users/login/google', (req, res) => {
  res
    .status(200)
    .send(
      `<a href="${process.env.PRODUCTION_URL}/auth/google/"/>Login with Google</a>`
    );
});

userRouter.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

userRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/google',
    successRedirect: '/auth/google/success',
  })
);

userRouter.get('/auth/google/success', userControllers.loginWithGoogle);

export default userRouter;
