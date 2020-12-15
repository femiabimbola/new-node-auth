import debug from 'debug';
import { Strategy } from 'passport-local';
import passport from 'passport';

import User from '../../models/user.model';

const DEBUG = debug('dev');

const authFields = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  // session: false
};

passport.use(
  'login',
  new Strategy(authFields, async ( email, password, done) => {
    try {
      const user = await User.findOne({
          // req should have been used here!
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

passport.use(
  'signup',
  new Strategy(authFields, async (req, email, password, done) => {
    try {
    const checkEmail = await User.checkExistingField('email', email);

      if (checkEmail) {
        return done(null, false, {
          statusCode: 409,
          message: 'Email already registered, log in instead',
        });
      }

    const checkUserName = await User.checkExistingField('userName', req.body.userName);
      if (checkUserName) {
        return done(null, false, {
          statusCode: 409,
          message: 'Username exists, please try another',
        });
      }

      const newUser = new User();
      newUser.email = req.body.email;
      newUser.password = req.body.password;
      newUser.userName = req.body.userName;
      await newUser.save();
      return done(null, newUser);
    } catch (err) {
        DEBUG(err)
      return done(null, false, {statusCode: 400, message: err.message});
    }
  }),
);