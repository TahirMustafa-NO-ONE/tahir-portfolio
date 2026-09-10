# Portfolio Redesign Prompt: Removing the "AI-Generated" Look

Repo: `github.com/TahirMustafa-NO-ONE/tahir-portfolio` · Live: `tahirmustafa.dev`

**How to use this:** paste everything below into an AI coding assistant (Claude Code, Cursor, etc.) pointed at the `tahir-portfolio` repo, or work through it by hand. It's written as direct instructions for whoever implements it.

---

This is a Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui portfolio. Redesign the visual language site-wide toward something simple, modern, and minimalistic, and give the hero section a distinct, restrained "signature moment" using an animated frame instead of the current effects stack.

## 1. What's making this look AI-generated

Be specific about what to remove — these are the exact tells, with the current code behind each:

- **Glassmorphism everywhere.** `.glass` / `.glass-strong` in `globals.css` apply `backdrop-filter: blur(100px)` and `blur(200px)` respectively. The navbar (`components/layout/Navbar.tsx`) uses `backdrop-blur-md shadow-lg` when scrolled, and `backdrop-blur-lg shadow-xl` on the mobile menu.
- **Colored glow shadows.** `.glow-primary`, `.glow-accent`, `.text-glow` apply a `box-shadow`/`text-shadow` tinted with the brand hue. The hero's primary CTA carries a `glow-primary` class; the hero avatar sits inside rings with `shadow-[0_0_45px_...,0_0_100px_...,0_0_150px_...]`.
- **A three-color neon gradient.** `--primary: 250 100% 65%` (violet), `--accent: 180 80% 45%` (cyan), plus an extra `hsl(320 80% 60%)` magenta stop hard-coded into `.gradient-text`. Violet → cyan → magenta is about as close to a generic "AI slop" palette as it gets.
- **Floating blurred blobs.** The hero renders three `motion.div` "gradient orbs" (`.gradient-orb`, `filter: blur(80px)`) drifting in the background, plus a faint grid overlay on top of them.
- **Spinning/orbiting decoration for its own sake.** The avatar has two counter-rotating conic-gradient rings (`hero-ring-spin`, `hero-ring-reverse`) and five orbiting "sparkle" particles (see `data/hero.ts` — colors like `from-cyan-300 to-blue-500`, `from-fuchsia-400 to-violet-500`) circling it forever, plus three expanding "ripple" rings during image load, plus a large blurred black shadow blob beneath it that endlessly scales and fades.
- **Everything is very rounded.** `--radius: 1rem` (16px) cascades into buttons, cards, and badges, giving the soft, bubbly look common to generated UIs.
- **Shadow as the default way to show elevation**, instead of borders or spacing — see `.card-hover` (`box-shadow: 0 20px 40px -15px hsl(var(--primary)/0.2)`), repeated with variations across `ProjectsSection.tsx`, `CertificationsSection.tsx`, `ContactSection.tsx`, `ExperienceSection.tsx`, and `SkillsSection.tsx`.

None of this is "wrong" in isolation — stacked together, it's the single most recognizable AI-portfolio-template look. The fix isn't to swap colors, it's to remove most of these effects and let layout, type, and one restrained motion idea (the frame, in section 5) do the work instead.

## 2. New design tokens (`app/globals.css`, `tailwind.config.ts`)

Replace the current token set with something closer to this direction:

**A four-color palette: black, white, orange, and light brown.** Black and white are the base neutrals — they still just swap direction between light and dark mode. Orange is the one accent: used only for the frame lines, links, and the primary CTA, nothing else. Light brown isn't a separate color choice — it's what that same orange hue looks like with the saturation pulled down and the lightness pushed up, so it's the color everything *secondary* (muted text, borders, secondary surfaces, hover states) should draw from instead of plain gray. That relationship is what keeps a four-"color" palette still reading as restrained: there are really only two hues in play, a warm neutral and orange, just at different intensities.

A concrete starting point, in the same `H S% L%` format already used in the file:

| Token | Light mode | Dark mode | Role |
|---|---|---|---|
| `--background` | `36 33% 97%` — warm off-white | `20 15% 7%` — warm near-black | base surface |
| `--foreground` | `20 15% 8%` — warm near-black | `36 20% 95%` — warm off-white | base text |
| `--primary` | `24 78% 47%` — orange | `26 85% 58%` — orange, a touch brighter for contrast on dark | CTA, links, frame lines |
| `--secondary` / `--muted` | `28 30% 90%` — very light tan | `28 18% 16%` — deep muted brown | secondary surfaces, muted backgrounds |
| `--muted-foreground` | `28 20% 40%` — mid brown | `28 20% 65%` — light tan | secondary / de-emphasized text |
| `--border` / `--input` | `28 22% 85%` — light tan | `28 15% 20%` — dark warm taupe | dividers, outlines |

Drop `--accent` as a separate hue entirely — the cyan is gone, and nothing needs a third hue. Anywhere the old code reaches for `--accent`, point it at `--primary` or the muted-brown scale, whichever fits the spot.

- **Tighten the radius scale.** Drop `--radius` from `1rem` to something like `0.5rem` (or even `0.375rem`). This one variable change fixes the "bubbly" feeling across every shadcn component at once.
- **Shadows: soft, neutral, and rare.** When elevation is genuinely needed (a dropdown, a hovered card), use a small uncolored shadow (roughly `0 4px 12px rgba(0,0,0,0.08)`) — never a color-tinted glow, never a blur radius over ~20px.
- **Delete these utility classes outright:** `.glow-primary`, `.glow-accent`, `.text-glow`, `.gradient-orb`, `.animated-gradient`, `.border-gradient`. Pare `.glass`/`.glass-strong` down to one restrained utility (max ~8–12px blur) if you keep any translucent surface — or drop it for a plain solid/near-solid background with a 1px bottom border on scroll.
- **Typography stays mostly as-is.** Space Grotesk + JetBrains Mono (`tailwind.config.ts`) are genuinely good choices for a developer portfolio — geometric, a little technical, not generic. Keep them; let size and weight carry hierarchy instead of gradients and glow.

