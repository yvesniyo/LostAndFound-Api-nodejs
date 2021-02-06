
let tableName = "lost_item_images"

exports.up = function (knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.increments();

        table.integer("lost_item_id").unsigned().notNull()
        table.foreign('lost_item_id').references('id').inTable("lost_items")

        table.string("url").notNull()

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable(tableName)
};
