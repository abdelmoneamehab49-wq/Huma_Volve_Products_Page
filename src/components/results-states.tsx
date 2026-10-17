"use client";

import Link from "next/link";
import { CircleAlert, Loader2, PackageSearch, RefreshCw } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ALL_CATEGORIES, categoryLabel } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function ProductsErrorState({
  title = "We couldn't load the products",
  message,
  onRetry,
  isRetrying = false,
}: {
  title?: string;
  message: string;
  onRetry: () => void;
  isRetrying?: boolean;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 rounded-2xl bg-secondary/70 px-6 py-16 text-center"
    >
      <CircleAlert className="size-8 text-foreground/70" strokeWidth={1.5} />
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mx-auto max-w-md text-sm text-muted-foreground">
          {message}
        </p>
      </div>
      <Button
        onClick={onRetry}
        disabled={isRetrying}
        className="h-11 rounded-xl px-5 text-[0.7rem] font-semibold tracking-[0.16em] uppercase"
      >
        {isRetrying ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <RefreshCw className="size-4" />
        )}
        Try again
      </Button>
    </div>
  );
}

export function ProductsEmptyState({
  query,
  category,
}: {
  query: string;
  category: string;
}) {
  const scope =
    category === ALL_CATEGORIES ? "the shop" : categoryLabel(category);

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl bg-secondary/70 px-6 py-16 text-center">
      <PackageSearch className="size-8 text-foreground/70" strokeWidth={1.5} />
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">No products found</h3>
        <p className="mx-auto max-w-md text-sm text-muted-foreground">
          {query
            ? `Nothing in ${scope} matched “${query}”.`
            : `${scope} has no products right now.`}{" "}
          Try a different keyword or browse everything.
        </p>
      </div>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "h-11 rounded-xl px-5 text-[0.7rem] font-semibold tracking-[0.16em] uppercase",
        )}
      >
        Clear filters
      </Link>
    </div>
  );
}
