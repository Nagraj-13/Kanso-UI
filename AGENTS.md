<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.


# AGENTS.md

## Project

Kanso UI

A modern React component library, design system, and documentation platform built with Next.js and TypeScript.

---

## Development Commands

### Install

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Lint

```bash
pnpm lint
```

### Type Check

```bash
pnpm tsc --noEmit
```

---

## Architecture

### Application

```txt
app/
```

Contains:

* Home page
* Documentation pages
* Component pages

### Components

```txt
components/
```

Contains:

* ui/
* examples/
* site/

### Content

```txt
content/
```

Contains documentation and MDX content.

### Registry

```txt
lib/registry.ts
```

Component metadata source.

---

## Coding Standards

### TypeScript

* Use strict mode
* Avoid any
* Prefer explicit typing

### React

* Functional components only
* Named exports preferred
* Server Components by default
* Use Client Components only when required

### Styling

* Tailwind CSS only
* Use cn() helper
* Follow design tokens
* Avoid inline styles

---

## Design Principles

Kanso means simplicity.

When making decisions:

1. Simpler implementation wins.
2. Smaller API wins.
3. More accessible implementation wins.
4. More maintainable code wins.

---

## Accessibility

All UI components should:

* Support keyboard navigation
* Support screen readers
* Have visible focus states
* Use semantic HTML

Accessibility is not optional.

---

## Documentation Requirements

Any new component should include:

* Description
* Example
* Usage code
* Registry entry
* Documentation page

---

## Modification Rules

Do not:

* Introduce large dependencies without justification
* Create duplicate components
* Break existing APIs
* Add unnecessary abstraction

Prefer incremental improvements.

---

## Pull Request Expectations

Changes should:

* Be scoped
* Be documented
* Build successfully
* Pass linting
* Preserve accessibility

---

## Brand Guidelines

Kanso UI visual direction:

* Minimal
* Professional
* Black
* White
* Gray
* Subtle motion
* Clean typography

Inspired by:

* Vercel
* Linear
* Raycast
* shadcn/ui

Not inspired by:

* Overly decorative interfaces
* Excessive gradients
* Heavy visual effects

---

## Agent Workflow

Before changing code:

1. Understand existing implementation
2. Search for related components
3. Reuse existing patterns
4. Make smallest viable change
5. Verify build and types

Always prefer consistency with the existing codebase over introducing new patterns.

```
```

<!-- END:nextjs-agent-rules -->
