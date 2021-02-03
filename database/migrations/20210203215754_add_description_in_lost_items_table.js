
let tableName = "lost_items"


exports.up = function (knex) {
    return knex.schema.table(tableName, function (table) {
        // add column(s) here
        table.text("description").nullable()
    })
};

exports.down = function (knex) {
    return knex.schema.table(tableName, function (table) {
        // drop column(s) here
        table.dropColumn("description")
    })
};
