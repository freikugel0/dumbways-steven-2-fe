import { useState } from "react";
import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
  addToCart: (id: number, amount: number) => void;
  removeFromCart: (id: number) => void;
  isAdded: (id: number) => boolean;
};

export const ProductCard = ({
  product,
  addToCart,
  removeFromCart,
  isAdded,
}: ProductCardProps) => {
  const [amount, setAmount] = useState<number>(1);

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <img src={product.image} alt={`${product.name}`} width={100} />
      <div className="flex flex-col items-center gap-1">
        <h1>{product.name}</h1>
        <p>{product.price}</p>
      </div>
      <input
        className={`border rounded-lg p-2 outline-none ${isAdded(product.id) && "text-gray-400"}`}
        value={amount}
        placeholder="Amount"
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isAdded(product.id)}
      />
      {isAdded(product.id) ? (
        <button
          className="border-b text-red-500"
          type="button"
          onClick={() => removeFromCart(product.id)}
        >
          Remove
        </button>
      ) : (
        <button
          className="border-b"
          type="button"
          onClick={() => addToCart(product.id, amount)}
        >
          Add
        </button>
      )}
    </div>
  );
};
