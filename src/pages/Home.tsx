import { ProductCard } from "@/components/product-card";
import type { Product } from "@/types/product";

const dummies: Product[] = [
  {
    id: 0,
    name: "Essence Mascara Lash Princess",
    description:
      "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    price: 9.99,
    image:
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
  },
  {
    id: 1,
    name: "Eyeshadow Palette with Mirror",
    description:
      "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
    price: 19.99,
    image:
      "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
  },
];

export const Home = () => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div>
        <h1 className="text-xl font-semibold">Welcome!</h1>
        <p>This is a simple React Router DOM demo project.</p>
        <p>
          Use the navigation menu to explore the <strong>Products</strong> page
          to add items into a cart and check out the <strong>Cart</strong> page
          to see the items that has been added.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4 w-full">
        {dummies.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
