import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { createActorMock } from "@/test/actor";
import { SAMPLE_PRODUCTS } from "@/test/fixtures";
import { renderApp, screen } from "@/test/render-app";
import { within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const actorHandle = { current: createActorMock() };

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: actorHandle.current.actor, isFetching: false }),
}));

const FRONTEND_ROOT = resolve(__dirname, "..", "..");
const PUBLIC_DIR = join(FRONTEND_ROOT, "public");
const SRC_DIR = join(FRONTEND_ROOT, "src");

/** The new transparent PNG artwork the brand rework introduced. */
const NEW_LOGO_ASSETS = [
  "assets/images/kareema-logo.png",
  "assets/images/kareema-logo-light.png",
  "assets/images/kareema-mark.png",
  "assets/images/kareema-mark-light.png",
] as const;

/**
 * Reads a PNG's IHDR colour type straight from the file header.
 *
 * PNG colour types 4 (greyscale + alpha) and 6 (truecolour + alpha) carry an
 * alpha channel; 0 and 2 do not. Type 3 (palette) can still be transparent via
 * a tRNS chunk, so it is reported separately rather than treated as opaque.
 * Parsing the header avoids depending on an image library in the test lane.
 */
function pngColorType(filePath: string): number {
  const bytes = readFileSync(filePath);
  const signature = [137, 80, 78, 71, 13, 10, 26, 10];
  for (let i = 0; i < signature.length; i++) {
    if (bytes[i] !== signature[i]) {
      throw new Error(`${filePath} is not a PNG file`);
    }
  }
  // IHDR is the first chunk: 4-byte length, 4-byte type, then 13 bytes of data.
  // Colour type is the 10th byte of the IHDR data (offset 8 + 8 + 9).
  return bytes[8 + 8 + 9];
}

function walkFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walkFiles(full));
    } else {
      out.push(full);
    }
  }
  return out;
}

describe("KAREEMA logo rework", () => {
  beforeEach(() => {
    actorHandle.current = createActorMock({
      products: SAMPLE_PRODUCTS,
      featured: SAMPLE_PRODUCTS.filter((product) => product.featured),
    });
  });

  it("shows the new logo in the header link named 'KAREEMA — Beranda'", async () => {
    await renderApp("/");

    const header = screen.getByRole("banner");
    const logoLink = within(header).getByRole("link", {
      name: "KAREEMA — Beranda",
    });
    expect(logoLink).toHaveAttribute("href", "/");

    const logoImage = logoLink.querySelector("img");
    expect(logoImage).not.toBeNull();
    // The header uses the horizontal lockup, which pairs the new mark with the
    // wordmark; the mark must be one of the new transparent PNG assets.
    expect(logoImage?.getAttribute("src")).toMatch(
      /^\/assets\/images\/kareema-mark(-light)?\.png$/,
    );
  });

  it("shows the new logo with accessible name 'KAREEMA' in the footer", async () => {
    await renderApp("/");

    const footer = screen.getByRole("contentinfo");
    const footerLogo = within(footer).getByRole("img", { name: "KAREEMA" });
    // The footer uses the dark tone, so it must reference the light lockup.
    expect(footerLogo.getAttribute("src")).toBe(
      "/assets/images/kareema-logo-light.png",
    );
  });

  it("renders the new logo in the mobile menu header", async () => {
    const user = (await import("@testing-library/user-event")).default.setup();
    await renderApp("/");

    await user.click(
      screen.getByRole("button", { name: "Buka menu navigasi" }),
    );

    const mobileNav = await screen.findByRole("navigation", {
      name: "Navigasi seluler",
    });
    // The sheet header sits alongside the mobile nav; the logo mark is the
    // decorative image inside it.
    const sheet = mobileNav.closest("[role='dialog']") ?? document.body;
    const mark = sheet.querySelector(
      "img[src='/assets/images/kareema-mark.png']",
    );
    expect(mark).not.toBeNull();
  });

  it("references only the new PNG logo assets and never the old JPEG", () => {
    // Test files are excluded: this assertion itself names the old asset, and
    // the requirement is about production source references.
    const sourceFiles = walkFiles(SRC_DIR).filter(
      (file) =>
        /\.(tsx?|jsx?|html)$/.test(file) && !/\.(test|spec)\./.test(file),
    );
    sourceFiles.push(join(FRONTEND_ROOT, "index.html"));

    const offenders: string[] = [];
    for (const file of sourceFiles) {
      const contents = readFileSync(file, "utf8");
      if (contents.includes("kareema-logo.jpg")) {
        offenders.push(file);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("ships the new logo assets as PNGs with an alpha channel", () => {
    for (const asset of NEW_LOGO_ASSETS) {
      const filePath = join(PUBLIC_DIR, asset);
      const colorType = pngColorType(filePath);
      // 4 = greyscale+alpha, 6 = truecolour+alpha. A palette PNG (3) is only
      // transparent with a tRNS chunk, which this artwork does not use.
      expect(
        colorType === 4 || colorType === 6,
        `${asset} has PNG colour type ${colorType}, expected an alpha type (4 or 6)`,
      ).toBe(true);
    }
  });

  it("derives the favicon from the new logo mark", () => {
    const html = readFileSync(join(FRONTEND_ROOT, "index.html"), "utf8");
    expect(html).toContain('href="/favicon.png"');
    expect(html).toContain('href="/favicon.ico"');

    // The PNG favicon must itself be transparent so the tab matches the brand
    // on any browser chrome.
    const faviconColorType = pngColorType(join(PUBLIC_DIR, "favicon.png"));
    expect(faviconColorType === 4 || faviconColorType === 6).toBe(true);
  });
});
