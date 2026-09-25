import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/use-products";
import type { Product } from "@/types";
import { Link } from "@tanstack/react-router";

interface RelatedProductsProps {
  category: string;
  currentProductId: bigint;
}

/** "Produk Lainnya" — other pieces from the same category. */
export function RelatedProducts({
  category,
  currentProductId,
}: RelatedProductsProps) {
  const { data: products, isLoading } = useProducts({ category });

  const related = (products ?? [])
    .filter((product: Product) => product.id !== currentProductId)
    .slice(0, 4);

  if (!isLoading && related.length === 0) return null;

  return (
    <section
      data-ocid="product.related_section"
      className="bg-secondary/60 border-border border-t"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-accent font-mono text-[0.7rem] tracking-[0.3em] uppercase">
              Koleksi Terkait
            </p>
            <h2 className="text-foreground mt-4 text-2xl sm:text-3xl">
              Produk Lainnya
            </h2>
          </div>
          <Link
            to="/koleksi"
            data-ocid="product.related.view_all_link"
            className="text-muted-foreground hover:text-foreground font-display text-xs tracking-[0.18em] uppercase underline-offset-4 transition-smooth hover:underline"
          >
            Lihat Semua
          </Link>
        </div>

        <div className="mt-12">
          {isLoading ? (
            <div
              data-ocid="product.related.loading_state"
              className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
            >
              {Array.from({ length: 4 }, (_, i) => `related-skeleton-${i}`).map(
                (id) => (
                  <div key={id} className="flex flex-col gap-4">
                    <div className="bg-muted aspect-[4/5] w-full animate-pulse" />
                    <div className="bg-muted h-3 w-1/3 animate-pulse" />
                    <div className="bg-muted h-4 w-3/4 animate-pulse" />
                    <div className="bg-muted h-4 w-1/4 animate-pulse" />
                  </div>
                ),
              )}
            </div>
          ) : (
            <ul
              data-ocid="product.related.list"
              className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
            >
              {related.map((product: Product, index: number) => (
                <li
                  key={product.id.toString()}
                  data-ocid={`product.related.item.${index + 1}`}
                >
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
