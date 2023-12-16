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

  // staging: {
  //   client: "postgresql",
  //   connection: {
  //     database: "pinterest",
  //     user: "postgres",
  //     password: "Villaester03-",
  //     // Add other connection details if necessary
  //   },
  //   migrations: {
  //     tableName: "knex_migrations",
  //     directory: __dirname + "/src/migrations",
  //   },
  // },

  // production: {
  //   client: "postgresql",
  //   connection: {
  //     database: "pinterest",
  //     user: "postgres",
  //     password: "Villaester03-",
  //   },
  //   migrations: {
  //     tableName: "knex_migrations",
  //     directory: "./src/migrations",
  //   },
  // },
};

export = config;
