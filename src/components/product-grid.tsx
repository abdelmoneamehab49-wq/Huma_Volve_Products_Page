import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductGrid({
  products,
  isRefreshing = false,
}: {
  products: Product[];
  isRefreshing?: boolean;
}) {
  return (
    <ul
      aria-busy={isRefreshing}
      className={cn(
        "grid grid-cols-2 gap-4 transition-opacity duration-200 sm:gap-5 md:grid-cols-3 xl:grid-cols-4",
        isRefreshing && "opacity-55",
      )}
    >
      {products.map((product) => (
        <li key={product.id} className="h-full">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
