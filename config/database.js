require("./app")
const Schema = require('bookshelf-schema');
const advancedSerialization = require('bookshelf-advanced-serialization');


// Setting up the database connection
const knex = require('knex')({
    client: 'mysql',
    debug: eval(process.env.APP_DEBUG),
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        charset: process.env.APP_CHARSET
    }
})

const bookshelf = require('bookshelf')(knex)
bookshelf.plugin(Schema)
// bookshelf.plugin(advancedSerialization());

module.exports = {
    knex,
    bookshelf
}