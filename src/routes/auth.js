const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const ValidationError = require('../errors/ValidationError');

module.exports = (app) => {
  const signin = async (req, res, next) => {
    try {
      const secret = app.constant.utils.jwtSecret;
      const { email, pass } = req.body;
      const user = await app.services.user.findOne({ email });

      if (!user || !bcrypt.compareSync(pass, user.pass)) {
        throw new ValidationError(app.constant.messages.signinError);
      }

      delete user.pass;
      const token = jwt.encode(user, secret);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  return { signin };
};
