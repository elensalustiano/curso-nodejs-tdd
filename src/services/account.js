const ValidationError = require('../errors/ValidationError');

module.exports = (app) => {
  const db = 'accounts';

  const find = (filter = {}) => app.db(db).where(filter);

  const create = (account) => {
    if (!account.name) throw new ValidationError(`Nome ${app.constant.messages.requiredField}`);

    return app.db(db).insert(account, '*');
  };

  const update = (id, account) => app.db(db).where(id).update(account, '*');

  const remove = id => app.db(db).where(id).del();

  return {
    create, find, update, remove
  };
};
