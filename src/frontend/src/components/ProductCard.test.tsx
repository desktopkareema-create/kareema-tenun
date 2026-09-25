import { ProductCard } from "@/components/ProductCard";
import { buildWhatsAppLink } from "@/lib/contact";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { makeProduct } from "@/test/fixtures";

// `ProductCard` renders TanStack Router `<Link>`s. The card's own contract is
// the href it produces and the content it shows, so the router is stubbed to a
// plain anchor rather than booting a router for a leaf component.
vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    params,
    children,
    ...rest
  }: {
    to: string;
    params?: Record<string, string>;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => {
    const href = params
      ? Object.entries(params).reduce(
          (path, [key, value]) => path.replace(`$${key}`, value),
          to,
        )
      : to;
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  },
}));

describe("ProductCard", () => {
  it("shows the product name, category, motif, material and Rupiah price", () => {
    const product = makeProduct({
      name: "Sarung Tenun Kedawung",
      category: "Sarung",
      motif: "Kedawung",
      material: "Katun tenun ATBM",
      price: 1425000n,
    });

    render(<ProductCard product={product} />);

    expect(
      screen.getByRole("heading", { name: "Sarung Tenun Kedawung" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Sarung")).toBeInTheDocument();
    expect(screen.getByText("Kedawung · Katun tenun ATBM")).toBeInTheDocument();
    expect(screen.getByText("Rp 1.425.000")).toBeInTheDocument();
  });

  it("links to the product detail route by slug", () => {
    const product = makeProduct({
      name: "Kain Tenun Ampel",
      slug: "kain-tenun-ampel",
    });

    render(<ProductCard product={product} />);

    const detailLinks = screen.getAllByRole("link", {
      name: /Lihat detail Kain Tenun Ampel/i,
    });
    expect(detailLinks[0]).toHaveAttribute("href", "/produk/kain-tenun-ampel");
    expect(screen.getByRole("link", { name: "Lihat Detail" })).toHaveAttribute(
      "href",
      "/produk/kain-tenun-ampel",
    );
  });

  it("offers a WhatsApp quick enquiry prefilled with the product name", () => {
    const product = makeProduct({ name: "Kain Tenun Ampel" });

    render(<ProductCard product={product} />);

    const whatsapp = screen.getByRole("link", {
      name: "Tanya Kain Tenun Ampel via WhatsApp",
    });
    expect(whatsapp).toHaveAttribute(
      "href",
      buildWhatsAppLink("Kain Tenun Ampel"),
    );
    expect(whatsapp).toHaveAttribute("target", "_blank");
    expect(whatsapp).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("marks featured products with the Unggulan badge", () => {
    render(<ProductCard product={makeProduct({ featured: true })} />);
    expect(screen.getByText("Unggulan")).toBeInTheDocument();
  });

  it("omits the Unggulan badge for non-featured products", () => {
    render(<ProductCard product={makeProduct({ featured: false })} />);
    expect(screen.queryByText("Unggulan")).not.toBeInTheDocument();
  });

  it("falls back to the placeholder image when the product has no images", () => {
    render(<ProductCard product={makeProduct({ images: [] })} />);
    expect(screen.getByRole("img", { name: /dari KAREEMA/i })).toHaveAttribute(
      "src",
      "/assets/images/placeholder.svg",
    );
  });
});
