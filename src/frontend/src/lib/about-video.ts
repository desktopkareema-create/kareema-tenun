/** Profile video shown on the Tentang Kami page. */
export const PROFILE_VIDEO_ID = "g2HqSMtXf9I";

export const PROFILE_VIDEO_URL = `https://youtu.be/${PROFILE_VIDEO_ID}`;

/**
 * Builds the privacy-friendly YouTube embed URL with autoplay enabled.
 *
 * `mute=1` is required: browsers block autoplay with sound. `loop=1` only
 * loops a single video when `playlist` repeats the same video id.
 * `enablejsapi=1` is required so the parent page can control the player's
 * audio through the YouTube IFrame API `postMessage` commands.
 */
export function buildProfileVideoEmbedUrl(videoId: string = PROFILE_VIDEO_ID) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    playsinline: "1",
    loop: "1",
    playlist: videoId,
    rel: "0",
    enablejsapi: "1",
  });

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

/**
 * Sends a YouTube IFrame API command to an embedded player.
 *
 * The player only accepts these messages when the embed URL includes
 * `enablejsapi=1`. The command payload must use the documented shape:
 * `{ event: "command", func, args }`.
 */
export function sendPlayerCommand(
  frame: HTMLIFrameElement | null,
  func: "mute" | "unMute" | "setVolume",
  args: unknown[] = [],
) {
  if (!frame?.contentWindow) return;

  frame.contentWindow.postMessage(
    JSON.stringify({ event: "command", func, args }),
    "*",
  );
}
