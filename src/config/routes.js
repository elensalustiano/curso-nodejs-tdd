module.exports = (app) => {
  app.route('/users')
    .get(app.routes.users.find)
    .post(app.routes.users.create);

  app.route('/accounts')
    .get(app.routes.accounts.find)
    .post(app.routes.accounts.create);

  app.route('/accounts/:id')
    .get(app.routes.accounts.findById)
    .patch(app.routes.accounts.update)
    .delete(app.routes.accounts.remove);
};
