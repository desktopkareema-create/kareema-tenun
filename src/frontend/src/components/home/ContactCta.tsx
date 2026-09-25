import { Button } from "@/components/ui/button";
import { CONTACT, MAILTO_LINK, buildWhatsAppLink } from "@/lib/contact";
import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export function ContactCta() {
  return (
    <section
      data-ocid="home.contact.section"
      className="bg-primary text-primary-foreground relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="weave-lines-light absolute inset-0 -z-10 opacity-70"
      />

      <div className="mx-auto w-full max-w-4xl px-5 py-20 text-center lg:px-8 lg:py-28">
        <p className="font-mono text-[0.6875rem] tracking-[0.32em] text-primary-foreground/60 uppercase">
          Hubungi Kami
        </p>
        <h2 className="text-balance mt-5 text-3xl leading-tight sm:text-4xl">
          Wujudkan Kain Tenun Pilihan Anda
        </h2>
        <p className="text-balance mx-auto mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/75">
          Butuh ukuran khusus, pesanan dalam jumlah besar, atau sekadar bertanya
          soal motif? Tim kami siap membantu Anda langsung.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 w-full rounded-none bg-accent px-8 font-display text-xs tracking-[0.2em] text-accent-foreground uppercase hover:bg-accent/90 sm:w-auto"
          >
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="home.contact.whatsapp_button"
            >
              <SiWhatsapp className="size-4" aria-hidden="true" />
              WhatsApp
            </a>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 w-full rounded-none border-primary-foreground/40 bg-transparent px-8 font-display text-xs tracking-[0.2em] text-primary-foreground uppercase hover:bg-primary-foreground hover:text-primary sm:w-auto"
          >
            <a href={MAILTO_LINK} data-ocid="home.contact.email_button">
              <Mail className="size-4" aria-hidden="true" />
              Email
            </a>
          </Button>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-2 font-mono text-[0.6875rem] tracking-[0.16em] text-primary-foreground/60 uppercase sm:flex-row sm:gap-6">
          <a
            href={MAILTO_LINK}
            className="hover:text-accent transition-smooth focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:outline-none"
            data-ocid="home.contact.email_link"
          >
            {CONTACT.email}
          </a>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-smooth focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:outline-none"
            data-ocid="home.contact.whatsapp_link"
          >
            {CONTACT.whatsappDisplay}
          </a>
        </div>

        <p className="mt-8 text-xs text-primary-foreground/50">
          Atau kunjungi{" "}
          <Link
            to="/kontak"
            className="hover:text-accent underline underline-offset-4 transition-smooth"
            data-ocid="home.contact.form_link"
          >
            halaman kontak
          </Link>{" "}
          untuk mengirim pesan lengkap.
        </p>
      </div>
    </section>
  );
}
