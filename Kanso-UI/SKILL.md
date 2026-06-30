---
name: constructional-design
version: '1.0'
type: operating-procedure
companion: design.md
description: "Operational procedure for applying the Constructional Design philosophy to a real codebase — as a retrofit into an existing project, or as the foundation of a new one. Written for an AI coding agent. Read design.md for what the rules mean and why; read this file for the order to do things in, what's safe to touch, and how to validate the result."
---

# Constructional Design — Operating Procedure

`design.md` is the law: it defines the ten pillars, the token roles, the primitives, the forbidden patterns. This file is the procedure: the sequence an agent runs through on an actual task, what's safe to change versus what requires permission, and the literal checklist to run before calling the work done.

Read this file fully before touching code. Re-open `design.md` whenever you need the precise definition of a pillar, a token value, or a primitive — don't work from memory of it once a task gets long.

## 0. Triage — which mode is this?

Before anything else, answer one question: **does this project already have a UI?**

- A real codebase with existing pages, components, and a working visual identity, even an inconsistent one → **Retrofit Mode** (Section 2).
- An empty repo, a fresh `create-next-app`, a blank Figma file, or an explicit "start from scratch" / "new project" request → **From-Scratch Mode** (Section 3).
- A new feature or page inside an existing product → **Retrofit Mode**, scoped to the surface you're building — match the rest of the product's voice, don't introduce a second design language for one page.

When uncertain, default to Retrofit Mode. Treating an existing project as a blank slate is the single most common way this system causes damage instead of improvement.

## 1. Analysis pass (always first, both modes)

Run this before writing or changing any UI code. Keep it short — a few minutes of looking, not a full audit report — but do not skip it.

**Locate the current design surface.**

- Token/theme files: `tailwind.config.*`, `globals.css`, `theme.ts`, `design-tokens.json`, CSS custom properties in `:root`.
- Component layer: shadcn/ui (`components/ui/`), MUI, Chakra, a custom kit, or raw markup with utility classes.
- Look for an existing color system — is there already a neutral/foreground/border separation, or is gray picked ad hoc per component?

**Read the current expression level.** Grep or skim for:

- `box-shadow`, `backdrop-blur`, `drop-shadow`, gradient backgrounds — how materially "soft" is the current UI?
- Border usage — are containers four-sided by default, or already minimal?
- Existing monospace usage — is there already a metadata/code voice, or is everything one typeface?

**Read the current spacing rhythm.** Is it Tailwind's default 4px scale, an 8px scale, or arbitrary values scattered through the codebase? You will align new tokens to whatever already dominates rather than forcing an unrelated scale on top.

**Classify each surface you'll touch** against the Surface Modes table in `design.md` — marketing/hero, docs/content, product/dashboard, or dense admin — since the ghost-geometry and coordinate-tag budget differs by an order of magnitude between them.

**Write a one-paragraph internal finding** before changing anything: what's already structurally sound and should be kept, what's missing, and what — if anything — actively conflicts with Constructional Design (e.g., a brand built entirely on glassmorphism). Surface real conflicts to the user instead of silently overriding their brand.

## 2. Retrofit Mode

The governing rule: **this system is additive until told otherwise.** It introduces structure into the gaps of an existing design, it does not replace a working visual identity because a more "engineered" one is available.

### Non-negotiables — never do these without being explicitly asked

- Don't change the brand hue, the existing accent color, or swap the established typeface.
- Don't rename or restructure existing component props/APIs to fit the new vocabulary — wrap or extend, don't break callers.
- Don't do a global find-and-replace across the whole codebase for any single rule below. Apply rules to the files you are actually touching for the task at hand; let the rest of the system catch up over time.
- Don't remove existing shadows/elevation wholesale as a drive-by cleanup — that's a visual identity change, not a structural fix, and belongs in its own explicitly-requested pass.

### What's safe to introduce additively, and in what order

Work through these in passes. Each pass should be independently shippable — don't block on finishing the whole list before any of it lands.

