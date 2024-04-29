import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  namedPlaceholders: true,
  decimalNumbers: true,
});
