'use client';

import * as React from 'react';
import { CopyIcon, CheckIcon } from 'lucide-react';

/**
 * Client component for the install command copy button.
 */
export function CopyInstallButton({ command }: { command: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <code className="flex-1 rounded-lg bg-zinc-950 px-3 py-2 text-xs font-mono text-zinc-300">
        {command}
      </code>
      <button
        onClick={handleCopy}
        className="inline-flex shrink-0 items-center gap-1 rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
        aria-label="Copy install command"
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
