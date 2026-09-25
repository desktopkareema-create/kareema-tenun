import type { GalleryPhoto } from "@/lib/about-gallery";
import { galleryPhotoSrc } from "@/lib/about-gallery";
import { FALLBACK_PRODUCT_IMAGE } from "@/types";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface GalleryLightboxProps {
  photo: GalleryPhoto;
  /** Position of the photo within the whole gallery, for the plate counter. */
  index: number;
  total: number;
  onClose: () => void;
}

/**
 * Full-screen lightbox for a single gallery photo. Closes on the close button,
 * the Escape key, or a click outside the image.
 */
export function GalleryLightbox({
  photo,
  index,
  total,
  onClose,
}: GalleryLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      data-ocid="about.gallery.lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
    >
      {/* Backdrop: a real button so outside-click is keyboard reachable too. */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup tampilan foto"
        data-ocid="about.gallery.backdrop_button"
        className="bg-foreground/90 absolute inset-0 cursor-default"
      />

      <dialog
        open
        aria-label={photo.caption}
        className="relative m-0 flex max-h-full w-full max-w-4xl flex-col border-0 bg-transparent p-0"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Tutup tampilan foto"
          data-ocid="about.gallery.close_button"
          className="border-primary-foreground/25 text-primary-foreground hover:border-accent hover:text-accent focus-visible:ring-accent absolute -top-1 right-0 z-10 inline-flex size-11 translate-y-[-100%] items-center justify-center border transition-smooth focus-visible:ring-2 focus-visible:outline-none"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        <figure className="border-primary-foreground/20 bg-card flex max-h-full flex-col border">
          <img
            src={galleryPhotoSrc(photo)}
            alt={photo.alt}
            onError={(event) => {
              if (event.currentTarget.src.endsWith(FALLBACK_PRODUCT_IMAGE))
                return;
              event.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
            }}
            className="max-h-[70vh] w-full object-contain"
            loading="eager"
            decoding="async"
          />
          <figcaption className="border-border flex flex-col gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="text-foreground text-sm leading-relaxed">
              {photo.caption}
            </p>
            <span className="text-muted-foreground shrink-0 font-mono text-[0.65rem] tracking-[0.2em]">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
          </figcaption>
        </figure>
      </dialog>
    </div>
  );
}
