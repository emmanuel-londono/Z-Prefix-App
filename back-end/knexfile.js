//Doesnt require a Connection String

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    //Database is called inventory
    connection: 'postgres://postgres:docker@localhost/inventory'
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      database: 'inventory',
      user:     'postgres',
      password: 'docker',
      port: 5432
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
      user:     'username',
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
