import { Suspense } from "react";
import { ProductGridSkeleton } from "@/components/product-grid-skeleton";
import { ShopBrowser } from "@/components/shop-browser";
import { ShopHero } from "@/components/shop-hero";
import { SiteHeader } from "@/components/site-header";

export default function ProductsPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <SiteHeader />
      <ShopHero />
      {/* The browser reads search params, so it renders behind a boundary with the rest of the page static. */}
      <Suspense
        fallback={
          <section className="rounded-3xl border border-border bg-card p-5 sm:p-6 lg:p-8">
            <ProductGridSkeleton />
          </section>
        }
      >
        <ShopBrowser />
      </Suspense>
    </div>
  );
}
