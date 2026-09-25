import { buildWhatsAppLink } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { SiWhatsapp } from "react-icons/si";

interface WhatsAppButtonProps {
  className?: string;
  /** Optional product name to prefill the enquiry message. */
  productName?: string;
}

/** Floating WhatsApp action, visible on every page. */
export function WhatsAppButton({
  className,
  productName,
}: WhatsAppButtonProps) {
  return (
    <a
      href={buildWhatsAppLink(productName)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi KAREEMA melalui WhatsApp"
      data-ocid="whatsapp.floating_button"
      className={cn(
        "group fixed right-5 bottom-5 z-40 inline-flex items-center gap-2.5",
        "border border-accent/40 bg-primary px-4 py-3 text-primary-foreground",
        "shadow-lg transition-smooth hover:bg-accent hover:text-accent-foreground",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4",
        className,
      )}
    >
      <SiWhatsapp className="size-5 shrink-0" aria-hidden="true" />
      <span className="hidden font-display text-xs tracking-[0.18em] uppercase sm:inline">
        WhatsApp
      </span>
    </a>
  );
}
