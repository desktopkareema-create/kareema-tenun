import { PhotoGallery } from "@/components/about/PhotoGallery";
import { ABOUT_GALLERY_SECTIONS } from "@/lib/about-gallery";
import { FALLBACK_PRODUCT_IMAGE } from "@/types";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

/**
 * Cover for the Tentang Kami photo gallery added between the weaving process
 * and the company values. These tests exercise the real PhotoGallery and
 * GalleryLightbox components: the two titled sections, their captions, the
 * lightbox open/close paths, lazy loading, alt text, and the image-error
 * placeholder fallback.
 */
describe("PhotoGallery", () => {
  it("renders both titled sections with at least three captioned photos each", () => {
    render(<PhotoGallery />);

    for (const section of ABOUT_GALLERY_SECTIONS) {
      const region = document.querySelector(
        `[data-ocid="about.gallery.${section.id}_section"]`,
      ) as HTMLElement;
      expect(region, `missing section ${section.id}`).not.toBeNull();

      // The section eyebrow is the accepted heading text.
      expect(within(region).getByText(section.eyebrow)).toBeInTheDocument();

      const photos = within(region).getAllByRole("button", {
        name: /Perbesar foto:/,
      });
      expect(photos.length).toBeGreaterThanOrEqual(3);

      // Every photo shows its caption in the grid.
      for (const photo of section.photos) {
        expect(within(region).getByText(photo.caption)).toBeInTheDocument();
      }
    }
  });

  it("uses the accepted section titles 'Lokasi & Workshop' and 'Proses Produksi'", () => {
    render(<PhotoGallery />);

    expect(screen.getByText("Lokasi & Workshop")).toBeInTheDocument();
    expect(screen.getByText("Proses Produksi")).toBeInTheDocument();
  });

  it("lazy-loads every grid image and gives each a descriptive alt", () => {
    render(<PhotoGallery />);

    const images = screen.getAllByRole("img");
    expect(images.length).toBe(
      ABOUT_GALLERY_SECTIONS.flatMap((s) => s.photos).length,
    );

    for (const image of images) {
      expect(image).toHaveAttribute("loading", "lazy");
      expect(image.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);
    }
  });

  it("opens a lightbox with the same image and caption when a photo is clicked", async () => {
    const user = userEvent.setup();
    render(<PhotoGallery />);

    const firstPhoto = ABOUT_GALLERY_SECTIONS[0].photos[0];
    await user.click(
      screen.getByRole("button", {
        name: `Perbesar foto: ${firstPhoto.caption}`,
      }),
    );

    const lightbox = document.querySelector(
      '[data-ocid="about.gallery.lightbox"]',
    ) as HTMLElement;
    expect(lightbox).not.toBeNull();

    // Same image source and alt as the grid photo, plus the same caption.
    const lightboxImage = within(lightbox).getByRole("img", {
      name: firstPhoto.alt,
    });
    expect(lightboxImage).toHaveAttribute("src", firstPhoto.src);
    expect(within(lightbox).getByText(firstPhoto.caption)).toBeInTheDocument();
  });

  it("shows the photo's position and the gallery total in the lightbox", async () => {
    const user = userEvent.setup();
    render(<PhotoGallery />);

    const total = ABOUT_GALLERY_SECTIONS.flatMap((s) => s.photos).length;
    // Pick a photo that is not the first so the counter is not trivially 01.
    const photo = ABOUT_GALLERY_SECTIONS[1].photos[0];
    const index = ABOUT_GALLERY_SECTIONS.flatMap((s) => s.photos).indexOf(
      photo,
    );

    await user.click(
      screen.getByRole("button", { name: `Perbesar foto: ${photo.caption}` }),
    );

    const lightbox = document.querySelector(
      '[data-ocid="about.gallery.lightbox"]',
    ) as HTMLElement;
    const expected = `${String(index + 1).padStart(2, "0")} / ${String(
      total,
    ).padStart(2, "0")}`;
    expect(within(lightbox).getByText(expected)).toBeInTheDocument();
  });

  it("closes the lightbox with the close button and restores the page", async () => {
    const user = userEvent.setup();
    render(<PhotoGallery />);

    const photo = ABOUT_GALLERY_SECTIONS[1].photos[0];
    await user.click(
      screen.getByRole("button", { name: `Perbesar foto: ${photo.caption}` }),
    );
    expect(
      document.querySelector('[data-ocid="about.gallery.lightbox"]'),
    ).not.toBeNull();

    // The backdrop shares the "Tutup tampilan foto" accessible name, so target
    // the close button by its own ocid.
    const closeButton = document.querySelector(
      '[data-ocid="about.gallery.close_button"]',
    ) as HTMLElement;
    await user.click(closeButton);

    expect(
      document.querySelector('[data-ocid="about.gallery.lightbox"]'),
    ).toBeNull();
    // The grid is still there after closing.
    expect(
      screen.getByRole("button", { name: `Perbesar foto: ${photo.caption}` }),
    ).toBeInTheDocument();
  });

  it("closes the lightbox on the Escape key", async () => {
    const user = userEvent.setup();
    render(<PhotoGallery />);

    const photo = ABOUT_GALLERY_SECTIONS[0].photos[1];
    await user.click(
      screen.getByRole("button", { name: `Perbesar foto: ${photo.caption}` }),
    );
    expect(
      document.querySelector('[data-ocid="about.gallery.lightbox"]'),
    ).not.toBeNull();

    await user.keyboard("{Escape}");

    expect(
      document.querySelector('[data-ocid="about.gallery.lightbox"]'),
    ).toBeNull();
  });

  it("closes the lightbox when the backdrop outside the image is clicked", async () => {
    const user = userEvent.setup();
    render(<PhotoGallery />);

    const photo = ABOUT_GALLERY_SECTIONS[0].photos[2];
    await user.click(
      screen.getByRole("button", { name: `Perbesar foto: ${photo.caption}` }),
    );

    const backdrop = document.querySelector(
      '[data-ocid="about.gallery.backdrop_button"]',
    ) as HTMLElement;
    expect(backdrop).not.toBeNull();
    await user.click(backdrop);

    expect(
      document.querySelector('[data-ocid="about.gallery.lightbox"]'),
    ).toBeNull();
  });

  it("swaps a broken grid image for the placeholder so the layout stays intact", () => {
    render(<PhotoGallery />);

    const image = screen.getAllByRole("img")[0];
    fireEvent.error(image);

    expect(image).toHaveAttribute("src", FALLBACK_PRODUCT_IMAGE);
  });

  it("swaps a broken lightbox image for the placeholder", async () => {
    const user = userEvent.setup();
    render(<PhotoGallery />);

    const photo = ABOUT_GALLERY_SECTIONS[0].photos[0];
    await user.click(
      screen.getByRole("button", { name: `Perbesar foto: ${photo.caption}` }),
    );

    const lightbox = document.querySelector(
      '[data-ocid="about.gallery.lightbox"]',
    ) as HTMLElement;
    const lightboxImage = within(lightbox).getByRole("img", {
      name: photo.alt,
    });
    fireEvent.error(lightboxImage);

    expect(lightboxImage).toHaveAttribute("src", FALLBACK_PRODUCT_IMAGE);
  });
});
