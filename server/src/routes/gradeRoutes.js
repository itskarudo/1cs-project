import express from "express";
import { db } from "../db/index.js";
import { Grade } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { isAdmin } from '../middlewares/middlewares.js';

const gradeRouter = express.Router();

const allowedGrades = ['Professeur','enseignant','Assistant Master A','Assistant Master B','Lecturer A','Lecturer B'];

gradeRouter.use(express.json());

gradeRouter.get("/", async (req, res) => {
  try {
    const grades = await db.select().from(Grade);

    return res.status(200).json({ grades });
  } catch (error) {
    console.error("Error fetching grades:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Added middleware here, can be removed to simplify the testing process
gradeRouter.post("/", isAdmin, async (req, res) => {
  try {
    const { Value, PricePerHour } = req.body;

    if (!Value || !PricePerHour) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!allowedGrades.includes(Value)) {
      return res.status(400).json({
        error: `Only the following ranks are available (case sensetive): ${allowedGrades.join(", ")}`,
      });
    }

    if (!Number.isInteger(parseInt(PricePerHour))) {
      return res.status(400).json({ error: "PricePerHour must be a number" });
    }

    // Check if the grade already exists
    const existingGrade = await db
      .select()
      .from(Grade)
      .where(eq(Grade.Value, Value))
      .limit(1);

    if (existingGrade.length !== 0) {
      // if grade already exists, update its PricePerHour
      await db.update(Grade)
        .set({ PricePerHour: PricePerHour })
        .where(eq(Grade.Value, Value));

      return res.status(200).json({ message: "Grade updated successfully" });
    }

    // grade doesn't exist, insert a new grade
    await db.insert(Grade).values({
      Value: Value,
      Price_per_hour: PricePerHour,
    });

    return res.status(201).json({ message: "Grade added successfully" });
  } catch (error) {
    console.error("Error adding/updating grade:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default gradeRouter;
