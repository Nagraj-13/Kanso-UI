'use client';

import * as React from 'react';
import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { PremiumEffects } from '@/components/landing/premium-effects';
import { ComponentShowcase } from '@/components/landing/component-showcase';
import { DeveloperExperience } from '@/components/landing/developer-experience';
import { Statistics } from '@/components/landing/statistics';
import { Testimonials } from '@/components/landing/testimonials';
import { CTA } from '@/components/landing/cta';
import { Footer } from '@/components/landing/footer';
import { ZenIsometric } from '@/components/landing/zen-isometric';
import { Bento3DCube } from '@/components/landing/bento-3d-cube';
import { ThreeDPhotoCarousel } from '@/components/kanso/three-d-photo-carousel';
import {
  LineDivider,
  GapDivider,
  StripeDivider,
  Panel,
  PanelHeader,
  PanelTitle,
  PanelDescription,
  PanelContent,
  VerticalGapDivider,
} from '@/components/kanso/panel';

interface LandingPageClientProps {
  showcaseHtmls: Record<string, string>;
  showcaseRaws: Record<string, string>;
  dxHtml: string;
  dxRaw: string;
}

export default function LandingPageClient({
  showcaseHtmls,
  showcaseRaws,
  dxHtml,
  dxRaw,
}: LandingPageClientProps) {
  return (
    <div className="min-h-screen relative bg-[#fafafa] text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-50 dark:selection:bg-zinc-50 dark:selection:text-zinc-950">
      {/* Background Grid */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,var(--stripe-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--stripe-line)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      <div className="max-w-7xl mx-auto w-full flex flex-col relative z-10">
        <div className="sticky top-0 z-50 bg-[#fafafa]/80 dark:bg-zinc-950/80 ">
          <Header />
          <LineDivider />
        </div>

        {/* <StripeDivider /> */}

        <Hero />
        <StripeDivider />
        <Features />
        {/* <GapDivider/> */}
        <StripeDivider />
        <Panel id="dimensions">
          <PanelHeader>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mt-6">
              ✦ Kanso Principles
            </div>

            <PanelTitle>Built From Structure, Not Decoration</PanelTitle>

            <PanelDescription>
              Kanso UI is a system of spatial relationships, layered depth, and
              intentional motion. Every interface is composed from consistent
              construction rules where hierarchy, rhythm, and interaction emerge
              from geometry rather than visual noise.
            </PanelDescription>
          </PanelHeader>

          <PanelContent className="p-0 my-0 md:p-0 md:my-0">
            <div className="flex flex-col lg:flex-row w-full  border-border">
              {/* Left Column: 3D Bento Cube Grid */}
              <div className="flex flex-1 flex-col items-center justify-center p-6 md:p-12 overflow-hidden min-h-[300px]">
                <Bento3DCube />
              </div>

              {/* Vertical Divider for Desktop, Horizontal line for Mobile */}
              <div className="hidden lg:block self-stretch">
                <VerticalGapDivider className="h-full" bleed={false} />
              </div>
              <div className="block lg:hidden w-full border-b border-border" />

              {/* Right Column: 3D Exploded Isometric Block */}
              <div className="flex flex-1 flex-col items-center justify-center p-6 md:p-12 overflow-hidden min-h-[300px]">
                <ZenIsometric />
              </div>
            </div>
          </PanelContent>
        </Panel>

        <StripeDivider />
        <PremiumEffects />

        <StripeDivider />
        <ComponentShowcase
          showcaseHtmls={showcaseHtmls}
          showcaseRaws={showcaseRaws}
        />

        <StripeDivider />
        <DeveloperExperience dxHtml={dxHtml} dxRaw={dxRaw} />

        <StripeDivider />
        <Statistics />

        <StripeDivider />
        <Testimonials />

        <StripeDivider />
        <CTA />

        <StripeDivider />
        <Footer />
      </div>
    </div>
  );
}
