import axios, { type AxiosResponse } from "axios";
import type { WeatherResponse } from "../types/weather";

const baseUrl = import.meta.env.VITE_BASE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export const weatherApi = {
  getWeatherByName: (
    search: string,
  ): Promise<AxiosResponse<WeatherResponse>> => {
    return axios.get<WeatherResponse>(
      `${baseUrl}?units=metric&q=${search}&appid=${apiKey}`,
    );
  },
};
