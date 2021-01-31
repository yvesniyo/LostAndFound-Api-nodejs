// Update with your config settings.
require("./config/app")

module.exports = {

  development: {
    client: process.env.DATABASE_DRIVE,
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD
    },
    migrations: {
      directory: "./database/migrations/",
      stub: "./database/migrations/stubs/basic.js"
    },
    seeders: {
      directory: "./database/seeders/",
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'node_testing',
      user: 'root',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },

    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
