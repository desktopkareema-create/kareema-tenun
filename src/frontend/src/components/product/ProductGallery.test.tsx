import { ProductGallery } from "@/components/product/ProductGallery";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

const IMAGES = [
  "/assets/generated/products/sarung-1.jpg",
  "/assets/generated/products/sarung-2.jpg",
  "/assets/generated/products/sarung-3.jpg",
];

describe("ProductGallery", () => {
  it("shows the first image and a position counter", () => {
    render(<ProductGallery images={IMAGES} productName="Sarung Kedawung" />);

    expect(
      screen.getByRole("img", { name: "Sarung Kedawung — tampilan 1" }),
    ).toHaveAttribute("src", IMAGES[0]);
    expect(screen.getByText("01 / 03")).toBeInTheDocument();
  });

  it("switches the main image when a thumbnail is chosen", async () => {
    const user = userEvent.setup();
    render(<ProductGallery images={IMAGES} productName="Sarung Kedawung" />);

    await user.click(
      screen.getByRole("button", {
        name: "Tampilkan gambar 2 dari Sarung Kedawung",
      }),
    );

    expect(
      screen.getByRole("img", { name: "Sarung Kedawung — tampilan 2" }),
    ).toHaveAttribute("src", IMAGES[1]);
    expect(screen.getByText("02 / 03")).toBeInTheDocument();
  });

  it("marks the active thumbnail with aria-current", async () => {
    const user = userEvent.setup();
    render(<ProductGallery images={IMAGES} productName="Sarung Kedawung" />);

    const second = screen.getByRole("button", {
      name: "Tampilkan gambar 2 dari Sarung Kedawung",
    });
    expect(second).toHaveAttribute("aria-current", "false");

    await user.click(second);
    expect(second).toHaveAttribute("aria-current", "true");
  });

  it("renders a single placeholder plate and no thumbnails when there are no images", () => {
    render(<ProductGallery images={[]} productName="Sarung Kedawung" />);

    expect(
      screen.getByRole("img", { name: "Sarung Kedawung — tampilan 1" }),
    ).toHaveAttribute("src", "/assets/images/placeholder.svg");
    expect(screen.getByText("01 / 01")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Tampilkan gambar/ }),
    ).not.toBeInTheDocument();
  });
});
