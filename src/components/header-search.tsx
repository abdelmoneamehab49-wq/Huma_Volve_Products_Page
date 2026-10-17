"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchField } from "@/components/search-field";
import { parseShopParams, shopHref } from "@/lib/shop-url";

export function HeaderSearch({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isShopRoute = pathname === "/";
  const query = isShopRoute ? parseShopParams(searchParams).q : "";

  const commit = useCallback(
    (value: string) => {
      const next = shopHref(parseShopParams(searchParams), {
        q: value.trim(),
        page: 1,
      });

      // Typing refines the current view; arriving from a product page is a real navigation.
      if (isShopRoute) {
        router.replace(next, { scroll: false });
      } else {
        router.push(next);
      }
    },
    [isShopRoute, router, searchParams],
  );

  return (
    <SearchField
      value={query}
      onCommit={commit}
      placeholder="Search"
      className={className}
    />
  );
}
