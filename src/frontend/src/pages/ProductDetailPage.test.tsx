import { buildWhatsAppLink } from "@/lib/contact";
import { createActorMock } from "@/test/actor";
import { SAMPLE_PRODUCTS, makeProduct } from "@/test/fixtures";
import { renderApp, screen, waitFor } from "@/test/render-app";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const actorHandle = { current: createActorMock() };

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: actorHandle.current.actor, isFetching: false }),
}));

const DETAIL_PRODUCT = makeProduct({
  id: 1n,
  name: "Sarung Tenun Kedawung",
  slug: "sarung-tenun-kedawung",
  category: "Sarung",
  price: 1425000n,
  description: "Sarung tenun tangan khas Jepara dengan motif Kedawung.",
  material: "Katun tenun ATBM",
  size: "200 x 110 cm",
  motif: "Kedawung",
  images: [
    "/assets/generated/products/sarung-kedawung-1.jpg",
    "/assets/generated/products/sarung-kedawung-2.jpg",
  ],
});

describe("ProductDetailPage journey", () => {
  beforeEach(() => {
    actorHandle.current = createActorMock({
      products: SAMPLE_PRODUCTS,
      productBySlug: DETAIL_PRODUCT,
    });
  });

  it("opens the detail page with gallery, description and specifications", async () => {
    await renderApp("/produk/sarung-tenun-kedawung");

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Sarung Tenun Kedawung" }),
      ).toBeInTheDocument();
    });
    expect(
      screen.getByRole("img", { name: "Sarung Tenun Kedawung — tampilan 1" }),
    ).toHaveAttribute("src", DETAIL_PRODUCT.images[0]);
    expect(
      screen.getByText(
        "Sarung tenun tangan khas Jepara dengan motif Kedawung.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Katun tenun ATBM")).toBeInTheDocument();
    expect(screen.getByText("200 x 110 cm")).toBeInTheDocument();
    expect(screen.getByText("Rp 1.425.000")).toBeInTheDocument();
  });

  it("switches the gallery image when a thumbnail is chosen", async () => {
    const user = userEvent.setup();
    await renderApp("/produk/sarung-tenun-kedawung");

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Sarung Tenun Kedawung" }),
      ).toBeInTheDocument();
    });

    await user.click(
      screen.getByRole("button", {
        name: "Tampilkan gambar 2 dari Sarung Tenun Kedawung",
      }),
    );

    expect(
      screen.getByRole("img", { name: "Sarung Tenun Kedawung — tampilan 2" }),
    ).toHaveAttribute("src", DETAIL_PRODUCT.images[1]);
  });

  it("links the WhatsApp CTA with the viewed product name prefilled", async () => {
    await renderApp("/produk/sarung-tenun-kedawung");

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Sarung Tenun Kedawung" }),
      ).toBeInTheDocument();
    });

    const whatsapp = screen.getByRole("link", { name: /Tanya via WhatsApp/i });
    expect(whatsapp).toHaveAttribute(
      "href",
      buildWhatsAppLink("Sarung Tenun Kedawung"),
    );
    expect(decodeURIComponent(whatsapp.getAttribute("href") ?? "")).toContain(
      "Sarung Tenun Kedawung",
    );
  });

  it("shows related products from the same category", async () => {
    await renderApp("/produk/sarung-tenun-kedawung");

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Produk Lainnya" }),
      ).toBeInTheDocument();
    });
    // The current product is excluded from its own related list.
    expect(
      screen.queryByRole("heading", { name: "Sarung Tenun Kedawung" }),
    ).toBeInTheDocument();
    expect(actorHandle.current.listProductsCalls.at(-1)?.category).toBe(
      "Sarung",
    );
  });

  it("shows a not-found state for an unknown slug", async () => {
    actorHandle.current = createActorMock({
      products: SAMPLE_PRODUCTS,
      productBySlug: null,
    });

    await renderApp("/produk/tidak-ada");

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Produk Tidak Tersedia" }),
      ).toBeInTheDocument();
    });
    expect(
      screen.getByRole("link", { name: "Kembali ke Koleksi" }),
    ).toHaveAttribute("href", "/koleksi");
  });
});
