import debug from 'debug';
import { Strategy } from 'passport-local';
import passport from 'passport';

import User from '../../models/user.model';

const DEBUG = debug('dev');

const authFields = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

passport.use(
  'login',
  new Strategy(authFields, async ( email, password, done) => {
    try {
      const user = await User.findOne({
        $or: [{ email }, { userName: email }],
      });

      if (!user || !user.password) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }

      const checkPassword = await user.comparePassword(password);

      if (!checkPassword) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }
      return done(null, user, { message: 'Logged In Successfully' });
    } catch (err) {
      DEBUG(err);
      return done(null, false, {statusCode: 400, message: err.message});
    }
  }),
);