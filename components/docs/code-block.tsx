'use client';

import * as React from 'react';
import {
  CopyIcon,
  CheckIcon,
  FileIcon,
  TerminalIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  /** Pre-highlighted HTML string from Shiki */
  html: string;
  /** Language label to display (e.g. "tsx", "bash") */
  language?: string;
  /** Raw source code string for clipboard */
  rawCode: string;
  /** Filename to display in the tab header */
  filename?: string;
  /** Whether to show line numbers (default: true) */
  showLineNumbers?: boolean;
  /** Whether the code block is collapsible (default: false for short, true for >20 lines) */
  collapsible?: boolean;
  /** Maximum height before collapsing (default: 400) */
  maxCollapsedHeight?: number;
  /** Additional class names */
  className?: string;
}

/**
 * CodeBlock — Premium syntax-highlighted code block with copy-to-clipboard.
 *
 * Features:
 * - Shiki syntax highlighting (server-rendered)
 * - Animated copy button with success feedback
 * - Optional filename tab (file or terminal icon)
 * - Responsive horizontal scroll
 * - Line numbers via CSS counter
 * - Collapsible mode for long source files
 * - Dark theme styling with subtle gradient
 *
 * Reusable across docs pages and landing page.
 */
function CodeBlock({
  html,
  language = 'tsx',
  rawCode,
  filename,
  showLineNumbers = true,
  collapsible: collapsibleProp,
  maxCollapsedHeight = 400,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const codeRef = React.useRef<HTMLDivElement>(null);
  const [needsCollapse, setNeedsCollapse] = React.useState(false);

  const lineCount = rawCode.split('\n').length;

  // Auto-detect if collapsible is needed
  const collapsible = collapsibleProp ?? lineCount > 25;

  React.useEffect(() => {
    if (!collapsible || !codeRef.current) return;
    const height = codeRef.current.scrollHeight;
    setNeedsCollapse(height > maxCollapsedHeight);
  }, [collapsible, maxCollapsedHeight, html]);

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [rawCode]);

  const isTerminal =
    language === 'bash' || language === 'sh' || language === 'shell';
  const displayName = filename ?? (isTerminal ? 'Terminal' : `${language}`);

  return (
    <div
      className={cn(
        'group/codeblock relative w-full rounded-xl border border-zinc-200 bg-zinc-50 overflow-hidden dark:border-zinc-800/80 dark:bg-zinc-950',
        className
      )}
    >
      {/* ── Header bar ────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-zinc-200/80 bg-zinc-100/50 px-4 py-2 dark:border-zinc-800/80 dark:bg-zinc-900/50">
        {/* Left: File tab */}
        <div className="flex items-center gap-2">
          {/* Traffic dots */}
          <div className="mr-1.5 hidden items-center gap-1.5 sm:flex">
            <span className="size-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <span className="size-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <span className="size-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          </div>

          {/* Filename tab */}
          <div className="flex items-center gap-1.5 rounded-md bg-zinc-200/50 px-2.5 py-1 dark:bg-zinc-800/60">
            {isTerminal ? (
              <TerminalIcon className="size-3 text-zinc-400 dark:text-zinc-500" />
            ) : (
              <FileIcon className="size-3 text-zinc-400 dark:text-zinc-500" />
            )}
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              {displayName}
            </span>
          </div>
        </div>

        {/* Right: Copy button */}
        <button
          onClick={handleCopy}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-200',
            copied
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : 'text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300'
          )}
          aria-label="Copy code"
        >
          <span
            className={cn(
              'transition-transform duration-200',
              copied && 'scale-110'
            )}
          >
            {copied ? (
              <CheckIcon className="size-3.5" />
            ) : (
              <CopyIcon className="size-3.5" />
            )}
          </span>
          <span className="hidden sm:inline">
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </button>
      </div>

      {/* ── Code content ──────────────────────────────── */}
      <div
        ref={codeRef}
        className={cn(
          'relative overflow-hidden transition-[max-height] duration-300 ease-in-out',
          collapsible && needsCollapse && !isExpanded && 'overflow-hidden'
        )}
        style={
          collapsible && needsCollapse && !isExpanded
            ? { maxHeight: maxCollapsedHeight }
            : undefined
        }
      >
        <div
          className={cn(
            'overflow-x-auto p-4 text-[13px] leading-[1.7] font-mono text-zinc-800 dark:text-zinc-100',
            '[&>pre]:bg-transparent! [&>pre]:p-0! [&>pre]:m-0!',
            showLineNumbers && 'code-block-line-numbers'
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Fade overlay when collapsed */}
        {collapsible && needsCollapse && !isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-zinc-50 to-transparent dark:from-zinc-950 pointer-events-none" />
        )}
      </div>

      {/* ── Expand / Collapse toggle ──────────────────── */}
      {collapsible && needsCollapse && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-center gap-1.5 border-t border-zinc-200/60 bg-zinc-100/30 py-2 text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-100/60 hover:text-zinc-700 dark:border-zinc-800/60 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/60 dark:hover:text-zinc-300"
        >
          {isExpanded ? (
            <>
              <ChevronUpIcon className="size-3.5" />
              Show less
            </>
          ) : (
            <>
              <ChevronDownIcon className="size-3.5" />
              Show all {lineCount} lines
            </>
          )}
        </button>
      )}
    </div>
  );
}

/* ── Inline Terminal Block ────────────────────────────── */

interface TerminalBlockProps {
  /** The command to display and copy */
  command: string;
  /** Additional class names */
  className?: string;
}

/**
 * TerminalBlock — Compact terminal-style command block with copy button.
 *
 * Used for install commands and CLI snippets. Lighter than a full CodeBlock,
 * designed to sit inline within installation sections.
 */
function TerminalBlock({ command, className }: TerminalBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'group/terminal flex items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950',
        className
      )}
    >
      <div className="flex items-center gap-2.5 overflow-hidden min-w-0">
        <TerminalIcon className="size-3.5 shrink-0 text-zinc-400 dark:text-zinc-600" />
        <code className="truncate text-[13px] font-mono text-zinc-800 dark:text-zinc-300">
          {command}
        </code>
      </div>
      <button
        onClick={handleCopy}
        className={cn(
          'shrink-0 rounded-md p-1.5 transition-all duration-200',
          copied
            ? 'text-emerald-600 dark:text-emerald-400'
            : 'text-zinc-400 hover:bg-zinc-200/60 hover:text-zinc-700 dark:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300'
        )}
        aria-label="Copy command"
      >
        {copied ? (
          <CheckIcon className="size-3.5" />
        ) : (
          <CopyIcon className="size-3.5" />
        )}
      </button>
    </div>
  );
}

export { CodeBlock, TerminalBlock };
export type { CodeBlockProps, TerminalBlockProps };
