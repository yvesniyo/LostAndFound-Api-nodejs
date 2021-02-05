
let tableName = "user_items"

exports.up = function (knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.increments();
        table.integer("lost_type_id").unsigned().notNull()
        table.foreign('lost_type_id').references('id').inTable("lost_types")

        table.integer("user_id").unsigned().notNull()
        table.foreign('user_id').references('id').inTable("users")

        table.string("card_no")
        table.string("holder_name").nullable()

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable(tableName)
};
