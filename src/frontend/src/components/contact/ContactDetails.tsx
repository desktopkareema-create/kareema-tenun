import { Card, CardContent } from "@/components/ui/card";
import { CONTACT, MAILTO_LINK, buildWhatsAppLink } from "@/lib/contact";
import { Clock, Mail, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const DETAIL_ITEMS = [
  {
    key: "email",
    label: "Email",
    icon: Mail,
    value: CONTACT.email,
    href: MAILTO_LINK,
    external: false,
    hint: "Balasan dalam 1×24 jam kerja",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: SiWhatsapp,
    value: CONTACT.whatsappDisplay,
    href: buildWhatsAppLink(),
    external: true,
    hint: "Respon tercepat pada jam operasional",
  },
] as const;

/** Company contact details — email, WhatsApp, address, and operating hours. */
export function ContactDetails() {
  return (
    <div data-ocid="contact.details.section" className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {DETAIL_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.key}
              data-ocid={`contact.details.${item.key}_card`}
              className="border-border rounded-none shadow-none"
            >
              <CardContent className="p-6">
                <span className="border-border bg-secondary text-accent inline-flex size-10 items-center justify-center border">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <p className="text-muted-foreground mt-5 font-mono text-[0.65rem] tracking-[0.28em] uppercase">
                  {item.label}
                </p>
                <a
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  data-ocid={`contact.details.${item.key}_link`}
                  className="text-foreground hover:text-accent focus-visible:ring-ring mt-2 block text-base font-medium break-words transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  {item.value}
                </a>
                <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
                  {item.hint}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card
        data-ocid="contact.details.location_card"
        className="border-border rounded-none shadow-none"
      >
        <CardContent className="grid gap-8 p-6 sm:grid-cols-2">
          <div>
            <span className="border-border bg-secondary text-accent inline-flex size-10 items-center justify-center border">
              <MapPin className="size-4" aria-hidden="true" />
            </span>
            <p className="text-muted-foreground mt-5 font-mono text-[0.65rem] tracking-[0.28em] uppercase">
              Alamat Workshop
            </p>
            <address className="text-foreground mt-2 text-sm leading-relaxed not-italic">
              {CONTACT.addressLine}
              <br />
              {CONTACT.city}
              <br />
              {CONTACT.country}
            </address>
          </div>

          <div>
            <span className="border-border bg-secondary text-accent inline-flex size-10 items-center justify-center border">
              <Clock className="size-4" aria-hidden="true" />
            </span>
            <p className="text-muted-foreground mt-5 font-mono text-[0.65rem] tracking-[0.28em] uppercase">
              Jam Operasional
            </p>
            <p className="text-foreground mt-2 text-sm leading-relaxed">
              {CONTACT.hours}
            </p>
            <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
              Kunjungan workshop sebaiknya dijadwalkan terlebih dahulu melalui
              WhatsApp.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
