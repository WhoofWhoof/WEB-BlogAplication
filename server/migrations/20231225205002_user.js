
exports.up = function(knex) {
  return knex.schema.createTable('user', tbl => {
    tbl.increments();
    tbl.string('username', 128).notNullable().unique();
    tbl.string('password', 128).notNullable();
  })
  .createTable('post', tbl => {
    tbl.increments();
    tbl.string('title', 128).notNullable();
    tbl.string('contents', 128).notNullable();
    tbl.integer('user_id')
      .unsigned()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE')
       .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user')
                    .dropTableIfExists('post');
};
