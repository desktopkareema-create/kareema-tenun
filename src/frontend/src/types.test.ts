import { FALLBACK_PRODUCT_IMAGE, primaryImage } from "@/types";
import { describe, expect, it } from "vitest";

import { makeProduct } from "@/test/fixtures";

describe("primaryImage", () => {
  it("returns the first image when the product has images", () => {
    const product = makeProduct({
      images: [
        "/assets/generated/products/a.jpg",
        "/assets/generated/products/b.jpg",
      ],
    });
    expect(primaryImage(product)).toBe("/assets/generated/products/a.jpg");
  });

  it("falls back to the shared placeholder when the product has no images", () => {
    expect(primaryImage(makeProduct({ images: [] }))).toBe(
      FALLBACK_PRODUCT_IMAGE,
    );
  });
});
