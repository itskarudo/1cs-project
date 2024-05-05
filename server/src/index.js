import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import scheduleRouter from "./routes/scheduleRoutes.js";
import sessionRouter from "./routes/sessionRoutes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use("/auth", authRouter);
app.use("/", userRouter);
app.use("/schedules", scheduleRouter);
app.use("/sessions", sessionRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
