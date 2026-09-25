import { CompanyStory } from "@/components/about/CompanyStory";
import { CompanyValues } from "@/components/about/CompanyValues";
import { PhotoGallery } from "@/components/about/PhotoGallery";
import { ProfileVideo } from "@/components/about/ProfileVideo";
import { WeavingProcess } from "@/components/about/WeavingProcess";
import { Button } from "@/components/ui/button";
import { CONTACT, MAILTO_LINK, buildWhatsAppLink } from "@/lib/contact";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const STATS = [
  { value: "30+", label: "Pengrajin mitra" },
  { value: "50+", label: "Tahun tradisi" },
  { value: "100%", label: "Tenun tangan" },
] as const;

/** Tentang Kami — company story, weaving process, values, and closing CTA. */
export default function AboutPage() {
  return (
    <div data-ocid="about.page">
      {/* Hero band */}
      <section
        data-ocid="about.hero_section"
        className="bg-primary text-primary-foreground relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="weave-lines-light pointer-events-none absolute inset-0 opacity-60"
        />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
          <div>
            <p className="text-accent font-mono text-[0.7rem] tracking-[0.32em] uppercase">
              Tentang Kami
            </p>
            <h1 className="text-balance mt-6 text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
              Tenun yang Ditenun dengan Waktu
            </h1>
            <p className="text-primary-foreground/75 mt-7 max-w-xl text-sm leading-relaxed sm:text-base">
              KAREEMA menjaga warisan tenun Troso, Jepara — dikerjakan tangan
              oleh pengrajin yang telah menekuni kriya ini sepanjang hidup
              mereka, dengan bahan terbaik dan motif yang diwariskan
              turun-temurun.
            </p>

            <dl className="border-primary-foreground/15 mt-10 grid max-w-lg grid-cols-3 gap-6 border-t pt-8">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="font-display block text-2xl tracking-[0.08em] sm:text-3xl">
                      {stat.value}
                    </span>
                    <span className="text-primary-foreground/60 mt-2 block text-[0.68rem] tracking-[0.16em] uppercase">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="border-primary-foreground/15 relative border">
            <img
              src="/assets/generated/about-weaving-hero.dim_1600x1000.jpg"
              alt="Pengrajin menenun kain di atas alat tenun bukan mesin di Troso, Jepara"
              className="h-64 w-full object-cover sm:h-80 lg:h-[26rem]"
              loading="eager"
              decoding="async"
            />
            <figcaption className="border-primary-foreground/15 text-primary-foreground/60 border-t px-5 py-4 font-mono text-[0.65rem] tracking-[0.18em] uppercase">
              ATBM — Troso, Jepara
            </figcaption>
          </figure>
        </div>
      </section>

      <CompanyStory />
      <WeavingProcess />
      <ProfileVideo />
      <PhotoGallery />
      <CompanyValues />

      {/* Closing call to action */}
      <section
        data-ocid="about.cta_section"
        className="bg-secondary border-border border-b"
      >
        <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="bg-card border-border weave-lines border p-10 lg:p-16">
            <div className="max-w-2xl">
              <p className="text-accent font-mono text-[0.7rem] tracking-[0.32em] uppercase">
                Mari Berkenalan
              </p>
              <h2 className="text-balance mt-6 text-3xl leading-[1.15] sm:text-4xl">
                Jelajahi Koleksi, atau Bicara Langsung dengan Kami
              </h2>
              <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
                Setiap lembar kain punya ceritanya sendiri. Temukan yang paling
                cocok untuk Anda, atau hubungi kami untuk pertanyaan mengenai
                pesanan khusus, ukuran, dan pengiriman.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                asChild
                className="rounded-none font-display text-xs tracking-[0.18em] uppercase"
              >
                <Link to="/koleksi" data-ocid="about.koleksi_button">
                  Lihat Koleksi
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-none border-primary/25 font-display text-xs tracking-[0.18em] uppercase"
              >
                <Link to="/kontak" data-ocid="about.kontak_button">
                  Hubungi Kami
                </Link>
              </Button>
            </div>

            <div className="border-border mt-10 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="about.whatsapp_link"
                className="text-foreground hover:text-accent focus-visible:ring-ring inline-flex items-center gap-3 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <SiWhatsapp className="size-4 shrink-0" aria-hidden="true" />
                {CONTACT.whatsappDisplay}
              </a>
              <a
                href={MAILTO_LINK}
                data-ocid="about.email_link"
                className="text-foreground hover:text-accent focus-visible:ring-ring inline-flex items-center gap-3 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                {CONTACT.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
