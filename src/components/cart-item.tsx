import type { CartItemType } from "@/types/product";
import { Button } from "./ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";

export const CartItem = ({ item }: { item: CartItemType }) => {
  const { remove, edit } = useCart();
  const [qty, setQty] = useState(item.qty);

  const updateQty = (newQty: number) => {
    setQty(newQty);
    edit(item.id, newQty);
  };

  return (
    <div key={item.id} className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src={item.product.image} alt={item.product.name} width={100} />
        <div className="flex flex-col gap-2">
          <p>{item.product.name}</p>
          <p className="font-semibold">${item.product.price}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant={"ghost"} size={"icon"} onClick={() => remove(item.id)}>
          <Trash />
        </Button>
        <div className="flex justify-center items-center gap-2">
          <Button
            variant={"secondary"}
            size={"icon"}
            onClick={() => qty > 1 && updateQty(qty - 1)}
          >
            <Minus />
          </Button>
          <p className="text-lg text-center w-12">{qty}</p>
          <Button
            size={"icon"}
            variant={"secondary"}
            onClick={() => updateQty(qty + 1)}
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
};
