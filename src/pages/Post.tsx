import { postApi } from "@/api/client";
import Spinner from "@/components/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { capitalizeWords, truncateString } from "@/lib/utils";
import type { PostResponse } from "@/types/post";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Eye } from "lucide-react";

export const Post = () => {
  const [data, setData] = useState<PostResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosResponse | Error | null>(null);

  useEffect(() => {
    const handleFetch = async () => {
      setData(null);
      setLoading(true);
      setError(null);

      try {
        const result = await postApi.getPosts();

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
    <div className="flex flex-col gap-2 justify-start">
      {loading ? (
        <Spinner />
      ) : error ? (
        <p>
          {axios.isAxiosError(error)
            ? capitalizeWords(error.response?.data?.message)
            : error instanceof Error && error.message}
        </p>
      ) : data && data.posts.length > 0 ? (
        data.posts.map((post) => (
          <div key={post.id} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center">
                <Button variant={"ghost"}>
                  <ArrowUp />
                </Button>
                <p>{post.reactions.likes}</p>
              </div>
              <div className="flex flex-col items-center">
                <Button variant={"ghost"}>
                  <ArrowDown />
                </Button>
                <p>{post.reactions.dislikes}</p>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant={"outline"}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{truncateString(post.body, 170)}</p>
              </CardContent>
              <CardFooter>
                <div className="flex w-full justify-between items-center">
                  <div className="flex gap-1 items-center">
                    <Eye size={20} />
                    <p>{post.views}</p>
                  </div>
                  <Button asChild>
                    <Link
                      to={{
                        pathname: `/posts/${post.id}`,
                      }}
                    >
                      Read More
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))
      ) : (
        <h1>Empty: Nothing to see here</h1>
      )}{" "}
    </div>
  );
};
