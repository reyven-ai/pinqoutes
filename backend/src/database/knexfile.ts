import { Knex } from "knex";

const config: Record<string, Knex.Config> = {
  development: {
    client: "pg",
    connection: {
      database: "pinterest",
      user: "postgres",
      password: "Villaester03-",
    },
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations",
    },
  },
};

export = config;
