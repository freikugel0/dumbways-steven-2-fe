export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
};

export type CartItemType = {
  id: number;
  product: Product;
  qty: number;
};
