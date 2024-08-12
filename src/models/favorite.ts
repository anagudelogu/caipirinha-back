export type Favorite = {
  id: string;
  userId: string;
  productId: string;
};

export type FavoriteDb = {
  id: string;
  user_id: string;
  product_id: string;
};

export function fromDb(favorite: FavoriteDb): Favorite {
  return {
    id: favorite.id,
    userId: favorite.user_id,
    productId: favorite.product_id,
  };
}
