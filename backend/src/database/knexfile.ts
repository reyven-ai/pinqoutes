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

// import { Knex } from "knex";
// import * as dotenv from "dotenv";
// import path from "path";

// dotenv.config();

// const config: Record<string, Knex.Config> = {
//   development: {
//     client: "pg",
//     connection: {
//       connectionString: process.env.DATABASE_URL,
//       host: process.env.DB_HOST as string,
//       port: parseInt(process.env.DB_PORT as string, 10),
//       user: process.env.DB_USER as string,
//       password: process.env.DB_PASSWORD as string,
//       // password: "Villaester03-",
//       database: process.env.DB_DATABASE as string,
//       ssl:
//         process.env.ENV === "PRODUCTION"
//           ? { rejectUnauthorized: false }
//           : false,
//     },
//     migrations: {
//       directory: path.join(__dirname, "migrations"),
//       tableName: "knex_migrations",
//     },
//   },
// };

// export = config;
