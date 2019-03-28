/* eslint-disable no-console */
const app = require('express')();
const consign = require('consign');
const knex = require('knex');
const knexFile = require('../knexfile');

// TODO deixar dinamico
app.db = knex(knexFile.test);

consign({ cwd: 'src', verbose: false })
  .include('./config/middleware.js')
  .then('./services')
  .then('./routes')
  .then('./config/routes.js')
  .then('./constant')
  .into(app);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line object-curly-newline
  const { type, status, message, stack } = err;
  if (type === app.constant.utils.validationError) {
    return res.status(status).json({ type, message });
  }

  res.status(500).json({ type, message: app.constant.messages.serverError, stack });
});

// Mostra no console todas as consultas feitas ao banco
// app.db.on('query', ({ sql, bindings }) => {
//   const formatBindings = bindings ? bindings.join(',') : '';
//   console.log({ sql, bindings: formatBindings });
// })
//   .on('query-response', response => console.log(response))
//   .on('error', error => console.log(error));

module.exports = app;
