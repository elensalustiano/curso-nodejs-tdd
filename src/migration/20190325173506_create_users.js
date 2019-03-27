
// eslint-disable-next-line arrow-body-style
exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNull();
    table.string('email').notNull().unique();
    table.string('pass').notNull();
  });
};

exports.down = (knex) => { knex.schema.dropTable('users'); };
