//app/docs/layout.tsx
import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { registry, getCategories } from "@/lib/registry"
import { DocsLayoutClient } from "./layout-client"

export const metadata = {
  title: "Components — Kanso UI",
  description: "Browse, preview, and copy-paste Kanso UI components.",
}

/** Map category slugs to display labels and emoji icons */
const categoryMeta: Record<string, { label: string; icon: string }> = {
  buttons: { label: "Buttons", icon: "◉" },
  effects: { label: "Effects", icon: "✦" },
  layout: { label: "Layout", icon: "▣" },
  typography: { label: "Typography", icon: "Aa" },
  feedback: { label: "Feedback", icon: "◈" },
  "data-display": { label: "Data Display", icon: "▤" },
}

/**
 * Docs layout with elegant sidebar navigation listing all registered components.
 * Server component that builds sidebar data from the registry.
 */
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = getCategories()

  // Build sidebar data with categories as items under a single group
  const sidebarGroups = [
    {
      category: "components",
      label: "Components",
      icon: "▣",
      items: categories.map((cat) => {
        const meta = categoryMeta[cat] ?? {
          label: cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " "),
          icon: "•",
        }
        return {
          name: cat,
          title: meta.label,
          href: `/docs/components/${cat}`,
        }
      }),
    },
  ]

  return (
    <DocsLayoutClient sidebarGroups={sidebarGroups}>
      {children}
    </DocsLayoutClient>
  )
}
