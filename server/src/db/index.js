import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import 'dotenv/config';
import { User } from './schema.js';

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

export const db = drizzle(connection, { User });
