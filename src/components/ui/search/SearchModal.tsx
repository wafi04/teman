import { Loader2 } from "lucide-react";
import { Product } from "../../../types/products";

export function SearchModal({
  product,
  status,
  isLoading,
}: {
  product: Product;
  isLoading: boolean;
  status: "error" | "success" | "pending";
}) {
  if (status === "pending" || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="size-20 text-blue-500 animate-spin" />
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <a href={`/p/${product.id}`} className="block">
        <img
          src={product.variants[0].image as string}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md"
        />
        <div className="mt-2">
          <h2 className="font-bebas text-xl truncate">{product.name}</h2>
          <h3 className="text-gray-500 truncate">{product.category.name}</h3>
          <p className="text-md font-semibold">
            {/* Rp. {product.variants[0].price.toFixed(2)} */}
          </p>
        </div>
      </a>
    </div>
  );
}
