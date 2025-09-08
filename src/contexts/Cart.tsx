import type { CartItemType } from "@/types/product";
import { createContext, useState } from "react";

export type CartContextType = {
  items: CartItemType[];
  add: ({ product, qty }: Omit<CartItemType, "id">) => void;
  remove: (id: number) => void;
  edit: (id: number, qty: number) => void;
  loading: boolean;
};

export type CartStorageType = Pick<CartContextType, "items">;

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const key = "cart";

  const [data, setData] = useState<CartStorageType>(() => {
    try {
      const prev = localStorage.getItem(key);
      return prev ? JSON.parse(prev) : { items: [] };
    } catch {
      return { items: [] };
    }
  });
  const [loading, setLoading] = useState(false);

  const add = ({ product, qty }: Omit<CartItemType, "id">) => {
    const build: CartStorageType = {
      items: [
        {
          id: Date.now(),
          product: {
            id: product.id,
            name: product.name,
            description: product.description ?? "",
            price: product.price,
            image: product.image,
          },
          qty,
        },
        ...data.items,
      ],
    };

    setData(build);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      try {
        localStorage.setItem(key, JSON.stringify(build));
      } catch (err) {
        console.error("Add failed:", err);
        setData(data);
      }
    }, 3000);
  };

  const remove = (id: number) => {
    const find = data.items.find((i) => i.id === id);
    if (!find) return console.error(`Cart item id ${id} not found`);

    const filter = data.items.filter((i) => i.id !== id);
    const build: CartStorageType = { items: filter };

    setData(build);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      try {
        localStorage.setItem(key, JSON.stringify(build));
      } catch (err) {
        console.error("Remove failed:", err);
        setData(data);
      }
    }, 3000);
  };

  const edit = (id: number, qty: number) => {
    const find = data.items.find((i) => i.id === id);
    if (!find) return console.error(`Cart item id ${id} not found`);

    const build: CartStorageType = {
      items: data.items.map((i) => (i.id === id ? { ...i, qty } : i)),
    };

    setData(build);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      try {
        localStorage.setItem(key, JSON.stringify(build));
      } catch (err) {
        console.error("Edit failed:", err);
        setData(data);
      }
    }, 3000);
  };

  return (
    <CartContext.Provider
      value={{ items: data.items, add, remove, edit, loading }}
    >
      {children}
    </CartContext.Provider>
  );
};
