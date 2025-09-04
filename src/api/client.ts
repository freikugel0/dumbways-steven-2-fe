import axios, { type AxiosResponse } from "axios";
import type { MovieListResponse, MovieDetailResponse } from "../types/movie";

const baseUrl = import.meta.env.VITE_BASE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export const movieApi = {
  getMovies: (search?: string): Promise<AxiosResponse<MovieListResponse>> => {
    return axios.get<MovieListResponse>(`${baseUrl}`, {
      params: {
        apiKey,
        s: search ?? "resident", // Default must be defined
        limit: 20,
      },
    });
  },
  getDetailMovies: (
    id: string,
  ): Promise<AxiosResponse<MovieDetailResponse>> => {
    return axios.get<MovieDetailResponse>(`${baseUrl}`, {
      params: {
        apiKey,
        i: id,
      },
    });
  },
};
