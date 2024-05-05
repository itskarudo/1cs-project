import {
  mysqlTable,
  mysqlEnum,
  int,
  varchar,
  date,
  boolean,
  time,
} from "drizzle-orm/mysql-core";

export const User = mysqlTable("User", {
  id: int("id").autoincrement().primaryKey(),
  firstName: varchar("first_name", { length: 256 }).notNull(),
  lastName: varchar("last_name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  gradeId: int("grade_id")
    .references(() => Grade.id, { onUpdate: "cascade", onDelete: "set null" })
    .notNull(),
  role: mysqlEnum("role", ["admin", "enseignant"]).notNull(),
});

export const Seance = mysqlTable("Seance", {
  id: int("id").autoincrement().primaryKey(),
  isHeurSupp: boolean("is_heur_Supp").default(true),
  Day: mysqlEnum("Day", [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Saturday",
    "Friday",
  ]).notNull(),
  StartTime: time("Start_time").notNull(),
  EndTime: time("End_time").notNull(),
  Location: varchar("Location", { length: 10 }).notNull(),
  Type: mysqlEnum("Type", ["Cours", "TD", "TP"]).notNull(),
  Module: varchar("Module", { length: 50 }).notNull(),
  Group: int("Group").notNull(),
  ProfId: int("Prof_id")
    .references(() => User.id, { onUpdate: "cascade", onDelete: "cascade" })
    .notNull(),
  ScheduleId: int("Schedule_id")
    .references(() => Schedule.id, { onUpdate: "cascade", onDelete: "cascade" })
    .notNull(),
});

export const Schedule = mysqlTable("Schedule", {
  id: int("id").autoincrement().primaryKey(),
  Promotion: mysqlEnum("Promotion", [
    "1CPI",
    "2CPI",
    "1CS",
    "2CS",
    "3CS",
  ]).notNull(),
  Semester: mysqlEnum("Semester", ["S1", "S2"]).notNull(),
  Speciality: mysqlEnum("Speciality", ["SIW", "ISI", "MI", "INFO"]).notNull(),
});

export const Session = mysqlTable("Session", {
  id: int("id").autoincrement().primaryKey(),
  StartDate: date("Start_date").notNull(),
  FinishDate: date("Finish_date").notNull(),
  ScheduleId: int("Schedule_id")
    .references(() => Schedule.id, {
      onUpdate: "cascade",
      onDelete: "set null",
    })
    .notNull(),
});

export const Grade = mysqlTable("Grade", {
  id: int("id").autoincrement().primaryKey(),
  Value: mysqlEnum("Value", [
    "Professeur",
    "enseignant",
    "Assistant Master A",
    "Assistant Master B",
    "Lecturer A",
    "Lecturer B",
  ]).notNull(),
  PricePerHour: int("Price_per_hour").notNull(),
});
