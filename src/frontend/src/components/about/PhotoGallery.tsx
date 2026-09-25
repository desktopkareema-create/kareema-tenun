import { GalleryLightbox } from "@/components/about/GalleryLightbox";
import {
  ABOUT_GALLERY_SECTIONS,
  type GalleryPhoto,
  galleryPhotoSrc,
} from "@/lib/about-gallery";
import { FALLBACK_PRODUCT_IMAGE } from "@/types";
import { Maximize2 } from "lucide-react";
import { useState } from "react";

/** Flat photo list with its position in the whole gallery, for the lightbox. */
const ALL_PHOTOS: GalleryPhoto[] = ABOUT_GALLERY_SECTIONS.flatMap(
  (section) => section.photos,
);

/**
 * PhotoGallery — captioned workshop and production photography for the Tentang
 * Kami page, split into "Lokasi & Workshop" and "Proses Produksi" grids. Each
 * photo opens a lightbox with the same caption.
 */
export function PhotoGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePhoto = activeIndex === null ? null : ALL_PHOTOS[activeIndex];

  return (
    <section
      data-ocid="about.gallery_section"
      className="bg-secondary border-border border-b"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-accent font-mono text-[0.7rem] tracking-[0.32em] uppercase">
            Galeri Foto
          </p>
          <h2 className="text-balance mt-6 text-3xl leading-[1.15] sm:text-4xl">
            Melihat Lebih Dekat
          </h2>
          <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
            Sekilas suasana workshop dan tahapan produksi kami — dari ruang
            tenun di Troso hingga lembar kain yang siap dikirim. Klik foto untuk
            melihatnya lebih besar.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-16 lg:gap-20">
          {ABOUT_GALLERY_SECTIONS.map((section) => (
            <div
              key={section.id}
              data-ocid={`about.gallery.${section.id}_section`}
            >
              <div className="border-border flex flex-col gap-3 border-b pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                <div>
                  <p className="text-accent font-mono text-[0.68rem] tracking-[0.28em] uppercase">
                    {section.eyebrow}
                  </p>
                  <h3 className="mt-3 text-xl tracking-[0.16em] sm:text-2xl">
                    {section.title}
                  </h3>
                </div>
                <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
                  {section.description}
                </p>
              </div>

              <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {section.photos.map((photo) => {
                  const index = ALL_PHOTOS.indexOf(photo);
                  return (
                    <li key={photo.src}>
                      <button
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Perbesar foto: ${photo.caption}`}
                        data-ocid={`about.gallery.photo.${index + 1}`}
                        className="group border-border bg-card focus-visible:ring-ring block w-full border text-left transition-smooth hover:border-accent/50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                      >
                        <span className="relative block aspect-[4/3] w-full overflow-hidden">
                          <img
                            src={galleryPhotoSrc(photo)}
                            alt={photo.alt}
                            onError={(event) => {
                              if (
                                event.currentTarget.src.endsWith(
                                  FALLBACK_PRODUCT_IMAGE,
                                )
                              )
                                return;
                              event.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
                            }}
                            className="h-full w-full object-cover transition-smooth group-hover:scale-[1.03]"
                            loading="lazy"
                            decoding="async"
                          />
                          <span
                            aria-hidden="true"
                            className="bg-foreground/70 text-primary-foreground absolute top-3 right-3 inline-flex size-8 items-center justify-center opacity-0 transition-smooth group-hover:opacity-100 group-focus-visible:opacity-100"
                          >
                            <Maximize2 className="size-4" />
                          </span>
                        </span>
                        <span className="border-border block border-t px-5 py-4">
                          <span className="text-foreground block text-sm leading-relaxed">
                            {photo.caption}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {activePhoto ? (
        <GalleryLightbox
          photo={activePhoto}
          index={activeIndex ?? 0}
          total={ALL_PHOTOS.length}
          onClose={() => setActiveIndex(null)}
        />
      ) : null}
    </section>
  );
}
