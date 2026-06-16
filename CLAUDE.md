@AGENTS.md

# CLAUDE.md — Kanso UI Development Rulebook

> Detailed development guide for AI agents and contributors.
> This file extends AGENTS.md with concrete code examples, patterns, and recipes.

---

## 1. Project Overview

Kanso UI is a **copy-paste React component library** inspired by Japanese minimalism. Users browse components on the documentation site, preview them live, and copy the source code into their own projects.

The project has two layers of components:

| Layer                | Directory           | Purpose                                                                                                 |
| -------------------- | ------------------- | ------------------------------------------------------------------------------------------------------- |
| **Primitives**       | `components/ui/`    | shadcn-style Base UI wrappers (Button, Card, Dialog, etc.) — foundation layer                           |
| **Kanso Components** | `components/kanso/` | Branded effect/animation components (MagneticButton, ShimmerBorder, etc.) — **where new components go** |

---

## 2. Component Anatomy

Every Kanso component follows this exact structure:

````tsx
// components/kanso/my-component.tsx

'use client'; // Only if component uses hooks, events, or browser APIs

import * as React from 'react';
import { cn } from '@/lib/utils';
// Import other deps (framer-motion, lucide-react, etc.)

// ── Types ──────────────────────────────────────────────
interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** JSDoc description — shows in IDE tooltips */
  myProp?: string;
  /** Required props are marked */
  children: React.ReactNode;
}

// ── Component ──────────────────────────────────────────
/**
 * MyComponent — One-line description.
 *
 * Detailed description of what the component does, how it works,
 * and any important implementation details.
 *
 * @example
 * ```tsx
 * import { MyComponent } from "@/components/kanso/my-component"
 *
 * export default function Demo() {
 *   return <MyComponent myProp="value">Hello</MyComponent>
 * }
 * ```
 */
function MyComponent({
  myProp = 'default',
  children,
  className,
  ...props
}: MyComponentProps) {
  return (
    <div className={cn('base-tailwind-classes', className)} {...props}>
      {children}
    </div>
  );
}

// ── Exports ────────────────────────────────────────────
export { MyComponent };
export type { MyComponentProps };
````

### Rules

1. **Named exports** — never `export default`
2. **Export the props type** — enables consumers to extend
3. **`cn()` for className** — always merge with user's className
4. **Spread `...props`** — pass through HTML attributes
5. **JSDoc on every prop** — IDE tooltips for DX
6. **`@example` in component docblock** — copy-paste ready
7. **Default values in destructuring** — not in interface

---

## 3. Registry System

The registry (`lib/registry.ts`) is the single source of truth for all Kanso components.

### Registry Entry Schema

```ts
{
  name: string            // kebab-case identifier — used in URLs and API
  title: string           // Display name — shown in docs
  description: string     // One-line description
  category: string        // "effects" | "buttons" | "layout" | "typography" | "feedback" | "data-display"
  dependencies: string[]  // npm packages (e.g. ["framer-motion"])
  internalDeps: string[]  // Internal files (e.g. ["lib/utils"])
  filePath: string        // Relative path to source (e.g. "components/kanso/my-component.tsx")
  tags: string[]          // Searchable tags
  props: RegistryComponentProp[]  // Props documentation
}
```

### How Documentation Auto-Generates

1. `lib/registry.ts` → defines component metadata
2. `app/docs/components/[slug]/page.tsx` → reads registry + reads source file from disk
3. Shiki highlights the source code server-side
4. `components/docs/component-demos.tsx` → provides the live interactive demo
5. Props table renders from `registry.props`

**Result**: Adding a registry entry + a demo = fully working docs page at `/docs/components/[name]`.

### API Endpoint

`GET /api/registry/[name]` returns JSON:

```json
{
  "name": "magnetic-button",
  "title": "Magnetic Button",
  "source": "// full source code...",
  "dependencies": ["framer-motion"],
  "files": [
    { "path": "components/kanso/magnetic-button.tsx", "content": "..." },
    { "path": "lib/utils.ts", "content": "..." }
  ]
}
```

---

## 4. Step-by-Step: Adding a New Component

### Step 1 — Create the component

```bash
# File: components/kanso/pulse-dot.tsx
```

```tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface PulseDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Dot color (default: "bg-emerald-500") */
  color?: string;
  /** Size in pixels (default: 8) */
  size?: number;
}

function PulseDot({
  color = 'bg-emerald-500',
  size = 8,
  className,
  ...props
}: PulseDotProps) {
  return (
    <span className={cn('relative inline-flex', className)} {...props}>
      <span
        className={cn(
          'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
          color
        )}
        style={{ width: size, height: size }}
      />
      <span
        className={cn('relative inline-flex rounded-full', color)}
        style={{ width: size, height: size }}
      />
    </span>
  );
}

export { PulseDot };
export type { PulseDotProps };
```

### Step 2 — Register

Add to the `registry` array in `lib/registry.ts`:

```ts
{
  name: "pulse-dot",
  title: "Pulse Dot",
  description: "An animated pulsing dot indicator for status displays.",
  category: "feedback",
  dependencies: [],
  internalDeps: ["lib/utils"],
  filePath: "components/kanso/pulse-dot.tsx",
  tags: ["pulse", "dot", "status", "indicator", "animation"],
  props: [
    {
      name: "color",
      type: "string",
      default: '"bg-emerald-500"',
      description: "Tailwind background color class for the dot.",
    },
    {
      name: "size",
      type: "number",
      default: "8",
      description: "Dot diameter in pixels.",
    },
  ],
}
```

