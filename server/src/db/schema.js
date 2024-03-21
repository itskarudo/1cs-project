import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const User = mysqlTable("User", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 256 }).required(),
  lastName: varchar("last_name", { length: 256 }).required(),
  email: varchar("email", { length: 256 }).required(),
  password: varchar("password", { length: 256 }).required(),
  grade: mysqlEnum("grade", ["Professeur", "enseignant","Assistant Master A"
   ,"Assistant Master B", "Lecturer A","Lecturer B"]).required(),
  role: mysqlEnum("role",["admin","enseignant"]),
});

