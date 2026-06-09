import * as React from "react"
import { notFound } from "next/navigation"
import * as fs from "fs/promises"
import * as path from "path"
import { createHighlighter } from "shiki"
import { registry, getComponent } from "@/lib/registry"
import { ComponentDemo } from "@/components/docs/component-demos"
import { CodeBlock } from "@/components/docs/code-block"
import { CopyInstallButton } from "./copy-install-button"

interface PageProps {
  params: Promise<{ slug: string }>
}

/**
 * Generate static params for all registered components.
 */
export async function generateStaticParams() {
  return registry.map((c) => ({ slug: c.name }))
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
 * - Installation command with copy button
 * - Full source code (Shiki-highlighted) with copy button
 * - Props table
 * - Dependencies list
 */
export default async function ComponentPage({ params }: PageProps) {
  const { slug } = await params
  const component = getComponent(slug)

  if (!component) {
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
      {/* Header */}
      <div className="mb-10">
        <span className="inline-block mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          {component.category}
        </span>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {component.title}
        </h1>
        <p className="mt-2 text-base text-zinc-500 dark:text-zinc-400">
          {component.description}
        </p>
      </div>

      {/* Live Preview */}
      <section className="mb-10">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Preview
        </h2>
        <div className="flex min-h-[240px] items-center justify-center rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-8 dark:border-zinc-800 dark:bg-zinc-900/20">
          <ComponentDemo name={component.name} />
        </div>
      </section>

      {/* Installation */}
      <section className="mb-10">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Installation
        </h2>

        <div className="space-y-4">
          {/* Manual copy instruction */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/30">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">
              Copy the source
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Copy{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono dark:bg-zinc-800">
                {component.filePath}
              </code>{" "}
              into your project.
            </p>
          </div>

          {/* Dependencies */}
          {depList && (
            <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/30">
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                Install dependencies
              </h3>
              <CopyInstallButton command={`pnpm add ${depList}`} />
            </div>
          )}

          {/* Internal deps */}
          {component.internalDeps.length > 0 && (
            <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/30">
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                Required files
              </h3>
              <ul className="space-y-1">
                {component.internalDeps.map((dep) => (
                  <li key={dep} className="text-sm text-zinc-500 dark:text-zinc-400">
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

      {/* Source Code */}
      <section className="mb-10">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Source Code
        </h2>
        <CodeBlock html={highlightedHtml} language="tsx" rawCode={rawSource} />
      </section>

      {/* Props Table */}
      {component.props.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Props
          </h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/30">
                  <th className="px-4 py-2.5 text-left font-medium text-zinc-600 dark:text-zinc-400">
                    Prop
                  </th>
                  <th className="px-4 py-2.5 text-left font-medium text-zinc-600 dark:text-zinc-400">
                    Type
                  </th>
                  <th className="px-4 py-2.5 text-left font-medium text-zinc-600 dark:text-zinc-400">
                    Default
                  </th>
                  <th className="px-4 py-2.5 text-left font-medium text-zinc-600 dark:text-zinc-400">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {component.props.map((prop) => (
                  <tr
                    key={prop.name}
                    className="border-b border-zinc-100 dark:border-zinc-800/50 last:border-0"
                  >
                    <td className="px-4 py-2.5">
                      <code className="text-xs font-mono font-medium text-zinc-900 dark:text-zinc-100">
                        {prop.name}
                      </code>
                      {prop.required && (
                        <span className="ml-1 text-xs text-red-500">*</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      <code className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                        {prop.type}
                      </code>
                    </td>
                    <td className="px-4 py-2.5 text-zinc-500 dark:text-zinc-400">
                      {prop.default ? (
                        <code className="text-xs font-mono">{prop.default}</code>
                      ) : (
                        <span className="text-zinc-300 dark:text-zinc-600">—</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-zinc-500 dark:text-zinc-400">
                      {prop.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  )
}
