import { useState } from "react";
import { ProductCard } from "./components/product";
import type { Product } from "./types/product";
import type { CartItem } from "./types/cartItem";

function App() {
  const products: Product[] = [
    {
      id: 0,
      name: "Test Product",
      price: 500,
      image: "/vite.svg",
    },
    {
      id: 1,
      name: "Test Product 1",
      price: 1000,
      image: "/vite.svg",
    },
    {
      id: 2,
      name: "Test Product 2",
      price: 1500,
      image: "/vite.svg",
    },
    {
      id: 3,
      name: "Test Product 3",
      price: 2500,
      image: "/vite.svg",
    },
  ];

  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (id: number, amount: number) => {
    setCart((prev) => [
      ...prev,
      { id: cart.length, product: products[id], qty: amount },
    ]);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const getCartItemAmount = cart.reduce((acc, item) => acc + item.qty, 0);

  const isAdded = (productId: number) =>
    cart.find((item) => item.product.id === productId);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 border rounded-lg p-2">
        <h1 className="text-2xl font-semibold">Cart</h1>
        <p>{getCartItemAmount} items in cart</p>
        <div className="flex flex-wrap gap-2">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <img
                src={item.product.image}
                alt={`${item.product.name}`}
                width={50}
              />
              <h1 className="text-lg">{item.product.name}</h1>
              <p>({item.qty})</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            isAdded={isAdded}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
