import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const exampleTable = mysqlTable("example", {
  id: serial("id").primaryKey(),
  string: varchar("ss", { length: 256 }),
});
