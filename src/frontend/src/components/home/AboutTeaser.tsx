import { Button } from "@/components/ui/button";
import { COMPANY_SUMMARY } from "@/lib/contact";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const STATS = [
  { value: "1974", label: "Awal tradisi tenun keluarga" },
  { value: "40+", label: "Pengrajin mitra di Jepara" },
  { value: "100%", label: "Ditenun tangan, bukan mesin" },
];

export function AboutTeaser() {
  return (
    <section
      data-ocid="home.about.section"
      className="border-border bg-background border-b"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-14 px-5 py-20 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-28">
        <div>
          <p className="text-accent font-mono text-[0.6875rem] tracking-[0.32em] uppercase">
            Tentang Kami
          </p>
          <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">
            Tentang KAREEMA
          </h2>
          <p className="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed">
            {COMPANY_SUMMARY}
          </p>
          <p className="text-muted-foreground mt-4 max-w-xl text-base leading-relaxed">
            Kami percaya kain yang baik lahir dari waktu yang cukup — dari
            pemilihan benang, penataan motif, hingga sentuhan akhir yang rapi.
          </p>

          <Button
            asChild
            variant="outline"
            className="mt-9 h-11 rounded-none font-display text-[0.6875rem] tracking-[0.18em] uppercase"
          >
            <Link to="/tentang" data-ocid="home.about.more_button">
              Selengkapnya
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <dl className="border-border grid grid-cols-1 gap-px self-start sm:grid-cols-3 lg:grid-cols-1">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              data-ocid={`home.about.stat.${index + 1}`}
              className="border-border border p-6 lg:flex lg:items-baseline lg:gap-6"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-3xl tracking-[0.1em] lg:w-32 lg:shrink-0">
                {stat.value}
              </dd>
              <dd className="text-muted-foreground mt-2 text-sm leading-relaxed lg:mt-0">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
