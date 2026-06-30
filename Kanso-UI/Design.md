---
name: constructional-design
version: '1.0'
type: design-philosophy
companion: skill.md
description: 'A general-purpose interface philosophy for interfaces that read as engineered rather than decorated. Defines the vocabulary, token roles, primitives, and validation tests that make a UI feel drafted, dimensioned, and assembled. Product-agnostic by design — every concrete value below is a starting point, not a mandate.'
---

# Constructional Design

> An interface should look like it was drawn by someone who had to account for every line.

## Thesis

Most interfaces communicate hierarchy through _material_: shadow to suggest elevation, blur to suggest glass, gradient to suggest light hitting a surface, saturated color to suggest importance. Constructional Design starts from a different object — not a material sitting in light, but a **drawing**: a technical elevation, a circuit silkscreen, a drafting-table sheet, a spec page. Drawings don't have shadows. They communicate everything — what matters, what's connected to what, what's still provisional — through line, proportion, label, and position alone.

One test runs underneath every rule in this document:

> **Can you name, in one sentence, the structural or informational reason this visual element exists?** If not, it doesn't belong here — it's decoration that wandered in from a different philosophy.

This document defines that philosophy in enough detail to apply consistently across a component, a page, a dashboard, a portfolio, a documentation site, an admin panel, or a full product, without collapsing into a single "look." It's written to be read start to finish by a person, and to be followed step by step by an AI agent — neither audience should need the other to make sense of it. The companion file, `skill.md`, turns these rules into an operating procedure: when to apply the system, how to retrofit it into an existing codebase versus build it from scratch, and a literal checklist for validating the result.

## Where this comes from, and where it deliberately diverges

This system was built by studying a specific, current genre of developer-facing product sites: component and pattern _registries_ distributed the shadcn way — install by copying real code into your project, not importing a package — built and marketed by design engineers as proof of craft. Three sites are worth knowing if you want to see the genre firsthand. **chanhdai.com** is a design engineer's portfolio and shadcn registry built around hairline structure, monospace metadata rows, and a recurring blueprint-style figure label attached to its hero illustration and its live analytics block. **Vengeance UI** is an animated-component registry organized around glow, glass panels, and motion-forward interaction. **ServerCN** is a backend-pattern registry that borrows shadcn's code-ownership philosophy for server code and — tellingly — names its composed patterns "Blueprints" and its starter kits "Foundations."

Constructional Design keeps this genre's structural instincts: hairline edges instead of shadow, monospace as a semantic signal rather than a font choice, CLI-flavored install ergonomics, real coordinate labeling. It deliberately drops what doesn't generalize. There's no glass, blur, or glow anywhere in this system — Vengeance UI's interaction-first identity is closer to the _opposite_ of what's being built here, not its inspiration. No single illustration style, monospace face, or near-black hex is mandatory — a fixed visual signature is a brand, not a system, and this one needs to survive a re-theme, a light mode, and a dense data table equally well. Motion is treated as confirmation, never performance (see **Forbidden Patterns**). Nothing below is lifted line-for-line from any of the three; every rule is stated as a translatable principle, generalized past the one product it was first noticed on.

---

## The Ten Pillars

Each pillar pairs a definition with a translation — the concrete rule that turns the idea into code.

### 1. Constructional Design (the root idea)

Treat the interface as something _assembled_, not _applied_. Every visible mark — a line, a shift in weight, a label — should be traceable to a reason a structural engineer or technical writer would recognize: it marks a boundary, it measures a distance, it names a part. The opposite approach borrows from material metaphors — paper, glass, fabric sitting in light. This one borrows from drawing metaphors — elevations, schematics, sheet borders, exploded-view diagrams.

**Translation:** before adding any visual element, run the one-sentence test above. Keep running it for the lifetime of the project. This is a standing discipline, not a setup step you finish once.

### 2. Line Infinity Grid

A grid of hairline rules is assumed to extend conceptually past the edges of whatever's on screen, the way graph paper is bigger than the sketch pinned to it. The grid isn't owned by a page or a component — it's the one coordinate plane every surface in the product is drawn on, so a dashboard, a landing page, and a settings panel shipped a year apart still feel surveyed from the same table.

