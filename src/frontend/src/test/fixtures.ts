import type { Product } from "@/types";

/**
 * A complete `Product` with every field populated, so a test only has to name
 * the fields it actually cares about. Typed against the app's own `Product`
 * type so a backend shape change breaks the fixture at type-check time rather
 * than silently at runtime.
 */
export function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 1n,
    name: "Sarung Tenun Kedawung",
    slug: "sarung-tenun-kedawung",
    category: "Sarung",
    price: 1425000n,
    description:
      "Sarung tenun tangan khas Jepara dengan motif Kedawung yang klasik.",
    material: "Katun tenun ATBM",
    size: "200 x 110 cm",
    motif: "Kedawung",
    images: ["/assets/generated/products/sarung-kedawung-1.jpg"],
    featured: true,
    createdAt: 1758326400000n,
    ...overrides,
  };
}

/** A small, deterministic catalogue used across the catalog journeys. */
export const SAMPLE_PRODUCTS: Product[] = [
  makeProduct({
    id: 1n,
    name: "Sarung Tenun Kedawung",
    slug: "sarung-tenun-kedawung",
    category: "Sarung",
    price: 1425000n,
    motif: "Kedawung",
    featured: true,
    createdAt: 1758326400000n,
  }),
  makeProduct({
    id: 2n,
    name: "Kain Tenun Ampel",
    slug: "kain-tenun-ampel",
    category: "Kain",
    price: 1850000n,
    motif: "Ampel",
    featured: true,
    createdAt: 1758240000000n,
  }),
  makeProduct({
    id: 3n,
    name: "Selendang Tenun Belik",
    slug: "selendang-tenun-belik",
    category: "Selendang",
    price: 890000n,
    motif: "Belik",
    featured: false,
    createdAt: 1757980800000n,
  }),
];
