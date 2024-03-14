/** @type { import("drizzle-kit").Config } */

const dotenv = require("dotenv");

dotenv.config();

export default {
  schema: "./src/db/schema.js",
  out: "./migrations",
  driver: "mysql2",
  dbCredentials: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};
