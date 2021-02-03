
let tableName = "lost_items"

exports.up = function (knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.increments();
        table.integer('lost_type').unsigned().notNullable();
        table.foreign("lost_type").references("id").inTable("lost_types")
        table.string("holder_name").notNullable()
        table.string("holder_place_of_birth").nullable()
        table.string("place_of_issue").nullable()
        table.string("card_no").notNullable()
        table.date("dob").notNullable()
        table.enu("gender", ["M", "F"]).notNullable()
        table.enu("status", ["Processing", "Found"]).defaultTo("Processing")
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable(tableName)
};
