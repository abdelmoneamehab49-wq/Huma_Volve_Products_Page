"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/rating";
import { ProductDetailSkeleton } from "@/components/product-detail-skeleton";
import { ProductsErrorState } from "@/components/results-states";
import { useCart } from "@/components/cart/cart-provider";
import { categoryLabel } from "@/lib/catalog";
import { discountLabel, formatCount, formatPrice, listPrice } from "@/lib/format";
import { productDetailQuery } from "@/lib/queries";
import { cn } from "@/lib/utils";

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}

export function ProductDetail({ id }: { id: string }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const {
    data: product,
    isPending,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery(productDetailQuery(id));

  if (isPending) return <ProductDetailSkeleton />;

  if (isError || !product) {
    const notFound = error instanceof Error && "status" in error && error.status === 404;

    return (
      <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 lg:p-8">
        <ProductsErrorState
          title={notFound ? "Product not found" : "We couldn't load this product"}
          message={
            error instanceof Error
              ? error.message
              : "Something went wrong while loading this product."
          }
          onRetry={() => refetch()}
          isRetrying={isFetching}
        />
        <div className="mt-6 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images.length > 0 ? product.images : [product.thumbnail];
  const brand = product.brand?.trim();
  const discount = discountLabel(product.discountPercentage);
  const maxQuantity = Math.max(1, product.stock);
  const currentImage = images[activeImage] ?? product.thumbnail;

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/"
        className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to shop
      </Link>

      <div className="grid gap-8 rounded-3xl border border-border bg-card p-5 sm:p-6 lg:grid-cols-2 lg:p-8">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary">
            <Image
              src={currentImage}
              alt={product.title}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-contain p-8"
            />
          </div>

          {images.length > 1 && (
            <ul className="flex flex-wrap gap-3">
              {images.map((image, index) => (
                <li key={image}>
                  <button
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`Show image ${index + 1} of ${images.length}`}
                    aria-current={index === activeImage}
                    className={cn(
                      "relative size-16 overflow-hidden rounded-xl bg-secondary ring-1 transition",
                      index === activeImage
                        ? "ring-foreground/60"
                        : "ring-transparent hover:ring-foreground/20",
                    )}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-contain p-2"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant="secondary"
              className="h-6 rounded-full px-3 text-[0.65rem] font-medium tracking-[0.16em] uppercase"
            >
              {categoryLabel(product.category)}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {product.availabilityStatus}
            </span>
          </div>

          {brand && (
            <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
              {brand}
            </p>
          )}

          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {product.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4">
            <Rating rating={product.rating} reviews={product.reviews.length} size="md" />
            <span className="text-xs text-muted-foreground">
              {formatCount(product.stock)} in stock
            </span>
          </div>

          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-semibold">
              {formatPrice(product.price)}
            </span>
            {discount && (
              <>
                <span className="text-base text-muted-foreground line-through">
                  {formatPrice(listPrice(product.price, product.discountPercentage))}
                </span>
                <Badge className="rounded-full bg-primary/10 font-semibold text-primary">
                  {discount} off
                </Badge>
              </>
            )}
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <dl className="grid gap-x-8 gap-y-3 border-t border-border pt-5 text-sm sm:grid-cols-2">
            <SpecRow label="SKU" value={product.sku} />
            <SpecRow label="Shipping" value={product.shippingInformation} />
            <SpecRow label="Warranty" value={product.warrantyInformation} />
            <SpecRow label="Returns" value={product.returnPolicy} />
            <SpecRow
              label="Min. order"
              value={`${product.minimumOrderQuantity} units`}
            />
            <SpecRow label="Weight" value={`${product.weight} kg`} />
          </dl>

          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
            <div className="flex h-11 items-center gap-1 rounded-xl border border-border px-2">
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              >
                <Minus />
              </Button>
              <span className="w-8 text-center text-sm font-medium" aria-live="polite">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Increase quantity"
                disabled={quantity >= maxQuantity}
                onClick={() =>
                  setQuantity((current) => Math.min(maxQuantity, current + 1))
                }
              >
                <Plus />
              </Button>
            </div>

            <Button
              size="lg"
              onClick={() => {
                addItem(
                  {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                  },
                  quantity,
                );
                setJustAdded(true);
                window.setTimeout(() => setJustAdded(false), 2000);
              }}
              className="h-11 flex-1 rounded-xl bg-primary px-6 text-[0.7rem] font-semibold tracking-[0.16em] uppercase hover:bg-primary/90"
            >
              {justAdded ? (
                <Check className="size-4" />
              ) : (
                <ShoppingCart className="size-4" />
              )}
              {justAdded ? "Added to cart" : "Add to cart"}
            </Button>
          </div>

          {product.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <li key={tag}>
                  <Badge
                    variant="outline"
                    className="h-6 rounded-full px-3 text-xs font-normal"
                  >
                    #{tag}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
