const app = require('express')();
const consign = require('consign');

consign({ cwd: 'src', verbose: false })
  .include('./config/middleware.js')
  .then('./routes')
  .then('./config/routes.js')
  .into(app);

module.exports = app;
