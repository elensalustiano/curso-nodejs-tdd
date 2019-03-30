const bcrypt = require('bcrypt');
const ValidationError = require('../errors/ValidationError');

module.exports = (app) => {
  const db = 'users';

  const findAll = () => app.db(db).select(['id', 'name', 'email']);

  const findOne = (filter = {}) => app.db(db).where(filter).first();

  const getPassHash = (pass) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pass, salt);
  };

  const create = async (user) => {
    if (!user.name) throw new ValidationError(`Nome ${app.constant.messages.requiredField}`);
    if (!user.email) throw new ValidationError(`Email ${app.constant.messages.requiredField}`);
    if (!user.pass) throw new ValidationError(`Senha ${app.constant.messages.requiredField}`);

    const result = await findOne({ email: user.email });
    if (result) {
      throw new ValidationError(app.constant.messages.duplicateEmail);
    }

    const userCopy = { ...user };
    userCopy.pass = getPassHash(userCopy.pass);
    return app.db(db).insert(userCopy, ['id', 'name', 'email']);
  };

  return { findAll, create, findOne };
};
