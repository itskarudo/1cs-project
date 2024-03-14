import express from "express";
import dotenv from "dotenv";
import exampleRouter from "./routes/example.js";

dotenv.config();

const app = express();

app.use("/api/example", exampleRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
