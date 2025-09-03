import axios, { type AxiosResponse } from "axios";
import type { Product, ProductResponse } from "../types/product";

const baseUrl = import.meta.env.VITE_BASE_API_URL;

export const productApi = {
  getProducts: (search?: string): Promise<AxiosResponse<ProductResponse>> => {
    return axios.get<ProductResponse>(`${baseUrl}/search`, {
      params: {
        q: search ?? "",
        limit: 20,
      },
    });
  },
  getDetailProduct: (id: number): Promise<AxiosResponse<Product>> => {
    return axios.get<Product>(`${baseUrl}/${id}`);
  },
};
