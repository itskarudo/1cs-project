import { mysqlTable, mysqlEnum, int, varchar } from "drizzle-orm/mysql-core";

export const User = mysqlTable("User", {
  id: int("id").autoincrement().primaryKey(),
  firstName: varchar("first_name", { length: 256 }).notNull(),
  lastName: varchar("last_name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  grade: mysqlEnum("grade", [
    "Professeur",
    "enseignant",
    "Assistant Master A",
    "Assistant Master B",
    "Lecturer A",
    "Lecturer B",
  ]).notNull(),
  role: mysqlEnum("role", ["admin", "enseignant"]).notNull(),
});
