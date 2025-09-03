import axios, { type AxiosResponse } from "axios";
import type { Post, PostResponse } from "../types/post";

const baseUrl = import.meta.env.VITE_BASE_API_URL;

export const postApi = {
  getPosts: (search?: string): Promise<AxiosResponse<PostResponse>> => {
    return axios.get<PostResponse>(`${baseUrl}/search`, {
      params: {
        q: search ?? "",
      },
    });
  },
  getPostDetail: (id: number): Promise<AxiosResponse<Post>> => {
    return axios.get<Post>(`${baseUrl}/${id}`);
  },
};