1. **Derive, don't replace, the border color.** Add a `--line` (and `--ghost`) token derived from the project's existing foreground/ink color via low alpha, instead of touching every hardcoded `gray-200`-style border one by one. This single token swap is the highest-leverage, lowest-risk change in the whole system — it makes light/dark stay correct automatically without anyone re-deciding it.
2. **Convert border soup where you're already editing.** If a component you're touching has a four-sided border that isn't meant to read as a discrete, liftable object (see Pillar 7 in `design.md`), convert it to a partial border or a Rail Divider — but only on components already in scope for the task, not as a separate sweep.
3. **Add `--grid-unit` and named alignment tracks as new tokens.** Don't retrofit old layout math to suddenly hit grid multiples; have _new_ components consume the tracks, and let old layouts migrate naturally as they're touched for other reasons.
4. **Add Layer 3 annotation type only where real metadata already exists.** A timestamp, a build ID, a status string that's already in the data — promote its display to the monospace Annotation role. Never invent new label content just to have something to annotate (this is a direct Pillar 8 violation: see `design.md`'s Forbidden Patterns).
5. **Replace box-shadow elevation with border + background-step only on components you're already modifying.** Not a global pass.
6. **Run the validation checklist (Section 4) scoped to the files you changed**, not the whole app.

### Ask before doing

Flag these to the user rather than doing them unprompted, even if a rule above seems to call for it: changing the product's hue or typeface family, removing existing shadows across the app, changing the border-radius tier app-wide, or introducing a coordinate-tag notation when one doesn't already conceptually exist in the product's content.

### Conflict resolution

If an existing project convention conflicts with a Constructional Design rule, the existing convention wins by default. State the conflict plainly in your response ("this card currently uses a drop-shadow; Constructional Design would use a border + background step instead — want me to convert it, or leave it as-is?") rather than silently picking a side.

## 3. From-Scratch Mode

The governing rule: **tokens and structure before content polish.** Build bottom-up through the Blueprint Layers (`design.md`, Pillar 9) — you cannot meaningfully add Layer 3 annotation or Layer 4 ghost geometry to a screen that doesn't have its Layer 1 structure decided yet.

Build order:

1. **Tokens first.** Define `canvas`, `surface`, `ink`, `ink-muted`, `line`, `accent`, `ghost`, state colors, the spacing scale, `--grid-unit`, and the four radius tiers — as real CSS variables — before a single component exists. Use the `design.md` token table as the starting point; change the `--hue` value and the spacing scale's base unit to fit the project, but keep the role names and the alpha-derivation relationship between `ink` → `line` → `ghost` intact.
2. **Canvas Frame + Engineering Margin.** Set up the outer wrapper and the margin-by-breakpoint scale before building individual pages.
3. **Title Block + primary navigation.** This is the first real Layer 1 structure most users will see; get the bottom-border-only treatment right here since it sets the tone for every other boundary in the product.
4. **Core primitives, in priority order:** Structural Card → Field Row → Rail Divider → Bordered Icon Tile → Status Pill → Segment Control. Build these as reusable components/utility classes immediately, even if only one or two are used on the first page — they're what every later screen will assemble from.
5. **Pick exactly one coordinate notation before any label ships**, and put it in a shared constant or a short comment at the top of wherever your design tokens live, so a future pass (human or agent) doesn't invent a second one. See Pillar 4 in `design.md` for the menu of reasonable options.
6. **Decide Surface Mode per page type up front.** Mark, even informally, which pages are marketing/hero (high expression budget) versus product/dashboard (low). This single decision prevents the most common from-scratch failure: a beautiful hero that gets cloned wholesale into a data-dense settings page.
7. **Layer in Annotation and Ghost last**, only after structure and content exist and only at the budget the page's Surface Mode allows.

### Stack-specific notes

