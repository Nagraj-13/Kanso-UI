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

import { Separator } from '@/components/landing/panel';

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
    <div className="min-h-screen relative overflow-x-hidden bg-[#fafafa] text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-50 dark:selection:bg-zinc-50 dark:selection:text-zinc-950">
      <Header />

      {/* Center construction layout column wrapper */}
      <div className="mx-auto w-full max-w-5xl lg:max-w-6xl">
        <Hero />
        <Separator />

        <Features />
        <Separator />

        <PremiumEffects />
        <Separator />

        <ComponentShowcase
          showcaseHtmls={showcaseHtmls}
          showcaseRaws={showcaseRaws}
        />
        <Separator />

        <DeveloperExperience dxHtml={dxHtml} dxRaw={dxRaw} />
        <Separator />

        <Statistics />
        <Separator />

        <Testimonials />
        <Separator />

        <CTA />
      </div>

      <Footer />
    </div>
  );
}