## 3. Site-wide sweep

Fixing the tokens above removes a lot of this automatically, but the following use hard-coded arbitrary values (`shadow-[...]`, inline `bg-[radial-gradient(...)]`) that won't inherit from a token change and need a manual pass:

- `components/layout/Navbar.tsx` — glass/shadow on scroll and on the mobile menu
- `components/sections/ProjectsSection.tsx` — the most hits after the hero; likely card glow-on-hover
- `components/sections/CertificationsSection.tsx`, `ContactSection.tsx`, `ExperienceSection.tsx`, `SkillsSection.tsx`, `TechStackSection.tsx`, `AboutSection.tsx`
- `components/ui/sidebar.tsx`, `components/ui/skeleton.tsx`

For cards specifically: replace "lift + colored glow" hover states with "lift a couple of pixels + border shifts from `border/50` to `border` (or to a touch of orange at low opacity)." That reads as considered, not decorative.

## 4. Hero section — what to keep vs. cut

**Keep:** the content and structure are fine as they are — greeting line, name, the rotating-role typewriter, description, two CTAs, social row, photo, scroll indicator. Don't rewrite the copy.

**Cut:**
- The three background gradient orbs and the grid overlay — go flat, or replace with one very subtle, low-opacity texture at most. Not both, and not three orbs.
- `gradient-text text-glow` on the name — set it in the solid foreground color. If you want one moment of color, apply the orange accent as a **solid** fill (no gradient, no text-shadow) to just the last name or one word.
- `glow-primary` on the CTA button — a solid, high-contrast fill (near-black on light / near-white on dark, or the accent color solid), with a plain hover state (`translateY(-1px)` plus a small neutral shadow, not a glow).
- The two spinning conic-gradient rings, the five orbiting sparkles, the three-ring expanding "ripple" load animation, and the pulsing black shadow blob under the avatar — all of it. This is the densest cluster of "AI-generated" tells in the codebase, and it's exactly where the new frame animation (below) takes over.
- The mouse-tracked 3D tilt on the avatar currently swings up to 30° (`maxTilt = 30` in `HeroSection.tsx`) — that's a lot. Either remove it or cut it to something like 5–8° so it reads as a subtle parallax detail, not a wobble.

## 5. The frame — hero's signature motion

This replaces the rings/sparkles/glow as the hero's one "wow" moment, and it should feel cool *because* it's restrained.

**Concept:** four independent corner brackets — like a camera viewfinder, or the crop marks in a design tool — framing the hero content. Do this tight around the photo specifically, since that's the spot currently overloaded with rings and sparkles; it gives a direct, obvious before/after.

**Construction:** each corner is a small L-shaped mark — two short line segments (roughly 24–32px each, 1–1.5px stroke) meeting at a right angle. Build it as an SVG with four `<path>` elements (one per corner) using `pathLength`/`stroke-dashoffset` so each can "draw itself in," or as absolutely-positioned `border-t`/`border-l` div pairs if you'd rather stay in pure CSS/Tailwind.

**Animation** (on mount, using `framer-motion`, already a dependency):
- Each corner's two segments animate `pathLength` from 0 → 1 over ~500–600ms, `ease: "easeOut"`.
- Stagger the four corners by ~80–120ms each (top-left → top-right → bottom-right → bottom-left) so the frame reads as drawing itself in, not popping in at once.
- No loop. It draws in once and stays static — that restraint is the point.
- Optional, subtle only: on hover of the photo, the corners nudge outward by 2–4px. Skip this if it feels like too much.
- Color: orange, full opacity, thin stroke only — no blur, no glow, no gradient fill. The optional corner label described below already lands in the light-brown/tan tone via `text-muted-foreground` once the token table above is applied, so the two warm tones end up doing complementary jobs without a third color being introduced.

**Optional detail that fits the site's existing personality:** the hero already opens with `<Hello World />` as a code-flavored greeting, and the stack uses JetBrains Mono. A tiny monospace label near one corner (something like `// tahir.dev`, or a small set of coordinates) in `text-xs text-muted-foreground` reinforces the frame without adding another color or effect.

**Simpler alternative**, if four separate corners feel like too much: a single thin rectangle (or circle, for the photo) that draws itself in one continuous stroke via `pathLength` 0 → 1, ~700ms, `ease: "easeOut"`, no loop. Pick one of the two concepts — don't combine both.

**Photo itself:** once the rings/sparkles are gone, keep the image treatment plain — a clean circle or rounded square, one thin static 1px border, and, if you want elevation, a single soft *neutral* shadow (`0 20px 40px rgba(0,0,0,0.12)`-ish, no color) in place of the current animated black blur blob underneath it.

## 6. Quick gut-check while implementing

- If a shadow has a color in it (other than plain black/neutral), cut it or make it colorless.
- If more than one accent hue is on screen at once, cut it to one.
- If something spins, orbits, or pulses forever with no purpose, remove it — motion should happen once on entrance or in response to input, not loop indefinitely in the background.
- If a `blur()` is over ~20px and it isn't a background/loading placeholder, reconsider it.
- If two effects are doing the same job (a glow *and* a gradient *and* a spin, all drawing attention to the same element), keep at most one.
