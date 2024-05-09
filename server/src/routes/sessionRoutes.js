import express from "express";
import { db } from "../db/index.js";
import { Session } from "../db/schema.js";
import { eq, and } from "drizzle-orm";

const sessionRouter = express.Router();
sessionRouter.use(express.json());

sessionRouter.get("/:id", async (req, res) => {
  try {
    const session = await db
      .select()
      .from(Session)
      .where(eq(Session.id, req.params.id))
      .limit(1);

    return res.status(200).json({ session: session[0] });
  } catch (error) {
    console.error("Error fetching session:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
sessionRouter.get("/", async (req, res) => {
  try {
    const sessions = await db.select().from(Session);

    return res.status(200).json({ sessions });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

sessionRouter.post("/", async (req, res) => {
  try {
    const { StartDate, FinishDate, ScheduleId } = req.body;

    if (!StartDate || !FinishDate || !ScheduleId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingSession = await db
      .select()
      .from(Session)
      .where(
        and(
          eq(Session.StartDate, StartDate),
          eq(Session.FinishDate, FinishDate),
          eq(Session.ScheduleId, ScheduleId)
        )
      );

    if (existingSession.length !== 0) {
      return res.status(400).json({ error: "Session already exists" });
    }

    await db.insert(Session).values({
      StartDate: StartDate,
      FinishDate: FinishDate,
      ScheduleId: ScheduleId,
    });

    return res.status(201).json({ message: "Session added successfully" });
  } catch (error) {
    console.error("Error adding session:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

sessionRouter.delete("/:id", async (req, res) => {
  try {
    await db.delete(Session).where(eq(Session.id, req.params.id));

    return res.status(200).json({
      message:
        "Session with id : '" + req.params.id + "' is deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting session:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

sessionRouter.patch("/:id", async (req, res) => {
  try {
    const sessionId = req.params.id;
    const updateData = req.body;

    await db.update(Session).set(updateData).where(eq(Session.id, sessionId));

    return res.status(200).json({
      message:
        "Session with id : '" + req.params.id + "' is updated successfully",
    });
  } catch (error) {
    console.error("Error updating session:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default sessionRouter;
