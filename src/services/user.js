module.exports = (app) => {
  const find = (filter = {}) => app.db('users').where(filter).select();

  const create = async (user) => {
    const error = {
      message: app.constant.messages.requiredField,
      status: 400
    };

    if (!user.name) {
      error.message = `Nome ${error.message}`;
      throw error;
    }

    if (!user.email) {
      error.message = `Email ${error.message}`;
      throw error;
    }

    if (!user.pass) {
      error.message = `Senha ${error.message}`;
      throw error;
    }

    const result = await find({ email: user.email });
    if (result && result.length > 0) {
      error.message = app.constant.messages.duplicateEmail;
      throw error;
    }

    return app.db('users').insert(user, '*');
  };

  return { find, create };
};
