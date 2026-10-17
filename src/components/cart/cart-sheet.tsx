"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format";

export function CartSheet() {
  const { items, itemCount, subtotal, isOpen, closeCart, removeItem, setQuantity, clear } =
    useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? undefined : closeCart())}>
      <SheetContent side="right" className="w-full gap-0 sm:max-w-md">
        <SheetHeader className="border-b border-border">
          <SheetTitle className="text-lg font-semibold">Your cart</SheetTitle>
          <SheetDescription>
            {itemCount === 0
              ? "Nothing here yet — add something from the shop."
              : `${itemCount} ${itemCount === 1 ? "item" : "items"} ready for checkout.`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <ShoppingBag className="size-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Your cart is empty.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <div className="relative size-16 shrink-0 rounded-xl bg-secondary p-2">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <p className="truncate text-sm font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(item.price)}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon-xs"
                        aria-label={`Decrease quantity of ${item.title}`}
                        onClick={() => setQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus />
                      </Button>
                      <span className="w-6 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon-xs"
                        aria-label={`Increase quantity of ${item.title}`}
                        onClick={() => setQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="ml-auto"
                        aria-label={`Remove ${item.title}`}
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <SheetFooter className="border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-base font-semibold">{formatPrice(subtotal)}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Shipping and taxes are calculated at checkout.
          </p>
          <Button className="h-10 rounded-2xl" onClick={closeCart}>
            Continue shopping
          </Button>
          {items.length > 0 && (
            <Button variant="ghost" className="h-9" onClick={clear}>
              Clear cart
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
