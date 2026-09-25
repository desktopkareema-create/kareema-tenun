import { ProductInfo } from "@/components/product/ProductInfo";
import { buildWhatsAppLink } from "@/lib/contact";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { makeProduct } from "@/test/fixtures";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    children,
    ...rest
  }: {
    to: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));

describe("ProductInfo", () => {
  it("shows the name, category, Rupiah price and description", () => {
    render(
      <ProductInfo
        product={makeProduct({
          name: "Kain Tenun Ampel",
          category: "Kain",
          price: 1850000n,
          description: "Kain tenun Ampel dengan warna hangat.",
        })}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Kain Tenun Ampel" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Kain")).toBeInTheDocument();
    expect(screen.getByText("Rp 1.850.000")).toBeInTheDocument();
    expect(
      screen.getByText("Kain tenun Ampel dengan warna hangat."),
    ).toBeInTheDocument();
  });

  it("lists material, size and motif as specifications", () => {
    render(
      <ProductInfo
        product={makeProduct({
          material: "Katun tenun ATBM",
          size: "250 x 115 cm",
          motif: "Ampel",
        })}
      />,
    );

    expect(screen.getByText("Bahan")).toBeInTheDocument();
    expect(screen.getByText("Katun tenun ATBM")).toBeInTheDocument();
    expect(screen.getByText("Ukuran")).toBeInTheDocument();
    expect(screen.getByText("250 x 115 cm")).toBeInTheDocument();
    expect(screen.getByText("Motif")).toBeInTheDocument();
    expect(screen.getByText("Ampel")).toBeInTheDocument();
  });

  it("omits blank specifications", () => {
    render(
      <ProductInfo
        product={makeProduct({ material: "", size: "", motif: "Ampel" })}
      />,
    );

    expect(screen.queryByText("Bahan")).not.toBeInTheDocument();
    expect(screen.queryByText("Ukuran")).not.toBeInTheDocument();
    expect(screen.getByText("Motif")).toBeInTheDocument();
  });

  it("links the WhatsApp CTA with the product name prefilled", () => {
    render(<ProductInfo product={makeProduct({ name: "Kain Tenun Ampel" })} />);

    expect(
      screen.getByRole("link", { name: /Tanya via WhatsApp/i }),
    ).toHaveAttribute("href", buildWhatsAppLink("Kain Tenun Ampel"));
  });

  it("links back to the collection", () => {
    render(<ProductInfo product={makeProduct()} />);

    expect(
      screen.getByRole("link", { name: "Lihat Koleksi Lain" }),
    ).toHaveAttribute("href", "/koleksi");
  });
});
