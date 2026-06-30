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
import { Panel, StripeDivider } from '@/components/kanso/panel';

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
      <div className="max-w-7xl mx-auto w-full flex flex-col">
        <div className="sticky top-0 z-50 bg-[#fafafa]/80 dark:bg-zinc-950/80 backdrop-blur-md">
          <Panel>
            <Header />
          </Panel>
        </div>

        <StripeDivider />

        <Panel>
          <Hero />
        </Panel>

        <StripeDivider />

        <Panel>
          <Features />
        </Panel>

        <StripeDivider />

        <Panel>
          <PremiumEffects />
        </Panel>

        <StripeDivider />

        <Panel>
          <ComponentShowcase
            showcaseHtmls={showcaseHtmls}
            showcaseRaws={showcaseRaws}
          />
        </Panel>

        <StripeDivider />

        <Panel>
          <DeveloperExperience dxHtml={dxHtml} dxRaw={dxRaw} />
        </Panel>

        <StripeDivider />

        <Panel>
          <Statistics />
        </Panel>

        <StripeDivider />

        <Panel>
          <Testimonials />
        </Panel>

        <StripeDivider />

        <Panel>
          <CTA />
        </Panel>

        <StripeDivider />

        <Panel noLineBottom>
          <Footer />
        </Panel>
      </div>
    </div>
  );
}
