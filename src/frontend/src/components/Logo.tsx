import { cn } from "@/lib/utils";

interface LogoProps {
  /** `dark` renders the warm off-white artwork for dark surfaces such as the footer. */
  tone?: "light" | "dark";
  className?: string;
  /** Renders the emblem only, without the wordmark. */
  markOnly?: boolean;
  /**
   * `stacked` (default) shows the full emblem-above-wordmark lockup.
   * `horizontal` shows the emblem beside a legible wordmark — use it in
   * compact header slots where the stacked lockup would shrink the wordmark.
   */
  variant?: "stacked" | "horizontal";
}

/**
 * KAREEMA logo lockup.
 *
 * The supplied artwork is a transparent PNG: a tenun-inspired geometric
 * ornament above the KAREEMA wordmark, drawn in a warm near-black. Because the
 * mark is near-black it disappears on the dark footer, so the `dark` tone
 * swaps in a warm off-white variant of the same artwork rather than applying a
 * CSS filter — that keeps the brand's warm hue instead of turning it cold.
 *
 * The horizontal variant pairs the emblem with a real text wordmark so the
 * brand name stays readable at header size.
 */
export function Logo({
  tone = "light",
  className,
  markOnly = false,
  variant = "stacked",
}: LogoProps) {
  const isDark = tone === "dark";
  const markSrc = isDark
    ? "/assets/images/kareema-mark-light.png"
    : "/assets/images/kareema-mark.png";
  const lockupSrc = isDark
    ? "/assets/images/kareema-logo-light.png"
    : "/assets/images/kareema-logo.png";

  if (variant === "horizontal" && !markOnly) {
    return (
      <span className={cn("inline-flex items-center gap-3", className)}>
        <span className="relative block h-full aspect-square shrink-0">
          <img
            src={markSrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain"
            loading="eager"
            decoding="async"
          />
        </span>
        <span
          className={cn(
            "font-display text-foreground text-lg leading-none tracking-[0.32em] uppercase",
            isDark && "text-primary-foreground",
          )}
        >
          Kareema
        </span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center justify-center", className)}>
      <img
        src={markOnly ? markSrc : lockupSrc}
        alt="KAREEMA"
        className="h-full w-full object-contain"
        loading="eager"
        decoding="async"
      />
    </span>
  );
}
