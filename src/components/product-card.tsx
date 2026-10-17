import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Rating } from "@/components/rating";
import { categoryLabel } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const href = `/products/${product.id}`;
  const brand = product.brand?.trim();

  return (
    <Card
      className={cn(
        "group/card h-full gap-0 overflow-hidden rounded-2xl bg-secondary p-0 ring-0",
        "transition-shadow duration-300 hover:shadow-[0_20px_45px_-28px_rgba(0,0,0,0.5)]",
      )}
    >
      <Link
        href={href}
        aria-label={product.title}
        className="relative block aspect-square focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-foreground/40"
      >
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw"
          className="object-contain p-6 transition-transform duration-500 group-hover/card:scale-[1.04]"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 px-5 pb-5">
        <CardTitle className="text-sm leading-snug font-semibold tracking-wide uppercase">
          <Link href={href} className="hover:underline">
            {product.title}
          </Link>
        </CardTitle>

        <p className="text-[0.68rem] tracking-[0.18em] text-muted-foreground uppercase">
          {brand || categoryLabel(product.category)}
        </p>

        <Rating rating={product.rating} reviews={product.reviews.length} />

        <p className="text-base font-medium">{formatPrice(product.price)}</p>

        <Link
          href={href}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "mt-1 h-10 w-full rounded-xl border-border bg-card text-[0.7rem] font-semibold tracking-[0.14em] uppercase hover:border-foreground/30 hover:bg-card",
          )}
        >
          View details
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </Card>
  );
}
