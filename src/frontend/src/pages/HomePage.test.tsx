import { createActorMock } from "@/test/actor";
import { SAMPLE_PRODUCTS } from "@/test/fixtures";
import { renderApp, screen, waitFor } from "@/test/render-app";
import { within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const actorHandle = { current: createActorMock() };

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: actorHandle.current.actor, isFetching: false }),
}));

describe("navigation and home journey", () => {
  beforeEach(() => {
    actorHandle.current = createActorMock({
      products: SAMPLE_PRODUCTS,
      featured: SAMPLE_PRODUCTS.filter((product) => product.featured),
    });
  });

  it("renders the home page with the KAREEMA logo in the header and footer", async () => {
    await renderApp("/");

    // The header logo link is labelled; the footer logo is the stacked lockup
    // whose image carries the accessible name "KAREEMA".
    expect(
      screen.getByRole("link", { name: "KAREEMA — Beranda" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("img", { name: "KAREEMA" }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", { name: "KAREEMA", level: 1 }),
    ).toBeInTheDocument();
  });

  it("exposes the four primary navigation links in the header", async () => {
    await renderApp("/");

    const nav = screen.getByRole("navigation", { name: "Navigasi utama" });
    for (const label of ["Beranda", "Koleksi", "Tentang Kami", "Kontak"]) {
      expect(
        within(nav).getByRole("link", { name: label }),
      ).toBeInTheDocument();
    }
  });

  it("navigates to the collection when the header Koleksi link is used", async () => {
    const user = userEvent.setup();
    const { currentUrl } = await renderApp("/");

    const nav = screen.getByRole("navigation", { name: "Navigasi utama" });
    await user.click(within(nav).getByRole("link", { name: "Koleksi" }));

    await waitFor(() => {
      expect(currentUrl()).toBe("/koleksi");
    });
    expect(
      screen.getByRole("heading", { name: "Katalog Tenun KAREEMA" }),
    ).toBeInTheDocument();
  });

  it("navigates to Tentang Kami and Kontak from the header", async () => {
    const user = userEvent.setup();
    const { currentUrl } = await renderApp("/");

    const nav = screen.getByRole("navigation", { name: "Navigasi utama" });
    await user.click(within(nav).getByRole("link", { name: "Tentang Kami" }));
    await waitFor(() => {
      expect(currentUrl()).toBe("/tentang");
    });
    expect(
      screen.getByRole("heading", { name: "Tenun yang Ditenun dengan Waktu" }),
    ).toBeInTheDocument();

    await user.click(
      within(
        screen.getByRole("navigation", { name: "Navigasi utama" }),
      ).getByRole("link", { name: "Kontak" }),
    );
    await waitFor(() => {
      expect(currentUrl()).toBe("/kontak");
    });
    expect(
      screen.getByRole("heading", { name: "Mari Berbincang" }),
    ).toBeInTheDocument();
  });

  it("opens the mobile navigation sheet with the same destinations", async () => {
    const user = userEvent.setup();
    await renderApp("/");

    await user.click(
      screen.getByRole("button", { name: "Buka menu navigasi" }),
    );

    const mobileNav = await screen.findByRole("navigation", {
      name: "Navigasi seluler",
    });
    for (const label of ["Beranda", "Koleksi", "Tentang Kami", "Kontak"]) {
      expect(
        within(mobileNav).getByRole("link", { name: label }),
      ).toBeInTheDocument();
    }
  });

  it("shows the featured collection and the contact call to action on the home page", async () => {
    await renderApp("/");

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Koleksi Unggulan" }),
      ).toBeInTheDocument();
    });
    expect(
      screen.getByRole("heading", { name: "Kenapa KAREEMA" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Tentang KAREEMA" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Wujudkan Kain Tenun Pilihan Anda",
      }),
    ).toBeInTheDocument();
  });
});
