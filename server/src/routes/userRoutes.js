import express from "express";
import { db } from "../db/index.js";
import { Grade, User, Seance } from "../db/schema.js";
import { eq, sql,and } from "drizzle-orm";
import { DateTime } from "luxon";

const userRouter = express.Router();

userRouter.use(express.json());

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
  const barrier = 18;
  const coef = 1.5;
  let total = 0;
  let suppHours;

  try {
    // Check if the user with the specified ID exists
    const user = await db
      .select()
      .from(User)
      .where(eq(User.id, userId));

    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    let seances = await db
      .select()
      .from(Seance)
      .where(and(eq(Seance.ProfId, userId)));

    if (seances.length > 0) {
      for (const seance of seances) {
        const startTime = DateTime.fromISO(seance.StartTime, { zone: 'utc' });
        const endTime = DateTime.fromISO(seance.EndTime, { zone: 'utc' });
        const durationInHours = calculateDuration(startTime, endTime);

        if (seance.Type === "Cours") {
          total += durationInHours * coef;
        } else {
          total += durationInHours;
        }

        if (total < barrier) {
          await db.update(Seance)
            .set({ isHeurSupp: 0 })
            .where(eq(Seance.id, seance.id));
        }
      }
    }

    const seancesWithSupp = await db
      .select()
      .from(Seance)
      .where(sql`${Seance.ProfId} = ${userId} and ${Seance.isHeurSupp} = 1`);

    if (seancesWithSupp.length > 0) {
      const userGrade = await db
        .select({ gradeId: User.gradeId })
        .from(User)
        .where(eq(User.id, userId));

      const gradeId = userGrade[0].gradeId;

      const pricing = await db
        .select({ pricing: Grade.PricePerHour })
        .from(Grade)
        .where(eq(Grade.id, gradeId));

      const pricePerHour = pricing[0].pricing;

      suppHours = total - barrier;
      const pureAmount = suppHours * pricePerHour;

      return res.status(200).json({ suppSeances: seancesWithSupp, pureAmount: `${pureAmount} DA` });
    }

    return res.status(200).json({ suppSeances: seancesWithSupp, pureAmount: `0 DA` });

  } catch (error) {
    console.error("Error fetching seances:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


function calculateDuration(startTime, endTime) {
  const diffInMilliseconds = endTime.diff(startTime).milliseconds;
  const durationInHours = diffInMilliseconds / (1000 * 60 * 60);
  return parseFloat(durationInHours.toFixed(2));
}


export default userRouter;
