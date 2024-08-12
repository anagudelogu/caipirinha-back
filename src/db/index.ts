import { Favorite, FavoriteDb, fromDb } from '../models/favorite';
import { sql } from '@vercel/postgres';

export async function getAllFavoritesFromUser(
  userId: string
): Promise<Favorite[]> {
  const result = await sql<FavoriteDb>`
    SELECT * FROM caipirinha_favorites
    WHERE user_id = ${userId}
  `;

  return result.rows.map((row) => fromDb(row));
}

export async function addFavorite(
  userId: string,
  productId: string
): Promise<void> {
  await sql`
    INSERT INTO caipirinha_favorites (user_id, product_id)
    VALUES (${userId}, ${productId})
  `;
}

export async function removeFavorite(
  userId: string,
  productId: string
): Promise<void> {
  await sql`
    DELETE FROM caipirinha_favorites
    WHERE user_id = ${userId} AND product_id = ${productId}
  `;
}

export async function createUniqueIdx() {
  try {
    const result = await sql`
      CREATE UNIQUE INDEX unique_user_product_idx
      ON caipirinha_favorites (user_id, product_id)
    `;

    return result;
  } catch (error) {
    return error;
  }
}
