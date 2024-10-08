// src/index.js
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { getAllFavoritesFromUser, addFavorite, removeFavorite } from './db';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());

app.get('/favorites/:userId', (req: Request, res: Response) => {
  getAllFavoritesFromUser(req.params.userId)
    .then((data) => {
      res.json({
        favorites: data,
        message: 'Favorites retrieved successfully',
      });
    })
    .then(() => {})
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

app.post('/favorites', (req: Request, res: Response) => {
  addFavorite(req.body.userId, req.body.productId)
    .then(() => {
      res.status(201).json({
        message: 'Favorite added successfully',
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

app.delete('/favorites/:userId/:productId', (req: Request, res: Response) => {
  removeFavorite(req.params.userId, req.params.productId)
    .then(() => {
      res.json({
        message: 'Favorite removed successfully',
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
