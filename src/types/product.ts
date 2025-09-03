export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  availabilityStatus: string;
  thumbnail: string;
  images: string;
  tags: string[];
  rating: number;
  stock: number;
  reviews: {
    rating: number;
    comment: string;
    date: Date;
    reviewerName: string;
    reviewerEmail: string;
  }[];
};

export type ProductResponse = {
  products: Product[];
};
