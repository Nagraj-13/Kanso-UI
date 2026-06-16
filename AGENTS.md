<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# AGENTS.md — Kanso UI Agent Rulebook

> This file is the canonical reference for any AI agent working on Kanso UI.
> Read this **before** writing any code. Refer back whenever you are unsure.

---

## 1. Project Identity

**Kanso UI** is an open-source React component library and design system.

- **Philosophy**: Japanese minimalism (簡素 / Kanso = simplicity)
- **Positioning**: Alongside shadcn/ui, Magic UI, Aceternity UI, React Bits — but with stronger focus on minimalism, accessibility, and developer experience
- **Model**: Copy-paste components with a registry system — users copy source code into their projects

---

## 2. Tech Stack

| Layer             | Technology                     |
| ----------------- | ------------------------------ |
| Framework         | Next.js 16 (App Router, RSC)   |
| Language          | TypeScript (strict mode)       |
| Styling           | Tailwind CSS v4                |
| Primitives        | Base UI (`@base-ui/react`)     |
| Animation         | Framer Motion                  |
| Icons             | Lucide React                   |
| Theming           | next-themes                    |
| Code Highlighting | Shiki                          |
| Class Merging     | `cn()` — clsx + tailwind-merge |
| Package Manager   | pnpm                           |

---

## 3. Directory Structure

```
kanso-ui/
├── app/
│   ├── layout.tsx              # Root layout (fonts, theme, providers)
│   ├── page.tsx                # Landing page (server: Shiki highlighting)
│   ├── LandingPageClient.tsx   # Landing page client component
│   ├── globals.css             # Tailwind config, design tokens, keyframes
│   ├── docs/
│   │   ├── layout.tsx          # Docs layout (sidebar, header)
│   │   ├── layout-client.tsx   # Docs layout client parts (theme toggle)
│   │   ├── page.tsx            # Docs index (redirects to first component)
│   │   └── components/
│   │       └── [slug]/
│   │           ├── page.tsx            # Dynamic component doc page
│   │           └── copy-install-button.tsx  # Copy button (client)
│   └── api/
│       └── registry/
│           └── [name]/
│               └── route.ts    # JSON API for component source
├── components/
│   ├── ui/                     # shadcn/Base UI primitives (55+ components)
│   ├── kanso/                  # ★ Kanso-branded copy-paste components
│   ├── docs/                   # Documentation page components
│   └── theme-provider.tsx      # next-themes wrapper
├── lib/
│   ├── utils.ts                # cn() helper
│   └── registry.ts             # ★ Component registry (metadata, props)
├── hooks/
│   └── use-mobile.ts           # Mobile breakpoint hook
├── public/                     # Static assets (logos, SVGs)
├── AGENTS.md                   # ★ This file
├── CLAUDE.md                   # ★ Detailed development rulebook
└── README.md                   # Project README
```

### Key Directories

| Directory           | Purpose                                                            | Type                                     |
| ------------------- | ------------------------------------------------------------------ | ---------------------------------------- |
| `components/ui/`    | shadcn primitives (Button, Card, Dialog, etc.)                     | Foundation layer — rarely modified       |
| `components/kanso/` | **Kanso-branded components** (MagneticButton, ShimmerBorder, etc.) | **Primary work area** for new components |
| `components/docs/`  | Documentation infrastructure (CodeBlock, ComponentDemo)            | Docs tooling                             |
| `lib/registry.ts`   | Component metadata, props, dependencies                            | **Must update** when adding components   |

---

## 4. Development Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server (http://localhost:3000)
pnpm build            # Production build
pnpm lint             # ESLint check
pnpm tsc --noEmit     # TypeScript type check
```

---

## 5. How to Add a New Component

This is the most common task. Follow these steps **in order**:

### Step 1: Create the component file

Create `components/kanso/<component-name>.tsx`:

```tsx
'use client'; // Only if the component uses hooks, events, or browser APIs

import * as React from 'react';
import { cn } from '@/lib/utils';

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Prop description */
  myProp?: string;
  children: React.ReactNode;
}

function MyComponent({
  myProp,
  children,
  className,
  ...props
}: MyComponentProps) {
  return (
    <div className={cn('base-classes', className)} {...props}>
      {children}
    </div>
  );
}

