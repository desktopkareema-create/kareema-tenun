/** Company contact constants — update these values to change them site-wide. */
export const CONTACT = {
  email: "kareematenun@gmail.com",
  /** International format, digits only, for wa.me links. */
  whatsapp: "628205543230",
  /** Human-readable WhatsApp number. */
  whatsappDisplay: "+62 820-5543-230",
  addressLine: "Jokosari RT 03 RW 04",
  city: "Ngabul, Jepara, Jawa Tengah",
  country: "Indonesia",
  hours: "Senin – Sabtu, 08.00 – 17.00 WIB",
} as const;

export const COMPANY_SUMMARY =
  "KAREEMA menghadirkan tenun dan kriya Jepara pilihan — dikerjakan tangan oleh pengrajin lokal dengan bahan terbaik dan motif yang diwariskan turun-temurun.";

/** Builds a wa.me deep link, optionally prefilled with a product enquiry. */
export function buildWhatsAppLink(productName?: string): string {
  const base = `https://wa.me/${CONTACT.whatsapp}`;
  const message = productName
    ? `Halo KAREEMA, saya ingin bertanya tentang produk "${productName}".`
    : "Halo KAREEMA, saya ingin bertanya mengenai koleksi tenun Anda.";
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const MAILTO_LINK = `mailto:${CONTACT.email}`;
