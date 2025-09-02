export type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  availabilityStatus: string;
  thumbnail: string;
};

export type ProductResponse = {
  products: Product[];
};
