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
    <section
      id="features"
      className=" border-t border-b border-border border-dashed"
    >
      <div className="mx-auto max-w-7xl py-28 border-r border-l border-dashed border-border px-6 md:px-8">
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Simplicity, Engineered.
          </h2>
          <p className="max-w-xl text-base text-muted-foreground">
            Each feature is focused on making interfaces clean, robust,
            accessible, and enjoyable to build.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <Card className="border border-border bg-card dark:bg-card/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 shadow-xs hover:shadow-sm hover:-translate-y-0.5">
            <CardHeader className="pb-2">
              <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted dark:bg-muted/50">
                <AccessibilityIcon className="size-5 text-muted-foreground" />
              </div>
              <CardTitle className="mt-4 text-base font-semibold text-foreground">
                Accessible by Default
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                Engineered using Radix and Base UI primitive outlines. Full
                keyboard navigation and proper screen reader support.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="border border-border bg-card dark:bg-card/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 shadow-xs hover:shadow-sm hover:-translate-y-0.5">
            <CardHeader className="pb-2">
              <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted dark:bg-muted/50">
                <CopyIcon className="size-5 text-muted-foreground" />
              </div>
              <CardTitle className="mt-4 text-base font-semibold text-foreground">
                Copy-Paste Components
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                No complex setup or heavy registry dependencies. Copy the
                component code directly into your folder structure.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="border border-border bg-card dark:bg-card/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 shadow-xs hover:shadow-sm hover:-translate-y-0.5">
            <CardHeader className="pb-2">
              <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted dark:bg-muted/50">
                <Code2Icon className="size-5 text-muted-foreground" />
              </div>
              <CardTitle className="mt-4 text-base font-semibold text-foreground">
                TypeScript First
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                Fully typed components with explicit contracts. Get code
                completion and compile-time warnings right in your editor.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Feature 4 */}
          <Card className="border border-border bg-card dark:bg-card/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 shadow-xs hover:shadow-sm hover:-translate-y-0.5">
            <CardHeader className="pb-2">
              <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted dark:bg-muted/50">
                <MoonIcon className="size-5 text-muted-foreground" />
              </div>
              <CardTitle className="mt-4 text-base font-semibold text-foreground">
                Dark Mode Ready
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                Native class-based dark mode design. Easily adapt color schemes
                using CSS variables and Tailwind variables.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Feature 5 */}
          <Card className="border border-border bg-card dark:bg-card/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 shadow-xs hover:shadow-sm hover:-translate-y-0.5">
            <CardHeader className="pb-2">
              <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted dark:bg-muted/50">
                <SparkleIcon className="size-5 text-muted-foreground" />
              </div>
              <CardTitle className="mt-4 text-base font-semibold text-foreground">
                Beautiful Defaults
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                Clean, minimalist aesthetics inspired by Zen. Neutral borders,
                clear indicators, and generous spacing.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Feature 6 */}
          <Card className="border border-border bg-card dark:bg-card/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 shadow-xs hover:shadow-sm hover:-translate-y-0.5">
            <CardHeader className="pb-2">
              <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted dark:bg-muted/50">
                <CheckCircle2Icon className="size-5 text-muted-foreground" />
              </div>
              <CardTitle className="mt-4 text-base font-semibold text-foreground">
                Production Ready
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                Optimized for fast rendering and minimal bundle overhead.
                Battle-tested component design for scaling web apps.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