**Translation:** define one base module as a token (`--grid-unit`). Every structural width, height, and gap is a multiple of it. Real divider lines — a header's bottom rule, a sidebar's edge, a section break — land exactly on grid multiples, not wherever the content happened to end. In low-density zones (a hero, an empty state) the grid can be rendered literally as a faint repeating background to make the plane visible; everywhere else it stays implicit.

### 3. Alignment Memory

Once a coordinate is established anywhere in the interface — the left edge of body copy, the x-position where icons start, the baseline a column of numbers sits on — the system _remembers_ it, and every later component reuses that exact coordinate instead of negotiating its own. This is what makes a constructed layout feel surveyed instead of eyeballed: nothing is "close enough."

**Translation:** maintain a small, named set of alignment tracks as real tokens — for example `--rail-icon`, `--rail-text`, `--rail-content` — not just a spacing scale, but specific positions that recur. A new component pulls from an existing track before it invents a new offset. Two elements on the same screen that look "about aligned" but differ by a handful of pixels is the most common failure of this pillar. Treat it as a layout bug, not rounding error.

### 4. Construction Coordinates

Small monospace annotations that label a piece of the interface the way a drafting sheet labels a detail: a figure number, a section mark, a grid reference. They give a reader — or another engineer — a name to point at.

**Translation:** pick **one** coordinate notation for the whole product and reuse it everywhere a label is needed; don't run three competing notations at once. Reasonable options: sequential reference tags (`REF.01`, `REF.02`), section marks (`§01`), grid-style references that mirror an actual row/column system (`A1`, `B4`), or position-in-sequence tags (`01 / 04`). Use the chosen notation only where it carries real information — labeling a diagram, marking which step of a flow the user is on, tagging a content revision. A coordinate tag with nothing real behind it is decoration wearing a coordinate's clothes; see Pillar 8.

### 5. Ghost Geometry

Faint, low-opacity structural shapes living behind real content: outline-only isometric forms, oversized stroke numerals, dotted construction lines, axonometric wireframes — an echo of the drafting process, the way blueprint paper shows faint pencil guides under the final ink. Ghost geometry never carries meaning on its own.

**Translation:** cap opacity hard — a sane starting point is 4–10% of full foreground value against the canvas. Stroke only, never filled, never more saturated than the base neutral palette. Restrict it to low-density zones: hero panels, empty states, section dividers, auth screens, loading skeletons. Never let it sit behind body text or a data table. Run the removal test (below): delete it and confirm comprehension doesn't change, only mood. As information density rises, this pillar's budget falls toward zero — see **Surface Modes**.

### 6. Structural Hierarchy

Importance is communicated by structure — grid position, line weight, surrounding whitespace, span (how many grid modules wide something is) — instead of color, saturation, or shadow depth. A primary action reads as primary because of where it sits and how much room it's given, not because it's the only saturated object on the screen.

**Translation:** run the grayscale test (below) on every screen before shipping it. Reserve color for genuine _state_ and _identity_ — selected, error, brand mark — never for "this matters more than that."

### 7. Partial Borders

Borders exist only on the sides doing real structural work. A rule under a header, a single edge marking where a sidebar ends, a hairline between one list row and the next — these communicate a boundary with minimal ink. A full four-sided border is reserved for things meant to read as discrete, liftable objects: a card, a modal, an isolated callout. It is not the default container style.

**Translation:** before bordering anything, decide which of its sides actually meet a different region, and draw only those. Default to a 1px hairline at low opacity — a tint of the _ink_ color against the canvas, not an independently maintained gray (see token roles below). If every box on the page has a four-sided border, the technique has stopped meaning anything; treat a full border as a deliberate, rare emphasis, not a habit.

### 8. Functional Decoration

Any visual flourish has to do double duty as real information. A figure label is also a real reference. A status dot is also a real state. An icon inside a bordered tile is also a real category marker. This pillar is the discipline holding the other nine together — it's what stops "hairline grid plus monospace labels" from collapsing into trend-chasing minimalism, where lines exist because they look considered rather than because they measure anything.

**Translation:** for every recurring visual device, write its one-sentence justification — "this divider marks where settings end and the danger zone begins," "this dot's color is the literal build status." If you can't write that sentence, cut the device. No exceptions for things that look cool.

### 9. Blueprint Layers

Every screen is a stack of a small, fixed set of named layers. Each layer has one job and one consistent visual treatment, no matter which page it shows up on:

