<p align="center">
  <img src="public/KansoUiCompletelogo.png" alt="Kanso UI" width="240" />
</p>

<p align="center">
  <strong>Simplicity, Engineered.</strong>
</p>

<p align="center">
  Thoughtfully designed, copy-paste React components for modern web applications.<br/>
  Inspired by Japanese minimalism. Built with Next.js, TypeScript, and Tailwind CSS.
</p>

---

## ✨ Features

- **Copy-Paste Components** — Browse, preview, and copy source code directly into your project
- **Component Registry** — Structured metadata with props documentation, dependencies, and tags
- **API Endpoint** — `GET /api/registry/[name]` returns component source as JSON (for future CLI)
- **Live Previews** — Interactive component demos with syntax-highlighted source code
- **Accessible** — Built on Base UI primitives with keyboard navigation and screen reader support
- **Dark Mode** — First-class dark mode via `next-themes` and Tailwind CSS variables
- **TypeScript** — Fully typed components with exported props interfaces
- **Minimal Design** — Neutral palette, clean typography, subtle animations — inspired by Vercel, Linear, and shadcn/ui

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Nagraj-13/Kanso-UI.git
cd kanso-ui

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.  
Open [http://localhost:3000/docs](http://localhost:3000/docs) to browse components.

---

## 📦 Components

### Kanso Components (`components/kanso/`)

| Component | Category | Description |
|-----------|----------|-------------|
| **Magnetic Button** | Buttons | Button that magnetically follows cursor on hover |
| **Shimmer Border** | Effects | Container with animated shimmer border effect |
| **Text Reveal** | Typography | Text that reveals character-by-character on scroll |

### Primitive Components (`components/ui/`)

55+ shadcn-style primitives built on Base UI including Button, Card, Dialog, Input, Tabs, Command, and more.

---

## 🏗 Adding Components

Kanso UI is designed for easy extension. To add a new component:

1. Create `components/kanso/<name>.tsx`
2. Add entry to `lib/registry.ts`
3. Add demo to `components/docs/component-demos.tsx`
4. Run `pnpm build` to verify

See [CLAUDE.md](./CLAUDE.md) for detailed step-by-step instructions with code examples.

---

## 📁 Project Structure

```
kanso-ui/
├── app/                    # Next.js pages and API routes
│   ├── docs/               # Component documentation pages
│   └── api/registry/       # Component source API
├── components/
│   ├── kanso/              # ★ Kanso-branded copy-paste components
│   ├── ui/                 # shadcn/Base UI primitives
│   └── docs/               # Documentation infrastructure
├── lib/
│   ├── registry.ts         # ★ Component registry
│   └── utils.ts            # cn() helper
├── AGENTS.md               # Agent rulebook
├── CLAUDE.md               # Development rulebook
└── README.md               # This file
```

---

## 🛠 Development

| Command | Description |
|---------|-------------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm lint` | Run ESLint |
| `pnpm tsc --noEmit` | Type check |

---

## 🎨 Design Philosophy

**Kanso (簡素)** — one of the seven principles of Zen aesthetics — means simplicity, clarity, and the removal of unnecessary elements.

Every component in Kanso UI follows these principles:

1. **Simplicity over cleverness**
2. **Readability over abstraction**
3. **Composition over inheritance**
4. **Accessibility over visual tricks**
5. **Performance over unnecessary features**

---

## 📄 License

MIT © [Nagaraj](https://github.com/Nagraj-13)
