import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { registry, getCategories } from "@/lib/registry"
import { ThemeProvider } from "@/components/theme-provider"
import { DocsLayoutClient } from "./layout-client"

export const metadata = {
  title: "Components — Kanso UI",
  description: "Browse, preview, and copy-paste Kanso UI components.",
}

/**
 * Docs layout with sidebar navigation listing all registered components.
 * The sidebar groups components by category and highlights the active page.
 */
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = getCategories()

  // Build sidebar data grouped by category
  const sidebarGroups = categories.map((cat) => ({
    category: cat,
    label: cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " "),
    items: registry
      .filter((c) => c.category === cat)
      .map((c) => ({
        name: c.name,
        title: c.title,
        href: `/docs/components/${c.name}`,
      })),
  }))

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Top bar */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/60 bg-white/80 backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/Kansologo.png"
                alt="Kanso UI Logo"
                width={20}
                height={20}
                className="dark:invert"
              />
              <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                Kanso UI
              </span>
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
            <span className="text-sm text-zinc-500">Components</span>
          </div>
          <DocsLayoutClient />
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar — desktop */}
        <aside className="hidden w-56 shrink-0 border-r border-zinc-200/60 dark:border-zinc-800/60 lg:block">
          <nav className="sticky top-14 overflow-y-auto p-6" style={{ maxHeight: "calc(100vh - 3.5rem)" }}>
            {sidebarGroups.map((group) => (
              <div key={group.category} className="mb-6">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  {group.label}
                </h3>
                <ul className="space-y-0.5">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="block rounded-md px-2.5 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 px-6 py-10 lg:px-12">
          {children}
        </main>
      </div>
    </div>
  )
}
