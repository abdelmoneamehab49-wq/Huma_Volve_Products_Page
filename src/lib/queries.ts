import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { fetchProductById, fetchProducts } from "./api";
import type { ProductsQuery } from "./types";

/**
 * Single source of truth for every product cache entry, so screens that read the
 * same data always agree on the key.
 */
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (query: ProductsQuery) => [...productKeys.lists(), query] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

export function productsListQuery(query: ProductsQuery) {
  return queryOptions({
    queryKey: productKeys.list(query),
    queryFn: ({ signal }) => fetchProducts(query, signal),
    // Keep the current page on screen while the next one loads instead of flashing a skeleton.
    placeholderData: keepPreviousData,
    staleTime: 5 * 60_000,
  });
}

export function productDetailQuery(id: string) {
  return queryOptions({
    queryKey: productKeys.detail(id),
    queryFn: ({ signal }) => fetchProductById(id, signal),
    staleTime: 5 * 60_000,
  });
}
