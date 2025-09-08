import { CartContext } from "@/contexts/Cart";
import { useContext } from "react";

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart() must be used within an CartProvider");
  }
  return context;
};
