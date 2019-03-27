module.exports = {
  test: {
    client: 'pg',
    version: '9.6',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'example',
      database: 'postgres',
      port: '',
    },
    migrations: {
      directory: 'src/migration'
    }
  }
};
