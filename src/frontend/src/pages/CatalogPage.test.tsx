import { createActorMock } from "@/test/actor";
import { SAMPLE_PRODUCTS } from "@/test/fixtures";
import { renderApp, screen, waitFor } from "@/test/render-app";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

// The hooks read the actor from `useActor`; the mock is swapped per test so a
// journey can assert on the filter the UI actually sent.
const actorHandle = { current: createActorMock() };

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: actorHandle.current.actor, isFetching: false }),
}));

describe("CatalogPage journey", () => {
  beforeEach(() => {
    actorHandle.current = createActorMock({
      products: SAMPLE_PRODUCTS,
      categories: ["Kain", "Sarung", "Selendang"],
    });
  });

  it("renders every product with a Rupiah price", async () => {
    await renderApp("/koleksi");

    await waitFor(() => {
      expect(screen.getByText("Sarung Tenun Kedawung")).toBeInTheDocument();
    });
    expect(screen.getByText("Kain Tenun Ampel")).toBeInTheDocument();
    expect(screen.getByText("Selendang Tenun Belik")).toBeInTheDocument();
    expect(screen.getByText("Rp 1.425.000")).toBeInTheDocument();
    expect(screen.getByText("Rp 890.000")).toBeInTheDocument();
  });

  it("filters by category and records the filter in the URL", async () => {
    const user = userEvent.setup();
    const { currentUrl } = await renderApp("/koleksi");

    await waitFor(() => {
      expect(screen.getByText("Sarung Tenun Kedawung")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "Kain" }));

    await waitFor(() => {
      expect(currentUrl()).toContain("kategori=Kain");
    });
    expect(screen.getByText("Kain Tenun Ampel")).toBeInTheDocument();
    expect(screen.queryByText("Sarung Tenun Kedawung")).not.toBeInTheDocument();
    expect(screen.queryByText("Selendang Tenun Belik")).not.toBeInTheDocument();
  });

  it("restores the category filter from the URL on load", async () => {
    await renderApp("/koleksi?kategori=Sarung");

    await waitFor(() => {
      expect(screen.getByText("Sarung Tenun Kedawung")).toBeInTheDocument();
    });
    expect(screen.queryByText("Kain Tenun Ampel")).not.toBeInTheDocument();
    expect(actorHandle.current.listProductsCalls.at(-1)?.category).toBe(
      "Sarung",
    );
  });

  it("searches by name and shows a clear empty state when nothing matches", async () => {
    const user = userEvent.setup();
    const { currentUrl } = await renderApp("/koleksi");

    await waitFor(() => {
      expect(screen.getByText("Sarung Tenun Kedawung")).toBeInTheDocument();
    });

    await user.type(screen.getByLabelText("Cari Produk"), "tidak-ada-produk");

    await waitFor(
      () => {
        expect(
          screen.getByRole("heading", { name: "Koleksi Tidak Ditemukan" }),
        ).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
    expect(currentUrl()).toContain("cari=tidak-ada-produk");
  });

  it("sorts by price and reflects the order in the URL", async () => {
    const user = userEvent.setup();
    const { currentUrl } = await renderApp("/koleksi");

    await waitFor(() => {
      expect(screen.getByText("Sarung Tenun Kedawung")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("combobox", { name: "Urutkan" }));
    await user.click(
      await screen.findByRole("option", { name: "Harga Terendah" }),
    );

    await waitFor(() => {
      expect(currentUrl()).toContain("urut=priceLowToHigh");
    });
    expect(actorHandle.current.listProductsCalls.at(-1)?.sort).toBe(
      "priceLowToHigh",
    );
  });

  it("resets every filter back to the bare collection URL", async () => {
    const user = userEvent.setup();
    const { currentUrl } = await renderApp("/koleksi?kategori=Kain");

    await waitFor(() => {
      expect(screen.getByText("Kain Tenun Ampel")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: /Atur Ulang/i }));

    await waitFor(() => {
      expect(currentUrl()).toBe("/koleksi");
    });
    expect(screen.getByText("Sarung Tenun Kedawung")).toBeInTheDocument();
  });
});
