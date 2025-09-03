import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Post } from "@/types/post";
import type { AxiosResponse } from "axios";
import { postApi } from "@/api/client";
import axios from "axios";
import Spinner from "@/components/loading";
import { capitalizeWords } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export const PostDetail = () => {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosResponse | Error | null>(null);

  useEffect(() => {
    const handleFetch = async () => {
      setData(null);
      setLoading(true);
      setError(null);

      try {
        const result = await postApi.getPostDetail(Number(id));

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
        <Link to="/posts">
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
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {data.tags.map((tag) => (
                  <Badge key={tag} variant={"outline"}>
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-1 items-center">
                <Eye size={20} />
                <p>{data.views}</p>
              </div>
            </div>
            <h1 className="text-xl font-semibold">{data.title}</h1>
            <p>{data.body}</p>
          </div>
        )
      )}
    </div>
  );
};
