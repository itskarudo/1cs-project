import express from "express";
import { db } from "../db/index.js";
import { Grade } from "../db/schema.js";
import { eq } from "drizzle-orm";

const gradeRouter = express.Router();

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

gradeRouter.post("/", async (req, res) => {
  try {
    const { Value, PricePerHour } = req.body;

    if (!Value || !PricePerHour) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingGrade = await db
      .select()
      .from(Grade)
      .where(eq(Grade.Value, Value))
      .limit(1);

    if (existingGrade.length !== 0) {
      return res.status(400).json({ error: "Grade already exists" });
    }

    await db.insert(Grade).values({
      Value: Value,
      PricePerHour: PricePerHour,
    });

    return res.status(201).json({ message: "Grade added successfully" });
  } catch (error) {
    console.error("Error adding grade:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default gradeRouter;
