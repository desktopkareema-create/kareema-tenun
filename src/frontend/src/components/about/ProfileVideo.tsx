import {
  PROFILE_VIDEO_URL,
  buildProfileVideoEmbedUrl,
  sendPlayerCommand,
} from "@/lib/about-video";
import { Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

/**
 * ProfileVideo — the KAREEMA workshop profile film, embedded in the available
 * column of the Tentang Kami page. Autoplays muted (browsers block autoplay
 * with sound) with a visible control to enable audio.
 */
export function ProfileVideo() {
  const [isMuted, setIsMuted] = useState(true);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const embedUrl = buildProfileVideoEmbedUrl();

  const toggleSound = () => {
    const nextMuted = !isMuted;
    sendPlayerCommand(frameRef.current, nextMuted ? "mute" : "unMute");
    if (!nextMuted) {
      sendPlayerCommand(frameRef.current, "setVolume", [100]);
    }
    setIsMuted(nextMuted);
  };

  return (
    <section
      data-ocid="about.video_section"
      className="bg-background border-border border-b"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-accent font-mono text-[0.7rem] tracking-[0.32em] uppercase">
            Video Profil
          </p>
          <h2 className="text-balance mt-6 text-3xl leading-[1.15] sm:text-4xl">
            Menenun di Troso, Jepara
          </h2>
          <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
            Saksikan langsung bagaimana pengrajin kami bekerja di depan alat
            tenun bukan mesin — dari menyusun benang lungsi hingga selembar kain
            tenun tangan selesai.
          </p>
        </div>

        <figure className="border-border bg-card mt-14 border shadow-subtle">
          <div className="relative aspect-video w-full overflow-hidden bg-primary">
            <iframe
              ref={frameRef}
              data-ocid="about.video_frame"
              src={embedUrl}
              title="Video profil KAREEMA — proses menenun di Troso, Jepara"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
          <figcaption className="border-border flex flex-col gap-4 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-muted-foreground font-mono text-[0.65rem] tracking-[0.18em] uppercase">
              ATBM — Troso, Jepara
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                data-ocid="about.video_sound_toggle"
                onClick={toggleSound}
                aria-pressed={!isMuted}
                className="text-foreground hover:text-accent focus-visible:ring-ring inline-flex items-center gap-2 text-xs tracking-[0.12em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {isMuted ? (
                  <VolumeX className="size-4 shrink-0" aria-hidden="true" />
                ) : (
                  <Volume2 className="size-4 shrink-0" aria-hidden="true" />
                )}
                {isMuted ? "Nyalakan Suara" : "Bisukan Suara"}
              </button>
              <a
                href={PROFILE_VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="about.video_link"
                className="text-muted-foreground hover:text-accent focus-visible:ring-ring text-xs tracking-[0.12em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                Tonton di YouTube
              </a>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
