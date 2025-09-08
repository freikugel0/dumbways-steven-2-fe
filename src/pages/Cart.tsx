import { CartItem } from "@/components/cart-item";
import Spinner from "@/components/loading";
import { useCart } from "@/hooks/useCart";

export const Cart = () => {
  const { items, loading } = useCart();

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-semibold">Your Cart</h1>
        {loading && <Spinner />}
      </div>
      {items.length > 0 ? (
        items.map((i) => <CartItem key={i.id} item={i} />)
      ) : (
        <h1>Your cart is empty</h1>
      )}
    </div>
  );
};
