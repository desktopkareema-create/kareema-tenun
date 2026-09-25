# Design Brief

## Direction

Tenun Monochrome Editorial — a gallery-white canvas for handwoven Jepara textiles, where product photography is the only ornament and a single soga-brown accent marks what matters.

## Tone

Refined editorial minimalism with a textile-craft soul: sharp corners, hairline rules, generous negative space, and one warm dye colour — never a generic AI SaaS gradient.

## Differentiation

The signature is a hairline "woven warp" line texture (`weave-lines` / `weave-lines-light`) used only inside accent-outlined surfaces and the dark band section, so the site itself reads like a bolt of tenun cloth.

## Color Palette

| Token      | OKLCH          | Role                                                        |
| ---------- | -------------- | ----------------------------------------------------------- |
| background | 0.975 0.004 85 | Warm gallery white — page canvas                            |
| foreground | 0.185 0.008 60 | Near-black ink (matches logo #1F1A17) — text, borders, CTAs |
| card       | 1 0 0          | Pure white product surfaces and header                      |
| primary    | 0.2 0.01 60    | Near-black primary buttons and dark band sections           |
| accent     | 0.52 0.11 55   | Soga brown — prices, active states, focus rings, hairlines  |
| muted      | 0.945 0.006 85 | Section alternation and quiet chips                         |

## Typography

- Display: Space Grotesk — all headings, uppercase, tracking 0.14em, logo wordmark
- Body: Figtree — paragraphs, product descriptions, nav, UI labels
- Mono: Geist Mono — prices, SKU, category codes, small numeric labels
- Scale: hero `text-4xl md:text-6xl lg:text-7xl font-display uppercase tracking-[0.14em]`, h2 `text-2xl md:text-4xl font-display uppercase tracking-[0.14em]`, label `text-[11px] font-semibold tracking-[0.3em] uppercase text-muted-foreground`, body `text-base md:text-lg leading-relaxed`

## Elevation & Depth

No drop shadows on cards — hierarchy comes from hairline borders (`border-border`), pure-white card surfaces on the warm canvas, and one `shadow-elevated` reserved for dialogs, the mobile sheet, and the floating WhatsApp button.

## Structural Zones

| Zone    | Background     | Border              | Notes                                                                      |
| ------- | -------------- | ------------------- | -------------------------------------------------------------------------- |
| Header  | `bg-card`      | `border-b`          | Sticky, 64px, logo lockup left, uppercase nav centre-right, WhatsApp right |
| Content | `bg-background`| —                   | Alternates `bg-background` / `bg-muted/40`; dark band uses `bg-primary`    |
| Footer  | `bg-primary`   | `border-t`          | Near-black, white emblem, contact + nav columns, `weave-lines-light`       |

## Spacing & Rhythm

Sections `py-20 md:py-28`, container `max-w-7xl` with `px-6`; product grid `gap-x-8 gap-y-12`; micro-spacing in 4/8/12px steps; hairline `border-t` above every section label.

## Component Patterns

- Buttons: 2px radius, solid near-black `bg-primary` primary, outlined `border-foreground` secondary, accent underline on hover, `transition-smooth`
- Cards: 2px radius, `bg-card`, `border border-border`, no shadow, image zoom `scale-[1.03]` on hover, price in accent mono
- Badges: 0px radius, 1px accent border, transparent fill, uppercase 10px tracking-[0.25em]

## Motion

- Entrance: `animate-fade-up` staggered 80ms per grid item, 0.6s cubic-bezier(0.22,1,0.36,1)
- Hover: image `scale-[1.03]` 500ms, underline reveal on links, `transition-smooth` on all interactive surfaces
- Decorative: `animate-weave-drift` on the woven warp texture in the dark band and footer only

## Constraints

- Strict monochrome-plus-one-accent: never introduce a second hue family
- No gradients on page backgrounds; no glow or neon shadows
- Uppercase wide-tracked display type for headings only — body copy stays sentence case
- All UI copy in Bahasa Indonesia; prices as `Rp 1.425.000`
- Logo is monochrome: near-black on light surfaces, white on the dark footer

## Signature Detail

Texture/material — a CSS repeating hairline "woven warp" pattern that turns accent-framed panels and the dark band into the surface of a loom, making the brand's craft literal without a single decorative illustration.
