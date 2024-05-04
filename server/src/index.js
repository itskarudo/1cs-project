import express from "express";
import dotenv from "dotenv";
import exampleRouter from "./routes/example.js";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use("/", exampleRouter);
app.use("/", authRouter);
app.use("/", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
