import { DB } from "./db"; // this is the Database interface we defined earlier
import { createPool } from "mysql2"; // do not use 'mysql2/promises'!
import { Kysely, MysqlDialect } from "kysely";
import dotenv from "dotenv";
import { config } from "../config/config";

const dialect = new MysqlDialect({
  pool: createPool({
    database: config.env.app.database,
    host: config.env.app.host,
    user: config.env.app.user,
    password: config.env.app.password,
    port: Number(config.env.app.port),
    connectionLimit: 10,
  }),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
});
