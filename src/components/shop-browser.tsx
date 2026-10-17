"use client";

import { useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { CategoryFilter } from "@/components/category-filter";
import { PaginationControls } from "@/components/pagination-controls";
import { ProductGrid } from "@/components/product-grid";
import { ProductGridSkeleton } from "@/components/product-grid-skeleton";
import {
  ProductsEmptyState,
  ProductsErrorState,
} from "@/components/results-states";
import { ALL_CATEGORIES, PAGE_SIZE } from "@/lib/catalog";
import { productsListQuery } from "@/lib/queries";
import { parseShopParams, shopHref } from "@/lib/shop-url";

export function ShopBrowser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { q: search, category: rawCategory, page } = parseShopParams(searchParams);
  const category = rawCategory === ALL_CATEGORIES ? undefined : rawCategory;

  const { data, isPending, isError, error, isFetching, refetch } = useQuery(
    productsListQuery({ page, pageSize: PAGE_SIZE, search, category }),
  );

  const goToPage = useCallback(
    (nextPage: number) => {
      router.push(
        shopHref({ q: search, category: rawCategory, page }, { page: nextPage }),
      );
    },
    [page, rawCategory, router, search],
  );

  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  // A filtered category can have fewer pages than a hand-edited `?page=`.
  const isPageOutOfRange = page > totalPages;

  useEffect(() => {
    if (!data || !isPageOutOfRange) return;

    router.replace(
      shopHref({ q: search, category: rawCategory, page }, { page: totalPages }),
      { scroll: false },
    );
  }, [data, isPageOutOfRange, page, rawCategory, router, search, totalPages]);

  return (
    <section
      aria-labelledby="products-heading"
      className="rounded-3xl border border-border bg-card p-5 sm:p-6 lg:p-8"
    >
      <h2 id="products-heading" className="sr-only">
        Products
      </h2>

      <div className="flex flex-col gap-6 lg:gap-8">
        <CategoryFilter />

        {isPending ? (
          <ProductGridSkeleton />
        ) : isError ? (
          <ProductsErrorState
            message={
              error instanceof Error
                ? error.message
                : "Something went wrong while loading products."
            }
            onRetry={() => refetch()}
            isRetrying={isFetching}
          />
        ) : isPageOutOfRange ? (
          <ProductGridSkeleton />
        ) : products.length === 0 ? (
          <ProductsEmptyState query={search} category={rawCategory} />
        ) : (
          <div className="flex flex-col gap-8">
            <ProductGrid products={products} isRefreshing={isFetching} />
            <PaginationControls
              page={page}
              totalPages={totalPages}
              total={total}
              pageSize={PAGE_SIZE}
              isFetching={isFetching}
              onPageChange={goToPage}
            />
          </div>
        )}
      </div>
    </section>
  );
}
