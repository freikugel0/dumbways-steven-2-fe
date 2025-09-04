import { movieApi } from "@/api/client";
import Spinner from "@/components/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalizeWords } from "@/lib/utils";
import type { MovieDetailResponse } from "@/types/movie";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<MovieDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosResponse | Error | null>(null);

  useEffect(() => {
    const handleFetch = async () => {
      setData(null);
      setLoading(true);
      setError(null);

      try {
        const result = await movieApi.getDetailMovies(id as string);

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
  }, [id]);

  return (
    <div className="flex flex-col gap-2 justify-start">
      <Button variant={"ghost"} className="mr-auto" asChild>
        <Link to="/movies">
          <ArrowLeft />
          Back
        </Link>
      </Button>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p>
          {axios.isAxiosError(error)
            ? capitalizeWords(error.response?.data?.message)
            : error instanceof Error && error.message}
        </p>
      ) : (
        data && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-4">
              <div className="flex flex-col gap-2 items-center">
                <img src={data.Poster} alt={data.Title} width={500} />
              </div>
              <div className="flex flex-col justify-center gap-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-4xl font-bold">{data.Title}</h1>
                  <Badge>{capitalizeWords(data.Type)}</Badge>
                </div>
                <h1 className="text-xl font-bold">{data.Year}</h1>
                <p>{data.Plot}</p>
                <div className="flex flex-col w-full">
                  <p>
                    <b>Genre:</b> {data.Genre}
                  </p>
                  <p>
                    <b>Director:</b> {data.Director}
                  </p>
                  <p>
                    <b>Writer:</b> {data.Writer}
                  </p>
                  <p>
                    <b>Actors:</b> {data.Actors}
                  </p>
                  <p>
                    <b>Released:</b> {data.Released}
                  </p>
                  <div className="flex gap-1">
                    <b>Rating:</b> <Badge>{data.Rated}</Badge>
                  </div>
                </div>
              </div>
            </div>
            <Card className="flex flex-col w-fit gap-2">
              <CardHeader>
                <CardTitle>
                  <h1 className="text-2xl">Rating</h1>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <p>
                    <b>Metascore:</b> {data.Metascore}
                  </p>
                  <p>
                    <b>imdbRating:</b> {data.Metascore}
                  </p>
                </div>
                <div>
                  {data.Ratings.map((rating) => (
                    <div key={rating.Source}>
                      <p>{rating.Source}</p>
                      <p>{rating.Value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )
      )}
    </div>
  );
};
