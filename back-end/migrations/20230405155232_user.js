/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema.createTable('user', table => {
        table.increments('id'); // adds an auto incrementing PK column
        table.string('first_name');
        table.string('last_name');
        table.string('username');
        table.string('password');
      });
};


exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user');
};
