import { useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { useEffect } from "react";
import type { ProductResponse } from "./types/product";
import { productApi } from "./api/client";
import ProductComponent from "./components/product";
import type { AxiosResponse } from "axios";
import axios from "axios";
import Spinner from "./components/loading";
import capitalizeWords from "./utils/capitalize";

function App() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 500);

  const [data, setData] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosResponse | Error | null>(null);

  useEffect(() => {
    const handleFetch = async () => {
      setData(null);
      setLoading(true);
      setError(null);

      try {
        const result = await productApi.getProducts(debouncedKeyword);

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
  }, [debouncedKeyword]);

  return (
    <div className="flex justify-center min-h-screen text-black dark:text-gray-200 bg-gray-200 dark:bg-gray-900">
      <div className="flex flex-col justify-center gap-4 w-sm sm:w-lg p-4">
        <div className="flex flex-col gap-1">
          <input
            className="border-b p-2 text-sm outline-none mx-2"
            type="text"
            placeholder="Search products"
            onChange={(e) => setKeyword(e.currentTarget.value)}
          />
        </div>
        <div className="flex-1 flex justify-center">
          {loading ? (
            <div className="flex justify-center p-6">
              <Spinner />
            </div>
          ) : error ? (
            <div className="flex justify-center p-6">
              <p>
                {axios.isAxiosError(error)
                  ? capitalizeWords(error.response?.data?.message)
                  : error instanceof Error && error.message}
              </p>
            </div>
          ) : data && data.products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 h-fit">
              {data.products.map((product) => (
                <ProductComponent key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <h1 className="text-xl">Products not found</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
