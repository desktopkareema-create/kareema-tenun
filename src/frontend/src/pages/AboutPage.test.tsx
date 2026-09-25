import { CONTACT, MAILTO_LINK, buildWhatsAppLink } from "@/lib/contact";
import { createActorMock } from "@/test/actor";
import { renderApp, screen, waitFor } from "@/test/render-app";
import { within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const actorHandle = { current: createActorMock() };

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: actorHandle.current.actor, isFetching: false }),
}));

/**
 * Characterization baseline for the Tentang Kami page. The accepted request
 * inserts a photo gallery between the weaving process and the company values,
 * so these tests pin the sections that must survive that change — the hero,
 * the story, the three-stage process, the values, and the closing CTA — plus
 * the header/footer/contact links that must keep working.
 */
describe("AboutPage journey", () => {
  beforeEach(() => {
    actorHandle.current = createActorMock();
  });

  it("renders the hero heading and intro without a blank screen", async () => {
    await renderApp("/tentang");

    expect(
      screen.getByRole("heading", {
        name: "Tenun yang Ditenun dengan Waktu",
        level: 1,
      }),
    ).toBeInTheDocument();

    // "Tentang Kami" also labels the header and footer nav links, so scope the
    // eyebrow assertion to the hero band.
    const hero = document.querySelector(
      '[data-ocid="about.hero_section"]',
    ) as HTMLElement;
    expect(hero).not.toBeNull();
    expect(within(hero).getByText("Tentang Kami")).toBeInTheDocument();
    expect(
      within(hero).getByText(/KAREEMA menjaga warisan tenun Troso, Jepara/i),
    ).toBeInTheDocument();
  });

  it("keeps the hero photograph and its caption in the hero band", async () => {
    await renderApp("/tentang");

    const hero = document.querySelector(
      '[data-ocid="about.hero_section"]',
    ) as HTMLElement;
    expect(hero).not.toBeNull();

    // The hero figure is the page's lead image; a profile video must not
    // displace it or its caption.
    const heroImage = within(hero).getByRole("img", {
      name: /Pengrajin menenun kain di atas alat tenun bukan mesin/i,
    });
    expect(heroImage).toHaveAttribute(
      "src",
      "/assets/generated/about-weaving-hero.dim_1600x1000.jpg",
    );
    expect(within(hero).getByText("ATBM — Troso, Jepara")).toBeInTheDocument();
  });

  it("keeps the company story, three-stage process, values, and closing CTA", async () => {
    await renderApp("/tentang");

    // Company story
    expect(
      screen.getByRole("heading", { name: "Warisan Tenun dari Troso, Jepara" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Cerita Kami")).toBeInTheDocument();

    // The story's milestone timeline is part of the accepted story section.
    const story = document.querySelector(
      '[data-ocid="about.story_section"]',
    ) as HTMLElement;
    expect(story).not.toBeNull();
    for (const milestone of [
      "Akar di Troso",
      "KAREEMA Lahir",
      "Kriya yang Bertumbuh",
    ]) {
      expect(
        within(story).getByRole("heading", { name: milestone }),
      ).toBeInTheDocument();
    }

    // Three-stage weaving process
    expect(
      screen.getByRole("heading", { name: "Tiga Tahap Menuju Selembar Kain" }),
    ).toBeInTheDocument();
    for (const step of ["Penenunan Tangan", "Pewarnaan", "Finishing"]) {
      expect(screen.getByRole("heading", { name: step })).toBeInTheDocument();
    }

    // Company values
    expect(
      screen.getByRole("heading", { name: "Yang Kami Pegang Teguh" }),
    ).toBeInTheDocument();
    for (const value of [
      "Kualitas Premium",
      "Pelestarian Warisan Budaya",
      "Pemberdayaan Pengrajin Lokal",
    ]) {
      expect(screen.getByRole("heading", { name: value })).toBeInTheDocument();
    }

    // Closing CTA
    expect(
      screen.getByRole("heading", {
        name: "Jelajahi Koleksi, atau Bicara Langsung dengan Kami",
      }),
    ).toBeInTheDocument();
  });

  it("keeps the story, process, video, gallery, values, and CTA in their original order", async () => {
    await renderApp("/tentang");

    const order = [
      "about.story_section",
      "about.process_section",
      "about.video_section",
      "about.gallery_section",
      "about.values_section",
      "about.cta_section",
    ].map((ocid) => {
      const element = document.querySelector(`[data-ocid="${ocid}"]`);
      expect(element, `missing section ${ocid}`).not.toBeNull();
      return element as HTMLElement;
    });

    for (let i = 1; i < order.length; i += 1) {
      // DOCUMENT_POSITION_FOLLOWING (4) means `order[i]` comes after `order[i-1]`.
      expect(
        order[i - 1].compareDocumentPosition(order[i]) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }
  });

  it("shows the photo gallery between the process and the values", async () => {
    await renderApp("/tentang");

    const gallery = document.querySelector(
      '[data-ocid="about.gallery_section"]',
    ) as HTMLElement;
    expect(gallery).not.toBeNull();

    const process = document.querySelector(
      '[data-ocid="about.process_section"]',
    ) as HTMLElement;
    const values = document.querySelector(
      '[data-ocid="about.values_section"]',
    ) as HTMLElement;

    // Gallery comes after the process and before the values.
    expect(
      process.compareDocumentPosition(gallery) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      gallery.compareDocumentPosition(values) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    // Both accepted section headings are visible on the page.
    expect(within(gallery).getByText("Lokasi & Workshop")).toBeInTheDocument();
    expect(within(gallery).getByText("Proses Produksi")).toBeInTheDocument();

    // The gallery's own heading and intro copy stay with the gallery.
    expect(
      within(gallery).getByRole("heading", { name: "Melihat Lebih Dekat" }),
    ).toBeInTheDocument();
    expect(within(gallery).getByText("Galeri Foto")).toBeInTheDocument();
  });

  it("shows the profile video between the process and the gallery", async () => {
    await renderApp("/tentang");

    const video = document.querySelector(
      '[data-ocid="about.video_section"]',
    ) as HTMLElement;
    expect(video).not.toBeNull();

    const process = document.querySelector(
      '[data-ocid="about.process_section"]',
    ) as HTMLElement;
    const gallery = document.querySelector(
      '[data-ocid="about.gallery_section"]',
    ) as HTMLElement;

    // The video comes after the process and before the gallery.
    expect(
      process.compareDocumentPosition(video) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      video.compareDocumentPosition(gallery) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    // The accepted Indonesian eyebrow and heading are visible on the page.
    expect(within(video).getByText("Video Profil")).toBeInTheDocument();
    expect(
      within(video).getByRole("heading", { name: "Menenun di Troso, Jepara" }),
    ).toBeInTheDocument();

    // The autoplaying embed is present in the available column.
    const frame = within(video).getByTitle(
      /Video profil KAREEMA/i,
    ) as HTMLIFrameElement;
    const url = new URL(frame.getAttribute("src") ?? "");
    expect(url.pathname).toBe("/embed/g2HqSMtXf9I");
    expect(url.searchParams.get("autoplay")).toBe("1");
  });

  it("opens a gallery lightbox from the Tentang Kami page and closes it", async () => {
    const user = userEvent.setup();
    await renderApp("/tentang");

    const gallery = document.querySelector(
      '[data-ocid="about.gallery_section"]',
    ) as HTMLElement;
    const firstPhoto = within(gallery).getAllByRole("button", {
      name: /Perbesar foto:/,
    })[0];
    await user.click(firstPhoto);

    const lightbox = document.querySelector(
      '[data-ocid="about.gallery.lightbox"]',
    ) as HTMLElement;
    expect(lightbox).not.toBeNull();

    // The backdrop shares the "Tutup tampilan foto" accessible name, so target
    // the close button by its own ocid.
    await user.click(
      lightbox.querySelector(
        '[data-ocid="about.gallery.close_button"]',
      ) as HTMLElement,
    );
    expect(
      document.querySelector('[data-ocid="about.gallery.lightbox"]'),
    ).toBeNull();
  });

  it("navigates to the collection from the closing CTA", async () => {
    const user = userEvent.setup();
    const { currentUrl } = await renderApp("/tentang");

    await user.click(screen.getByRole("link", { name: /Lihat Koleksi/i }));
    await waitFor(() => {
      expect(currentUrl()).toBe("/koleksi");
    });
    expect(
      screen.getByRole("heading", { name: "Katalog Tenun KAREEMA" }),
    ).toBeInTheDocument();
  });

  it("navigates to the contact page from the closing CTA", async () => {
    const user = userEvent.setup();
    const { currentUrl } = await renderApp("/tentang");

    await user.click(screen.getByRole("link", { name: /Hubungi Kami/i }));
    await waitFor(() => {
      expect(currentUrl()).toBe("/kontak");
    });
    expect(
      screen.getByRole("heading", { name: "Mari Berbincang" }),
    ).toBeInTheDocument();
  });

  it("keeps the header navigation and footer links working on Tentang Kami", async () => {
    const user = userEvent.setup();
    const { currentUrl } = await renderApp("/tentang");

    const headerNav = screen.getByRole("navigation", {
      name: "Navigasi utama",
    });
    for (const label of ["Beranda", "Koleksi", "Tentang Kami", "Kontak"]) {
      expect(
        within(headerNav).getByRole("link", { name: label }),
      ).toBeInTheDocument();
    }

    const footerNav = screen.getByRole("navigation", {
      name: "Navigasi footer",
    });
    for (const label of ["Beranda", "Koleksi", "Tentang Kami", "Kontak"]) {
      expect(
        within(footerNav).getByRole("link", { name: label }),
      ).toBeInTheDocument();
    }

    await user.click(within(headerNav).getByRole("link", { name: "Beranda" }));
    await waitFor(() => {
      expect(currentUrl()).toBe("/");
    });
  });

  it("keeps the WhatsApp and email links in the closing CTA pointing at the real contact details", async () => {
    await renderApp("/tentang");

    // The footer repeats both links, so scope to the About CTA section.
    const cta = document.querySelector(
      '[data-ocid="about.cta_section"]',
    ) as HTMLElement;
    expect(cta).not.toBeNull();

    const whatsapp = within(cta).getByRole("link", {
      name: CONTACT.whatsappDisplay,
    });
    expect(whatsapp).toHaveAttribute("href", buildWhatsAppLink());
    expect(whatsapp).toHaveAttribute("target", "_blank");

    const email = within(cta).getByRole("link", { name: CONTACT.email });
    expect(email).toHaveAttribute("href", MAILTO_LINK);
  });
});
