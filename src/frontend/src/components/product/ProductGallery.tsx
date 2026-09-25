import { cn } from "@/lib/utils";
import { FALLBACK_PRODUCT_IMAGE } from "@/types";
import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

/**
 * Editorial product gallery: one large plate plus a hairline thumbnail strip.
 * Falls back to the shared placeholder when the product has no images.
 */
export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const gallery = images.length > 0 ? images : [FALLBACK_PRODUCT_IMAGE];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = gallery[activeIndex] ?? gallery[0];

  return (
    <div data-ocid="product.gallery" className="flex flex-col gap-4">
      <div className="border-border bg-card relative aspect-[4/5] w-full overflow-hidden border">
        <img
          src={activeImage}
          alt={`${productName} — tampilan ${activeIndex + 1}`}
          onError={(event) => {
            if (event.currentTarget.src.endsWith(FALLBACK_PRODUCT_IMAGE))
              return;
            event.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
          }}
          className="h-full w-full object-cover"
          loading="eager"
        />
        <span className="bg-background/85 text-muted-foreground absolute right-3 bottom-3 border border-border px-2.5 py-1 font-mono text-[0.65rem] tracking-[0.2em]">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(gallery.length).padStart(2, "0")}
        </span>
      </div>

      {gallery.length > 1 ? (
        <ul
          data-ocid="product.gallery.thumbnails"
          className="grid grid-cols-4 gap-3 sm:grid-cols-5"
        >
          {gallery.map((image, index) => {
            const isActive = index === activeIndex;
            return (
              <li key={image}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Tampilkan gambar ${index + 1} dari ${productName}`}
                  aria-current={isActive}
                  data-ocid={`product.gallery.thumbnail.${index + 1}`}
                  className={cn(
                    "border-border bg-card relative block aspect-square w-full overflow-hidden border transition-smooth",
                    "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                    isActive
                      ? "border-accent ring-1 ring-accent"
                      : "hover:border-foreground/40 opacity-70 hover:opacity-100",
                  )}
                >
                  <img
                    src={image}
                    alt=""
                    aria-hidden="true"
                    onError={(event) => {
                      if (
                        event.currentTarget.src.endsWith(FALLBACK_PRODUCT_IMAGE)
                      )
                        return;
                      event.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
                    }}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
