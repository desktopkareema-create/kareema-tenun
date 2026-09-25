import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedProducts } from "@/hooks/use-products";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const SKELETON_IDS = Array.from(
  { length: 4 },
  (_, i) => `featured-skeleton-${i}`,
);

export function FeaturedProducts() {
  const { data: products, isLoading, isError, refetch } = useFeaturedProducts();
  const featured = (products ?? []).slice(0, 4);

  return (
    <section
      data-ocid="home.featured.section"
      className="border-border bg-background border-b"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-accent font-mono text-[0.6875rem] tracking-[0.32em] uppercase">
              Pilihan Kurator
            </p>
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">
              Koleksi Unggulan
            </h2>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              Karya terpilih dari dapur tenun kami — motif khas Jepara yang
              paling dicari tahun ini.
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="h-11 shrink-0 rounded-none font-display text-[0.6875rem] tracking-[0.18em] uppercase"
          >
            <Link to="/koleksi" data-ocid="home.featured.all_button">
              Semua Koleksi
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="mt-12">
          {isLoading ? (
            <div
              data-ocid="home.featured.loading_state"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {SKELETON_IDS.map((id) => (
                <div key={id} className="border-border border">
                  <Skeleton className="aspect-[4/5] w-full rounded-none" />
                  <div className="space-y-3 p-5">
                    <Skeleton className="h-3 w-20 rounded-none" />
                    <Skeleton className="h-4 w-3/4 rounded-none" />
                    <Skeleton className="h-4 w-24 rounded-none" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div
              data-ocid="home.featured.error_state"
              className="border-border flex flex-col items-center border border-dashed px-6 py-16 text-center"
            >
              <p className="font-display text-sm tracking-[0.14em] uppercase">
                Koleksi gagal dimuat
              </p>
              <p className="text-muted-foreground mt-3 max-w-sm text-sm">
                Koneksi ke katalog sedang terganggu. Silakan coba lagi.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => void refetch()}
                data-ocid="home.featured.retry_button"
                className="mt-6 rounded-none font-display text-[0.6875rem] tracking-[0.18em] uppercase"
              >
                Coba Lagi
              </Button>
            </div>
          ) : featured.length === 0 ? (
            <div
              data-ocid="home.featured.empty_state"
              className="border-border flex flex-col items-center border border-dashed px-6 py-16 text-center"
            >
              <p className="font-display text-sm tracking-[0.14em] uppercase">
                Belum ada koleksi unggulan
              </p>
              <p className="text-muted-foreground mt-3 max-w-sm text-sm">
                Kurator kami sedang menyiapkan pilihan terbaik. Jelajahi seluruh
                katalog untuk melihat semua karya.
              </p>
              <Button
                asChild
                variant="outline"
                className="mt-6 rounded-none font-display text-[0.6875rem] tracking-[0.18em] uppercase"
              >
                <Link to="/koleksi" data-ocid="home.featured.empty_button">
                  Jelajahi Katalog
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((product, index) => (
                <ProductCard
                  key={product.id.toString()}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
