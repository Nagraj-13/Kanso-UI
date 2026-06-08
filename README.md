# Kanso UI - Project Context

## Overview

Kanso UI is a modern open-source React component library and design system inspired by the Japanese philosophy of "Kanso" (簡素), one of the seven principles of Zen aesthetics.

Kanso means simplicity, clarity, and the removal of unnecessary elements.

The goal of Kanso UI is to provide developers with beautifully crafted, accessible, production-ready React components that are simple to use and visually refined.

Kanso UI is positioned alongside:

* shadcn/ui
* HeroUI
* Magic UI
* Aceternity UI
* React Bits

but with a stronger focus on minimalism, whitespace, typography, accessibility, and thoughtful design.

---

## Brand Identity

Brand Name: Kanso UI

Meaning:
Simplicity. Clarity. Essentialism.

Brand Personality:

* Minimal
* Elegant
* Professional
* Calm
* Refined
* Premium
* Developer-first

Avoid:

* Excessive gradients
* Neon effects
* Heavy glassmorphism
* Loud colors
* Visual clutter

---

## Visual Style

Inspired by:

* Vercel
* Linear
* Raycast
* Stripe Docs
* shadcn/ui

Color Palette:

* Black
* White
* Neutral grays

Accent Colors:

* Very subtle gray gradients
* Soft off-white surfaces

Typography:

* Modern geometric sans-serif
* Large headings
* Tight spacing
* Excellent readability

Layout:

* Lots of whitespace
* Strong hierarchy
* Clean grid system
* Premium SaaS feel

Animations:

* Subtle
* Fast
* Purposeful

No distracting animations.

---

## Logo

The logo should be based around a stylized "K" mark that subtly incorporates the initials "NR".

The logo should feel:

* Geometric
* Minimal
* Timeless
* Suitable for a design system

---

## Target Audience

Primary:

* React developers
* Next.js developers
* Design engineers
* Frontend engineers

Secondary:

* Startup founders
* Product designers
* SaaS teams

---

## Core Features

* Accessible Components
* Copy-Paste Components
* Registry System
* Documentation Platform
* Design Tokens
* Dark Mode
* Animation Library
* Production Ready Components

---

## Positioning Statement

Kanso UI provides thoughtfully designed React components that prioritize simplicity, accessibility, and developer experience.

Build beautiful interfaces without unnecessary complexity.

---

## Taglines

Simplicity, Engineered.

Build Beautiful Interfaces.

Minimal Components. Maximum Clarity.

Thoughtfully Designed React Components.

Design Less. Build More.

---

## Development & Operations

### Commands
Initialize packages:
```bash
pnpm install
```

Start local dev server:
```bash
pnpm dev
```

Build production bundle:
```bash
pnpm build
```

Run ESLint checking:
```bash
pnpm lint
```

Run TypeScript verification:
```bash
pnpm tsc --noEmit
```

### Folder Architecture
- `app/`: Next.js page views and layouts.
- `components/`: UI components (`components/ui/`), site-wide blocks, and showcase elements.
- `content/`: Documentation and MDX specifications.
- `lib/`: Helper utilities (`lib/utils.ts`) and components registry definitions.

---

## 21st.dev Magic MCP Server Integration

Kanso UI is designed to work seamlessly with the [21st.dev Magic MCP server](https://21st.dev/). You can generate, modify, and preview these components directly within your AI coding assistant (Cursor, Cline, Windsurf, or Claude Desktop).

### Setup Instructions
1. Obtain an API key from the [21st.dev Magic Console](https://21st.dev/magic/console).
2. Configure the MCP server for your client:

   **CLI Automated Installation:**
   ```bash
   npx @21st-dev/cli@latest install <client> --api-key <your-api-key>
   ```
   *(Replace `<client>` with `cursor`, `cline`, `windsurf`, or `claude`.)*

   **Manual JSON Configuration:**
   Add the following object to your `mcp.json` or `mcp_config.json` file:
   ```json
   {
     "mcpServers": {
       "@21st-dev/magic": {
         "command": "npx",
         "args": [
           "-y",
           "@21st-dev/magic@latest",
           "API_KEY=\"your-api-key\""
         ]
       }
     }
   }
   ```
3. Use the command in your AI assistant chat by typing `/ui` followed by your prompt (e.g. `/ui create a minimal notification badge component`).

