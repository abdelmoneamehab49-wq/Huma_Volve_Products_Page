import { Brush, Droplets, Gem, LayoutGrid, SprayCan, type LucideIcon } from "lucide-react";

/** Products fetched per page — 4 columns x 3 rows on a large screen. */
export const PAGE_SIZE = 12;

export const ALL_CATEGORIES = "all";

export type CategoryOption = {
  value: string;
  label: string;
  icon: LucideIcon;
};

/**
 * The design's filter pills, mapped onto categories that actually exist in the
 * DummyJSON catalogue (`/products/category-list`) so every pill returns real results.
 */
export const categoryOptions: CategoryOption[] = [
  { value: ALL_CATEGORIES, label: "All Products", icon: LayoutGrid },
  { value: "skin-care", label: "Skincare", icon: Droplets },
  { value: "beauty", label: "Makeup", icon: Brush },
  { value: "fragrances", label: "Fragrance", icon: SprayCan },
  { value: "womens-jewellery", label: "Jewellery", icon: Gem },
];

export function isKnownCategory(value: string): boolean {
  return categoryOptions.some((option) => option.value === value);
}

export function categoryLabel(value: string): string {
  return (
    categoryOptions.find((option) => option.value === value)?.label ??
    value
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}
