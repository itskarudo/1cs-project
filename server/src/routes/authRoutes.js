import express from "express";
import { db } from "../db/index.js";
import { User, Grade } from "../db/schema.js";
import bcrypt from "bcrypt";
import { sql, eq } from "drizzle-orm";
import jwt from "jsonwebtoken"; // JWT library to be used for later

const authRouter = express.Router();

authRouter.use(express.json());

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const grades = [
  "Professeur",
  "enseignant",
  "Assistant Master A",
  "Assistant Master B",
  "Lecturer A",
  "Lecturer B",
];

const roles = ["admin", "enseignant"];

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, gradeId, role } = req.body;
    const grade = await db
      .select()
      .from(Grade)
      .where(eq(Grade.id, gradeId))
      .limit(1);
    const { Value } = grade[0];
    if (!firstName || !lastName || !email || !password || !gradeId || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!email.match(emailRegex)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password should 8 characters or longer" });
    }

    if (!grades.includes(Value)) {
      return res.status(400).json({
        error: `Only the following ranks are available: ${grades.join(", ")}`,
      });
    }

    if (!roles.includes(role)) {
      return res.status(400).json({
        error: `Only the following roles are available: ${roles.join(", ")}`,
      });
    }

    // values provided to `sql` function are parameterized automatically
    const existingUser = await db
      .select()
      .from(User)
      .where(sql`${User.email} = ${email}`)
      .limit(1);

    if (Object.keys(existingUser).length !== 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(User).values({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      gradeId: gradeId,
      role: role,
    });

    return res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    console.error("Error signing up user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await db
      .select()
      .from(User)
      .where(sql`${User.email} = ${email}`)
      .limit(1);

    if (Object.keys(user).length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = jwt.sign(
      {
        id: user[0].id,
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        email: user[0].email,
        role: user[0].role,
        grade: user[0].grade,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1y",
      }
    );

    return res
      .status(200)
      .cookie("access_token", token, {
        maxAge: 365 * 24 * 60 * 60 * 1000,
      })
      .json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.post("/logout", (_, res) => {
  return res
    .status(200)
    .clearCookie("access_token")
    .json({ message: "Logout successful" });
});

export default authRouter;
