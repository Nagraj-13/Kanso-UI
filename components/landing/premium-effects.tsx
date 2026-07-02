'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { MagneticButton } from '@/components/kanso/magnetic-button';
import { ShimmerBorder } from '@/components/kanso/shimmer-border';
import { TextReveal } from '@/components/kanso/text-reveal';
import { HalftoneImage } from '@/components/kanso/halftone-image';
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelDescription,
  PanelContent,
  GapDivider,
} from '@/components/kanso/panel';

export function PremiumEffects() {
  return (
    <Panel id="premium-components">
      <PanelHeader>
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mt-6">
          ✦ Zen Interactions
        </div>
        <PanelTitle>Premium Kanso Effects</PanelTitle>
        <PanelDescription>
          Add polish to your interface with our copy-paste motion effects.
          Experience the interactive previews below and click to view
          installation guides.
        </PanelDescription>
      </PanelHeader>

      <PanelContent>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Magnetic Button */}
          <Card className="flex flex-col justify-between border border-border bg-card shadow-xs hover:shadow-md transition-all duration-300 dark:bg-card/40 hover:-translate-y-0.5">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-foreground">
                Magnetic Button
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground leading-relaxed min-h-[40px]">
                Attracts elements smoothly to the user&apos;s cursor on hover.
                Built with spring physics for natural, responsive movement.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-2">
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 dark:bg-muted/15 relative overflow-hidden group">
                <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,var(--color-primary),transparent)]" />
                <MagneticButton className="relative z-10 shadow-sm">
                  Hover Magnet
                </MagneticButton>
              </div>
            </CardContent>
            <CardFooter className="mt-4 flex justify-end pb-4">
              <Button
                variant="link"
                size="sm"
                className="gap-1.5 px-0 text-foreground cursor-pointer"
                render={
                  <Link href="/docs/components/buttons/magnetic-button" />
                }
              >
                View Installation <ArrowUpRightIcon className="size-3.5" />
              </Button>
            </CardFooter>
          </Card>

          {/* Card 2: Shimmer Border */}
          <Card className="flex flex-col justify-between border border-border bg-card shadow-xs hover:shadow-md transition-all duration-300 dark:bg-card/40 hover:-translate-y-0.5">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-foreground">
                Shimmer Border
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground leading-relaxed min-h-[40px]">
                An elegant border lighting outline that cycles continuously.
                Leverages GPU-accelerated CSS conic-gradients for optimal
                performance.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-2">
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 dark:bg-muted/15 relative overflow-hidden">
                <ShimmerBorder borderRadius={8}>
                  <div className="px-5 py-3 text-xs font-semibold bg-card text-foreground rounded-[6px] shadow-xs">
                    Shimmer Border
                  </div>
                </ShimmerBorder>
              </div>
            </CardContent>
            <CardFooter className="mt-4 flex justify-end pb-4">
              <Button
                variant="link"
                size="sm"
                className="gap-1.5 px-0 text-foreground cursor-pointer"
                render={<Link href="/docs/components/effects/shimmer-border" />}
              >
                View Installation <ArrowUpRightIcon className="size-3.5" />
              </Button>
            </CardFooter>
          </Card>

          {/* Card 3: Text Reveal */}
          <Card className="flex flex-col justify-between border border-border bg-card shadow-xs hover:shadow-md transition-all duration-300 dark:bg-card/40 hover:-translate-y-0.5">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-foreground">
                Text Reveal
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground leading-relaxed min-h-[40px]">
                Fades in text character-by-character as it scrolls into
                viewport. Uses staggering and subtle blur overrides for
                readability.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-2">
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 dark:bg-muted/15 p-6 text-center">
                <TextReveal
                  text="Zen focus. Pure clarity. Kanso UI."
                  className="text-xs font-semibold text-foreground tracking-tight text-center leading-relaxed"
                />
              </div>
            </CardContent>
            <CardFooter className="mt-4 flex justify-end pb-4">
              <Button
                variant="link"
                size="sm"
                className="gap-1.5 px-0 text-foreground cursor-pointer"
                render={<Link href="/docs/components/typography/text-reveal" />}
              >
                View Installation <ArrowUpRightIcon className="size-3.5" />
              </Button>
            </CardFooter>
          </Card>

          {/* Card 4: Halftone Image */}
          <Card className="flex flex-col justify-between border border-border bg-card shadow-xs hover:shadow-md transition-all duration-300 dark:bg-card/40 hover:-translate-y-0.5">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-foreground">
                Halftone Image
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground leading-relaxed min-h-[40px]">
                Converts images into custom halftone illustrations. Includes
                real-time mouse dither warp distortions.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-2">
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 dark:bg-muted/15">
                <div className="size-24 rounded-2xl overflow-hidden border border-border bg-card flex items-center justify-center shadow-xs">
                  <HalftoneImage
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200"
                    dotSpacing={5}
                    contrast={1.3}
                    inkColor="currentColor"
                    paperColor="transparent"
                    className="size-full"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="mt-4 flex justify-end pb-4">
              <Button
                variant="link"
                size="sm"
                className="gap-1.5 px-0 text-foreground cursor-pointer"
                render={<Link href="/docs/components/effects/halftone-image" />}
              >
                View Installation <ArrowUpRightIcon className="size-3.5" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </PanelContent>
    </Panel>
  );
}
