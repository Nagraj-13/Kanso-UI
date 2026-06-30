'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelDescription,
  PanelContent,
} from '@/components/landing/panel';
import { MagneticButton } from '@/components/kanso/magnetic-button';
import { ShimmerBorder } from '@/components/kanso/shimmer-border';
import { TextReveal } from '@/components/kanso/text-reveal';
import { HalftoneImage } from '@/components/kanso/halftone-image';

export function PremiumEffects() {
  return (
    <Panel id="premium-components">
      <PanelHeader>
        <div className="flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground/50 uppercase select-none">
          <span>§03 / EFFECTS</span>
        </div>
        <PanelTitle>Premium Kanso Effects</PanelTitle>
        <PanelDescription>
          Add polish to your interface with our copy-paste motion effects.
          Experience the interactive previews below and click to view
          installation guides.
        </PanelDescription>
      </PanelHeader>

      <PanelContent className="bg-background">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Magnetic Button */}
          <div className="flex flex-col justify-between border border-line bg-card p-4 rounded-sm relative overflow-hidden group">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Magnetic Button
                </h3>
                <span className="text-[9px] font-mono text-muted-foreground/45 select-none">
                  REF.03 / 01
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed min-h-[48px]">
                Attracts elements smoothly to the user&apos;s cursor on hover.
                Built with spring physics for natural, responsive movement.
              </p>
              <div className="flex h-32 items-center justify-center rounded-sm border border-dashed border-line bg-muted/20 relative overflow-hidden">
                <MagneticButton className="relative z-10 text-xs">
                  Hover Magnet
                </MagneticButton>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                variant="link"
                size="sm"
                className="gap-1 px-0 text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer"
                render={
                  <Link href="/docs/components/buttons/magnetic-button" />
                }
              >
                View guide <ArrowUpRightIcon className="size-3" />
              </Button>
            </div>
          </div>

          {/* Card 2: Shimmer Border */}
          <div className="flex flex-col justify-between border border-line bg-card p-4 rounded-sm relative overflow-hidden group">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Shimmer Border
                </h3>
                <span className="text-[9px] font-mono text-muted-foreground/45 select-none">
                  REF.03 / 02
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed min-h-[48px]">
                An elegant border lighting outline that cycles continuously.
                Leverages GPU-accelerated CSS conic-gradients for optimal
                performance.
              </p>
              <div className="flex h-32 items-center justify-center rounded-sm border border-dashed border-line bg-muted/20 relative overflow-hidden">
                <ShimmerBorder borderRadius={4}>
                  <div className="px-3 py-1.5 text-xs font-semibold bg-card text-foreground rounded-sm">
                    Shimmer Border
                  </div>
                </ShimmerBorder>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                variant="link"
                size="sm"
                className="gap-1 px-0 text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer"
                render={<Link href="/docs/components/effects/shimmer-border" />}
              >
                View guide <ArrowUpRightIcon className="size-3" />
              </Button>
            </div>
          </div>

          {/* Card 3: Text Reveal */}
          <div className="flex flex-col justify-between border border-line bg-card p-4 rounded-sm relative overflow-hidden group">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Text Reveal
                </h3>
                <span className="text-[9px] font-mono text-muted-foreground/45 select-none">
                  REF.03 / 03
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed min-h-[48px]">
                Fades in text character-by-character as it scrolls into
                viewport. Uses staggering and subtle blur overrides for
                readability.
              </p>
              <div className="flex h-32 items-center justify-center rounded-sm border border-dashed border-line bg-muted/20 p-4 text-center">
                <TextReveal
                  text="Zen focus. Pure clarity."
                  className="text-xs font-mono text-foreground tracking-tight text-center leading-relaxed"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                variant="link"
                size="sm"
                className="gap-1 px-0 text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer"
                render={<Link href="/docs/components/typography/text-reveal" />}
              >
                View guide <ArrowUpRightIcon className="size-3" />
              </Button>
            </div>
          </div>

          {/* Card 4: Halftone Image */}
          <div className="flex flex-col justify-between border border-line bg-card p-4 rounded-sm relative overflow-hidden group">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Halftone Image
                </h3>
                <span className="text-[9px] font-mono text-muted-foreground/45 select-none">
                  REF.03 / 04
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed min-h-[48px]">
                Converts images into custom halftone illustrations. Includes
                real-time dither warp distortions on hover.
              </p>
              <div className="flex h-32 items-center justify-center rounded-sm border border-dashed border-line bg-muted/20">
                <div className="size-16 rounded-sm overflow-hidden border border-line bg-card flex items-center justify-center">
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
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                variant="link"
                size="sm"
                className="gap-1 px-0 text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer"
                render={<Link href="/docs/components/effects/halftone-image" />}
              >
                View guide <ArrowUpRightIcon className="size-3" />
              </Button>
            </div>
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}
