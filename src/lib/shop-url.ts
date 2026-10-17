import { ALL_CATEGORIES } from "./catalog";

export type ShopParams = {
  q: string;
  category: string;
  page: number;
};

type ReadonlyParams = { get(key: string): string | null };

/**
 * Browse state lives in the URL, so a filtered grid is shareable, survives the
 * back button, and re-renders React Query from a single source of truth.
 */
export function parseShopParams(searchParams: ReadonlyParams): ShopParams {
  const rawPage = Number(searchParams.get("page"));
  const category = searchParams.get("category");

  return {
    q: searchParams.get("q")?.trim() ?? "",
    category: category && category.length > 0 ? category : ALL_CATEGORIES,
    page: Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1,
  };
}

function toSearchParams(
  params: ShopParams,
  overrides: Partial<ShopParams>,
): URLSearchParams {
  const merged = { ...params, ...overrides };
  const searchParams = new URLSearchParams();

  if (merged.q) searchParams.set("q", merged.q);
  if (merged.category && merged.category !== ALL_CATEGORIES) {
    searchParams.set("category", merged.category);
  }
  if (merged.page > 1) searchParams.set("page", String(merged.page));

  return searchParams;
}

/** Builds an href for the shop route with only the params that are not defaults. */
export function shopHref(
  params: ShopParams,
  overrides: Partial<ShopParams> = {},
): string {
  const query = toSearchParams(params, overrides).toString();
  return query ? `/?${query}` : "/";
}

/**
 * Page numbers to render, collapsed with ellipses for long ranges,
 * e.g. [1, "ellipsis", 7, 8, 9, "ellipsis", 17].
 */
export function pageWindow(
  page: number,
  totalPages: number,
  span = 1,
): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, totalPages, page]);
  for (let offset = 1; offset <= span; offset += 1) {
    pages.add(page - offset);
    pages.add(page + offset);
  }

  const sorted = [...pages]
    .filter((value) => value >= 1 && value <= totalPages)
    .sort((a, b) => a - b);

  const result: (number | "ellipsis")[] = [];
  let previous = 0;
  for (const value of sorted) {
    if (value - previous > 1) result.push("ellipsis");
    result.push(value);
    previous = value;
  }

  return result;
}
