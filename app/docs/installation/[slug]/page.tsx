import * as React from "react"
import { notFound } from "next/navigation"
import { CodeBlock, TerminalBlock } from "@/components/docs/code-block"

interface InstallationPageProps {
  params: Promise<{ slug: string }>
}

const INSTALLATION_GUIDES: Record<
  string,
  {
    title: string
    description: string
    category: string
    steps: {
      number: number
      title: string
      description: React.ReactNode
      code?: {
        content: string
        lang: string
        filename: string
      }
      command?: string
    }[]
  }
> = {
  nextjs: {
    title: "Install Next.js",
    description: "Create a new Next.js project using the official create-next-app starter.",
    category: "Installation",
    steps: [
      {
        number: 1,
        title: "Create a new Next.js project",
        description: "Run create-next-app to scaffold a fresh project with TypeScript and Tailwind CSS.",
        command: "npx create-next-app@latest my-app --typescript --tailwind --app",
      },
      {
        number: 2,
        title: "Configure TypeScript options",
        description: "Verify that your tsconfig.json has paths mapped correctly so you can use the @/ prefix.",
        code: {
          filename: "tsconfig.json",
          lang: "json",
          content: `{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}`,
        },
      },
      {
        number: 3,
        title: "Verify structural organization",
        description: "Ensure your project has components/ and lib/ directories configured inside the root or src/ directory.",
      },
    ],
  },
  tailwindcss: {
    title: "Install Tailwind CSS",
    description: "Install and configure Tailwind CSS v4 for utility-first styling in Next.js.",
    category: "Installation",
    steps: [
      {
        number: 1,
        title: "Install Tailwind CSS v4",
        description: "Install tailwindcss and the official PostCSS plugin for compilation.",
        command: "pnpm add tailwindcss @tailwindcss/postcss postcss",
      },
      {
        number: 2,
        title: "Configure PostCSS",
        description: "Create a postcss.config.js file in your project root to enable Tailwind compilation.",
        code: {
          filename: "postcss.config.js",
          lang: "javascript",
          content: `module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}`,
        },
      },
      {
        number: 3,
        title: "Import Tailwind in globals.css",
        description: "Add the @import directive at the very top of your global CSS file to import Tailwind utilities and directives.",
        code: {
          filename: "app/globals.css",
          lang: "css",
          content: `@import "tailwindcss";`,
        },
      },
    ],
  },
  utilities: {
    title: "Add utilities",
    description: "Set up the standard class merging helper (cn) using clsx and tailwind-merge.",
    category: "Installation",
    steps: [
      {
        number: 1,
        title: "Install class merging dependencies",
        description: "Add clsx for conditional class resolution and tailwind-merge to clean up conflicting utility overrides.",
        command: "pnpm add clsx tailwind-merge",
      },
      {
        number: 2,
        title: "Create utils helper",
        description: "Create a lib/utils.ts file and paste the helper function code below.",
        code: {
          filename: "lib/utils.ts",
          lang: "typescript",
          content: `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`,
        },
      },
    ],
  },
  cli: {
    title: "CLI",
    description: "Add Kanso UI components directly into your codebase using our interactive copy-paste CLI.",
    category: "Installation",
    steps: [
      {
        number: 1,
        title: "Add a component using the CLI",
        description: "Run the CLI command to fetch a component source code and automatically install dependencies.",
        command: "npx kanso-ui add magnetic-button",
      },
      {
        number: 2,
        title: "Verify component placement",
        description: "Confirm that components/kanso/magnetic-button.tsx has been created with all the TypeScript source code.",
      },
    ],
  },
}

export async function generateStaticParams() {
  return [
    { slug: "nextjs" },
    { slug: "tailwindcss" },
    { slug: "utilities" },
    { slug: "cli" },
  ]
}

export async function generateMetadata({ params }: InstallationPageProps) {
  const { slug } = await params
  const guide = INSTALLATION_GUIDES[slug]
  if (!guide) return {}
  return {
    title: `${guide.title} — Kanso UI`,
    description: guide.description,
  }
}

export default async function InstallationPage({ params }: InstallationPageProps) {
  const { slug } = await params
  const guide = INSTALLATION_GUIDES[slug]

  if (!guide) {
    notFound()
  }

  return (
    <div className="w-full max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
          {guide.category}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {guide.title}
        </h1>
        <p className="mt-2 text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
          {guide.description}
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-8">
        {guide.steps.map((step) => (
          <div
            key={step.number}
            className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/30"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white dark:bg-zinc-200 dark:text-zinc-900">
                {step.number}
              </span>
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {step.title}
              </h3>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 ml-7.5 mb-4 leading-relaxed">
              {step.description}
            </p>

            {step.command && (
              <div className="ml-7.5">
                <TerminalBlock command={step.command} />
              </div>
            )}

            {step.code && (
              <div className="ml-7.5">
                <CodeBlock
                  language={step.code.lang}
                  rawCode={step.code.content}
                  filename={step.code.filename}
                  html={`<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;color:#24292e" tabindex="0"><code>${step.code.content
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")}</code></pre>`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
