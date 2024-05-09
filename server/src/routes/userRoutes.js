import express from "express";
import { db } from "../db/index.js";
import { Grade, User, Seance } from "../db/schema.js";
import { eq } from "drizzle-orm";

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

export default userRouter;
