import { useEffect, useState } from "react";
import type { ProductResponse } from "@/types/product";
import type { AxiosResponse } from "axios";
import { productApi } from "@/api/client";
import axios from "axios";
import Spinner from "@/components/loading";
import { capitalizeWords } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export const Product = () => {
  const [data, setData] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosResponse | Error | null>(null);

  useEffect(() => {
    const handleFetch = async () => {
      setData(null);
      setLoading(true);
      setError(null);

      try {
        const result = await productApi.getProducts();

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
      ) : data && data.products.length > 0 ? (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 w-full">
          {data.products.map((product) => (
            <Link
              key={product.id}
              to={{
                pathname: `/products/${product.id}`,
              }}
            >
              <Card className="hover:cursor-pointer hover:opacity-70 transition-opacity h-full">
                <CardHeader>
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription>
                    <Badge variant={"secondary"}>{product.category}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <img
                      className="mx-auto"
                      src={product.thumbnail}
                      alt={product.title}
                      width={200}
                    />
                    <div>
                      <p className="font-bold text-2xl">${product.price}</p>
                      <Badge className="bg-amber-300">
                        {product.availabilityStatus}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-wrap gap-2 items-center">
                    {product.tags.map((tag) => (
                      <p key={tag}>#{tag}</p>
                    ))}
                  </div>
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
