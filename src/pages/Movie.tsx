import { movieApi } from "@/api/client";
import Spinner from "@/components/loading";
import { capitalizeWords } from "@/lib/utils";
import type { MovieListResponse } from "@/types/movie";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Movie = () => {
  const [data, setData] = useState<MovieListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosResponse | Error | null>(null);

  useEffect(() => {
    const handleFetch = async () => {
      setData(null);
      setLoading(true);
      setError(null);

      try {
        const result = await movieApi.getMovies();

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
  }, []);

  return (
    <div className="flex gap-2 justify-center w-full">
      {loading ? (
        <Spinner />
      ) : error ? (
        <p>
          {axios.isAxiosError(error)
            ? capitalizeWords(error.response?.data?.message)
            : error instanceof Error && error.message}
        </p>
      ) : data && data.Search.length > 0 ? (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 w-full">
          {data.Search.map((movie) => (
            <Link
              key={movie.imdbID}
              to={{
                pathname: `/movies/${movie.imdbID}`,
              }}
            >
              <Card className="hover:cursor-pointer hover:opacity-70 transition-opacity h-full">
                <CardHeader>
                  <img
                    className="mx-auto rounded-md"
                    src={movie.Poster}
                    alt={movie.Title}
                    width={200}
                  />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div>
                      <p className="font-bold text-xl">{movie.Title}</p>
                      <p className="text-md">{movie.Year}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Badge>{capitalizeWords(movie.Type)}</Badge>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <h1>Empty: Nothing to see here</h1>
      )}
    </div>
  );
};
