const express = require('express');
const dotenv = require('dotenv');
const exampleRouter = require('./routes/example');
const authRouter = require('./routes/authRouter');

dotenv.config();

const app = express();

app.use('/api/example', exampleRouter);

app.use('/auth', authRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
