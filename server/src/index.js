import express from 'express';
import dotenv from 'dotenv';
import exampleRouter from './routes/example.js';
import authRouter from './routes/authRoutes.js';
import cors from 'cors'

dotenv.config();

const app = express();

app.use(cors({origin: true, credentials: true}))
app.use('/', exampleRouter);
app.use('/auth', authRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
