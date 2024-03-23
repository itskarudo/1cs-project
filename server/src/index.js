import express from 'express';
import 'dotenv/config';
import exampleRouter from './routes/example.js';
import authRouter from './routes/authRoutes.js';

dotenv.config();

const app = express();

app.use('/', exampleRouter);

app.use('/auth', authRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
