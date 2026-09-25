import { CONTACT, MAILTO_LINK, buildWhatsAppLink } from "@/lib/contact";
import { createActorMock } from "@/test/actor";
import { renderApp, screen, waitFor } from "@/test/render-app";
import { within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const actorHandle = { current: createActorMock() };

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: actorHandle.current.actor, isFetching: false }),
}));

describe("ContactPage journey", () => {
  beforeEach(() => {
    actorHandle.current = createActorMock();
  });

  it("shows a clickable email and WhatsApp number", async () => {
    await renderApp("/kontak");

    // The email and number also appear in the footer, so scope the assertions
    // to the contact details section to keep the query unambiguous.
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
  });

  it("blocks submission and reports required fields when the form is empty", async () => {
    const user = userEvent.setup();
    await renderApp("/kontak");

    await user.click(screen.getByRole("button", { name: /Kirim Pesan/i }));

    expect(await screen.findByText("Nama wajib diisi.")).toBeInTheDocument();
    expect(screen.getByText("Email wajib diisi.")).toBeInTheDocument();
    expect(screen.getByText("Pesan wajib diisi.")).toBeInTheDocument();
    expect(actorHandle.current.submitCalls).toHaveLength(0);
  });

  it("rejects an invalid email format before calling the backend", async () => {
    const user = userEvent.setup();
    await renderApp("/kontak");

    await user.type(screen.getByLabelText(/Nama/), "Sari");
    await user.type(screen.getByLabelText(/Email/), "bukan-email");
    await user.type(screen.getByLabelText(/Pesan/), "Halo KAREEMA");
    await user.click(screen.getByRole("button", { name: /Kirim Pesan/i }));

    expect(
      await screen.findByText("Format email tidak valid."),
    ).toBeInTheDocument();
    expect(actorHandle.current.submitCalls).toHaveLength(0);
  });

  it("submits a valid message through the actor and confirms success", async () => {
    const user = userEvent.setup();
    await renderApp("/kontak");

    await user.type(screen.getByLabelText(/Nama/), "Sari");
    await user.type(screen.getByLabelText(/Email/), "sari@example.com");
    await user.type(
      screen.getByLabelText(/Pesan/),
      "Apakah ada ukuran khusus?",
    );
    await user.click(screen.getByRole("button", { name: /Kirim Pesan/i }));

    await waitFor(() => {
      expect(actorHandle.current.submitCalls).toHaveLength(1);
    });
    expect(actorHandle.current.submitCalls[0]).toEqual([
      "Sari",
      "sari@example.com",
      "",
      "",
      "Apakah ada ukuran khusus?",
    ]);
    expect(
      await screen.findByText(/Terima kasih, pesan Anda sudah kami terima/i),
    ).toBeInTheDocument();
  });

  it("shows an error state when the backend rejects the message", async () => {
    const user = userEvent.setup();
    actorHandle.current = createActorMock({
      submitError: new Error("canister unavailable"),
    });
    await renderApp("/kontak");

    await user.type(screen.getByLabelText(/Nama/), "Sari");
    await user.type(screen.getByLabelText(/Email/), "sari@example.com");
    await user.type(screen.getByLabelText(/Pesan/), "Halo");
    await user.click(screen.getByRole("button", { name: /Kirim Pesan/i }));

    expect(
      await screen.findByText(/pesan Anda belum berhasil terkirim/i),
    ).toBeInTheDocument();
  });
});
