
let tableName = "users"



exports.up = function (knex) {
    return knex.schema.table(tableName, function (table) {
        // add column(s) here
        table.integer("role_id").unsigned().after("phone")
        table.foreign('role_id').references('id').inTable("roles")
    })
};

exports.down = function (knex) {
    return knex.schema.table(tableName, function (table) {
        // drop column(s) here
        table.dropColumn("role_id")
    })
};
