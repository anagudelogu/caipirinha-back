// src/index.js
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'WIP Fetch Favorites',
  });
});

app.post('/', (req: Request, res: Response) => {
  res.json({
    message: 'WIP Add Favorites',
  });
});

app.delete('/', (req: Request, res: Response) => {
  res.json({
    message: 'WIP Delete Favorites',
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
