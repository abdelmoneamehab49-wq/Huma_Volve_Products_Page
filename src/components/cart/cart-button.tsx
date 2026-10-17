"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";

export function CartButton() {
  const { itemCount, openCart } = useCart();

  return (
    <Button
      size="lg"
      onClick={openCart}
      className="h-11 shrink-0 rounded-xl bg-primary px-4 text-[0.7rem] font-semibold tracking-[0.16em] text-primary-foreground uppercase hover:bg-primary/90 sm:px-5"
    >
      <ShoppingCart className="size-4" />
      View cart
      {itemCount > 0 && (
        <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-white/25 px-1.5 text-[0.65rem] font-semibold">
          {itemCount}
        </span>
      )}
    </Button>
  );
}
