import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GithubButton } from '@/components/kanso/github-button';
import { GITHUB_URL } from '@/lib/constants';
import { Panel, PanelContent } from '@/components/landing/panel';

export function CTA() {
  return (
    <Panel id="cta">
      <PanelContent className="bg-background py-16 text-center flex flex-col items-center">
        <div className="mb-6 inline-flex items-center gap-1.5 rounded-sm border border-line bg-zinc-50 dark:bg-zinc-900/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground uppercase select-none">
          <span>§08 / OUTRO</span>
        </div>
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          Build Faster. Design Less.
        </h2>
        <p className="mt-4 max-w-sm mx-auto text-sm text-muted-foreground leading-relaxed">
          Kanso UI gives you the building blocks for beautiful, high-performance
          web applications.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 items-center">
          <Button
            size="sm"
            className="px-6 h-9 cursor-pointer rounded-sm text-xs font-semibold"
            render={<Link href="/docs" />}
          >
            Start Building
          </Button>
          <GithubButton
            variantDesign="classic"
            href={GITHUB_URL}
            className="h-9 rounded-sm text-xs font-semibold"
          >
            Star Kanso UI
          </GithubButton>
        </div>
      </PanelContent>
    </Panel>
  );
}