| Layer | Name       | Job                                       | Typical treatment                                 |
| ----- | ---------- | ----------------------------------------- | ------------------------------------------------- |
| 0     | Plane      | the grid / canvas itself                  | near-invisible, rarely rendered directly          |
| 1     | Structure  | borders, dividers, rails                  | 1px hairline, low-alpha ink                       |
| 2     | Content    | real text, data, controls                 | full-contrast ink — the layer the user came for   |
| 3     | Annotation | coordinates, status, metadata, timestamps | small, monospace, muted ink, always secondary     |
| 4     | Ghost      | large faint illustrative geometry         | stroke only, ≤10% opacity, low-density zones only |

A quick visual key, by texture rather than table row:

```
Layer 4  Ghost        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░  faint geometry, optional
Layer 3  Annotation   ──────────────────────────── mono, muted ink
Layer 2  Content      ████████████████████████████ full-contrast ink
Layer 1  Structure    ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ hairline, low-alpha ink
Layer 0  Plane        · · · · · · · · · · · · · · · grid, near-invisible
```

**Translation:** a component should be describable by which layer(s) it occupies. A Layer 3 element looks like a Layer 3 element on every page — same type, same color, same size — regardless of what content sits next to it. That cross-page consistency, more than any individual component's design, is what makes the system read as _one product_ across a marketing site, a dashboard, and a docs page.

### 10. Engineering Margins

The outer edge of any page or panel is a deliberate working margin, not leftover space — the zone a real drawing sheet reserves for its title block, revision table, and sheet number. It scales in defined steps with viewport size, not as an arbitrary percentage, and it's allowed to hold real content: page identity, breadcrumbs, version, a last-updated stamp — the title-block role, not just whitespace.

**Translation:** define margin as a token tied to breakpoints (a concrete starting point: 16px / 24px / 48px / 96px across four steps), and keep it visibly larger and more consistent than any internal padding value — it should read as the largest deliberate gap on the screen. Consider using it to host Layer 3 annotation content instead of cramming that metadata into the main content column.

---

## Surface Modes — calibrating expression by context

The structural pillars (grid, alignment memory, partial borders, blueprint layers) apply with equal rigor everywhere. The _expressive_ pillars (ghost geometry, coordinates used illustratively, large figure artwork) should not — their budget shrinks as information density and task frequency rise.

| Surface                                | Expression budget                                                                                       | Structural rigor |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------- |
| Marketing, portfolio, hero sections    | High — ghost geometry, one signature illustration, coordinate tags as a visual motif                    | High             |
| Documentation, blog, long-form content | Medium — coordinate tags genuinely help here (numbered callouts, section marks); minimal ghost geometry | High             |
| Product UI, dashboards                 | Low — almost no ghost geometry; coordinates only where they're real (build IDs, version tags)           | Maximum          |
| Dense admin panels, data tables        | Near-zero expression; every pixel earns its place                                                       | Maximum          |

A Field Row, a Structural Card, and a hairline divider look identical across all four rows of this table — only the amount of ornament layered on top changes. That's what lets one system serve a hero page and a data table without becoming two different design languages.

## Token roles, not a fixed palette

Constructional Design specifies **roles**, not colors. A role is a job a color does; the actual values are free to change per brand, per theme.

| Role                             | Job                                                                                |
| -------------------------------- | ---------------------------------------------------------------------------------- |
| `canvas`                         | page background                                                                    |
| `surface`                        | raised structural surfaces — cards, panels                                         |
| `ink`                            | primary text and icon color                                                        |
| `ink-muted`                      | secondary text — the Layer 3 annotation color                                      |
| `line`                           | hairline borders and dividers — **derived from `ink`**, never picked independently |
| `accent`                         | one functional color, reserved for primary action and focus                        |
| `ghost`                          | Layer 4 geometry — derived from `ink` at near-zero alpha                           |
| `success` / `warning` / `danger` | state only, never used for emphasis or decoration                                  |

Deriving `line` and `ghost` from `ink` through alpha — instead of choosing a separate gray by eye — is the single highest-leverage move in this system. It keeps light and dark themes in lockstep automatically, and it's a direct application of Pillar 3 (Alignment Memory) to color itself: the relationship is remembered, not re-decided per theme.

Illustrative starting values — swap freely, but keep the role names and the derivation relationship intact:

```css
:root {
  --hue: 240; /* the one value to change for a different brand temperature */

  --canvas: oklch(98% 0.002 var(--hue));
  --surface: oklch(100% 0 0);
  --ink: oklch(18% 0.004 var(--hue));
  --ink-muted: oklch(45% 0.004 var(--hue));
  --line: oklch(18% 0.004 var(--hue) / 10%);
  --line-strong: oklch(18% 0.004 var(--hue) / 22%);
  --accent: oklch(55% 0.18 250);
  --ghost: oklch(18% 0.004 var(--hue) / 6%);

  --success: oklch(60% 0.14 150);
  --warning: oklch(75% 0.15 80);
  --danger: oklch(55% 0.2 25);
}

.dark {
  --canvas: oklch(14% 0.004 var(--hue));
  --surface: oklch(17% 0.004 var(--hue));
  --ink: oklch(94% 0.002 var(--hue));
  --ink-muted: oklch(64% 0.004 var(--hue));
  --line: oklch(94% 0.002 var(--hue) / 10%);
  --line-strong: oklch(94% 0.002 var(--hue) / 20%);
  --ghost: oklch(94% 0.002 var(--hue) / 6%);
}
```

(`oklch` is a deliberate choice, not a flourish — it's perceptually uniform, so a given alpha step reads as the same visual distance in both themes, and it's already Tailwind v4's native color space if that's the stack in play.)

### Type roles

Two type roles, not two typefaces chosen for taste:

- **Structural type** — a clean grotesk or humanist sans, used for headings, navigation, and button labels. Carries hierarchy through size and weight, used with restraint.
- **Annotation type** — a genuine fixed-width monospace, used for every Layer 3 element without exception: coordinate tags, timestamps, status text, field values in spec rows, code. In this system monospace is a **semantic signal**, not a style choice — it tells the reader "this is metadata, not content" before they've read a single word. Pick a quiet monospace face (Geist Mono, JetBrains Mono, and IBM Plex Mono are all reasonable defaults) — a display monospace with too much personality works against the instrument-panel legibility this role exists for.

Never use more than these two families on a single product. A third typeface is almost always decoration, not signal.

## Accessibility minimums (non-negotiable)

A hairline-and-monospace system can quietly fail accessibility if these aren't enforced on purpose:

- Non-text contrast for any border that communicates a real boundary (form field edges, focus rings, load-bearing dividers) must clear 3:1 against the adjacent surface, even at the system's preferred low alpha. If a check fails, step up to `--line-strong` rather than thinning further.
- A focus ring is a safety rail, not an optional flourish. Render a real, visible 2px ring — never just a 1px border-color shift — no matter how quiet the rest of the system is.
- Layer 3 (annotation) content is supplementary by definition. It must never be the _only_ place critical information lives — a status communicated solely through a small muted-monospace tag, with no icon, color, or text fallback, is a Layer 3 design failure, not a feature.
- Respect `prefers-reduced-motion` for every confirmatory animation described below.

---

## Forbidden patterns

Each of these breaks a specific pillar above — the reason matters more than the rule.

- **Box-shadow as elevation.** Communicate elevation with a border and a background-color step between `surface` and `canvas`, not a drop shadow. Shadow implies a material sitting in light; this system doesn't have light.
- **Glass, blur, or glow.** Backdrop-blur panels, neon glow, gradient meshes — this is exactly Vengeance UI's identity and exactly what this system diverges from. If a panel needs to separate from what's behind it, use a border and a flat color step instead.
- **Decorative gradients.** A gradient that isn't communicating a real numeric range (a heat scale, a progress fill) is decoration. Cut it.
- **Arbitrary spacing values.** Any px or rem value not on the defined scale is a sign a primitive is missing, not a license to eyeball a number.
- **Border soup.** Four-sided borders on every nested div until the screen is a grid of boxes. If everything has a border, the technique stops communicating anything; see Pillar 7.
- **Color-only hierarchy.** If the grayscale test fails, the hierarchy isn't real yet.
- **Coordinate tags with nothing behind them.** A `FIG`, `REF`, or `§` label added purely for technical flavor, with no real reference underneath, is the fastest way to turn this system into cosplay. See Pillar 8.
- **Ghost geometry behind dense content.** Never behind body text, never behind a data table, never above the opacity ceiling.
- **Decorative motion.** Bounce, elastic easing, parallax for its own sake, and hover effects that exist only to prove a component is "alive" don't belong here. Motion in this system is _confirmatory_: a panel reveals along the grid axis it lives on, a value increments instead of crossfading, a focus state snaps rather than eases. If a motion can't be described as confirming a real state change, it's performance, not confirmation — cut it or replace it with a static state change.
- **More than two typefaces**, or a display/script font anywhere in Layers 1 through 3.
- **Justified body text or all-caps body paragraphs.** Tracked uppercase is reserved for short labels — nav items, tab segments — never for sentences.
- **Full pill radius on containers.** `radius-full` is reserved for actions and status, by Pillar 7's "compact, liftable" logic — a pill-shaped card or panel contradicts the system.
- **Hairlines as trend rather than structure.** Worth saying directly: a grid of thin gray lines is, on its own, a familiar default in current AI-generated design, not a guarantee of good Constructional Design. The discipline that separates the two is Pillar 8. If a hairline doesn't pass the one-sentence test, it's the same cliché with extra steps.