- **Tailwind v4:** define roles inside `@theme` using `oklch()`; this gets you the perceptual-uniformity benefit described in `design.md` for free.
- **shadcn/ui-based projects:** map Constructional Design's roles onto shadcn's existing `background` / `foreground` / `border` / `muted` variable names instead of inventing a parallel token set — `line` becomes a low-alpha derivation of `border`, `ink-muted` aligns with `muted-foreground`. This keeps drop-in shadcn components visually compatible without a parallel theming system.
- **Plain CSS / no framework:** use the `:root` block from `design.md` directly as a starting point.

## 4. Reference genre, not reference implementation

`design.md` names three real products this philosophy was studied from. The point of naming them is to make clear what's being translated and what's deliberately left behind — never to recreate their specific look. Use this table when you catch yourself reaching for a literal element from one of them.

| Observed trait                                                                              | Don't copy this                                           | Generalize to this rule instead                                                                                                     |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| chanhdai.com's `FIG_001` / `FIG_002` tags on its hero illustration and live analytics block | The literal `FIG_xxx` string as a skin applied everywhere | Pillar 4: pick one notation for the _whole product_, attach it only to a genuinely real reference point                             |
| chanhdai.com's numbered stack categories (`01 Language`, `02 Frontend`, …)                  | That specific category list or numbering style            | Construction Coordinates used as real sequence labels in the Annotation layer — numbering only things that are actually ordered     |
| Vengeance UI's glow / glass-panel / motion-forward identity                                 | Any backdrop-blur, neon glow, or glass-panel CSS          | Forbidden Patterns: border + flat background-step instead of glass; motion is confirmatory, not performative                        |
| Vengeance UI's `01/03`, `02/03`, `03/03` progress-style section labels                      | The literal label format                                  | Legitimate Pillar 4 usage _only_ when the number is a real step indicator the user is moving through                                |
| ServerCN's "Foundations" / "Blueprints" product taxonomy                                    | Importing their naming as your own section names          | Pillar 9 (Blueprint Layers) is the structural analogy already in this system — keep your own product's naming independent of theirs |
| ServerCN's CLI-first, code-ownership install ergonomics                                     | N/A — not a visual pattern                                | Out of scope for this visual system; unrelated to Constructional Design                                                             |

If you can't find a row above for a pattern you're tempted to copy, default to: would I keep this if I deleted the source's branding? If not, it's their identity, not a structural principle — leave it out.

## 5. Primitive implementation cheatsheet

Quick lookup during implementation. Canonical definitions and full reasoning live in `design.md` → Component Primitives; this is the fast version.

| Primitive          | Reach for it when                                                                  | Minimal shape                                                                                                                            |
| ------------------ | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Structural Card    | A discrete content container that should read as liftable                          | Border on sides meeting another region (often top, or top+one side); all four sides only if meant to be lifted out, e.g. a modal         |
| Field Row          | Any label/value pair — profile field, settings row, API param, metric label        | label in `label-sm`/`ink-muted`, value in body type/`ink`, optional Bordered Icon Tile before it, no card wrapper around the pair itself |
| Rail Divider       | Separating repeated siblings — list rows, nav items, table rows                    | One hairline _between_ items, never a border around each one                                                                             |
| Bordered Icon Tile | A single icon needs a frame                                                        | Small square, `radius-sm` max, 1px `line` border; always paired with a Field Row or nav label, never floats alone                        |
| Coordinate Tag     | A diagram, step, or revision needs a real reference label                          | Monospace, `ink-muted`, small; uses the one notation chosen for the product                                                              |
| Status Pill        | A button that triggers something, or a badge reporting state                       | The only primitive allowed `radius-full`                                                                                                 |
| Segment Control    | Tab/filter switching                                                               | Tracked, small labels, underline or background-step indicator — never a pill per tab                                                     |
| Density Grid       | Encoding a real value across many small cells — heatmap, calendar, status overview | Uniform cells, fill encodes the value, no per-cell borders                                                                               |
| Ghost Panel        | A hero, empty state, or auth screen needs atmosphere                               | Layer 4 only — stroke-only, ≤10% opacity, never behind dense content                                                                     |
| Margin Strip       | Metadata that belongs in the Engineering Margin, not the content column            | Coordinate tag, breadcrumb, version stamp, last-updated date — always Layer 3 type                                                       |

