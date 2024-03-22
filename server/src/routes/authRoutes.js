const express = require('express');
const authRouter = express.Router();
const { User } = require('../db/schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // JWT library to be used for later

// const JWT_SECRET = process.env.JWT_SECRET;

authRouter.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password, grade, role } = req.body;

    if (!firstName || !lastName || !email || !password || !grade || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      grade,
      role,
    });

    await newUser.save();

    return res.status(201).json({ message: 'User signed up successfully' });
    
  } catch (error) {
    console.error('Error signing up user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = authRouter;
