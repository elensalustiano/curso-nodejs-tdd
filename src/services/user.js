const ValidationError = require('../errors/ValidationError');

module.exports = (app) => {
  const db = 'users';

  const find = (filter = {}) => app.db(db).where(filter).select();

  const create = async (user) => {
    if (!user.name) throw new ValidationError(`Nome ${app.constant.messages.requiredField}`);
    if (!user.email) throw new ValidationError(`Email ${app.constant.messages.requiredField}`);
    if (!user.pass) throw new ValidationError(`Senha ${app.constant.messages.requiredField}`);

    const result = await find({ email: user.email });
    if (result && result.length > 0) {
      throw new ValidationError(app.constant.messages.duplicateEmail);
    }

    return app.db(db).insert(user, '*');
  };

  return { find, create };
};
