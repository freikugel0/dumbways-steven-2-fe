import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import type { AxiosResponse } from "axios";
import { productApi } from "@/api/client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import Spinner from "@/components/loading";
import { capitalizeWords } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosResponse | Error | null>(null);

  useEffect(() => {
    const handleFetch = async () => {
      setData(null);
      setLoading(true);
      setError(null);

      try {
        const result = await productApi.getDetailProduct(Number(id));

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
        <Link to="/products">
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
            <div className="flex justify-between gap-2">
              <div className="flex flex-col gap-2 items-center">
                <img src={data.images} alt={data.title} width={500} />
                <div className="flex gap-2">
                  {data.tags.map((tag) => (
                    <Badge key={tag} variant={"outline"}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-center gap-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-4xl font-bold">${data.price}</h1>
                  <Badge className="bg-blue-300">
                    {capitalizeWords(data.category)}
                  </Badge>
                </div>
                <h1 className="text-xl font-semibold">{data.title}</h1>
                <p>{data.description}</p>
                <div className="flex justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Star />
                    <p>{data.rating}</p>
                  </div>
                  <Button className="bg-green-500">
                    Add to cart <ShoppingCart />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-xl font-bold">Reviews</h1>
              {data.reviews.map((review) => (
                <div key={review.reviewerName}>
                  <div className="flex gap-2 items-center">
                    <h3 className="font-semibold">{review.reviewerName}</h3>
                    <div className="flex items-center gap-2">
                      <Star />
                      <p>{review.rating}</p>
                    </div>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};
