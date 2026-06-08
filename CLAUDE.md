@AGENTS.md
# CLAUDE.md

## Project Overview

Kanso UI is a modern open-source React component library and design system inspired by Japanese minimalism and the concept of "Kanso" (simplicity).

The project combines:

* Component Library
* Design System
* Documentation Platform
* Component Registry
* Example Showcase
* Developer Experience Tooling

Primary goals:

* Minimal API surface
* Excellent accessibility
* Beautiful defaults
* Type-safe components
* High performance
* Copy-paste developer experience
* Modern design language similar in quality to Vercel, Linear, Raycast, shadcn/ui, HeroUI, and Magic UI

---

## Tech Stack

### Core

* Next.js App Router
* React
* TypeScript
* Tailwind CSS


### UI

* Radix UI
* Framer Motion
* Lucide Icons
* next-themes
* Shadcn UI

### Content

* MDX (Fumadocs)
* Component Registry

---

## Design Philosophy

Kanso means simplicity.

Every implementation should favor:

1. Simplicity over cleverness
2. Readability over abstraction
3. Composition over inheritance
4. Accessibility over visual tricks
5. Performance over unnecessary features

Avoid adding complexity unless there is a clear benefit.

---

## Component Standards

Every component should:

* Be fully typed
* Support dark mode
* Support keyboard navigation when applicable
* Have accessible defaults
* Expose clean APIs
* Avoid unnecessary props
* Use composition patterns

Prefer:

```tsx
<Button variant="outline">
```

Over:

```tsx
<Button
  isOutline
  outlineSize="large"
  customMode={true}
/>
```

---

## Code Style

### TypeScript

Use strict typing.

Avoid:

```ts
any
```

Prefer:

```ts
unknown
```

or explicit types.

---

### Components

Use named exports.

Prefer:

```tsx
export function Button() {}
```

Avoid:

```tsx
export default function Button() {}
```

---

### Imports

Prefer:

```tsx
import { Button } from "@/components/ui/button"
```

Over deep relative imports.

---

## Folder Structure

```txt
app/
components/
content/
lib/
styles/
```

### components/ui

Reusable primitives.

### components/examples

Component demos.

### components/site

Documentation UI.

### content

Documentation content and MDX.

### lib

Utilities and registry.

---

## Documentation Rules

Every public component should have:

* Description
* Example
* Installation instructions
* Usage example
* Props documentation

If documentation is missing, create it.

---

## Registry Rules

Every registry component must contain:

* Metadata
* Preview component
* Source code
* Category
* Installation instructions

---

## Testing Checklist

Before completing work:

1. TypeScript passes
2. ESLint passes
3. Build succeeds
4. No hydration issues
5. Dark mode works
6. Mobile responsive
7. Accessibility checked

---

## Visual Design Rules

Kanso UI visual language:

* Large whitespace
* Neutral colors
* Minimal shadows
* Clean typography
* Subtle animations
* Rounded corners
* Black, white, gray palette

Avoid:

* Excessive gradients
* Neon effects
* Heavy glassmorphism
* Decorative animations

Unless explicitly requested.

---

## When Adding New Components

Follow this order:

1. Primitive
2. Variants
3. Demo
4. Registry Entry
5. Documentation
6. Accessibility Review

Never skip documentation.

---

## Success Criteria

A component is complete when:

* Accessible
* Typed
* Documented
* Responsive
* Registry-ready
* Dark mode compatible
* Production ready

```
```
