import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/lib/contact";
import { ArrowUpRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export function ContactPage() {
  return (
    <div data-ocid="contact.page">
      <section
        data-ocid="contact.hero.section"
        className="bg-primary text-primary-foreground relative isolate overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="weave-lines-light absolute inset-0 opacity-60"
        />
        <div className="relative mx-auto w-full max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <p className="text-primary-foreground/60 font-mono text-[0.6875rem] tracking-[0.42em] uppercase">
            Hubungi Kami
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Mari Berbincang
          </h1>
          <div className="bg-accent mt-7 h-px w-24" aria-hidden="true" />
          <p className="text-primary-foreground/80 mt-7 max-w-xl text-base leading-relaxed">
            Punya pertanyaan tentang koleksi tenun, pesanan khusus, atau ingin
            berkunjung ke workshop kami di Jepara? Tim KAREEMA siap membantu
            Anda.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 rounded-none px-8 font-display text-xs tracking-[0.2em] uppercase"
            >
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact.hero.whatsapp_button"
              >
                <SiWhatsapp className="size-4" aria-hidden="true" />
                Chat via WhatsApp
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="hover:text-primary h-12 rounded-none border-white/40 bg-transparent px-8 font-display text-xs tracking-[0.2em] text-white uppercase hover:bg-white"
            >
              <a href="#contact-form" data-ocid="contact.hero.form_button">
                Isi Formulir
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section
        data-ocid="contact.content.section"
        className="bg-background mx-auto w-full max-w-7xl px-5 py-16 lg:px-8 lg:py-24"
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-accent font-mono text-[0.6875rem] tracking-[0.32em] uppercase">
              Informasi Kontak
            </p>
            <h2 className="mt-4 text-2xl sm:text-3xl">Kunjungi atau Hubungi</h2>
            <p className="text-muted-foreground mt-5 max-w-md text-sm leading-relaxed">
              Kami melayani pertanyaan melalui email dan WhatsApp pada hari
              kerja. Untuk kunjungan workshop, mohon atur jadwal terlebih
              dahulu.
            </p>
            <div className="mt-10">
              <ContactDetails />
            </div>
          </div>

          <div id="contact-form" className="scroll-mt-28">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