## Validation principles

Five qualitative tests, run by eye, that catch most regressions before they ship. The literal, line-by-line version of these — meant to be run during implementation, not just understood — lives in `skill.md`.

1. **The one-sentence test.** For any visual device, can you state its structural or informational reason in one sentence? (Pillars 1, 8.)
2. **The grayscale test.** Desaturate a screenshot. Does hierarchy still read — what to look at first, second, third? (Pillar 6.)
3. **The alignment-drift test.** Pick three coordinates that should match across the page — an icon rail, a content edge, a header/footer boundary. Do they measure identical, not merely close? (Pillar 3.)
4. **The removal test.** Hide all ghost geometry and illustrative coordinate tags. Does comprehension change, or only mood? It should only be mood. (Pillar 5.)
5. **The expression-budget test.** Does the amount of ornament on this screen match its Surface Mode — dialed up for a hero, dialed to near-zero for a data table? (Surface Modes.)

---

## Component primitives

A small, deliberately short vocabulary. Everything in a constructed interface should be buildable from these.

**Canvas Frame** — the outermost wrapper. Paints `canvas`, reserves the Engineering Margin on every edge, and is the only place Layer 0 (the grid) is allowed to render literally.

**Title Block** — the header or identity zone of any surface: site nav, dashboard top bar, a document's opening section. Holds identity, primary navigation, and one piece of Layer 3 metadata (a status, a coordinate, a last-updated stamp). Bottom border only — never boxed on all sides.

**Rail Divider** — a single hairline, full-bleed or inset, separating repeated siblings: list rows, nav items, table rows. Not a border around each item — a line _between_ them.

**Coordinate Tag** — the Pillar 4 annotation primitive. Monospace, `ink-muted`, small. Labels a diagram, a step, or a revision — never used ornamentally.

**Field Row** — a label/value pair in Layer 3 type, optionally preceded by a Bordered Icon Tile. This is the generalist primitive: a profile's job title, a settings panel's preference, an API doc's parameter row, and a dashboard's metric label are the same primitive wearing different content.

**Bordered Icon Tile** — a small square or barely-rounded container (`radius-sm` at most), 1px `line` border, holding a single icon. Always paired with a Field Row or nav label — never floats alone as pure decoration.

**Structural Card** — the main content container. Border on the sides that meet a different region — often just the top, or top plus one side, inside a continuous layout; all four sides only when the card is meant to read as a discrete, liftable object. `radius-sm` or `radius-md`, never `radius-full`, never a shadow.

**Segment Control** — a tab or filter switcher: tracked, uppercase, small labels (Layer 1/2 — real navigation, not metadata), indicated by an underline or background step, never a pill per tab.

**Status Pill** — the _one_ `radius-full` primitive, reserved for state and action: buttons that trigger something, badges that report a state. Its rarity is what makes it legible as "you can act here" — overusing pill radius elsewhere erodes that signal.

**Density Grid** — a grid of small uniform cells whose fill (alpha or state color) encodes a real value: an activity heatmap, a status overview, a calendar density view. No individual cell borders — the grid's regularity _is_ the structure.

**Ghost Panel** — the Layer 4 zone: a region explicitly allowed to host large, faint, stroke-only illustrative geometry. Exists only in high-expression Surface Modes — hero, empty state, auth screen.

