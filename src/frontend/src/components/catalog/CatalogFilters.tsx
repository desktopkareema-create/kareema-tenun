import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { PRODUCT_SORT_OPTIONS, type ProductSort } from "@/types";
import { Search, X } from "lucide-react";

interface CatalogFiltersProps {
  categories: string[];
  category: string | null;
  search: string;
  sort: ProductSort;
  resultCount: number;
  onCategoryChange: (category: string | null) => void;
  onSearchChange: (search: string) => void;
  onSortChange: (sort: ProductSort) => void;
  onReset: () => void;
}

export function CatalogFilters({
  categories,
  category,
  search,
  sort,
  resultCount,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onReset,
}: CatalogFiltersProps) {
  const hasActiveFilters = category !== null || search.trim().length > 0;

  return (
    <div
      data-ocid="catalog.filters"
      className="border-border bg-card border p-5 sm:p-6"
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="catalog-search"
            className="font-display text-muted-foreground text-[0.7rem] tracking-[0.22em] uppercase"
          >
            Cari Produk
          </Label>
          <div className="relative">
            <Search
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
              aria-hidden="true"
            />
            <Input
              id="catalog-search"
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Cari nama produk, mis. Kedawung"
              data-ocid="catalog.search_input"
              className="h-11 rounded-none pl-9"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="catalog-sort"
            className="font-display text-muted-foreground text-[0.7rem] tracking-[0.22em] uppercase"
          >
            Urutkan
          </Label>
          <Select
            value={sort}
            onValueChange={(value) => onSortChange(value as ProductSort)}
          >
            <SelectTrigger
              id="catalog-sort"
              data-ocid="catalog.sort_select"
              className="h-11 w-full rounded-none"
            >
              <SelectValue placeholder="Pilih urutan" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              {PRODUCT_SORT_OPTIONS.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  data-ocid={`catalog.sort_option.${option.value}`}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border-border mt-6 border-t pt-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-display text-muted-foreground mr-1 text-[0.7rem] tracking-[0.22em] uppercase">
            Kategori
          </span>

          <button
            type="button"
            onClick={() => onCategoryChange(null)}
            aria-pressed={category === null}
            data-ocid="catalog.category.all_chip"
            className={cn(
              "font-display border px-4 py-2 text-[0.7rem] tracking-[0.16em] uppercase transition-colors",
              "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
              category === null
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            Semua
          </button>

          {categories.map((item, index) => {
            const isActive = category === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => onCategoryChange(isActive ? null : item)}
                aria-pressed={isActive}
                data-ocid={`catalog.category.chip.${index + 1}`}
                className={cn(
                  "font-display border px-4 py-2 text-[0.7rem] tracking-[0.16em] uppercase transition-colors",
                  "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-border mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
        <p
          data-ocid="catalog.result_count"
          className="text-muted-foreground text-xs"
        >
          Menampilkan{" "}
          <span className="text-foreground font-medium">{resultCount}</span>{" "}
          produk
        </p>

        {hasActiveFilters ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onReset}
            data-ocid="catalog.reset_button"
            className="font-display text-muted-foreground hover:text-foreground rounded-none text-[0.7rem] tracking-[0.16em] uppercase"
          >
            <X className="size-3.5" aria-hidden="true" />
            Atur Ulang
          </Button>
        ) : null}
      </div>
    </div>
  );
}
