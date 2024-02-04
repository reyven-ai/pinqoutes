import { Knex } from 'knex';

const config: Record<string, Knex.Config> = {
  development: {
    client: 'pg',
    connection: {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT as unknown as number,
    },
    migrations: {
      directory: 'src/database/migrations',
      tableName: 'knex_migrations',
    },
  },
};

export = config;
