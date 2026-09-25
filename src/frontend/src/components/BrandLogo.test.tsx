import { createActorMock } from "@/test/actor";
import { SAMPLE_PRODUCTS } from "@/test/fixtures";
import { renderApp, screen } from "@/test/render-app";
import { within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const actorHandle = { current: createActorMock() };

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: actorHandle.current.actor, isFetching: false }),
}));

/**
 * Characterization baseline for the KAREEMA brand contract.
 *
 * The logo artwork and `Logo.tsx`'s dark-tone treatment are intentionally being
 * reworked (a transparent PNG replaces the black-on-white JPEG, and the
 * invert/white-chip handling changes). This suite therefore asserts only the
 * observable brand contract that must survive that change:
 *
 *   - the header logo link is named "KAREEMA — Beranda" and points at "/";
 *   - a logo image with the accessible name "KAREEMA" is present in the header;
 *   - a logo image with the accessible name "KAREEMA" is present in the footer;
 *   - the home page h1 heading is "KAREEMA".
 *
 * It deliberately does NOT assert the asset file path, the `img` `src` string,
 * or any invert/white-chip styling, so the planned rework is free to change
 * those without tripping this baseline.
 */
describe("KAREEMA brand logo contract", () => {
  beforeEach(() => {
    actorHandle.current = createActorMock({
      products: SAMPLE_PRODUCTS,
      featured: SAMPLE_PRODUCTS.filter((product) => product.featured),
    });
  });

  it("names the header logo link 'KAREEMA — Beranda' and points it at the home page", async () => {
    const { currentUrl } = await renderApp("/koleksi");

    const header = screen.getByRole("banner");
    const logoLink = within(header).getByRole("link", {
      name: "KAREEMA — Beranda",
    });

    expect(logoLink).toHaveAttribute("href", "/");

    // The link is a real navigation affordance, not just a label: activating it
    // returns the user to the home page from a deeper route.
    logoLink.click();
    await screen.findByRole("heading", { name: "KAREEMA", level: 1 });
    expect(currentUrl()).toBe("/");
  });

  it("shows the KAREEMA logo image inside the labelled header link", async () => {
    await renderApp("/");

    const header = screen.getByRole("banner");
    const logoLink = within(header).getByRole("link", {
      name: "KAREEMA — Beranda",
    });

    // The header uses the horizontal lockup, whose emblem image is decorative
    // (`alt=""` / `aria-hidden`) and takes its accessible name from the link's
    // `aria-label`. Assert the image is present inside that link without
    // pinning its `src`, which the planned asset swap will change.
    const logoImage = logoLink.querySelector("img");
    expect(logoImage).not.toBeNull();
    expect(logoImage).toHaveAttribute("src");
  });

  it("shows a logo image named 'KAREEMA' in the footer", async () => {
    await renderApp("/");

    const footer = screen.getByRole("contentinfo");
    expect(
      within(footer).getByRole("img", { name: "KAREEMA" }),
    ).toBeInTheDocument();
  });

  it("renders the home page h1 heading as 'KAREEMA'", async () => {
    await renderApp("/");

    expect(
      screen.getByRole("heading", { name: "KAREEMA", level: 1 }),
    ).toBeInTheDocument();
  });
});
