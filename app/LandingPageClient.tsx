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
import { StripeDivider } from '@/components/kanso/panel';

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
        <div className="sticky top-0 z-50 bg-[#fafafa]/80 dark:bg-zinc-950/80 backdrop-blur-md">
          <Header />
        </div>

        <StripeDivider />
        <Hero />

        <StripeDivider />
        <Features />

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
