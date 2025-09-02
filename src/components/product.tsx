import type { Product } from "../types/product";
import capitalizeWords from "../utils/capitalize";

const ProductComponent = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-gray-800 dark:bg-gray-800">
      <img src={product.thumbnail} alt={product.title} />
      <div className="flex flex-col justify-between h-full">
        <h1>{product.title}</h1>
        <div>
          <p className="text-sm">{capitalizeWords(product.category)}</p>
          <p className="font-bold">${product.price}</p>
          <p>{product.availabilityStatus}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
