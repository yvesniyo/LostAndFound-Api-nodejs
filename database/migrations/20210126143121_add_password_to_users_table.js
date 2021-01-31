
let tableName = "users"


exports.up = function (knex) {
    return knex.schema.table(tableName, function (table) {
        // add column(s) here
        table.text("password").after("role_id").notNull()
    })
};

exports.down = function (knex) {
    return knex.schema.table(tableName, function (table) {
        // drop column(s) here
        table.dropColumn("password")
    })
};
