import { cn } from "@/lib/utils";

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false">
      <path
        d="M12 0q1.6 10.4 12 12-10.4 1.6-12 12-1.6-10.4-12-12Q10.4 1.6 12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ShopHero() {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-border bg-card px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
      {/* Decorative line-art: a soft sweeping curve with star specks, as in the design. */}
      <svg
        className="pointer-events-none absolute inset-0 -z-10 size-full text-foreground/[0.08]"
        viewBox="0 0 1200 320"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden
      >
        <path
          d="M-40 300C220 340 760 30 1240 120"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M-40 60C280 90 640 300 1240 250"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      <Sparkle className="pointer-events-none absolute top-10 left-[47%] -z-10 size-7 text-foreground/10" />
      <Sparkle className="pointer-events-none absolute bottom-12 left-[7%] -z-10 size-9 text-foreground/10" />
      <Sparkle className="pointer-events-none absolute bottom-20 left-[17%] -z-10 size-4 text-foreground/10" />
      <Sparkle className="pointer-events-none absolute top-1/2 right-10 -z-10 size-16 text-foreground/[0.07]" />
      <Sparkle className="pointer-events-none absolute top-12 right-1/4 -z-10 size-4 text-foreground/10" />

      <div className="relative grid gap-6 md:grid-cols-2 md:gap-12">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
          Explore Our Shop
        </h1>
        <p className={cn("max-w-xl text-sm leading-relaxed text-foreground/75 sm:text-base", "md:self-end")}>
          From skincare to makeup, our platform features a wide range of products
          that cater to all your beauty needs. We strive to provide our customers
          with a luxury shopping experience, from browsing through our carefully
          selected products to receiving them in our signature packaging. Shop
          with us for the ultimate in beauty luxury.
        </p>
      </div>
    </section>
  );
}
