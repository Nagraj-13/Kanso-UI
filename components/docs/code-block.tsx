"use client"

import * as React from "react"
import { CopyIcon, CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  /** Pre-highlighted HTML string from Shiki */
  html: string
  /** Language label to display (e.g. "tsx", "bash") */
  language?: string
  /** Raw source code string for clipboard */
  rawCode: string
  /** Additional class names */
  className?: string
}

/**
 * CodeBlock — Syntax-highlighted code block with copy-to-clipboard.
 *
 * Receives pre-rendered HTML from Shiki (server-side) and wraps it
 * with a copy button and language label. Consistent with the landing
 * page code block styling.
 */
function CodeBlock({ html, language = "tsx", rawCode, className }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(rawCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [rawCode])

  return (
    <div
      className={cn(
        "relative rounded-xl border border-zinc-200 bg-zinc-950 dark:border-zinc-800/80 overflow-hidden",
        className
      )}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <CheckIcon className="size-3.5" />
              Copied
            </>
          ) : (
            <>
              <CopyIcon className="size-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div
        className="overflow-x-auto p-4 text-sm leading-relaxed [&>pre]:bg-transparent! [&>pre]:p-0! [&>pre]:m-0!"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

export { CodeBlock }
export type { CodeBlockProps }
