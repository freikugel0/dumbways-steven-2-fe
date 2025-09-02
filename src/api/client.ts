import axios, { type AxiosResponse } from "axios";
import type { ProductResponse } from "../types/product";

const baseUrl = import.meta.env.VITE_BASE_API_URL;

export const productApi = {
  getProducts: (search: string): Promise<AxiosResponse<ProductResponse>> => {
    return axios.get<ProductResponse>(`${baseUrl}&q=${search}`);
  },
};
