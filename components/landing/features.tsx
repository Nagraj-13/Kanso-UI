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
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
  StripeDivider,
} from '@/components/kanso/panel';

export function Features() {
  return (
    <Panel id="features">
      <PanelHeader>
        <PanelTitle>Core Principles</PanelTitle>
      </PanelHeader>

      <PanelContent className="p-0 md:p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {/* Card 1: Minimalist Aesthetics (2 Columns - Row 1 Left) */}
          <Card className="rounded-none border-0 border-b border-[var(--line)] bg-transparent hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 sm:col-span-2 sm:border-r flex flex-col relative group overflow-hidden shadow-none">
            {/* Aesthetic Graphic Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-64 rounded-full bg-zinc-400 dark:bg-zinc-600 opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500" />
            </div>

            <CardHeader className="pb-2 p-6 md:p-8 relative z-10">
              <div className="flex size-10 items-center justify-center rounded-lg border border-[var(--line)] bg-muted/50 dark:bg-muted/20">
                <SparkleIcon className="size-5 text-muted-foreground" />
              </div>
              <CardTitle className="mt-6 text-xl font-semibold text-foreground">
                Minimalist Aesthetics
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 p-6 md:p-8 pt-0 md:pt-0 relative z-10">
              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                Inspired by Kanso (簡素), our design system embraces simplicity.
                No visual clutter, just refined interactive elements, smooth
                micro-animations, and generous spacing.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Card 2: Copy-Paste Components (1 Column - Row 1 Middle) */}
          <Card className="rounded-none border-0 border-b border-[var(--line)] bg-transparent hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 sm:col-span-1 lg:border-r flex flex-col shadow-none">
            <CardHeader className="pb-2 p-6">
              <div className="flex size-10 items-center justify-center rounded-lg border border-[var(--line)] bg-muted/50 dark:bg-muted/20">
                <CopyIcon className="size-5 text-muted-foreground" />
              </div>
              <CardTitle className="mt-4 text-base font-semibold text-foreground">
                Copy-Paste
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-6 pt-0">
              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                No complex setup or heavy registry dependencies. Copy the
                component code directly into your project.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Card 3: Accessible by Default (1 Column - Row 1 Right) */}
          <Card className="rounded-none border-0 border-b border-[var(--line)] bg-transparent hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 sm:col-span-1 flex flex-col shadow-none">
            <CardHeader className="pb-2 p-6">
              <div className="flex size-10 items-center justify-center rounded-lg border border-[var(--line)] bg-muted/50 dark:bg-muted/20">
                <AccessibilityIcon className="size-5 text-muted-foreground" />
              </div>
              <CardTitle className="mt-4 text-base font-semibold text-foreground">
                Accessible
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-6 pt-0">
              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                Engineered using Radix and Base UI primitive outlines. Full
                keyboard navigation and proper screen reader support.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Card 4: TypeScript First (1 Column - Row 2 Left) */}
          <Card className="rounded-none border-0 border-b lg:border-b-0 border-[var(--line)] bg-transparent hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 sm:col-span-1 sm:border-r flex flex-col shadow-none">
            <CardHeader className="pb-2 p-6">
              <div className="flex size-10 items-center justify-center rounded-lg border border-[var(--line)] bg-muted/50 dark:bg-muted/20">
                <Code2Icon className="size-5 text-muted-foreground" />
              </div>
              <CardTitle className="mt-4 text-base font-semibold text-foreground">
                TypeScript First
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-6 pt-0">
              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                Fully typed components with explicit contracts. Get code
                completion and compile-time warnings right in your editor.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Card 5: Dark Mode Ready (1 Column - Row 2 Middle) */}
          <Card className="rounded-none border-0 border-b sm:border-b-0 lg:border-b-0 border-[var(--line)] bg-transparent hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 sm:col-span-1 lg:border-r flex flex-col shadow-none">
            <CardHeader className="pb-2 p-6">
              <div className="flex size-10 items-center justify-center rounded-lg border border-[var(--line)] bg-muted/50 dark:bg-muted/20">
                <MoonIcon className="size-5 text-muted-foreground" />
              </div>
              <CardTitle className="mt-4 text-base font-semibold text-foreground">
                Dark Mode Ready
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-6 pt-0">
              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                Native class-based dark mode design. Easily adapt color schemes
                using CSS variables and Tailwind variables.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Card 6: Production Ready (2 Columns - Row 2 Right) */}
          <Card className="rounded-none border-0 border-b lg:border-b-0 border-[var(--line)] bg-transparent hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 sm:col-span-2 flex flex-col relative group overflow-hidden shadow-none">
            {/* Aesthetic Graphic Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute -bottom-1/2 -right-1/4 w-full h-full rounded-full bg-zinc-300 dark:bg-zinc-600 opacity-10 blur-[80px] group-hover:opacity-20 group-hover:-translate-y-4 transition-all duration-700" />
            </div>

            <CardHeader className="pb-2 p-6 md:p-8 relative z-10">
              <div className="flex size-10 items-center justify-center rounded-lg border border-[var(--line)] bg-muted/50 dark:bg-muted/20">
                <CheckCircle2Icon className="size-5 text-muted-foreground" />
              </div>
              <CardTitle className="mt-6 text-xl font-semibold text-foreground">
                Production Ready
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-6 md:p-8 pt-0 md:pt-0 relative z-10">
              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                Optimized for fast rendering and minimal bundle overhead.
                Battle-tested component design for scaling web apps without the
                extra bloat.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </PanelContent>
    </Panel>
  );
}