## 6. Layout, spacing, border & grid — wiring checklist

- Define the spacing scale and `--grid-unit` as the _first_ commit in From-Scratch Mode; add them as new, non-deleting tokens in Retrofit Mode.
- Engineering Margin: wire the four breakpoint values from `design.md` before building individual page layouts, so every page inherits the same margin behavior instead of each page picking its own.
- Border decision, run per element as you build it:
  - Boundary inside continuous flow (header bottom, sidebar edge, list-row top) → one side.
  - Two regions meeting at a corner → two sides max.
  - Reads as a discrete, liftable object → all four sides.
  - Separates repeated siblings → no border at all; use a Rail Divider.
- Never hardcode a px/rem value off the scale. If a real new value is needed, add it to the scale as a named token first, then consume it — don't one-off it inline in a single component.
- Radius: four tiers only (`radius-0`, `radius-sm`, `radius-md`, `radius-full`). `radius-full` is reserved for Status Pills; if you're reaching for it on a card or panel, stop and re-read Pillar 7.

## 7. Forbidden patterns — implementation-time scan

Run this scan on the files you touched before calling a task finished. Full reasoning for each item lives in `design.md` → Forbidden Patterns.

- Search for `box-shadow` outside of focus rings — should be border + background-step instead.
- Search for `backdrop-blur`, `filter: blur`, glow/neon utility classes, gradient meshes.
- Search for decorative gradients not tied to a real numeric range (a progress fill or heat scale is fine; a hero background gradient usually isn't).
- Count borders per screen — if everything has a four-sided border, that's border soup; convert non-liftable containers to partial borders or Rail Dividers.
- Search for coordinate-looking labels (`FIG`, `REF`, `§`, `01/0x` patterns) and confirm each one has a genuine referent — if you can't name what it points to, cut it.
- Check transitions/animations for elastic/bounce easing or scroll-triggered parallax used purely for "liveliness" — replace with a confirmatory state change or remove.
- Confirm no more than two typefaces are in use, and that no display/script font appears in Layers 1–3.
- Confirm `radius-full` appears only on actions/badges, never on cards or panels.

## 8. Validation & self-check (run before finishing)

This is the literal, line-by-line version of the five qualitative tests defined in `design.md` → Validation Principles. Run it, and report the result, for any nontrivial Constructional Design task — not just a mental pass, an explicit checklist in your response.

- [ ] **One-sentence test** — for every new visual element introduced this session, can you state its structural or informational reason in one sentence?
- [ ] **Grayscale test** — if you desaturated this screen, would hierarchy still read correctly (what to look at first, second, third)?
- [ ] **Alignment-drift test** — pick three coordinates that should match (an icon rail, a content edge, a header/footer boundary): do the computed values match exactly, not just visually close?
- [ ] **Removal test** — if all ghost geometry and illustrative coordinate tags were hidden, would comprehension change? It should only change mood.
- [ ] **Expression-budget test** — does the ornament density on this screen match its Surface Mode (dialed up for a hero, near-zero for a dense data table)?
- [ ] **Accessibility minimums** — does every structural border clear 3:1 contrast? Is the focus ring a real visible 2px ring? Is Layer 3 annotation never the _sole_ carrier of critical information? Is `prefers-reduced-motion` respected?
- [ ] **Retrofit-only:** did you touch only what the task required? Did you avoid introducing any coordinate tag or label with nothing real behind it? Did you flag (rather than silently resolve) any conflict with the project's existing brand?
- [ ] **From-scratch-only:** were tokens and structure defined before content polish and Layer 3/4 ornament? Is there exactly one coordinate notation in use across the whole product so far?

## 9. How to talk about this work

Describe changes in plain product language when talking to the user — "I switched these card borders to match the rest of the dashboard's hairline style" rather than "applying Pillar 7." Reserve the pillar vocabulary for your own internal reasoning, for code comments where it genuinely helps a future maintainer, and for cross-references back to `design.md`.
