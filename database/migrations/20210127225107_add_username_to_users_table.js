
let tableName = "users"


exports.up = function (knex) {
    return knex.schema.table(tableName, function (table) {
        // add column(s) here
        table.string("username").after("role_id").nullable()
    })
};

exports.down = function (knex) {
    return knex.schema.table(tableName, function (table) {
        // drop column(s) here
        table.dropColumn("username")
    })
};
