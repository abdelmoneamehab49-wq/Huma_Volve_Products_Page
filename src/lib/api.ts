import type { Product, ProductListResponse, ProductsQuery } from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_DUMMYJSON_URL ?? "https://dummyjson.com";

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function requestJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      signal,
      headers: { Accept: "application/json" },
    });
  } catch (error) {
    // Let React Query treat cancellations as cancellations, not failures.
    if (signal?.aborted) throw error;
    throw new ApiError(
      "We couldn't reach the products service. Check your connection and try again.",
      0,
    );
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new ApiError("We couldn't find that product.", 404);
    }
    throw new ApiError(
      `The products service responded with ${response.status}. Please try again.`,
      response.status,
    );
  }

  return (await response.json()) as T;
}

/**
 * DummyJSON exposes three different list endpoints; paging is always `limit` + `skip`.
 * Search wins over category so a keyword never gets silently filtered away.
 */
export function productsPath({
  page,
  pageSize,
  search,
  category,
}: ProductsQuery): string {
  const skip = (Math.max(1, page) - 1) * pageSize;
  const params = new URLSearchParams({
    limit: String(pageSize),
    skip: String(skip),
  });
  const keyword = search?.trim();

  if (keyword) {
    params.set("q", keyword);
    return `/products/search?${params.toString()}`;
  }

  if (category) {
    return `/products/category/${encodeURIComponent(category)}?${params.toString()}`;
  }

  return `/products?${params.toString()}`;
}

export function fetchProducts(
  query: ProductsQuery,
  signal?: AbortSignal,
): Promise<ProductListResponse> {
  return requestJson<ProductListResponse>(productsPath(query), signal);
}

export function fetchProductById(
  id: string,
  signal?: AbortSignal,
): Promise<Product> {
  return requestJson<Product>(`/products/${encodeURIComponent(id)}`, signal);
}
