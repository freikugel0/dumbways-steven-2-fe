import type { Product } from "@/types/product";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBasketIcon } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";

export const ProductCard = ({ product }: { product: Product }) => {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img className="m-auto" src={product.image} alt={product.name} />
      </CardContent>
      <CardFooter>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-center items-center gap-2">
            <Button
              variant={"secondary"}
              size={"icon"}
              onClick={() => qty > 1 && setQty((prev) => prev - 1)}
            >
              <Minus />
            </Button>
            <p className="text-lg text-center w-12">{qty}</p>
            <Button
              size={"icon"}
              variant={"secondary"}
              onClick={() => setQty((prev) => prev + 1)}
            >
              <Plus />
            </Button>
          </div>
          <Button
            className="hover:cursor-pointer"
            onClick={() => add({ product, qty })}
          >
            <ShoppingBasketIcon />
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