**Margin Strip** — content deliberately placed inside the Engineering Margin rather than the main column: a coordinate tag, a breadcrumb, a version stamp, a last-updated date. Always Layer 3 type.

---

## Layout and spacing rules

One base module, one derived scale. Nothing in a constructed layout uses a value off this list.

| Token        | Value          | Typical role                                    |
| ------------ | -------------- | ----------------------------------------------- |
| `--space-px` | 1px            | hairline border/divider width only              |
| `--space-1`  | 0.25rem / 4px  | icon-to-label gap, the tightest pairing         |
| `--space-2`  | 0.5rem / 8px   | internal padding for tiles, chips, tags         |
| `--space-3`  | 0.75rem / 12px | compact row padding                             |
| `--space-4`  | 1rem / 16px    | default field-row / list-item padding           |
| `--space-6`  | 1.5rem / 24px  | structural card padding, section-internal gaps  |
| `--space-8`  | 2rem / 32px    | gap between distinct components in a stack      |
| `--space-12` | 3rem / 48px    | minor section break                             |
| `--space-16` | 4rem / 64px    | major section break                             |
| `--space-24` | 6rem / 96px    | desktop Engineering Margin, hero breathing room |
| `--space-32` | 8rem / 128px   | large-canvas margin on very wide viewports      |

`--grid-unit` — the Line Infinity Grid's repeat interval — is tied to `--space-2` (8px) by default. Every structural edge, not just spacing, should be checkable against this number.

**Engineering Margin by breakpoint** — a concrete starting point; adjust to your container strategy, but keep the shape of the scale: margin should grow faster than content as the viewport widens, instead of stretching content edge to edge.

| Viewport              | Margin                                                                      |
| --------------------- | --------------------------------------------------------------------------- |
| Mobile (< 640px)      | `--space-4` (16px)                                                          |
| Tablet (640–1024px)   | `--space-6` (24px)                                                          |
| Desktop (1024–1536px) | `--space-12` (48px)                                                         |
| Wide (> 1536px)       | `--space-24` (96px); content holds a fixed max-width rather than stretching |

## Border and grid behavior

**How many sides?** Decide per element, not by habit.

- Marks a boundary inside continuous flow (a header's bottom, a sidebar's edge, a list row's top) → **one side**, hairline, `line` color.
- Separates two regions that meet at a corner (a panel docked against a rail) → **two sides** at most.
- Reads as a discrete, liftable object — a card, a modal, a popover → **all four sides**, and only then.
- Separates repeated siblings — rows, table cells → not a border at all. Use a **Rail Divider** between items instead.

**Weight.** Always 1px. Emphasis comes from switching `line` to `line-strong` (an alpha step) or adding a second cue (icon, label, color), never from a thicker stroke. A 2px border reads as a mistake in this system, not as emphasis.

**Color.** Always derived — `line` is `ink` at low alpha, never an independently chosen gray. This is what keeps borders correct automatically across light/dark themes and any future re-theme.

**Radius tiers** — four, no more:

| Tier          | Value          | Use                                                                        |
| ------------- | -------------- | -------------------------------------------------------------------------- |
| `radius-0`    | 0              | structural containers — panels, table rows, section wrappers (the default) |
| `radius-sm`   | 0.375rem / 6px | inputs, Bordered Icon Tiles, Structural Cards needing slight softening     |
| `radius-md`   | 0.5rem / 8px   | larger cards, modals, popovers                                             |
| `radius-full` | 9999px         | **Status Pills only** — buttons and badges, nothing else                   |

**Grid module at breakpoints.** The module (`--grid-unit`) doesn't resize with the viewport — an 8px module stays 8px on mobile and on a 4K monitor. What changes is how many modules fit; the Engineering Margin absorbs the difference. This is what keeps Alignment Memory (Pillar 3) intact across breakpoints — a coordinate that's "twelve modules from the left edge" means the same thing everywhere.

---

In one paragraph: build as if every line will be checked against a coordinate someone else has to find again later. Borrow the discipline of a drafting table — modules, derivation, labeled reference points, margins that do real work — and apply it to whatever ships next, whether that's a button, a dashboard, or a whole product. The look that results is a side effect of the discipline, not the goal of it.
