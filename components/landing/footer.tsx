import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GITHUB_URL } from '@/lib/constants';
import { Panel, PanelContent } from '@/components/kanso/panel';

function GithubIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function DiscordIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

export function Footer() {
  return (
    <Panel id="footer" className="line-bottom-none">
      <PanelContent className="py-16 px-6 md:px-8 w-full">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-6">
          <div className="col-span-2 flex flex-col gap-4 text-left">
            <div className="flex items-center">
              <Image
                src="/KansoUiCompletelogo.png"
                alt="Kanso UI Complete Logo"
                width={140}
                height={32}
                className="dark:invert object-contain"
              />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
              A design system built with React 19, Next.js 16, and Tailwind CSS
              v4.
            </p>
          </div>

          <div className="text-left">
            <h6 className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Library
            </h6>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <a
                  href="#showcase"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Components
                </a>
              </li>
              <li>
                <a
                  href="#showcase"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Registry
                </a>
              </li>
            </ul>
          </div>

          <div className="text-left">
            <h6 className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Resources
            </h6>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link
                  href="/docs"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <a
                  href="https://nextjs.org"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Next.js Docs
                </a>
              </li>
            </ul>
          </div>

          <div className="text-left">
            <h6 className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Community
            </h6>
            <ul className="mt-4 space-y-2 text-xs text-left">
              <li>
                <a
                  href={GITHUB_URL}
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub <GithubIcon className="size-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://discord.com"
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Discord <DiscordIcon className="size-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <span className="text-[11px] text-muted-foreground">
            &copy; {new Date().getFullYear()} Kanso UI. Open Source under MIT
            License.
          </span>
        </div>
      </PanelContent>
    </Panel>
  );
}
