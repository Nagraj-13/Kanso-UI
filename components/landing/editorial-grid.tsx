import * as React from 'react';
import { cn } from '@/lib/utils';

export function EditorialGrid() {
  return (
    <div className="absolute inset-y-0 left-0 right-0 pointer-events-none select-none z-10 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl h-full px-6 md:px-8 border-l border-r border-dashed border-zinc-200/35 dark:border-zinc-850/20" />
    </div>
  );
}

export function SectionDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'absolute top-0 left-0 right-0 pointer-events-none select-none z-20',
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="relative w-full h-0">
          {/* Leftmost '+' intersection at the container's left edge */}
          <div className="absolute -top-[5.5px] left-0 -translate-x-1/2 text-zinc-350 dark:text-zinc-800 text-[11px] font-mono leading-none z-20">
            +
          </div>
          {/* Rightmost '+' intersection at the container's right edge */}
          <div className="absolute -top-[5.5px] right-0 translate-x-1/2 text-zinc-350 dark:text-zinc-800 text-[11px] font-mono leading-none z-20">
            +
          </div>
        </div>
      </div>
    </div>
  );
}
