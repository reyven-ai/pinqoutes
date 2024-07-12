import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "pinterest",
  password: "Villaester03-",
  port: 5432,
});

export default pool;

// import { Pool } from "pg";
// import * as dotenv from "dotenv";

// dotenv.config();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL as string,
//   user: process.env.DB_USER as string,
//   host: process.env.DB_HOST as string,
//   database: process.env.DB_DATABASE as string,
//   password: process.env.DB_PASSWORD as string,
//   port: parseInt(process.env.DB_PORT as string, 10),
//   ssl: process.env.ENV === "PRODUCTION" ? true : false,
// });

// export default pool;
