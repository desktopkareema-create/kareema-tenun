import { Gem, Hand, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Advantage {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ADVANTAGES: Advantage[] = [
  {
    icon: Hand,
    title: "Tenun Tangan",
    description:
      "Setiap helai ditenun manual oleh pengrajin Jepara, sehingga tidak ada dua karya yang benar-benar identik.",
  },
  {
    icon: Sparkles,
    title: "Motif Khas Jepara",
    description:
      "Ragam hias warisan yang diwariskan turun-temurun, dihidupkan kembali dalam komposisi warna yang tenang.",
  },
  {
    icon: Gem,
    title: "Kualitas Premium",
    description:
      "Bahan katun dan sutra pilihan, diperiksa satu per satu sebelum dikirim ke tangan Anda.",
  },
];

export function WhyKareema() {
  return (
    <section
      data-ocid="home.why.section"
      className="border-border bg-muted border-b"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="max-w-xl">
          <p className="text-accent font-mono text-[0.6875rem] tracking-[0.32em] uppercase">
            Nilai Kami
          </p>
          <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">
            Kenapa KAREEMA
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px sm:grid-cols-3">
          {ADVANTAGES.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <div
                key={advantage.title}
                data-ocid={`home.why.item.${index + 1}`}
                className="border-border bg-card border p-8 lg:p-10"
              >
                <span className="border-accent/40 text-accent inline-flex size-12 items-center justify-center border">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-7 text-lg tracking-[0.1em]">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
