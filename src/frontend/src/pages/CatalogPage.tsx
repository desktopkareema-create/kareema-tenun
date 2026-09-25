import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { EmptyState } from "@/components/catalog/EmptyState";
import { useCategories, useProducts } from "@/hooks/use-products";
import { PRODUCT_SORT_OPTIONS, ProductSort } from "@/types";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

const SORT_VALUES = PRODUCT_SORT_OPTIONS.map((option) => option.value);

function parseSort(value: unknown): ProductSort {
  return SORT_VALUES.includes(value as ProductSort)
    ? (value as ProductSort)
    : ProductSort.newest;
}

function parseText(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function CatalogPage() {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) as Record<string, unknown>;

  const category = parseText(searchParams.kategori) || null;
  const search = parseText(searchParams.cari);
  const sort = parseSort(searchParams.urut);

  const [searchDraft, setSearchDraft] = useState(search);

  // Keep the input in sync when the URL changes from outside (back/forward,
  // shared link, reset) without fighting the user's own typing.
  useEffect(() => {
    setSearchDraft(search);
  }, [search]);

  // Debounce the draft into the URL so typing stays responsive.
  useEffect(() => {
    if (searchDraft === search) return;
    const timer = window.setTimeout(() => {
      void navigate({
        to: "/koleksi",
        search: (prev: Record<string, unknown>) => ({
          ...prev,
          cari: searchDraft.trim() === "" ? undefined : searchDraft,
        }),
        replace: true,
      });
    }, 300);
    return () => window.clearTimeout(timer);
  }, [searchDraft, search, navigate]);

  const { data: categories = [] } = useCategories();
  const { data: products = [], isLoading } = useProducts({
    category: category ?? undefined,
    search: search.trim() === "" ? undefined : search,
    sort,
  });

  const updateSearch = useCallback(
    (patch: Record<string, unknown>) => {
      void navigate({
        to: "/koleksi",
        search: (prev: Record<string, unknown>) => ({ ...prev, ...patch }),
        replace: true,
      });
    },
    [navigate],
  );

  const handleCategoryChange = useCallback(
    (next: string | null) => {
      updateSearch({ kategori: next ?? undefined });
    },
    [updateSearch],
  );

  const handleSortChange = useCallback(
    (next: ProductSort) => {
      updateSearch({ urut: next === ProductSort.newest ? undefined : next });
    },
    [updateSearch],
  );

  const handleReset = useCallback(() => {
    setSearchDraft("");
    void navigate({ to: "/koleksi", search: {}, replace: true });
  }, [navigate]);

  const activeQuery = [category, search.trim()].filter(Boolean).join(" · ");

  return (
    <div data-ocid="catalog.page" className="bg-background">
      <section className="border-border bg-muted/40 border-b">
        <div className="mx-auto w-full max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
          <p className="text-accent font-mono text-[0.7rem] tracking-[0.3em] uppercase">
            Koleksi
          </p>
          <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl">
            Katalog Tenun KAREEMA
          </h1>
          <p className="text-muted-foreground mt-5 max-w-2xl text-sm leading-relaxed sm:text-base">
            Jelajahi sarung, selendang, kain, dan aksesori tenun pilihan —
            dikerjakan tangan oleh pengrajin Jepara. Saring berdasarkan
            kategori, cari motif favorit Anda, lalu urutkan sesuai kebutuhan.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
        <CatalogFilters
          categories={categories}
          category={category}
          search={searchDraft}
          sort={sort}
          resultCount={products.length}
          onCategoryChange={handleCategoryChange}
          onSearchChange={setSearchDraft}
          onSortChange={handleSortChange}
          onReset={handleReset}
        />

        <div className="mt-10">
          {!isLoading && products.length === 0 ? (
            <EmptyState query={activeQuery} onReset={handleReset} />
          ) : (
            <CatalogGrid products={products} isLoading={isLoading} />
          )}
        </div>
      </section>
    </div>
  );
}
