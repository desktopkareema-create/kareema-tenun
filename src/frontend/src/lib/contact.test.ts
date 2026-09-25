import { CONTACT, MAILTO_LINK, buildWhatsAppLink } from "@/lib/contact";
import { describe, expect, it } from "vitest";

describe("contact constants", () => {
  it("exposes a clickable email address", () => {
    expect(CONTACT.email).toBe("kareematenun@gmail.com");
    expect(MAILTO_LINK).toBe("mailto:kareematenun@gmail.com");
  });

  it("exposes the WhatsApp number in wa.me and display formats", () => {
    expect(CONTACT.whatsapp).toBe("628205543230");
    expect(CONTACT.whatsappDisplay).toBe("+62 820-5543-230");
  });

  it("exposes the workshop address in Jepara", () => {
    expect(CONTACT.addressLine).toBe("Jokosari RT 03 RW 04");
    expect(CONTACT.city).toBe("Ngabul, Jepara, Jawa Tengah");
    expect(CONTACT.country).toBe("Indonesia");
  });
});

describe("buildWhatsAppLink", () => {
  it("builds a wa.me link with the generic enquiry message", () => {
    const link = buildWhatsAppLink();
    expect(link.startsWith("https://wa.me/628205543230?text=")).toBe(true);
    expect(decodeURIComponent(link)).toContain(
      "Halo KAREEMA, saya ingin bertanya mengenai koleksi tenun Anda.",
    );
  });

  it("includes the product name in the prefilled message", () => {
    const link = buildWhatsAppLink("Sarung Tenun Kedawung");
    expect(decodeURIComponent(link)).toContain(
      'Halo KAREEMA, saya ingin bertanya tentang produk "Sarung Tenun Kedawung".',
    );
  });

  it("percent-encodes the message so the link stays a single query value", () => {
    const link = buildWhatsAppLink("Kain Ampel");
    expect(link).not.toContain(" ");
    expect(link).toContain("%20");
  });
});
