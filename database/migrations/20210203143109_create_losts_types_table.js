
let tableName = "lost_types"

exports.up = function (knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.increments();
        table.string("name");
        table.text("description").nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable(tableName)
};
