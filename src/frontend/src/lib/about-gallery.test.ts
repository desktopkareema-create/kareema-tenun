import { ABOUT_GALLERY_SECTIONS, galleryPhotoSrc } from "@/lib/about-gallery";
import { FALLBACK_PRODUCT_IMAGE } from "@/types";
import { describe, expect, it } from "vitest";

/**
 * Contract for the Tentang Kami gallery data. The page renders whatever this
 * module exports, so the accepted shape — two titled sections, each with at
 * least three captioned photos — is pinned here.
 */
describe("about-gallery data", () => {
  it("exposes exactly the two accepted sections in order", () => {
    expect(ABOUT_GALLERY_SECTIONS.map((section) => section.eyebrow)).toEqual([
      "Lokasi & Workshop",
      "Proses Produksi",
    ]);
  });

  it("gives every section at least three photos with a caption and alt text", () => {
    for (const section of ABOUT_GALLERY_SECTIONS) {
      expect(section.photos.length).toBeGreaterThanOrEqual(3);
      for (const photo of section.photos) {
        expect(photo.src.trim().length).toBeGreaterThan(0);
        expect(photo.alt.trim().length).toBeGreaterThan(0);
        expect(photo.caption.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("resolves a photo source and falls back when it is empty", () => {
    expect(
      galleryPhotoSrc({ src: "/assets/x.jpg", alt: "a", caption: "c" }),
    ).toBe("/assets/x.jpg");
    expect(galleryPhotoSrc({ src: "   ", alt: "a", caption: "c" })).toBe(
      FALLBACK_PRODUCT_IMAGE,
    );
  });
});
