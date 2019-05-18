import express = require('express');
import { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => res.send('API running'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
