import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/types";

const SKELETON_IDS = Array.from(
  { length: 8 },
  (_, index) => `catalog-skeleton-${index}`,
);

interface CatalogGridProps {
  products: Product[];
  isLoading: boolean;
}

export function CatalogGrid({ products, isLoading }: CatalogGridProps) {
  if (isLoading) {
    return (
      <div
        data-ocid="catalog.loading_state"
        aria-busy="true"
        aria-live="polite"
        className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <span className="sr-only">Memuat koleksi produk…</span>
        {SKELETON_IDS.map((id) => (
          <div key={id} className="flex flex-col">
            <Skeleton className="bg-muted aspect-[4/5] w-full rounded-none" />
            <Skeleton className="bg-muted mt-5 h-3 w-20 rounded-none" />
            <Skeleton className="bg-muted mt-3 h-4 w-4/5 rounded-none" />
            <Skeleton className="bg-muted mt-3 h-4 w-1/3 rounded-none" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      data-ocid="catalog.list"
      className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((product, index) => (
        <div
          key={product.id.toString()}
          data-ocid={`catalog.item.${index + 1}`}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
