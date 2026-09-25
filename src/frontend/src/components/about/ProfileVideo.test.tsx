import { ProfileVideo } from "@/components/about/ProfileVideo";
import { PROFILE_VIDEO_ID, PROFILE_VIDEO_URL } from "@/lib/about-video";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

/**
 * Cover for the Tentang Kami profile video section. These tests exercise the
 * real ProfileVideo component: the autoplaying embed, the responsive 16:9
 * wrapper, the Indonesian heading/eyebrow, and the sound-toggle wiring that
 * posts YouTube IFrame API commands to the player.
 */
describe("ProfileVideo", () => {
  function getSection(): HTMLElement {
    const section = document.querySelector(
      '[data-ocid="about.video_section"]',
    ) as HTMLElement;
    expect(section).not.toBeNull();
    return section;
  }

  function getFrame(): HTMLIFrameElement {
    const frame = document.querySelector(
      '[data-ocid="about.video_frame"]',
    ) as HTMLIFrameElement;
    expect(frame).not.toBeNull();
    return frame;
  }

  it("embeds the accepted video with autoplay and mute enabled", () => {
    render(<ProfileVideo />);

    const frame = getFrame();
    const url = new URL(frame.getAttribute("src") ?? "");

    expect(url.origin).toBe("https://www.youtube-nocookie.com");
    expect(url.pathname).toBe(`/embed/${PROFILE_VIDEO_ID}`);
    expect(url.searchParams.get("autoplay")).toBe("1");
    expect(url.searchParams.get("mute")).toBe("1");
    expect(url.searchParams.get("enablejsapi")).toBe("1");
    expect(url.searchParams.get("loop")).toBe("1");
    expect(url.searchParams.get("playlist")).toBe(PROFILE_VIDEO_ID);
  });

  it("allows autoplay and fullscreen on the iframe", () => {
    render(<ProfileVideo />);

    const frame = getFrame();
    expect(frame.getAttribute("allow")).toContain("autoplay");
    expect(frame).toHaveAttribute("allowfullscreen");
    expect(frame.getAttribute("title")?.trim().length ?? 0).toBeGreaterThan(0);
  });

  it("wraps the iframe in a responsive 16:9 container that fills the column", () => {
    render(<ProfileVideo />);

    const frame = getFrame();
    const wrapper = frame.parentElement as HTMLElement;
    expect(wrapper).not.toBeNull();

    // `aspect-video` is Tailwind's 16:9 ratio utility; `w-full` fills the
    // available column and the absolutely positioned iframe fills the wrapper.
    expect(wrapper.className).toContain("aspect-video");
    expect(wrapper.className).toContain("w-full");
    expect(frame.className).toContain("absolute");
    expect(frame.className).toContain("inset-0");
    expect(frame.className).toContain("h-full");
    expect(frame.className).toContain("w-full");
  });

  it("shows the Indonesian eyebrow and heading for the section", () => {
    render(<ProfileVideo />);

    const section = getSection();
    expect(within(section).getByText("Video Profil")).toBeInTheDocument();
    expect(
      within(section).getByRole("heading", {
        name: "Menenun di Troso, Jepara",
      }),
    ).toBeInTheDocument();
  });

  it("starts muted and unmutes the player when the sound toggle is pressed", async () => {
    const user = userEvent.setup();
    render(<ProfileVideo />);

    const frame = getFrame();
    const postMessage = vi.spyOn(frame.contentWindow as Window, "postMessage");

    const toggle = screen.getByRole("button", { name: /Nyalakan Suara/i });
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    await user.click(toggle);

    // Unmuting sends `unMute` followed by `setVolume` with full volume.
    const commands = postMessage.mock.calls.map(
      ([payload]) => JSON.parse(payload as string) as { func: string },
    );
    expect(commands.map((command) => command.func)).toEqual([
      "unMute",
      "setVolume",
    ]);

    const pressed = screen.getByRole("button", { name: /Bisukan Suara/i });
    expect(pressed).toHaveAttribute("aria-pressed", "true");
  });

  it("mutes the player again when the sound toggle is pressed twice", async () => {
    const user = userEvent.setup();
    render(<ProfileVideo />);

    const frame = getFrame();
    const postMessage = vi.spyOn(frame.contentWindow as Window, "postMessage");

    await user.click(screen.getByRole("button", { name: /Nyalakan Suara/i }));
    postMessage.mockClear();
    await user.click(screen.getByRole("button", { name: /Bisukan Suara/i }));

    const commands = postMessage.mock.calls.map(
      ([payload]) => JSON.parse(payload as string) as { func: string },
    );
    expect(commands.map((command) => command.func)).toEqual(["mute"]);
    expect(
      screen.getByRole("button", { name: /Nyalakan Suara/i }),
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("links out to the video on YouTube in a new tab", () => {
    render(<ProfileVideo />);

    const link = screen.getByRole("link", { name: /Tonton di YouTube/i });
    expect(link).toHaveAttribute("href", PROFILE_VIDEO_URL);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
