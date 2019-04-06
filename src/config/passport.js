const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const { jwtSecret } = require('../constant/utils');

module.exports = (app) => {
  const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  const secretOrKey = jwtSecret;
  const strategy = new Strategy({ jwtFromRequest, secretOrKey }, async (payload, next) => {
    try {
      const { id } = payload;
      const user = await app.services.user.findOne({ id });

      if (user) return next(null, payload);

      next(null, false);
    } catch (error) {
      next(error, false);
    }
  });

  passport.use(strategy);

  const authenticate = () => passport.authenticate('jwt', { session: false });

  return { authenticate };
};
