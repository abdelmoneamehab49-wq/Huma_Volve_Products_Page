"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { categoryOptions } from "@/lib/catalog";
import { parseShopParams, shopHref } from "@/lib/shop-url";
import { cn } from "@/lib/utils";

export function CategoryFilter() {
  const searchParams = useSearchParams();
  const { q, category, page } = parseShopParams(searchParams);

  return (
    <div
      role="group"
      aria-label="Filter products by category"
      className="flex flex-wrap items-center gap-2"
    >
      {categoryOptions.map(({ value, label, icon: Icon }) => {
        const isActive = value === category;

        return (
          <Link
            key={value}
            href={shopHref(
              { q, category, page },
              { category: value, page: 1 },
            )}
            scroll={false}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-xl border px-4 text-sm transition-colors",
              isActive
                ? "border-transparent bg-secondary font-medium text-foreground"
                : "border-border bg-card text-foreground/70 hover:border-foreground/25 hover:text-foreground",
            )}
          >
            <Icon className="size-4" strokeWidth={1.6} />
            {label}
          </Link>
        );
      })}
    </div>
  );
}