### Step 3 — Add demo

In `components/docs/component-demos.tsx`, import and add:

```tsx
import { PulseDot } from "@/components/kanso/pulse-dot"

// Inside the demos Record:
"pulse-dot": function PulseDotDemo() {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <PulseDot />
        <span className="text-sm text-zinc-500">Online</span>
      </div>
      <div className="flex items-center gap-2">
        <PulseDot color="bg-red-500" />
        <span className="text-sm text-zinc-500">Error</span>
      </div>
      <div className="flex items-center gap-2">
        <PulseDot color="bg-amber-500" size={12} />
        <span className="text-sm text-zinc-500">Warning</span>
      </div>
    </div>
  )
},
```

### Step 4 — Verify

```bash
pnpm tsc --noEmit && pnpm lint && pnpm build
```

Visit: `http://localhost:3000/docs/components/pulse-dot`

---

## 5. Common Patterns

### Pattern: Framer Motion animation component

```tsx
'use client';

import { motion, useInView } from 'framer-motion';

function FadeIn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn('', className)}
    >
      {children}
    </motion.div>
  );
}
```

### Pattern: CSS-only animation component

```tsx
// No "use client" needed — server component
import { cn } from '@/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800',
        className
      )}
      {...props}
    />
  );
}
```

### Pattern: CVA variants (for components with multiple visual variants)

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const myVariants = cva('base-classes', {
  variants: {
    variant: {
      default: 'variant-default-classes',
      outline: 'variant-outline-classes',
    },
    size: {
      sm: 'size-sm-classes',
      md: 'size-md-classes',
      lg: 'size-lg-classes',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

function MyComponent({
  variant,
  size,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof myVariants>) {
  return (
    <div className={cn(myVariants({ variant, size }), className)} {...props} />
  );
}
```

---

## 6. Design Tokens Reference

Design tokens are defined in `app/globals.css` using CSS custom properties.

### Colors (Light / Dark)

| Token                | Light    | Dark      |
| -------------------- | -------- | --------- |
| `--background`       | white    | zinc-950  |
| `--foreground`       | zinc-950 | zinc-50   |
| `--primary`          | zinc-900 | zinc-100  |
| `--muted`            | zinc-100 | zinc-800  |
| `--muted-foreground` | zinc-500 | zinc-400  |
| `--border`           | zinc-200 | white/10% |
| `--destructive`      | red-600  | red-400   |

### Radius

| Token        | Value     |
| ------------ | --------- |
| `--radius`   | 0.625rem  |
| `rounded-sm` | ~4px      |
| `rounded-md` | ~5px      |
| `rounded-lg` | 0.625rem  |
| `rounded-xl` | ~0.875rem |

### Spacing

Follow Tailwind's spacing scale. Prefer `gap-*`, `p-*`, `m-*` utilities.

---

## 7. Do's and Don'ts

### ✅ Do

```tsx
// Use cn() for className merging
<div className={cn("base-classes", className)}>

// Use named exports
export { MyComponent }

// Use composition
<Card>
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
</Card>

// Support dark mode
<div className="bg-white dark:bg-zinc-950">

// Use design tokens
<div className="border-border text-foreground">
```

### ❌ Don't

```tsx
// Don't use inline styles
<div style={{ backgroundColor: "red" }}>

// Don't use any
const data: any = fetchData()

// Don't use default exports for components
export default function MyComponent() {}

// Don't create sprawling prop APIs
<Button isOutline outlineColor="blue" outlineSize="large" />

// Don't use arbitrary Tailwind values when tokens exist
<div className="text-[#333]">  // Use text-foreground instead

// Don't modify components/ui/ without good reason
// These are shadcn primitives — modify components/kanso/ instead
```

---

## 8. Approved Dependencies

These are already in the project and safe to use:

| Package                    | Purpose                         |
| -------------------------- | ------------------------------- |
| `framer-motion`            | Animation                       |
| `lucide-react`             | Icons                           |
| `class-variance-authority` | Component variants              |
| `clsx` + `tailwind-merge`  | Class name merging (via `cn()`) |
| `@base-ui/react`           | Headless UI primitives          |
| `next-themes`              | Theme management                |
| `shiki`                    | Syntax highlighting             |

**Do not** add new dependencies without clear justification. If a component can be built with CSS animations instead of a library, prefer CSS.

---

## 9. File Naming Conventions

| What             | Convention             | Example                              |
| ---------------- | ---------------------- | ------------------------------------ |
| Component files  | `kebab-case.tsx`       | `magnetic-button.tsx`                |
| Component names  | `PascalCase`           | `MagneticButton`                     |
| Props interfaces | `PascalCase` + `Props` | `MagneticButtonProps`                |
| Hooks            | `use-kebab-case.ts`    | `use-mobile.ts`                      |
| Utilities        | `kebab-case.ts`        | `utils.ts`                           |
| Registry names   | `kebab-case`           | `"magnetic-button"`                  |
| Route files      | Next.js conventions    | `page.tsx`, `layout.tsx`, `route.ts` |

---

## 10. Testing & Verification

### Build check

```bash
pnpm build
```

### Type check

```bash
pnpm tsc --noEmit
```

### Lint check

```bash
pnpm lint
```

### Manual checks

- [ ] Component renders correctly in light mode
- [ ] Component renders correctly in dark mode
- [ ] Component is responsive (375px → 1440px)
- [ ] Keyboard navigation works (if interactive)
- [ ] Copy button on docs page works
- [ ] Props table is accurate
- [ ] No console errors or warnings
