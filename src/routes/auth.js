const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');

const secret = 'Segredo!';

module.exports = (app) => {
  const signin = async (req, res, next) => {
    try {
      const { email, pass } = req.body;
      const user = await app.services.user.findOne({ email });

      // TODO Tratar senha incorreta
      if (!bcrypt.compareSync(pass, user.pass)) return next();

      delete user.pass;
      const token = jwt.encode(user, secret);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  return { signin };
};
