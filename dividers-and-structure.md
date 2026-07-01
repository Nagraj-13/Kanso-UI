# Dividers & structural system — full reference

Contents:

1. The full-bleed breakout trick (and why three different things use it)
2. Plain hairline — full CSS
3. Dashed hairline — full CSS
4. Diagonal-stripe band — full CSS
5. The `Panel` wrapper (HTML/CSS + React version)
6. Vertical rails & the content column
7. Grid-with-internal-dividers technique
8. Decision matrix
9. Gotchas (why a divider silently doesn't show up)

---

## 1. The full-bleed breakout trick

Every divider in this system — plain, dashed, or striped — is built the same way: the visible line itself is a pseudo-element, absolutely positioned, that ignores its parent's width entirely.

```css
.line-bottom {
  position: relative; /* establishes the containing block for the pseudo-element */
}
.line-bottom::after {
  content: '';
  position: absolute;
  left: -100vw; /* shove it a full viewport-width to the left... */
  width: 200vw; /* ...then make it two viewport-widths wide */
  bottom: 0;
  height: 1px;
  background: var(--line);
}
```

`left: -100vw` combined with `width: 200vw` guarantees the strip covers the entire viewport horizontally no matter where the parent element sits or how wide it is — a 320px-wide parent and a 1600px-wide parent both produce a line that spans the full screen. This is what makes a centered content column look like it's been cut out of a continuous ruled surface instead of having borders drawn around it. It's a small detail, but it's the single biggest reason this style reads as "technical document" rather than "card with a border."

It costs nothing to reuse this same trick for all three divider tiers — only the pseudo-element's `background` (solid color vs. dashed gradient vs. diagonal hatch) changes.

## 2. Plain hairline — full CSS

```css
.line-top,
.line-bottom {
  position: relative;
}
.line-top::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100vw;
  width: 200vw;
  height: 1px;
  background: var(--line);
  z-index: -1; /* sit behind this element's own content/background */
}
.line-bottom::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: -100vw;
  width: 200vw;
  height: 1px;
  background: var(--line);
  z-index: -1;
}
```

Apply `.line-top` and `.line-bottom` independently and together — most panels use both (a hairline above and below), a header row inside a panel usually only needs `.line-bottom`. See `tokens-and-type.md` for where `--line` comes from; the short version is it's not the same variable as a generic `--border`, and it's intentionally lower-contrast.

## 3. Dashed hairline — full CSS

A softer variant for secondary breaks inside dense content (used sparingly in the source — mainly inside long-form documentation pages, not on marketing-style pages).

```css
.dashed-top,
.dashed-bottom {
  position: relative;
}
.dashed-top::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100vw;
  width: 200vw;
  height: 1px;
  background-image: linear-gradient(to right, var(--line) 4px, transparent 2px);
  background-size: 6px 1px;
  background-repeat: repeat-x;
  z-index: -1;
}
.dashed-bottom::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: -100vw;
  width: 200vw;
  height: 1px;
  background-image: linear-gradient(to right, var(--line) 4px, transparent 2px);
  background-size: 6px 1px;
  background-repeat: repeat-x;
  z-index: -1;
}
```

Treat this as a third tier you reach for deliberately, not a random alternative to the plain hairline — mixing plain and dashed hairlines at the same structural level (e.g. some panels with solid edges, some with dashed, for no semantic reason) reads as inconsistency rather than texture.

## 4. Diagonal-stripe band — full CSS

```css
:root {
  /* the stripe pattern color: the same --line token, just translucent */
  --stripe-line: color-mix(in oklab, var(--line) 56%, transparent);
}

.diagonal-stripes {
  background-image: repeating-linear-gradient(
    315deg,
    var(--stripe-line) 0,
    var(--stripe-line) 1px,
    transparent 0,
    transparent 50%
  );
  background-size: 10px 10px;
}

.stripe-divider {
  position: relative;
  height: 2rem; /* 32px default; can be shortened (e.g. 1.5rem) for tighter layouts */
}
.stripe-divider::before {
  content: '';
  position: absolute;
  left: -100vw;
  width: 200vw;
  height: 100%;
  z-index: -1;
  background-image: repeating-linear-gradient(
    315deg,
    var(--stripe-line) 0,
    var(--stripe-line) 1px,
    transparent 0,
    transparent 50%
  );
  background-size: 10px 10px;
}
```

`color-mix()` has solid support in current browsers; if you need to support an older rendering target (some PDF/print engines, very old WebKit), precompute `--stripe-line` as a flat `rgba()` value instead — e.g. `rgba(255,255,255,0.08)` on a dark background, `rgba(0,0,0,0.08)` on light. `assets/acid.css` includes both as a commented alternative.

When you place a `.stripe-divider` between top-level sections, also give it the same `border-x` (vertical rail) treatment as your panels (see §6) — that's what makes the rails look continuous through the stripe rather than interrupted by it, which is part of what sells the "this is one structural sheet" effect rather than "boxes stacked with gaps."

## 5. The `Panel` wrapper

This is the section-level building block. Every top-level chunk of content on the page — the header, the bio, the project grid, the testimonials wall — is one of these.

**Plain HTML/CSS:**

```html
<section class="panel">
  <header class="panel-header line-bottom">
    <h2 class="panel-title">Section title</h2>
  </header>
  <div class="panel-content">
    <!-- content -->
  </div>
</section>
```

```css
.panel {
  position: relative;
  border-left: 1px solid var(--line);
  border-right: 1px solid var(--line);
}
/* add .line-top and/or .line-bottom on the .panel element itself for the
   top/bottom hairlines — kept separate so a panel can opt out of one edge
   (e.g. the first panel on a page usually skips .line-top since the header
   above it already supplies that edge) */

.panel-header {
  padding: 0 1rem;
  min-height: 2.75rem;
  display: flex;
  align-items: center;
}
.panel-title {
  font-family: var(--font-sans);
  font-size: 1.5rem; /* scale up to 1.875rem/text-3xl for a hero-weight title */
  font-weight: 500;
  letter-spacing: -0.02em;
}
.panel-content {
  padding: 1rem;
}
```

**React (framework-agnostic JSX, adapt the `cn`/className-merge helper to whatever you use):**

```jsx
function Panel({ className = '', ...props }) {
  return <section className={`panel ${className}`} {...props} />;
}
function PanelHeader({ className = '', ...props }) {
  return (
    <header className={`panel-header line-bottom ${className}`} {...props} />
  );
}
function PanelTitle({ className = '', ...props }) {
  return <h2 className={`panel-title ${className}`} {...props} />;
}
function PanelContent({ className = '', ...props }) {
  return <div className={`panel-content ${className}`} {...props} />;
}
```

Compose a page as a flat list of `Panel`s, each one a complete top-level section, separated by `.stripe-divider` — that composition (not any single clever component) is most of what makes the page read as one continuous, ruled document:

```jsx
<div className="col">
  <ProfileHeader />
  <Separator /> {/* renders a .stripe-divider, see §4 */}
  <About />
  <Separator />
  <Testimonials />
  <Separator />
  <ProjectGrid />
</div>
```

## 6. Vertical rails & the content column

The page content lives in a centered column with a fixed max-width (768px / Tailwind's `max-w-3xl` in the source):

```css
.col {
  max-width: 48rem;
  margin-inline: auto;
}
```

Every `Panel`, every header bar, and every `.stripe-divider` carries its own `border-left` / `border-right` (`border-x`) in the `--line` color, at exactly the column's edges. Stacked one after another, these solid 1px borders line up perfectly and read as two continuous vertical rails running the full height of the page — even though they're actually dozens of separate short borders, one per panel. This only works if every panel shares the exact same width and horizontal position; don't let some panels go full-bleed and others stay padded, or the rails will visibly stagger.

Optional finishing touch (seen, but disabled, in the source): a tiny background-colored square at each corner where a vertical rail meets a horizontal stripe band, like a drafting-corner mark. Skip it unless you want that extra layer of detail — the system reads correctly without it.

## 7. Grid-with-internal-dividers technique

For a grid of items (a components list, a link list, a feature grid) that needs both vertical and horizontal hairlines between cells — without doubling the line where two cells already share an edge.

**Horizontal lines** (under each row except handled edges): apply `.line-bottom` (or just a plain `border-bottom`, since these don't need to break out past the grid itself) to each grid item, using `:nth-child` to skip the row(s) you don't want a trailing line on:

```css
.grid-3up {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.grid-3up > * {
  border-bottom: 1px solid var(--line);
}
```

**Vertical lines** between columns: rather than bordering every cell (which doubles up at shared edges), lay one absolutely-positioned overlay grid behind the content with the same column count, and only border the columns that need a _right_ edge (i.e., all but the last column):

```css
.grid-3up {
  position: relative;
}
.grid-3up::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  pointer-events: none;
}
```

with two child divs inside that pseudo-grid-overlay (one per internal seam) each carrying `border-right: 1px solid var(--line)`. In practice this is easiest as a real (non-pseudo) absolutely-positioned sibling div rather than fighting CSS to put grid children inside a `::before` — see `assets/acid.css` for the working version, and `assets/demo.html` for it rendered.

At responsive breakpoints where the column count changes (3-up on desktop, 2-up on tablet, 1-up on mobile), recompute which cells get the trailing `.line-bottom` so you don't get a double-thick line where two single-column breakpoints' bottom borders would otherwise stack — the source does this with breakpoint-aware `:nth-child` selectors (e.g. "every 3rd item starting from 1" on desktop, "every other item" on tablet, "every item" on mobile single-column).

## 8. Decision matrix

| Situation                                                    | Use                                                                                                                  |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Top/bottom edge of a section (`Panel`)                       | Plain hairline                                                                                                       |
| Under a section's header/title row                           | Plain hairline                                                                                                       |
| Between rows in a list or grid cells                         | Plain hairline                                                                                                       |
| Around/under a single card                                   | Plain hairline (or none — cards can also use a subtle full-perimeter border instead, see `references/components.md`) |
| Secondary break inside long-form/documentation content       | Dashed hairline (optional third tier)                                                                                |
| Between two genuinely different top-level sections of a page | Diagonal-stripe band                                                                                                 |
| Inside a section, between its own sub-parts                  | Plain hairline — **not** the stripe, even if the sub-parts feel sizeable                                             |
| Top/bottom of the sticky header bar                          | Plain hairline                                                                                                       |

## 9. Gotchas (why a divider silently isn't showing)

- **An `overflow: hidden` or `overflow: clip` ancestor between the divider and the edge of the screen will clip the breakout.** The `-100vw`/`200vw` strip needs an unobstructed path to the viewport edge; if any wrapping element clips overflow, the line gets cut at that element's boundary instead of bleeding full-width.
- **`z-index: -1` needs the parent to not have a separate opaque background painted on top of it at a higher stacking level.** The pseudo-element sits behind its own parent's content by design (so it doesn't visually clash with anything in front of it), but if some _other_ ancestor between the divider and the page background has its own opaque background and higher stacking context, the line can end up hidden behind it. If a line refuses to appear, check what's actually painted directly behind that element.
  - **Fix 1**: Create a stacking context on the ancestor container using CSS `isolation: isolate` (or the `isolate` class in Tailwind). This forces `z-index: -1` children to draw on top of the container's background.
  - **Fix 2**: Use `z-index: 1` combined with `pointer-events: none` on the pseudo-elements. This paints the line on top of backgrounds and elements safely, while preventing any input/clicks from being blocked.
- **`vw` units are extremely well-supported in real browsers**, but if you're rendering through something unusual (an old headless-browser screenshot tool, certain PDF export engines, very old WebKit), you may need a large fixed-pixel fallback (`left: -2000px; width: 4000px;`) instead of `-100vw`/`200vw`. This isn't a concern for normal web deployment.
- **Mismatched panel widths break the rail illusion**, not the divider itself — if the rails look "jagged" rather than continuous, check that every panel in the stack shares the same `max-width` and centering, not that the divider CSS is wrong.
