import type { Product } from "./product";

export type CartItem = {
  id: number;
  product: Product;
  qty: number;
};
