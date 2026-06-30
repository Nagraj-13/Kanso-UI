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

export function Features() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[1fr] w-full">
      {/* Card 1: Minimalist Aesthetics (2 Columns) */}
      <Card className="border border-border bg-card dark:bg-card/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 shadow-xs hover:shadow-sm sm:col-span-2 lg:col-span-2 flex flex-col relative group overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted dark:bg-muted/50">
            <SparkleIcon className="size-5 text-muted-foreground" />
          </div>
          <CardTitle className="mt-4 text-xl font-semibold text-foreground">
            Minimalist Aesthetics
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col flex-1">
          <CardDescription className="text-sm text-muted-foreground leading-relaxed">
            Inspired by Kanso (簡素), our design system embraces simplicity. No
            visual clutter, just refined interactive elements, smooth
            micro-animations, and generous spacing.
          </CardDescription>
        </CardContent>
      </Card>

      {/* Card 2: Copy-Paste Components (1 Column) */}
      <Card className="border border-border bg-card dark:bg-card/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 shadow-xs hover:shadow-sm sm:col-span-1 lg:col-span-1 flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted dark:bg-muted/50">
            <CopyIcon className="size-5 text-muted-foreground" />
          </div>
          <CardTitle className="mt-4 text-base font-semibold text-foreground">
            Copy-Paste
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <CardDescription className="text-xs text-muted-foreground leading-relaxed">
            No complex setup or heavy registry dependencies. Copy the component
            code directly into your project.
          </CardDescription>
        </CardContent>
      </Card>

      {/* Card 3: Accessible by Default (1 Column) */}
      <Card className="border border-border bg-card dark:bg-card/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 shadow-xs hover:shadow-sm sm:col-span-1 lg:col-span-1 flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted dark:bg-muted/50">
            <AccessibilityIcon className="size-5 text-muted-foreground" />
          </div>
          <CardTitle className="mt-4 text-base font-semibold text-foreground">
            Accessible
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <CardDescription className="text-xs text-muted-foreground leading-relaxed">
            Engineered using Radix and Base UI primitive outlines. Full keyboard
            navigation and proper screen reader support.
          </CardDescription>
        </CardContent>
      </Card>

      {/* Card 4: TypeScript First (1 Column) */}
      <Card className="border border-border bg-card dark:bg-card/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 shadow-xs hover:shadow-sm sm:col-span-1 lg:col-span-1 flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted dark:bg-muted/50">
            <Code2Icon className="size-5 text-muted-foreground" />
          </div>
          <CardTitle className="mt-4 text-base font-semibold text-foreground">
            TypeScript First
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <CardDescription className="text-xs text-muted-foreground leading-relaxed">
            Fully typed components with explicit contracts. Get code completion
            and compile-time warnings right in your editor.
          </CardDescription>
        </CardContent>
      </Card>

      {/* Card 5: Dark Mode Ready (1 Column) */}
      <Card className="border border-border bg-card dark:bg-card/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 shadow-xs hover:shadow-sm sm:col-span-1 lg:col-span-1 flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted dark:bg-muted/50">
            <MoonIcon className="size-5 text-muted-foreground" />
          </div>
          <CardTitle className="mt-4 text-base font-semibold text-foreground">
            Dark Mode Ready
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <CardDescription className="text-xs text-muted-foreground leading-relaxed">
            Native class-based dark mode design. Easily adapt color schemes
            using CSS variables and Tailwind variables.
          </CardDescription>
        </CardContent>
      </Card>

      {/* Card 6: Production Ready (1 Column) */}
      <Card className="border border-border bg-card dark:bg-card/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 shadow-xs hover:shadow-sm sm:col-span-1 lg:col-span-1 flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted dark:bg-muted/50">
            <CheckCircle2Icon className="size-5 text-muted-foreground" />
          </div>
          <CardTitle className="mt-4 text-xl font-semibold text-foreground">
            Production Ready
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <CardDescription className="text-sm text-muted-foreground leading-relaxed">
            Optimized for fast rendering and minimal bundle overhead.
            Battle-tested component design for scaling web apps without the
            extra bloat.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
