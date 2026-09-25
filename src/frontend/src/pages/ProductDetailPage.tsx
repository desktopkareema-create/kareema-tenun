import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Button } from "@/components/ui/button";
import { useProductBySlug } from "@/hooks/use-products";
import { Link, useParams } from "@tanstack/react-router";

function ProductDetailSkeleton() {
  return (
    <div
      data-ocid="product.loading_state"
      className="mx-auto w-full max-w-7xl px-5 py-16 lg:px-8 lg:py-24"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-4">
          <div className="bg-muted aspect-[4/5] w-full animate-pulse" />
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }, (_, i) => `gallery-skeleton-${i}`).map(
              (id) => (
                <div
                  key={id}
                  className="bg-muted aspect-square w-full animate-pulse"
                />
              ),
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="bg-muted h-3 w-24 animate-pulse" />
          <div className="bg-muted h-9 w-3/4 animate-pulse" />
          <div className="bg-muted h-7 w-1/3 animate-pulse" />
          <div className="bg-muted mt-4 h-3 w-full animate-pulse" />
          <div className="bg-muted h-3 w-full animate-pulse" />
          <div className="bg-muted h-3 w-2/3 animate-pulse" />
          <div className="bg-muted mt-6 h-12 w-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function ProductNotFound() {
  return (
    <section
      data-ocid="product.not_found_state"
      className="mx-auto flex w-full max-w-3xl flex-col items-center px-5 py-28 text-center lg:px-8"
    >
      <p className="text-accent font-mono text-xs tracking-[0.3em] uppercase">
        Tidak Ditemukan
      </p>
      <h1 className="text-foreground mt-6 text-3xl sm:text-4xl">
        Produk Tidak Tersedia
      </h1>
      <p className="text-muted-foreground mt-5 max-w-md text-sm leading-relaxed">
        Produk yang Anda cari mungkin sudah tidak diproduksi lagi atau tautannya
        berubah. Jelajahi koleksi kami untuk menemukan tenun pilihan lainnya.
      </p>
      <Button
        asChild
        className="mt-9 rounded-none font-display text-xs tracking-[0.18em] uppercase"
      >
        <Link to="/koleksi" data-ocid="product.not_found.collection_button">
          Kembali ke Koleksi
        </Link>
      </Button>
    </section>
  );
}

export function ProductDetailPage() {
  const { slug } = useParams({ from: "/produk/$slug" });
  const { data: product, isLoading } = useProductBySlug(slug);

  if (isLoading) return <ProductDetailSkeleton />;
  if (!product) return <ProductNotFound />;

  return (
    <div data-ocid="product.page" className="bg-background">
      <div className="mx-auto w-full max-w-7xl px-5 py-12 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} productName={product.name} />
          <ProductInfo product={product} />
        </div>
      </div>

      <RelatedProducts
        category={product.category}
        currentProductId={product.id}
      />
    </div>
  );
}
