import * as React from 'react';
import {
  AccessibilityIcon,
  CopyIcon,
  Code2Icon,
  MoonIcon,
  SparkleIcon,
  CheckCircle2Icon,
} from 'lucide-react';
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelDescription,
  PanelContent,
} from '@/components/landing/panel';

export function Features() {
  return (
    <Panel id="features">
      <PanelHeader>
        <div className="flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground/50 uppercase select-none">
          <span>§02 / CORE</span>
        </div>
        <PanelTitle>Simplicity, Engineered.</PanelTitle>
        <PanelDescription>
          Each feature is focused on making interfaces clean, robust,
          accessible, and enjoyable to build.
        </PanelDescription>
      </PanelHeader>

      <PanelContent className="bg-background">
        {/* 4-column Bento Layout on large screens */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Minimalist Aesthetics (2 Columns) */}
          <div className="border border-line bg-card p-5 rounded-sm sm:col-span-2 lg:col-span-2 flex flex-col justify-between relative overflow-hidden group">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex size-6 items-center justify-center rounded-sm border border-line bg-muted">
                  <SparkleIcon className="size-3.5 text-muted-foreground" />
                </div>
                <span className="text-[9px] font-mono text-muted-foreground/45 select-none">
                  REF.02 / 01
                </span>
              </div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                Minimalist Aesthetics
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Inspired by Kanso (簡素), our design system embraces simplicity.
                No visual clutter, just refined interactive elements, smooth
                micro-animations, and generous spacing.
              </p>
            </div>
          </div>

          {/* Card 2: Copy-Paste Components (1 Column) */}
          <div className="border border-line bg-card p-5 rounded-sm sm:col-span-1 lg:col-span-1 flex flex-col justify-between relative overflow-hidden group">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex size-6 items-center justify-center rounded-sm border border-line bg-muted">
                  <CopyIcon className="size-3.5 text-muted-foreground" />
                </div>
                <span className="text-[9px] font-mono text-muted-foreground/45 select-none">
                  REF.02 / 02
                </span>
              </div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                Copy-Paste
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                No complex setup or heavy registry dependencies. Copy the
                component code directly into your project.
              </p>
            </div>
          </div>

          {/* Card 3: Accessible by Default (1 Column) */}
          <div className="border border-line bg-card p-5 rounded-sm sm:col-span-1 lg:col-span-1 flex flex-col justify-between relative overflow-hidden group">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex size-6 items-center justify-center rounded-sm border border-line bg-muted">
                  <AccessibilityIcon className="size-3.5 text-muted-foreground" />
                </div>
                <span className="text-[9px] font-mono text-muted-foreground/45 select-none">
                  REF.02 / 03
                </span>
              </div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                Accessible
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Engineered using Radix and Base UI primitive outlines. Full
                keyboard navigation and proper screen reader support.
              </p>
            </div>
          </div>

          {/* Card 4: TypeScript First (1 Column) */}
          <div className="border border-line bg-card p-5 rounded-sm sm:col-span-1 lg:col-span-1 flex flex-col justify-between relative overflow-hidden group">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex size-6 items-center justify-center rounded-sm border border-line bg-muted">
                  <Code2Icon className="size-3.5 text-muted-foreground" />
                </div>
                <span className="text-[9px] font-mono text-muted-foreground/45 select-none">
                  REF.02 / 04
                </span>
              </div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                TypeScript First
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Fully typed components with explicit contracts. Get code
                completion and compile-time warnings right in your editor.
              </p>
            </div>
          </div>

          {/* Card 5: Dark Mode Ready (1 Column) */}
          <div className="border border-line bg-card p-5 rounded-sm sm:col-span-1 lg:col-span-1 flex flex-col justify-between relative overflow-hidden group">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex size-6 items-center justify-center rounded-sm border border-line bg-muted">
                  <MoonIcon className="size-3.5 text-muted-foreground" />
                </div>
                <span className="text-[9px] font-mono text-muted-foreground/45 select-none">
                  REF.02 / 05
                </span>
              </div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                Dark Mode Ready
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Native class-based dark mode design. Easily adapt color schemes
                using CSS variables and Tailwind variables.
              </p>
            </div>
          </div>

          {/* Card 6: Production Ready (2 Columns) */}
          <div className="border border-line bg-card p-5 rounded-sm sm:col-span-2 lg:col-span-2 flex flex-col justify-between relative overflow-hidden group">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex size-6 items-center justify-center rounded-sm border border-line bg-muted">
                  <CheckCircle2Icon className="size-3.5 text-muted-foreground" />
                </div>
                <span className="text-[9px] font-mono text-muted-foreground/45 select-none">
                  REF.02 / 06
                </span>
              </div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                Production Ready
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Optimized for fast rendering and minimal bundle overhead.
                Battle-tested component design for scaling web apps without the
                extra bloat.
              </p>
            </div>
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}
