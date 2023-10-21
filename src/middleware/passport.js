import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { hashPassword, comparePassword } from '../utils/password.js';
import { userServices } from '../services';

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const data = {
          email: email.trim(),
          username: req.body.username,
          password: await hashPassword(password),
        };
        const user = await userServices.createUser(data);
        done(null, user.dataValues);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      const user = await userServices.getUserByEmail(email);
      if (user) {
        const passCheck = await comparePassword(password, user.password);
        if (passCheck) {
          return done(null, user.dataValues, {
            message: 'Logged In Successfully',
          });
        }
        return done(null, false, { message: 'Password is incorrect' });
      }
      return done(null, false, { message: 'User not Found.' });
    }
  )
);

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        profile_id: profile.id,
        email: profile.emails[0].value,
        displayName: profile.displayName,
        accessToken,
        refreshToken,
      };
      done(null, user);
    }
  )
);

export default passport;
