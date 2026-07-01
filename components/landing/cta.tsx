import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GithubButton } from '@/components/kanso/github-button';
import { GITHUB_URL } from '@/lib/constants';
import { Panel, PanelContent } from '@/components/kanso/panel';

export function CTA() {
  return (
    <Panel id="cta" className="text-center">
      <PanelContent className="py-24 px-6 md:px-8 w-full">
        <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Build Faster. Design Less.
        </h2>
        <p className="mt-6 max-w-md mx-auto text-base text-muted-foreground">
          Kanso UI gives you the building blocks for beautiful, high-performance
          web applications.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4 items-center">
          <Button
            size="lg"
            className="px-8 h-12 shadow-sm cursor-pointer rounded-full"
            render={<Link href="/docs" />}
          >
            Start Building
          </Button>
          <GithubButton
            variantDesign="glow"
            href={GITHUB_URL}
            glowColor="linear-gradient(135deg, oklch(0.65 0.24 300), oklch(0.6 0.22 340))"
            className="h-12 rounded-full font-semibold"
          >
            Star Kanso UI
          </GithubButton>
        </div>
      </PanelContent>
    </Panel>
  );
}
