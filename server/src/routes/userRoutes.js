import express from "express";
import { db } from "../db/index.js";
import { Grade, User } from "../db/schema.js";
import { eq } from "drizzle-orm";

const TIME_PATTERN = /^\d{2}h-\d{2}h$/;

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

    return res.status(200).json({ user });
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

    // Loop through the keys in updateData and set them in the update query
    Object.keys(updateData).forEach(async (key) => {
      await db
        .update(User)
        .set({ [key]: updateData[key] })
        .where(eq(User.id, userId));
    });

    res
      .status(200)
      .send("User with id : '" + userId + "' updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal server error");
  }
});

//route to add a grade
userRouter.post("/grades", async (req, res) => {
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

export default userRouter;
