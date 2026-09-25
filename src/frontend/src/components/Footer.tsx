import { Logo } from "@/components/Logo";
import {
  COMPANY_SUMMARY,
  CONTACT,
  MAILTO_LINK,
  buildWhatsAppLink,
} from "@/lib/contact";
import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const FOOTER_LINKS = [
  { to: "/", label: "Beranda" },
  { to: "/koleksi", label: "Koleksi" },
  { to: "/tentang", label: "Tentang Kami" },
  { to: "/kontak", label: "Kontak" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-ocid="footer" className="bg-primary text-primary-foreground">
      <div className="weave-lines-light mx-auto w-full max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <Logo tone="dark" className="h-24 w-44" />
            <p className="text-primary-foreground/70 mt-6 max-w-sm text-sm leading-relaxed">
              {COMPANY_SUMMARY}
            </p>
          </div>

          <nav aria-label="Navigasi footer">
            <h2 className="text-primary-foreground/50 text-[0.7rem] tracking-[0.24em]">
              Navigasi
            </h2>
            <ul className="mt-5 space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    data-ocid={`footer.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                    className="text-primary-foreground/80 hover:text-accent text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-primary-foreground/50 text-[0.7rem] tracking-[0.24em]">
              Hubungi Kami
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={MAILTO_LINK}
                  data-ocid="footer.email_link"
                  className="text-primary-foreground/80 hover:text-accent inline-flex items-center gap-3 transition-colors"
                >
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="footer.whatsapp_link"
                  className="text-primary-foreground/80 hover:text-accent inline-flex items-center gap-3 transition-colors"
                >
                  <SiWhatsapp className="size-4 shrink-0" aria-hidden="true" />
                  {CONTACT.whatsappDisplay}
                </a>
              </li>
              <li className="text-primary-foreground/70 flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  {CONTACT.addressLine}
                  <br />
                  {CONTACT.city}
                </span>
              </li>
              <li className="text-primary-foreground/70 flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>{CONTACT.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-primary-foreground/15 mt-14 flex flex-col gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="text-primary-foreground/60">
            © {year} KAREEMA. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-primary-foreground/60">
            © {year}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent underline underline-offset-4 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
