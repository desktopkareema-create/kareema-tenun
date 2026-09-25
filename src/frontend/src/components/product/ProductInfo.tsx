import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/lib/contact";
import { formatRupiah } from "@/lib/format";
import type { Product } from "@/types";
import { Link } from "@tanstack/react-router";
import { SiWhatsapp } from "react-icons/si";

interface ProductInfoProps {
  product: Product;
}

interface Specification {
  label: string;
  value: string;
}

/** Name, category, price, description, specifications and the WhatsApp CTA. */
export function ProductInfo({ product }: ProductInfoProps) {
  const specifications: Specification[] = [
    { label: "Bahan", value: product.material },
    { label: "Ukuran", value: product.size },
    { label: "Motif", value: product.motif },
  ].filter((item) => item.value.trim().length > 0);

  return (
    <div data-ocid="product.info" className="flex flex-col">
      <nav
        aria-label="Breadcrumb"
        className="text-muted-foreground flex flex-wrap items-center gap-2 font-mono text-[0.65rem] tracking-[0.2em] uppercase"
      >
        <Link
          to="/"
          data-ocid="product.breadcrumb.home_link"
          className="hover:text-foreground transition-smooth"
        >
          Beranda
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          to="/koleksi"
          data-ocid="product.breadcrumb.collection_link"
          className="hover:text-foreground transition-smooth"
        >
          Koleksi
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-foreground truncate">{product.name}</span>
      </nav>

      <p className="text-accent mt-8 font-mono text-[0.7rem] tracking-[0.3em] uppercase">
        {product.category}
      </p>

      <h1 className="text-foreground mt-4 text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">
        {product.name}
      </h1>

      <p
        data-ocid="product.price"
        className="text-foreground mt-6 font-display text-2xl tracking-[0.06em] sm:text-3xl"
      >
        {formatRupiah(product.price)}
      </p>

      <div className="border-border mt-8 border-t" />

      <p className="text-muted-foreground mt-8 text-sm leading-relaxed sm:text-base">
        {product.description}
      </p>

      {specifications.length > 0 ? (
        <dl
          data-ocid="product.specifications"
          className="border-border mt-10 border-t"
        >
          {specifications.map((item) => (
            <div
              key={item.label}
              className="border-border flex items-baseline justify-between gap-6 border-b py-4"
            >
              <dt className="text-muted-foreground font-mono text-[0.65rem] tracking-[0.22em] uppercase">
                {item.label}
              </dt>
              <dd className="text-foreground text-right text-sm">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          asChild
          size="lg"
          className="rounded-none font-display text-xs tracking-[0.18em] uppercase"
        >
          <a
            href={buildWhatsAppLink(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="product.whatsapp_button"
            className="inline-flex items-center gap-2.5"
          >
            <SiWhatsapp className="size-4 shrink-0" aria-hidden="true" />
            Tanya via WhatsApp
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="rounded-none font-display text-xs tracking-[0.18em] uppercase"
        >
          <Link to="/koleksi" data-ocid="product.back_to_collection_button">
            Lihat Koleksi Lain
          </Link>
        </Button>
      </div>

      <p className="text-muted-foreground mt-5 text-xs leading-relaxed">
        Setiap helai ditenun tangan, sehingga warna dan ukuran dapat berbeda
        tipis antar unit.
      </p>
    </div>
  );
}
