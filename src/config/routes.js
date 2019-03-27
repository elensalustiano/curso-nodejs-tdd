module.exports = (app) => {
  app.route('/users')
    .get(app.routes.users.find)
    .post(app.routes.users.create);
};
