import {
  PROFILE_VIDEO_ID,
  PROFILE_VIDEO_URL,
  buildProfileVideoEmbedUrl,
  sendPlayerCommand,
} from "@/lib/about-video";
import { describe, expect, it, vi } from "vitest";

/**
 * Contract for the Tentang Kami profile video. The accepted request pins the
 * exact YouTube video, autoplay, and the privacy-friendly embed host, so the
 * URL builder is asserted parameter by parameter rather than as one opaque
 * string.
 */
describe("about-video data", () => {
  it("points at the accepted YouTube video", () => {
    expect(PROFILE_VIDEO_ID).toBe("g2HqSMtXf9I");
    expect(PROFILE_VIDEO_URL).toBe("https://youtu.be/g2HqSMtXf9I");
  });

  it("builds a youtube-nocookie embed URL for the accepted video", () => {
    const url = new URL(buildProfileVideoEmbedUrl());

    expect(url.origin).toBe("https://www.youtube-nocookie.com");
    expect(url.pathname).toBe(`/embed/${PROFILE_VIDEO_ID}`);
  });

  it("enables autoplay, mute, inline playback, and the JS API", () => {
    const params = new URL(buildProfileVideoEmbedUrl()).searchParams;

    // Autoplay is the accepted behavior; mute is what makes it possible.
    expect(params.get("autoplay")).toBe("1");
    expect(params.get("mute")).toBe("1");
    expect(params.get("playsinline")).toBe("1");
    expect(params.get("enablejsapi")).toBe("1");
  });

  it("loops the single video by repeating it in the playlist parameter", () => {
    const params = new URL(buildProfileVideoEmbedUrl()).searchParams;

    expect(params.get("loop")).toBe("1");
    expect(params.get("playlist")).toBe(PROFILE_VIDEO_ID);
  });

  it("builds the embed URL for an explicit video id", () => {
    const url = new URL(buildProfileVideoEmbedUrl("abc123"));

    expect(url.pathname).toBe("/embed/abc123");
    expect(url.searchParams.get("playlist")).toBe("abc123");
  });

  it("posts a YouTube IFrame API command to the frame's content window", () => {
    const postMessage = vi.fn();
    const frame = {
      contentWindow: { postMessage },
    } as unknown as HTMLIFrameElement;

    sendPlayerCommand(frame, "unMute", [100]);

    expect(postMessage).toHaveBeenCalledTimes(1);
    const [payload, targetOrigin] = postMessage.mock.calls[0];
    expect(JSON.parse(payload)).toEqual({
      event: "command",
      func: "unMute",
      args: [100],
    });
    expect(targetOrigin).toBe("*");
  });

  it("does nothing when there is no frame or content window", () => {
    expect(() => sendPlayerCommand(null, "mute")).not.toThrow();
    expect(() =>
      sendPlayerCommand({ contentWindow: null } as HTMLIFrameElement, "mute"),
    ).not.toThrow();
  });
});
