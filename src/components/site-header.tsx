import Link from "next/link";
import { Suspense } from "react";
import { Gem } from "lucide-react";
import { CartButton } from "@/components/cart/cart-button";
import { HeaderSearch } from "@/components/header-search";
import { SearchFieldShell } from "@/components/search-field";
import { cn } from "@/lib/utils";

const NAV_ITEMS = ["Shop", "Collections", "Contact", "About"] as const;

export function SiteHeader() {
  return (
    <header className="flex flex-col gap-4 rounded-3xl border border-border bg-card px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:gap-8">
      <Link
        href="/"
        className="flex shrink-0 items-center gap-2 text-xl font-semibold tracking-tight"
      >
        <Gem className="size-5" strokeWidth={1.5} />
        crystal.
      </Link>

      <nav aria-label="Main" className="flex items-center gap-0.5 sm:gap-2">
        {NAV_ITEMS.map((item, index) => {
          const isActive = index === 0;

          if (isActive) {
            return (
              <Link
                key={item}
                href="/"
                aria-current="page"
                className="relative rounded-lg px-3 py-2 text-[0.7rem] font-medium tracking-[0.18em] text-foreground uppercase after:absolute after:bottom-0.5 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-foreground sm:px-4 sm:text-xs"
              >
                {item}
              </Link>
            );
          }

          // The design ships these as chrome; the task only covers the shop page.
          return (
            <button
              key={item}
              type="button"
              disabled
              title={`${item} is not part of this task`}
              className={cn(
                "cursor-not-allowed rounded-lg px-3 py-2 text-[0.7rem] font-medium tracking-[0.18em]",
                "text-foreground/45 uppercase sm:px-4 sm:text-xs",
              )}
            >
              {item}
            </button>
          );
        })}
      </nav>

      <div className="flex items-center gap-3 lg:ml-auto">
        <Suspense fallback={<SearchFieldShell className="w-full lg:w-72" />}>
          <HeaderSearch className="w-full lg:w-72" />
        </Suspense>
        <CartButton />
      </div>
    </header>
  );
}
