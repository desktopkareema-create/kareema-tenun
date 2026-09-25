import type { ContactMessage, Product } from "@/backend";
import { ProductSort } from "@/backend";

export type { ContactMessage, Product };
export { ProductSort };

/** Sort options surfaced in the collection UI, in display order. */
export const PRODUCT_SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: ProductSort.newest, label: "Terbaru" },
  { value: ProductSort.priceLowToHigh, label: "Harga Terendah" },
  { value: ProductSort.priceHighToLow, label: "Harga Tertinggi" },
];

/** A product image path with a guaranteed non-empty fallback. */
export const FALLBACK_PRODUCT_IMAGE = "/assets/images/placeholder.svg";

export function primaryImage(product: Product): string {
  return product.images[0] ?? FALLBACK_PRODUCT_IMAGE;
}
