'use client';

import * as React from 'react';
import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { PremiumEffects } from '@/components/landing/premium-effects';
import { TelemetryShowcase } from '@/components/landing/telemetry-showcase';
import { ComponentShowcase } from '@/components/landing/component-showcase';
import { DeveloperExperience } from '@/components/landing/developer-experience';
import { Statistics } from '@/components/landing/statistics';
import { Testimonials } from '@/components/landing/testimonials';
import { CTA } from '@/components/landing/cta';
import { Footer } from '@/components/landing/footer';

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
      {/* Background Editorial Grid Overlay */}
      {/* <EditorialGrid /> */}

      <Header />
      <Hero />

      {/* Panel-based section layouts with horizontal dividers */}
      <div className="relative">
        <Features />
      </div>
      <div className="relative ">
        <PremiumEffects />
      </div>
      <TelemetryShowcase />
      <ComponentShowcase
        showcaseHtmls={showcaseHtmls}
        showcaseRaws={showcaseRaws}
      />
      <DeveloperExperience dxHtml={dxHtml} dxRaw={dxRaw} />
      <Statistics />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
