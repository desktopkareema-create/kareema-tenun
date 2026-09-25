import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  /** Human-readable summary of the active filter/search, e.g. `"Sarung"`. */
  query?: string;
  onReset: () => void;
}

export function EmptyState({ query, onReset }: EmptyStateProps) {
  return (
    <div
      data-ocid="catalog.empty_state"
      className="border-border bg-card flex flex-col items-center border px-6 py-20 text-center"
    >
      <span className="border-border text-muted-foreground flex size-16 items-center justify-center border">
        <SearchX className="size-7" aria-hidden="true" />
      </span>

      <h2 className="mt-7 text-lg sm:text-xl">Koleksi Tidak Ditemukan</h2>

      <p className="text-muted-foreground mt-4 max-w-md text-sm leading-relaxed">
        {query
          ? `Tidak ada produk yang cocok dengan pencarian atau filter "${query}".`
          : "Tidak ada produk yang cocok dengan pencarian atau filter Anda."}{" "}
        Coba ubah kata kunci, pilih kategori lain, atau atur ulang seluruh
        filter.
      </p>

      <Button
        type="button"
        onClick={onReset}
        data-ocid="catalog.empty_state.reset_button"
        className="font-display mt-9 rounded-none text-xs tracking-[0.18em] uppercase"
      >
        Atur Ulang Filter
      </Button>
    </div>
  );
}
