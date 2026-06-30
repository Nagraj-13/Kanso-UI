---
name: architectural-constructional-interface-design
description: Guidelines for implementing Architectural Constructional Interface Design using screen lines, stripe dividers, layout columns, and coordinate tagging in Tailwind CSS v4.
---

# Architectural Constructional Interface Design

Architectural Constructional Interface Design is a design system approach centered on Japanese minimalism (簡素 / Kanso) and draftsmen/blueprint aesthetics. It rejects decorative shadows, gradients, rounded corners, and float animations in favor of visible, intersecting structural line boundaries, diagonal stripes, tabular grids, and coordinate metadata tags.

## Core Design Principles

1. **Solid Screen Lines (`screen-line-top` / `screen-line-bottom`)**
   - **Usage**: Used on primary `Panel` container sections to define the hard upper and lower boundaries of major content blocks.
   - **Effect**: Extends a solid 1px line infinitely to the screen boundaries (`-100vw` to `+100vw`) using absolute positioning pseudoelements.
2. **Dashed Screen Lines (`screen-dashed-line-top` / `screen-dashed-line-bottom`)**
   - **Usage**: Used internally within sections (e.g., separating titles, metadata, or small spacers in documentation) where a solid line would feel too visually heavy.
   - **Effect**: Extends a dashed 1px line infinitely to the screen boundaries.

3. **Stripe Dividers (`stripe-divider`)**
   - **Usage**: Placed exclusively as a standalone `<Separator />` block between distinct page-level components (e.g., between Hero and Features).
   - **Effect**: Draws a zone of diagonal repeating stripes to structure the vertical gaps between sections, rejecting plain empty padding.

4. **Central Column Grid**
   - The primary application content sits in a centered column of fixed width (`mx-auto max-w-5xl lg:max-w-6xl w-full`). For minimal portfolios `md:max-w-3xl` might be used, but for UI component libraries, use wider formats to prevent components from becoming unreadable.
   - The left and right boundaries of this column are defined by fine hairline borders (`border-x border-line`).

5. **Coordinate Annotations**
   - Sections, badges, and headers should be tagged with coordinate labels in a small monospace font (e.g., `§01 / HERO`, `FIG.001 / INTRO`, `REF.03 / 02`) in muted text.
   - Pair these annotations with Bordered Icon Tiles (small squares with 1px border enclosing a single icon).

6. **No Shadows or Deep Radii**
   - Borders are strictly 1px flat (`border-line`).
   - Radius should not exceed `radius-sm` (slight softening). Never use `rounded-full` or `rounded-2xl` for containers.
   - No depth or elevation classes (`shadow-md`, `shadow-xs`, etc.).

---

## Technical Implementations

### 1. Global CSS (Tailwind v4 Utilities)

Add the following custom utilities to your global CSS file to expose the design system tokens:

```css
@utility screen-line-top {
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100vw;
    z-index: -1;
    height: 1px;
    width: 200vw;
    background-color: var(--line);
  }
}

@utility screen-line-bottom {
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: -100vw;
    z-index: -1;
    height: 1px;
    width: 200vw;
    background-color: var(--line);
  }
}

@utility screen-dashed-line-top {
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100vw;
    z-index: -1;
    height: 1px;
    width: 200vw;
    background-color: inherit;
    background-image: linear-gradient(
      to right,
      var(--line) 4px,
      transparent 2px
    );
    background-size: 6px 1px;
    background-repeat: repeat-x;
  }
}

@utility screen-dashed-line-bottom {
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: -100vw;
    z-index: -1;
    height: 1px;
    width: 200vw;
    background-color: inherit;
    background-image: linear-gradient(
      to right,
      var(--line) 4px,
      transparent 2px
    );
    background-size: 6px 1px;
    background-repeat: repeat-x;
  }
}

@utility diagonal-stripes {
  --pattern-foreground: color-mix(in oklab, var(--color-line) 56%, transparent);
  background-image: repeating-linear-gradient(
    315deg,
    var(--pattern-foreground) 0,
    var(--pattern-foreground) 1px,
    transparent 0,
    transparent 50%
  );
  background-size: 10px 10px;
}

@utility stripe-divider {
  position: relative;
  &:before {
    content: '';
    position: absolute;
    left: -100vw;
    z-index: -1;
    height: 100%;
    width: 200vw;
    --pattern-foreground: color-mix(
      in oklab,
      var(--color-line) 56%,
      transparent
    );
    background-image: repeating-linear-gradient(
      315deg,
      var(--pattern-foreground) 0,
      var(--pattern-foreground) 1px,
      transparent 0,
      transparent 50%
    );
    background-size: 10px 10px;
  }
}
```

### 2. Panel Component Specification

Panels are sections aligned to the central column grid:

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

export function Panel({
  className,
  ...props
}: React.ComponentProps<'section'>) {
  return (
    <section
      className={cn(
        'screen-line-top screen-line-bottom border-x border-line bg-background',
        className
      )}
      {...props}
    />
  );
}

export function PanelHeader({
  className,
  ...props
}: React.ComponentProps<'header'>) {
  return (
    <header
      className={cn(
        'screen-line-bottom px-6 py-4 flex flex-col gap-1 items-start text-left bg-muted/15',
        className
      )}
      {...props}
    />
  );
}

export function PanelTitle({
  className,
  ...props
}: React.ComponentProps<'h2'>) {
  return (
    <h2
      className={cn(
        'text-2xl font-bold tracking-tight text-zinc-900 dark:text-white',
        className
      )}
      {...props}
    />
  );
}

export function PanelDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn('text-xs text-muted-foreground leading-relaxed', className)}
      {...props}
    />
  );
}

export function PanelContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('p-6 w-full relative z-10', className)} {...props} />
  );
}
```

### 3. Separator Component

Place a separator with diagonal stripes between panel components to segment sections properly:

```tsx
import { cn } from '@/lib/utils';

export function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'stripe-divider h-8 w-full border-x border-line',
        className
      )}
    />
  );
}
```

### 4. Layout Structure

Ensure all sections and separators are nested in the central layout wrapper:

```tsx
<div className="min-h-screen bg-background">
  <Header />

  {/* Centered construction layout column */}
  <div className="mx-auto max-w-5xl lg:max-w-6xl w-full">
    <Hero />
    <Separator />

    <Features />
    <Separator />

    <PremiumEffects />
    <Separator />

    <ComponentShowcase />
    <Separator />

    <DeveloperExperience />
  </div>

  <Footer />
</div>
```
