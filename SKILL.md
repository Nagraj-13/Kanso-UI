---
name: acid-interface-design
description: Implements "Architectural Constructional Interface Design" (ACID) — the dark, technical-blueprint/engineering-schematic UI aesthetic used by dev portfolios and component registries such as chanhdai.com (full-bleed hairline rules, diagonal-stripe section dividers, bordered panel grids with persistent vertical rail borders, monospace metadata labels, FIG_NNN figure captions, small bordered icon badges). Use this whenever someone wants to build or restyle a portfolio, landing page, docs site, changelog, or dashboard with a dark "blueprint", "spec sheet", or "engineering drawing" look, asks for full-bleed hairline dividers, diagonal hatch/stripe section breaks, or a bordered grid layout with vertical rails. Also trigger when someone asks specifically when to use a "striped" vs a "normal"/plain divider between sections, asks to recreate the chanhdai.com / shadcn-registry visual style, or wants to add this kind of technical/architectural design system to an existing project. Provides exact copy-paste CSS (vanilla and Tailwind v4), the decision rule for which divider/section-break tier to use where, and a working reference page.
---

# Architectural Constructional Interface Design (ACID)

ACID is a name for a specific design language: a website rendered like a piece of technical documentation — a spec sheet, a blueprint, an engineering drawing — rather than a typical marketing page. Everything reads as if it were ruled, labeled, and filed: full-bleed hairlines that run edge-to-edge like ruled paper, monospace metadata next to every fact, small bordered icon chips, and figures captioned like `FIG_001`. It's the language behind [chanhdai.com](https://chanhdai.com) (Chánh Đại's portfolio and shadcn-style component registry — MIT licensed, [source](https://github.com/ncdai/chanhdai.com)), and it generalizes well to any dark, dense, technically-minded site: portfolios, docs, dashboards, registries, changelogs.

This skill gives you the primitives, the exact CSS, and — the question that's easy to get wrong — **the rule for which of the two divider styles to reach for.**

## The core rule: striped vs. plain dividers

The system has two structurally different horizontal rules, and conflating them is the fastest way for a clone of this style to fall flat.

**Plain hairline** (`.line-top` / `.line-bottom`) — a 1px line. This is the workhorse. It's the edge of _everything_: the top and bottom of every panel, the rule under a heading, the line between two rows in a list, the border under a card. You'll use dozens of these on a single page. They're low-contrast on purpose — a dedicated `--line` token, deliberately subtler than your general `--border` color — so they read as structure you feel, not decoration you consciously notice.

**Diagonal-stripe band** (`.stripe-divider`) — a thicker band (32px by default) filled with diagonal hatching, using the _same_ line color so it reads as "a denser patch of the same material," not a different color competing for attention. This is reserved for the boundary between genuinely distinct top-level sections — an actual change of topic or dataset. On the source site it shows up exactly once between each major block of the homepage (profile → about → testimonials → components → blog → tech stack → ...) and nowhere else — never between two rows of the same list, never around a single card.

The test to apply: **are the two things on either side of the line different rows of the same dataset, or genuinely different datasets?** Same dataset — two list items, a header and its content, two cards in a grid, a nav bar and the section under it — gets a plain hairline. Different dataset / different topic entirely — end of the bio, start of the testimonials wall; end of one component group, start of another — gets the stripe. If you're tempted to stripe-divide a section purely because it looks striking, that's the signal you're overusing it: on the source site roughly 90% of the rules on any given page are plain hairlines. The stripe stays meaningful _because_ it's rare.

A third, optional variant exists for completeness: a **dashed hairline** (`.dashed-bottom`), used occasionally inside dense documentation-style content as a softer alternative to the plain line — a tier between "plain" and "stripe." Most projects won't need it; reach for it only if two tiers aren't enough.

```css
/* the shape of the rule — full implementation in assets/acid.css */
.line-bottom {
  /* 1px,  --line color,            breaks out full-bleed */
}
.dashed-bottom {
  /* 1px,  --line color, dashed,     breaks out full-bleed */
}
.stripe-divider {
  /* 32px, diagonal hatch in --line, breaks out full-bleed */
}
```

## Why the lines read as "structural" instead of boxed-in

Every one of these rules uses the same trick: the line's container is `position: relative`, and a pseudo-element breaks out to `left: -100vw; width: 200vw`, so a 1px (or 32px) strip spans the _entire viewport_ — regardless of how narrow the content column is. That's what makes a centered ~768px column read as if it were sliced out of an infinite ruled page, rather than a box with borders. Don't skip this part: a divider that stops at the column edge looks like an ordinary card border, not like this system. Full code and the gotchas that make it silently fail (overflow ancestors, z-index, background color) are in `references/dividers-and-structure.md`.

## The other primitives, at a glance

| Primitive              | What it is                                                                                                                                | Documented in                          |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| **Panel**              | The section wrapper: top+bottom hairline, solid left/right "rail" borders, a header slot with its own bottom hairline                     | `references/dividers-and-structure.md` |
| **Icon badge**         | 24px rounded-square chip (border + muted fill + a thin background-offset ring) used for every small icon — nav, metadata rows, grid items | `references/components.md`             |
| **FIG_NNN caption**    | Monospace, muted, bottom-right of any illustration or figure — the "this is a labeled technical drawing" signal                           | `references/components.md`             |
| **Notification dot**   | 8px rounded-square dot, top-right of a badge, for "new / updated" flags                                                                   | `references/components.md`             |
| **Type system**        | Sans for UI text, **monospace for every fact / metadata / timestamp**, serif reserved for quoted text only                                | `references/tokens-and-type.md`        |
| **Color tokens**       | A neutral (zinc) palette plus one extra token, `--line`, deliberately lower-contrast than `--border`                                      | `references/tokens-and-type.md`        |
| **Grid-with-dividers** | Adding internal vertical + horizontal hairlines to a CSS grid without doubling lines at shared edges                                      | `references/dividers-and-structure.md` |

## Quickstart: applying this to a project

1. Copy `assets/acid.css` into the project (or `assets/acid-tailwind-v4.css` if it already uses Tailwind v4) and import it after your base reset / Tailwind import.
2. If you don't want the default neutral zinc palette, retarget the color tokens — see `references/tokens-and-type.md` for what each one drives — but keep `--line` lower-contrast than `--border`; that gap is what makes the structural lines feel quiet.
3. Set the type stack: one sans face for everything, and route anything labeled `font-mono` in the CSS (metadata, timestamps, badges, captions) through a monospace face. A serif for quoted/testimonial text is optional polish, not load-bearing.
4. Wrap each top-level section of the page in `.panel` (see the `Panel` pattern in `references/dividers-and-structure.md`, including a React version if useful). That alone gives you the top/bottom hairline and the vertical rails.
5. Between top-level panels, drop a `.stripe-divider` — full-bleed, with `border-x` on it too, so the rails visually run _through_ it rather than stopping. Don't put one inside a panel between its own rows; that's what plain hairlines are for.
6. For any "fact + icon" row (a role, a location, a stat), reuse the icon-badge pattern in `references/components.md` instead of inventing a new icon treatment — consistency in that one primitive carries a lot of the overall feel.
7. Open `assets/demo.html` in a browser to see all of this assembled with placeholder content, and copy sections straight out of it.

## Judgment calls worth making deliberately

This system is dense and rule-heavy by design, but it stops working the moment it's applied mechanically everywhere.

Resist stripe-dividing content that's really one continuous idea just to add visual rhythm — if every section break "counts," readers stop reading any of them as meaningful. The full-bleed trick needs a clear path to the viewport edge: no `overflow: hidden`/`clip` ancestor between the divider and the screen edge, and the breakout pseudo-element wants to sit behind any ancestor's opaque background or it'll simply be covered — a divider that silently isn't showing is almost always one of these two things. If a container has an opaque background (e.g. `bg-[#fafafa]` or `dark:bg-zinc-950`), either create a stacking context on the background container using `isolate`/`isolation: isolate`, or change the pseudo-elements to use `z-index: 1` combined with `pointer-events: none` to draw them safely above backgrounds without intercepting user input (more in `references/dividers-and-structure.md`). This is a dark-mode-first system; it holds up in light mode too (token values are in `references/tokens-and-type.md`), but the hairline-as-structure effect is strongest against a near-black background. Treat monospace-for-metadata as a real signal rather than a font choice — using it on some facts and not others reads as inconsistency, not style. And keep the content column width constant across the page (the source uses 768px / Tailwind's `max-w-3xl`); the rails and full-bleed dividers only feel convincing when every panel shares exactly the same left/right edges.

## Attribution

This design language is generalized from [chanhdai.com](https://chanhdai.com) by Chánh Đại ([source, MIT licensed](https://github.com/ncdai/chanhdai.com)) — credit it if you ship something visibly derived from it. The reference files here document the reusable _pattern_ (structure, CSS, tokens), not the original site's personal content — its name, bio, testimonials, or logo mark. Swap in your own content; that part was never the point.
