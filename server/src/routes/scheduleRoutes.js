import express from "express";
import { db } from "../db/index.js";
import { User, Seance, Schedule } from "../db/schema.js";
import { eq, and } from "drizzle-orm";

const scheduleRouter = express.Router();
scheduleRouter.use(express.json());

scheduleRouter.get("/:id", async (req, res) => {
  try {
    const schedule = await db
      .select()
      .from(Schedule)
      .where(eq(Schedule.id, req.params.id))
      .limit(1);

    return res.status(200).json({ schedule: schedule[0] });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
scheduleRouter.get("/", async (req, res) => {
  try {
    const schedules = await db.select().from(Schedule);

    return res.status(200).json({ schedules });
  } catch (error) {
    console.error("Error fetching schedules:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

scheduleRouter.post("/", async (req, res) => {
  try {
    const { Promotion, Semester, Speciality } = req.body;

    if (!Promotion || !Semester || !Speciality) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingSchedule = await db
      .select()
      .from(Schedule)
      .where(
        and(
          eq(Schedule.Promotion, Promotion),
          eq(Schedule.Semester, Semester),
          eq(Schedule.Speciality, Speciality)
        )
      );

    if (existingSchedule.length !== 0) {
      return res.status(400).json({ error: "Schedule already exists" });
    }

    await db.insert(Schedule).values({
      Promotion: Promotion,
      Semester: Semester,
      Speciality: Speciality,
    });

    return res.status(201).json({ message: "Schedule added successfully" });
  } catch (error) {
    console.error("Error adding the schedule:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

scheduleRouter.delete("/:id", async (req, res) => {
  try {
    await db.delete(Schedule).where(eq(Schedule.id, req.params.id));

    return res.status(200).json({
      message:
        "Schedule with id : '" + req.params.id + "' is deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting the schedule:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

scheduleRouter.post("/:id/seances", async (req, res) => {
  try {
    const {
      Day,
      StartTime,
      EndTime,
      Location,
      Type,
      Module,
      Group,
      firstName,
      lastName,
    } = req.body; //assuming request body has the prof's fullname

    if (
      !Day ||
      !StartTime ||
      !EndTime ||
      !Location ||
      !Type ||
      !Module ||
      !Group ||
      !firstName ||
      !lastName
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const Prof = await db
      .select()
      .from(User)
      .where(
        and(
          eq(User.firstName, firstName),
          eq(User.lastName, lastName),
          eq(User.role, "enseignant")
        )
      )
      .limit(1);

    await db.insert(Seance).values({
      Day: Day,
      StartTime: StartTime,
      EndTime: EndTime,
      Location: Location,
      Type: Type,
      Module: Module,
      Group: Group,
      ProfId: Prof[0].id,
      ScheduleId: req.params.id,
    });

    return res.status(201).json({ message: "Seance added successfully" });
  } catch (error) {
    console.error("Error adding seance:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// route to fetch seances for a certain schedule
scheduleRouter.get("/:id/seances", async (req, res) => {
  try {
    const seances = await db
      .select()
      .from(Seance)
      .where(eq(Seance.ScheduleId, req.params.id));

    return res.status(200).json({ seances });
  } catch (error) {
    console.error("Error fetching seances:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default scheduleRouter;
