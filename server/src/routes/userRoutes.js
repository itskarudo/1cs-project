import express from "express";
import { db } from "../db/index.js";
import { Grade, User, Seance, Session, Absence } from "../db/schema.js";
import { eq, sql, and } from "drizzle-orm";
import { DateTime, Interval } from "luxon";
import { calculateDuration } from "./scheduleRoutes.js";

const userRouter = express.Router();

userRouter.get("/enseignants", async (req, res) => {
  try {
    const enseignants = await db
      .select()
      .from(User)
      .where(eq(User.role, "enseignant"));

    return res.status(200).json({ enseignants });
  } catch (error) {
    console.error("Error fetching les enseignants:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.get("/admins", async (req, res) => {
  try {
    const admins = await db.select().from(User).where(eq(User.role, "admin"));

    return res.status(200).json({ admins });
  } catch (error) {
    console.error("Error fetching admins:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.get("/users/:id", async (req, res) => {
  try {
    const user = await db
      .select()
      .from(User)
      .where(eq(User.id, req.params.id))
      .limit(1);

    return res.status(200).json({ user: user[0] });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.delete("/users/:id", async (req, res) => {
  try {
    await db.delete(User).where(eq(User.id, req.params.id));

    return res.status(200).json({
      message: "User with id : '" + req.params.id + "' is deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting the user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.patch("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    await db.update(User).set(updateData).where(eq(User.id, userId));

    return res.status(200).json({
      message: "User with id : '" + req.params.id + "' is updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//route to fetch certain user's seances
userRouter.get("/users/:id/seances", async (req, res) => {
  try {
    const seances = await db
      .select()
      .from(Seance)
      .where(eq(Seance.ProfId, req.params.id));

    return res.status(200).json({ seances });
  } catch (error) {
    console.error("Error fetching seances:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.get("/users/:id/seances/supplementary", async (req, res) => {
  const userId = req.params.id;
  try {
    let supplementary = await suppHours(userId);

    return res.status(200).json({ supplementary });
  } catch (error) {
    console.error("Error fetching seances:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.get("/users/:id/payement", async (req, res) => {
  const userId = req.params.id;
  try {
    let supplementaryPerWeek = await suppHours(userId);
    const Today = new Date().toISOString();

    const currentSession = await db
      .select()
      .from(Session)
      .where(
        sql`${Session.StartDate} <= ${Today} and ${Session.FinishDate} >= ${Today}`
      );

    const differenceInTime =
      currentSession[0].FinishDate.getTime() -
      currentSession[0].StartDate.getTime();

    const differenceInWeeks = Math.round(
      differenceInTime / (1000 * 3600 * 24 * 7)
    );

    //calculate how many hours total
    let supplementaryPerWeekHours = 0;
    for (let i = 0; i < supplementaryPerWeek.length; i++) {
      const startTime = DateTime.fromISO(supplementaryPerWeek[i].StartTime, {
        zone: "utc",
      });
      const endTime = DateTime.fromISO(supplementaryPerWeek[i].EndTime, {
        zone: "utc",
      });
      supplementaryPerWeekHours += calculateDuration(startTime, endTime);
    }
    const totalSupplementary = differenceInWeeks * supplementaryPerWeekHours;

    // now we calculates les absences
    const absences = await db
      .select()
      .from(Absence)
      .where(
        sql`${Absence.Date} <= ${currentSession[0].FinishDate} and ${Absence.Date} >= ${currentSession[0].StartDate}
         and ${Absence.ProfId} = ${userId}`
      );
    // fetch the original seance to know the duration
    let absencesHours = 0;
    for (let i = 0; i < absences.length; i++) {
      const originalSeance = await db
        .select()
        .from(Seance)
        .where(eq(Seance.id, absences[i].SeanceId));

      const startTime = DateTime.fromISO(originalSeance[i].StartTime, {
        zone: "utc",
      });
      const endTime = DateTime.fromISO(originalSeance[i].EndTime, {
        zone: "utc",
      });
      absencesHours += calculateDuration(startTime, endTime);
    }

    if (totalSupplementary > 0) {
      const user = await db.select().from(User).where(eq(User.id, userId));

      const gradeId = user[0].gradeId;

      const pricing = await db
        .select({ pricing: Grade.PricePerHour })
        .from(Grade)
        .where(eq(Grade.id, gradeId));

      const pricePerHour = pricing[0].pricing;
      const SupplementaryNumber = totalSupplementary - absencesHours;
      const pureAmount = SupplementaryNumber * pricePerHour;

      return res.status(200).json({
        TotalSuppHours: totalSupplementary,
        TotalWeeks: differenceInWeeks,
        PureSuppHoursNumber: SupplementaryNumber,
        PureAmount: `${pureAmount} DA`,
      });
    }
  } catch (error) {
    console.error("Error :", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.post("/users/:id/absences", async (req, res) => {
  try {
    const userId = req.params.id;
    const { Date, SeanceId } = req.body;

    if (!Date || !SeanceId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await db.insert(Absence).values({
      Date: Date,
      SeanceId: SeanceId,
      ProfId: userId,
    });

    return res.status(201).json({ message: "Absence added successfully" });
  } catch (error) {
    console.error("Error adding absence:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.get("/users/:id/absences", async (req, res) => {
  try {
    const absences = await db
      .select()
      .from(Absence)
      .where(eq(Absence.ProfId, req.params.id));

    return res.status(200).json({ absences });
  } catch (error) {
    console.error("Error fetching absences:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//helper functions
async function suppHours(userId) {
  const user = await db.select().from(User).where(eq(User.id, userId));

  if (user.length === 0) {
    return 0;
  }
  const Today = new Date().toISOString();
  const currentSessions = await db
    .select()
    .from(Session)
    .where(
      sql`${Session.StartDate} <= ${Today} and ${Session.FinishDate} >= ${Today}`
    );

  let Supplementary = [];
  for (let i = 0; i < currentSessions.length; i++) {
    let hours = await db
      .select()
      .from(Seance)
      .where(
        and(
          eq(userId, Seance.ProfId),
          eq(Seance.ScheduleId, currentSessions[i].ScheduleId),
          eq(Seance.isHeurSupp, 1)
        )
      );
    Supplementary = Supplementary.concat(hours);
  }

  return Supplementary;
}

export default userRouter;
