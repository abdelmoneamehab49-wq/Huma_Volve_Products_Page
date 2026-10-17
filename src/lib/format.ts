const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const integer = new Intl.NumberFormat("en-US");

export function formatPrice(value: number): string {
  return currency.format(value);
}

export function formatCount(value: number): string {
  return integer.format(value);
}

/** DummyJSON gives the discounted price, so recover the struck-through list price. */
export function listPrice(price: number, discountPercentage: number): number {
  if (discountPercentage <= 0) return price;
  return price / (1 - discountPercentage / 100);
}

export function discountLabel(discountPercentage: number): string | null {
  if (discountPercentage < 1) return null;
  return `-${Math.round(discountPercentage)}%`;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}
