import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import scheduleRouter from "./routes/scheduleRoutes.js";
import sessionRouter from "./routes/sessionRoutes.js";
import gradeRouter from "./routes/gradeRoutes.js";
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use("/auth", authRouter);
app.use("/", userRouter);
app.use("/schedules", scheduleRouter);
app.use("/sessions", sessionRouter);
app.use("/grades", gradeRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
