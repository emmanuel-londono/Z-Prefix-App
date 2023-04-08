/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
    return knex.schema.createTable('item', table => {
        table.increments('id'); // adds an auto incrementing PK column
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('user.id').deferrable('deferred')
        table.string('item_name');
        table.string('description');
        table.string('quantity');
    });
};


exports.down = function (knex) {
    return knex.schema.dropTableIfExists('item');
};
