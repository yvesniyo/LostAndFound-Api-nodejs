
let tableName = ""


exports.up = function (knex) {
    return knex.schema.table(tableName, function (table) {
        // add column(s) here

    })
};

exports.down = function (knex) {
    return knex.schema.table(tableName, function (table) {
        // drop column(s) here

    })
};
