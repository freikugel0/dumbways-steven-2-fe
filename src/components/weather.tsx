import { useEffect, useState } from "react";
import type { WeatherResponse } from "../types/weather";
import { weatherApi } from "../api/client";
import axios, { type AxiosResponse } from "axios";
import toLocalTime from "../utils/localtime";
import capitalizeWords from "../utils/capitalize";
import Spinner from "./loading";

const Weather = ({ keyword }: { keyword: string }) => {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosResponse | Error | null>(null);

  useEffect(() => {
    const handleFetch = async () => {
      if (!keyword) return;
      setLoading(true);
      setError(null);

      try {
        const result = await weatherApi.getWeatherByName(keyword);
        setData(result.data);
        setError(null);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err);
        } else if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("Unknown error"));
        }
      } finally {
        setLoading(false);
      }
    };

    handleFetch();
  }, [keyword]);

  return (
    <div className="flex-1 flex flex-col items-center">
      {loading && (
        <div className="flex justify-center p-6">
          <Spinner />
        </div>
      )}
      {error && (
        <div className="flex justify-center p-6">
          <p>
            {axios.isAxiosError(error)
              ? capitalizeWords(error.response?.data?.message)
              : error instanceof Error && error.message}
          </p>
        </div>
      )}

      {data && !loading && !error && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={data.weather[0].main}
            />
            <h3 className="text-xl font-semibold">
              {data.name}, {data.sys.country}
            </h3>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">
              Now {toLocalTime(data.dt, data.timezone)}
            </h3>
            <div className="flex items-center gap-2">
              <h1 className="text-8xl font-semibold">
                {Math.round(data.main.temp)}&deg;C
              </h1>
              <div className="flex flex-col text-md w-full gap-4">
                <p>Feels like {Math.round(data.main.feels_like)}&deg;C</p>
                <div>
                  <p>{data.weather[0].main}</p>
                  <p className="text-sm">
                    {capitalizeWords(data.weather[0].description)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <ul className="list-disc list-inside">
              <li>
                <b>Min:</b> {data.main.temp_min}&deg;C
              </li>
              <li>
                <b>Max:</b> {data.main.temp_max}&deg;C
              </li>
              <li>
                <b>Humidity:</b> {data.main.humidity}%
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