export { MyComponent };
export type { MyComponentProps };
```

### Step 2: Register in `lib/registry.ts`

Add an entry to the `registry` array:

```ts
{
  name: "my-component",           // kebab-case, used in URLs
  title: "My Component",          // Display name
  description: "One-line description.",
  category: "effects",            // One of: effects, buttons, layout, typography, feedback, data-display
  dependencies: ["framer-motion"],// npm packages needed
  internalDeps: ["lib/utils"],    // Internal files needed
  filePath: "components/kanso/my-component.tsx",
  tags: ["animation", "hover"],
  props: [
    {
      name: "myProp",
      type: "string",
      default: '"hello"',
      description: "Description of what this prop does.",
    },
  ],
}
```

### Step 3: Add a demo in `components/docs/component-demos.tsx`

Add a key to the `demos` Record:

```tsx
"my-component": function MyComponentDemo() {
  return (
    <div className="flex items-center justify-center gap-4">
      <MyComponent>Default usage</MyComponent>
      <MyComponent myProp="custom">Custom prop</MyComponent>
    </div>
  )
},
```

### Step 4: Verify

```bash
pnpm tsc --noEmit    # Types pass
pnpm lint            # Lint passes
pnpm build           # Build succeeds
```

Then visit `/docs/components/my-component` — the page auto-generates from registry data.

### Step 5: Add CSS keyframes (if needed)

If your component uses CSS animations, add `@keyframes` to `app/globals.css` at the end, prefixed with a comment:

```css
/* Kanso MyComponent animation */
@keyframes my-animation {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}
```

---

## 6. Coding Standards

### TypeScript

- Use strict mode — no `any`
- Prefer `unknown` over `any`
- Export both the component and its props type
- Use `React.ComponentProps<"element">` or `React.HTMLAttributes<HTMLElement>` for base props

### React

- Functional components only
- Named exports (never `export default` for components)
- Server Components by default
- Add `"use client"` only when the component uses hooks, event handlers, or browser APIs
- Use composition patterns (children, render props) over prop sprawl

### Styling

- **Tailwind CSS only** — no inline styles, no CSS modules
- Use `cn()` helper for conditional classes
- Follow existing design tokens from `globals.css`
- Support dark mode via Tailwind `dark:` variants
- No arbitrary values when a design token exists

### Naming

- Component files: `kebab-case.tsx` (e.g. `magnetic-button.tsx`)
- Component names: `PascalCase` (e.g. `MagneticButton`)
- Props interfaces: `PascalCase` + `Props` suffix (e.g. `MagneticButtonProps`)

---

## 7. Design Principles

Kanso means simplicity. When making decisions:

1. **Simpler implementation wins** — fewer lines, fewer abstractions
2. **Smaller API wins** — fewer props, more sensible defaults
3. **More accessible wins** — keyboard nav, ARIA, semantic HTML
4. **More maintainable wins** — readable code over clever code
5. **Composition over configuration** — prefer children/slots over many props

---

## 8. Accessibility Requirements

All components **must**:

- Support keyboard navigation (Tab, Enter, Escape, Arrow keys as applicable)
- Support screen readers (proper ARIA attributes)
- Have visible focus states (`focus-visible` ring)
- Use semantic HTML (`button` for buttons, not `div`)
- Maintain sufficient color contrast in both light and dark modes

Accessibility is **not optional**.

---

## 9. Brand & Visual Guidelines

| Aspect     | Guideline                                          |
| ---------- | -------------------------------------------------- |
| Colors     | Black, white, zinc grays — neutral palette         |
| Typography | Inter / Geist Sans — clean, geometric              |
| Spacing    | Generous whitespace                                |
| Borders    | Subtle, `border-zinc-200` / `dark:border-zinc-800` |
| Shadows    | Minimal — `shadow-xs` or `shadow-sm` only          |
| Radius     | `rounded-md` to `rounded-xl`                       |
| Animations | Subtle, fast, purposeful                           |

**Avoid**: Excessive gradients, neon effects, heavy glassmorphism, decorative animations.

**Inspired by**: Vercel, Linear, Raycast, shadcn/ui.

---

## 10. Modification Rules

**Do not**:

- Introduce large dependencies without clear justification
- Create duplicate components (check existing `components/ui/` and `components/kanso/` first)
- Break existing component APIs
- Add unnecessary abstraction layers
- Modify `components/ui/` primitives unless fixing a bug

**Do**:

- Prefer incremental improvements
- Reuse existing patterns from the codebase
- Keep component APIs minimal
- Test dark mode and responsive behavior

---

## 11. Pre-Commit Checklist

Before completing any work:

- [ ] `pnpm tsc --noEmit` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm build` succeeds
- [ ] No hydration warnings
- [ ] Dark mode works correctly
- [ ] Mobile responsive (check at 375px width)
- [ ] Accessibility verified (keyboard + ARIA)
- [ ] Registry entry added (if new component)
- [ ] Demo added in `component-demos.tsx` (if new component)

---

## 12. Agent Workflow

Before changing code:

1. **Understand** — Read existing implementation fully
2. **Search** — Check for related/similar components in `ui/` and `kanso/`
3. **Reuse** — Follow existing patterns (CVA, cn(), Base UI wrappers)
4. **Minimal change** — Make the smallest viable change
5. **Verify** — Run build, types, and lint

Always prefer **consistency with the existing codebase** over introducing new patterns.

<!-- END:nextjs-agent-rules -->
