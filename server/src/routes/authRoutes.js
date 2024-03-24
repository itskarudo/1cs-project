import express from 'express';
import { db } from "../db/index.js";
import { User } from '../db/schema.js';
import bcrypt from 'bcrypt';
import { sql } from 'drizzle-orm';
import jwt from 'jsonwebtoken'; // JWT library to be used for later

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
]

const roles = ["admin", "enseignant"]

authRouter.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password, grade, role } = req.body;

    if (!firstName || !lastName || !email || !password || !grade || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!email.match(emailRegex)) {
      return res.status(400).json({error: 'Invalid email format'})
    }

    if (password.length < 8) {
      return res.status(400).json({error: 'Password should 8 characters or longer'})
    }

    if (!grades.includes(grade)) {
      return res.status(400).json({ error: `Only the following ranks are available: ${grades.join(', ')}` });
    }

    if (!roles.includes(role)) {
      return res.status(400).json({ error: `Only the following roles are available: ${roles.join(', ')}` });
    }

    // values provided to `sql` function are parameterized automatically
    const existingUser = await db.select().from(User).where(sql`${User.email} = ${email}`).limit(1);
    
    if (Object.keys(existingUser).length !== 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(User)
      .values({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      grade: grade,
      role: role
    });

    return res.status(201).json({ message: 'User signed up successfully' });
    
  } catch (error) {
    console.error('Error signing up user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await db.select().from(User).where(sql`${User.email} = ${email}`).limit(1);

    if (Object.keys(user).length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    return res.status(200).json({ message: 'Login successful', user });
    
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default authRouter;
