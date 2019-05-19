const express = require('express');
const connectDB = require('./config/db');
import { Request, Response } from 'express';

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req: Request, res: Response) => res.send('API running'));

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
