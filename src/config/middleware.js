const bodyParse = require('body-parser');
// const knexLogger = require('knex-logger');

module.exports = (app) => {
  app.use(bodyParse.json());
  // Mostra no console todas as consultas feitas ao banco
  // app.use(knexLogger(app.db));
};
