import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const HERO_IMAGE = "/assets/generated/hero-tenun-jepara.dim_1920x1080.jpg";

export function HeroSection() {
  return (
    <section
      data-ocid="home.hero.section"
      className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-primary"
    >
      <img
        src={HERO_IMAGE}
        alt="Detail kain tenun tangan Jepara dengan benang lusi dan pakan bernuansa gading dan soga"
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/55 to-black/25"
      />
      <div
        aria-hidden="true"
        className="weave-lines-light absolute inset-0 -z-10 opacity-60"
      />

      <div className="mx-auto w-full max-w-7xl px-5 pt-32 pb-16 lg:px-8 lg:pb-24">
        <div className="max-w-3xl">
          <p className="font-mono text-[0.6875rem] tracking-[0.42em] text-white/70 uppercase">
            Tenun Tangan · Jepara
          </p>

          <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-[0.16em] text-white uppercase sm:text-6xl lg:text-7xl">
            KAREEMA
          </h1>

          <div className="mt-7 h-px w-24 bg-accent" aria-hidden="true" />

          <p className="text-balance mt-7 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Kriya tenun pilihan dari pengrajin Jepara — ditenun tangan dengan
            motif warisan, bahan terbaik, dan ketelitian yang tak terburu-buru.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-none bg-accent px-8 font-display text-xs tracking-[0.2em] text-accent-foreground uppercase hover:bg-accent/90"
            >
              <Link to="/koleksi" data-ocid="home.hero.collection_button">
                Lihat Koleksi
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-none border-white/40 bg-transparent px-8 font-display text-xs tracking-[0.2em] text-white uppercase hover:bg-white hover:text-primary"
            >
              <Link to="/kontak" data-ocid="home.hero.contact_button">
                Hubungi Kami
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
