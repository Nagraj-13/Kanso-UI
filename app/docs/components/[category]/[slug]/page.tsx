import * as React from "react"
import { notFound } from "next/navigation"
import * as fs from "fs/promises"
import * as path from "path"
import { createHighlighter } from "shiki"
import { registry, getComponent } from "@/lib/registry"
import { ComponentDemo } from "@/components/docs/component-demos"
import { CodeBlock, TerminalBlock } from "@/components/docs/code-block"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

interface PageProps {
  params: Promise<{ category: string; slug: string }>
}

/**
 * Generate static params for all registered components.
 * Returning both category and slug for Next.js App Router dynamic nested routes.
 */
export async function generateStaticParams() {
  return registry.map((c) => ({
    category: c.category,
    slug: c.name,
  }))
}

/**
 * Generate metadata per component page.
 */
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const component = getComponent(slug)
  if (!component) return {}
  return {
    title: `${component.title} — Kanso UI`,
    description: component.description,
  }
}

/**
 * Dynamic component documentation page.
 *
 * Renders:
 * - Title and description
 * - Live interactive preview
 * - Installation instructions with terminal blocks
 * - Full source code (Shiki-highlighted) with collapsible view
 * - Props table
 */
export default async function ComponentPage({ params }: PageProps) {
  const { category, slug } = await params
  const component = getComponent(slug)

  // Validate the component exists and its category matches the route path
  if (!component || component.category !== category) {
    notFound()
  }

  // Read the raw source code
  const filePath = path.join(process.cwd(), component.filePath)
  let rawSource = ""
  try {
    rawSource = await fs.readFile(filePath, "utf-8")
  } catch {
    rawSource = "// Source file not found"
  }

  // Highlight with Shiki
  const highlighter = await createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: ["tsx"],
  })

  const highlightedHtml = highlighter.codeToHtml(rawSource, {
    lang: "tsx",
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  })

  highlighter.dispose()

  // Build install command
  const depList = component.dependencies.length > 0
    ? component.dependencies.join(" ")
    : null

  return (
    <div className="max-w-3xl">
      {/* ── Back Navigation ─────────────────────────── */}
      <div className="mb-6">
        <Link
          href={`/docs/components/${category}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeftIcon className="size-3.5" />
          Back to {category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")}
        </Link>
      </div>

      {/* ── Header ──────────────────────────────────── */}
      <div className="mb-10">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
          {component.category}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {component.title}
        </h1>
        <p className="mt-2 text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
          {component.description}
        </p>

        {/* Tag pills */}
        {component.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {component.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:bg-zinc-900 dark:text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Live Preview ────────────────────────────── */}
      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <span className="flex size-5 items-center justify-center rounded bg-zinc-100 text-[10px] dark:bg-zinc-800">
            ▶
          </span>
          Preview
        </h2>
        <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-8 dark:border-zinc-800 dark:bg-zinc-900/20">
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative z-10">
            <ComponentDemo name={component.name} />
          </div>
        </div>
      </section>

      {/* ── Installation ────────────────────────────── */}
      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <span className="flex size-5 items-center justify-center rounded bg-zinc-100 text-[10px] dark:bg-zinc-800">
            ↓
          </span>
          Installation
        </h2>

        <div className="space-y-4">
          {/* Step 1: Copy source */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/30">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white dark:bg-zinc-200 dark:text-zinc-900">
                1
              </span>
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Copy the source
              </h3>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 ml-7">
              Copy{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono dark:bg-zinc-800">
                {component.filePath}
              </code>{" "}
              into your project.
            </p>
          </div>

          {/* Step 2: Install dependencies */}
          {depList && (
            <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/30">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white dark:bg-zinc-200 dark:text-zinc-900">
                  2
                </span>
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Install dependencies
                </h3>
              </div>
              <div className="ml-7">
                <TerminalBlock command={`pnpm add ${depList}`} />
              </div>
            </div>
          )}

          {/* Internal deps */}
          {component.internalDeps.length > 0 && (
            <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/30">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white dark:bg-zinc-200 dark:text-zinc-900">
                  {depList ? "3" : "2"}
                </span>
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Required files
                </h3>
              </div>
              <ul className="space-y-1.5 ml-7">
                {component.internalDeps.map((dep) => (
                  <li key={dep} className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <span className="text-zinc-300 dark:text-zinc-700">→</span>
                    <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono dark:bg-zinc-800">
                      {dep}
                    </code>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ── Source Code ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <span className="flex size-5 items-center justify-center rounded bg-zinc-100 text-[10px] dark:bg-zinc-800">
            {"<>"}
          </span>
          Source Code
        </h2>
        <CodeBlock
          html={highlightedHtml}
          language="tsx"
          rawCode={rawSource}
          filename={component.filePath.split("/").pop()}
        />
      </section>

      {/* ── Props Table ─────────────────────────────── */}
      {component.props.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            <span className="flex size-5 items-center justify-center rounded bg-zinc-100 text-[10px] dark:bg-zinc-800">
              ≡
            </span>
            Props
          </h2>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-950">
            <ScrollArea className="w-full">
              <Table containerClassName="overflow-visible">
                <TableHeader>
                  <TableRow className="bg-zinc-50/80 hover:bg-zinc-50/80 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/40">
                    <TableHead className="px-4 py-3">Prop</TableHead>
                    <TableHead className="px-4 py-3">Type</TableHead>
                    <TableHead className="px-4 py-3">Default</TableHead>
                    <TableHead className="px-4 py-3">Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {component.props.map((prop) => (
                    <TableRow key={prop.name}>
                      <TableCell className="px-4 py-3">
                        <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono font-semibold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                          {prop.name}
                        </code>
                        {prop.required && (
                          <span className="ml-1.5 text-[10px] font-bold text-red-500">
                            required
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <code className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                          {prop.type}
                        </code>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-zinc-500 dark:text-zinc-400">
                        {prop.default ? (
                          <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono dark:bg-zinc-800">
                            {prop.default}
                          </code>
                        ) : (
                          <span className="text-zinc-300 dark:text-zinc-700">—</span>
                        )}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                        {prop.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </section>
      )}
    </div>
  )
}
