/* eslint-disable no-console */
const app = require('express')();
const consign = require('consign');
const knex = require('knex');
// const knexLogger = require('knex-logger');
const knexFile = require('../knexfile');

// TODO deixar dinamico
app.db = knex(knexFile.test);
// Mostra no console todas as consultas feitas ao banco
// app.use(knexLogger(app.db));

consign({ cwd: 'src', verbose: false })
  .include('./config/middleware.js')
  .then('./services')
  .then('./routes')
  .then('./config/routes.js')
  .then('./constant')
  .into(app);

// Mostra no console todas as consultas feitas ao banco
// app.db.on('query', ({ sql, bindings }) => {
//   const formatBindings = bindings ? bindings.join(',') : '';
//   console.log({ sql, bindings: formatBindings });
// })
//   .on('query-response', response => console.log(response))
//   .on('error', error => console.log(error));

module.exports = app;
