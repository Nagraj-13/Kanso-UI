import * as React from "react"
import { notFound } from "next/navigation"
import { getComponentsByCategory, getCategories } from "@/lib/registry"
import { CategoryShowcase } from "@/components/docs/category-showcase"

interface PageProps {
  params: Promise<{ category: string }>
}

/** Map categories to labels and descriptions */
const categoryMeta: Record<string, { label: string; description: string }> = {
  buttons: {
    label: "Buttons",
    description: "Attract and engage users with minimalist, interactive button animations.",
  },
  effects: {
    label: "Effects",
    description: "Visual enhancements and GPU-accelerated motion decorations to emphasize elements.",
  },
  typography: {
    label: "Typography",
    description: "Type layouts and scroll-driven typography reveals designed for reading focus.",
  },
  layout: {
    label: "Layout",
    description: "Clean, responsive grid alignments and page layout primitives.",
  },
  feedback: {
    label: "Feedback",
    description: "Subtle indicators and dialog templates to report status actions.",
  },
  "data-display": {
    label: "Data Display",
    description: "Minimalist tables, lists, and visual card alignments.",
  },
}

/**
 * Generate static params for categories in the registry.
 */
export async function generateStaticParams() {
  const categories = getCategories()
  return categories.map((cat) => ({ category: cat }))
}

/**
 * Generate metadata dynamically.
 */
export async function generateMetadata({ params }: PageProps) {
  const { category } = await params
  const meta = categoryMeta[category] ?? {
    label: category.charAt(0).toUpperCase() + category.slice(1).replace("-", " "),
    description: `Browse ${category} components.`,
  }
  return {
    title: `${meta.label} — Kanso UI`,
    description: meta.description,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  const components = getComponentsByCategory(category as any)

  if (components.length === 0) {
    notFound()
  }

  const meta = categoryMeta[category] ?? {
    label: category.charAt(0).toUpperCase() + category.slice(1).replace("-", " "),
    description: `Browse ${category} components.`,
  }

  return (
    <CategoryShowcase
      categoryLabel={meta.label}
      categoryDescription={meta.description}
      components={components}
    />
  )
}
