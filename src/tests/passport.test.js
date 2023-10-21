import { expect } from 'chai';
import sinon from 'sinon';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../database/models/user.model';

/* eslint-disable no-unused-expressions */
describe('passport-local strategy', function () {
  before(function () {
    passport.use(
      new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
          try {
            const user = await User.findOne({ email });
            if (user) {
              return done(null, false, { message: 'Email Already Exists' });
            }
            return done(null, { email });
          } catch (error) {
            return done(error);
          }
        }
      )
    );
  });

  it('should return an error if user already exists', function (done) {
    const mockUser = {
      email: 'testuser@example.com',
    };
    sinon.stub(User, 'findOne').resolves(mockUser);
    const req = {
      body: { email: 'testuser@example.com', password: 'password123' },
    };
    passport.authenticate('local', (err, user, info) => {
      expect(err).to.be.null;
      expect(user).to.be.false;
      expect(info.message).to.equal('Email Already Exists');
      User.findOne.restore();
      done();
    })(req);
  });

  it('should authenticate user if not already registered', function (done) {
    sinon.stub(User, 'findOne').resolves(null);
    const req = {
      body: { email: 'testuser@example.com', password: 'password123' },
    };
    passport.authenticate('local', (err, user, info) => {
      expect(err).to.be.null;
      expect(user.email).to.equal('testuser@example.com');
      expect(info).to.be.undefined;
      User.findOne.restore();
      done();
    })(req);
  });
});
