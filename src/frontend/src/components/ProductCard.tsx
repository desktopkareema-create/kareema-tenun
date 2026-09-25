import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/lib/contact";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import { FALLBACK_PRODUCT_IMAGE, type Product, primaryImage } from "@/types";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

interface ProductCardProps {
  product: Product;
  /** Numeric position used for deterministic test markers. */
  index?: number;
  className?: string;
}

/**
 * Reusable catalogue card: media, category label, name, price, and two
 * actions — a detail link and a WhatsApp quick enquiry.
 */
export function ProductCard({ product, index, className }: ProductCardProps) {
  const image = primaryImage(product);
  const marker = index === undefined ? undefined : index + 1;

  return (
    <article
      data-ocid={marker ? `product.card.${marker}` : "product.card"}
      className={cn(
        "group border-border bg-card flex h-full flex-col border transition-smooth",
        "hover:border-accent/60 focus-within:border-accent/60",
        className,
      )}
    >
      <Link
        to="/produk/$slug"
        params={{ slug: product.slug }}
        data-ocid={marker ? `product.link.${marker}` : "product.link"}
        aria-label={`Lihat detail ${product.name}`}
        className="focus-visible:ring-ring block focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <div className="bg-muted relative aspect-[4/5] overflow-hidden">
          <img
            src={image}
            alt={`${product.name} — ${product.motif} dari KAREEMA`}
            loading="lazy"
            onError={(event) => {
              if (event.currentTarget.src.endsWith(FALLBACK_PRODUCT_IMAGE))
                return;
              event.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
            }}
            className="size-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
          />
          {product.featured ? (
            <span className="bg-primary text-primary-foreground absolute top-0 left-0 px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.2em] uppercase">
              Unggulan
            </span>
          ) : null}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-muted-foreground font-mono text-[0.625rem] tracking-[0.22em] uppercase">
          {product.category}
        </p>

        <h3 className="mt-2.5 text-base leading-snug tracking-[0.08em]">
          <Link
            to="/produk/$slug"
            params={{ slug: product.slug }}
            className="hover:text-accent transition-smooth focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {product.name}
          </Link>
        </h3>

        <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">
          {product.motif} · {product.material}
        </p>

        <p className="text-accent mt-4 font-display text-sm tracking-[0.1em]">
          {formatRupiah(product.price)}
        </p>

        <div className="border-border mt-5 flex items-center gap-2 border-t pt-4">
          <Button
            asChild
            variant="outline"
            className="h-9 flex-1 rounded-none font-display text-[0.6875rem] tracking-[0.16em] uppercase"
          >
            <Link
              to="/produk/$slug"
              params={{ slug: product.slug }}
              data-ocid={
                marker
                  ? `product.detail_button.${marker}`
                  : "product.detail_button"
              }
            >
              Lihat Detail
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            size="icon"
            className="border-border hover:bg-accent hover:text-accent-foreground size-9 shrink-0 rounded-none border"
          >
            <a
              href={buildWhatsAppLink(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Tanya ${product.name} via WhatsApp`}
              data-ocid={
                marker
                  ? `product.whatsapp_button.${marker}`
                  : "product.whatsapp_button"
              }
            >
              <SiWhatsapp className="size-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
