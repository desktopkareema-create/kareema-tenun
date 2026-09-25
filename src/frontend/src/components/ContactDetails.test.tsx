import { createActorMock } from "@/test/actor";
import { SAMPLE_PRODUCTS } from "@/test/fixtures";
import { renderApp, screen } from "@/test/render-app";
import { within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CONTACT, MAILTO_LINK, buildWhatsAppLink } from "@/lib/contact";

const actorHandle = { current: createActorMock() };

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: actorHandle.current.actor, isFetching: false }),
}));

/**
 * Characterization baseline for the company contact-details contract.
 *
 * The requirement is that the address, WhatsApp number, and email are shown and
 * clickable in the footer, on the Kontak page, and in the contact call to
 * action. These tests pin the observable contract that must survive the
 * upcoming contact-detail work:
 *
 *   - the footer renders the email as a `mailto:` link, the WhatsApp number as
 *     a `wa.me` link, and the address line plus city as text;
 *   - the Kontak page detail cards render the same email and WhatsApp links and
 *     the full workshop address;
 *   - the home page contact CTA renders clickable email and WhatsApp links.
 *
 * They deliberately assert against the `CONTACT` constants rather than
 * hard-coded strings, so a deliberate value change updates the source of truth
 * once and this baseline follows it. The exact current values are pinned
 * separately in `lib/contact.test.ts`.
 */
describe("company contact details contract", () => {
  beforeEach(() => {
    actorHandle.current = createActorMock({
      products: SAMPLE_PRODUCTS,
      featured: SAMPLE_PRODUCTS.filter((product) => product.featured),
    });
  });

  it("renders the footer email, WhatsApp, and address as clickable or readable details", async () => {
    await renderApp("/");

    const footer = screen.getByRole("contentinfo");

    const email = within(footer).getByRole("link", { name: CONTACT.email });
    expect(email).toHaveAttribute("href", MAILTO_LINK);

    const whatsapp = within(footer).getByRole("link", {
      name: CONTACT.whatsappDisplay,
    });
    expect(whatsapp).toHaveAttribute("href", buildWhatsAppLink());
    expect(whatsapp).toHaveAttribute("target", "_blank");
    expect(whatsapp).toHaveAttribute("rel", "noopener noreferrer");

    // The address is plain text, not a link, and its two lines are separated by
    // a `<br />`, so assert on the containing element's text content.
    const address = within(footer).getByText((_, element) => {
      return (
        element?.tagName === "SPAN" &&
        element.textContent?.includes(CONTACT.addressLine) === true &&
        element.textContent?.includes(CONTACT.city) === true
      );
    });
    expect(address).toBeInTheDocument();
  });

  it("renders the Kontak page detail cards with the email, WhatsApp, and full address", async () => {
    await renderApp("/kontak");

    const details = document.querySelector(
      '[data-ocid="contact.details.section"]',
    ) as HTMLElement;
    expect(details).not.toBeNull();

    const email = within(details).getByRole("link", { name: CONTACT.email });
    expect(email).toHaveAttribute("href", MAILTO_LINK);

    const whatsapp = within(details).getByRole("link", {
      name: CONTACT.whatsappDisplay,
    });
    expect(whatsapp).toHaveAttribute("href", buildWhatsAppLink());
    expect(whatsapp).toHaveAttribute("target", "_blank");

    // The workshop address block renders all three address lines.
    const address = details.querySelector("address");
    expect(address).not.toBeNull();
    expect(address?.textContent).toContain(CONTACT.addressLine);
    expect(address?.textContent).toContain(CONTACT.city);
    expect(address?.textContent).toContain(CONTACT.country);
  });

  it("renders clickable email and WhatsApp links in the home page contact CTA", async () => {
    await renderApp("/");

    const cta = document.querySelector(
      '[data-ocid="home.contact.section"]',
    ) as HTMLElement;
    expect(cta).not.toBeNull();

    const email = within(cta).getByRole("link", { name: CONTACT.email });
    expect(email).toHaveAttribute("href", MAILTO_LINK);

    const whatsapp = within(cta).getByRole("link", {
      name: CONTACT.whatsappDisplay,
    });
    expect(whatsapp).toHaveAttribute("href", buildWhatsAppLink());
    expect(whatsapp).toHaveAttribute("target", "_blank");
  });

  it("renders clickable email and WhatsApp links in the Tentang Kami closing CTA", async () => {
    await renderApp("/tentang");

    const cta = document.querySelector(
      '[data-ocid="about.cta_section"]',
    ) as HTMLElement;
    expect(cta).not.toBeNull();

    const email = within(cta).getByRole("link", { name: CONTACT.email });
    expect(email).toHaveAttribute("href", MAILTO_LINK);

    const whatsapp = within(cta).getByRole("link", {
      name: CONTACT.whatsappDisplay,
    });
    expect(whatsapp).toHaveAttribute("href", buildWhatsAppLink());
    expect(whatsapp).toHaveAttribute("target", "_blank");
    expect(whatsapp).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the Kontak hero WhatsApp button as a wa.me link", async () => {
    await renderApp("/kontak");

    const hero = document.querySelector(
      '[data-ocid="contact.hero.section"]',
    ) as HTMLElement;
    expect(hero).not.toBeNull();

    const whatsapp = within(hero).getByRole("link", {
      name: /Chat via WhatsApp/i,
    });
    expect(whatsapp).toHaveAttribute("href", buildWhatsAppLink());
    expect(whatsapp).toHaveAttribute("target", "_blank");
    expect(whatsapp).toHaveAttribute("rel", "noopener noreferrer");
  });
});
