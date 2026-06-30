'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SunIcon,
  MoonIcon,
  MenuIcon,
  XIcon,
  ArrowUpRightIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { GITHUB_URL } from '@/lib/constants';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-background px-2 pt-2">
      <div className="screen-line-top screen-line-bottom mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 border-x border-line bg-background px-4 lg:max-w-6xl">
        <div className="flex items-center gap-3">
          <Image
            src="/Kansologo.png"
            alt="Kanso UI Logo"
            width={20}
            height={20}
            className="dark:invert object-contain"
          />
          <span className="font-sans text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">
            Kanso UI
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#features"
            className="text-xs font-mono font-normal text-muted-foreground transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            Features
          </a>
          <a
            href="#showcase"
            className="text-xs font-mono font-normal text-muted-foreground transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            Showcase
          </a>
          <Link
            href="/docs"
            className="text-xs font-mono font-normal text-muted-foreground transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            Docs
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs font-mono font-normal text-muted-foreground transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            GitHub <ArrowUpRightIcon className="size-3" />
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
            className="text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-55"
          >
            {!mounted ? (
              <div className="size-3.5 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            ) : theme === 'dark' ? (
              <SunIcon className="size-3.5" />
            ) : (
              <MoonIcon className="size-3.5" />
            )}
          </Button>
          <Button size="xs" render={<Link href="/docs" />}>
            Get Started
          </Button>
        </div>

        {/* Mobile Nav Toggle */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="flex items-center justify-center p-2 text-zinc-500 hover:text-zinc-900 md:hidden dark:text-zinc-400 dark:hover:text-zinc-55"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <XIcon className="size-4" />
          ) : (
            <MenuIcon className="size-4" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation List */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.1 }}
            className="mx-auto w-full max-w-5xl border-x border-b border-line bg-background px-4 py-4 md:hidden lg:max-w-6xl"
          >
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                className="text-xs font-mono font-normal text-zinc-600 dark:text-zinc-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#showcase"
                className="text-xs font-mono font-normal text-zinc-600 dark:text-zinc-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Showcase
              </a>
              <Link
                href="/docs"
                className="text-xs font-mono font-normal text-zinc-600 dark:text-zinc-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Docs
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono font-normal text-zinc-600 dark:text-zinc-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                GitHub <ArrowUpRightIcon className="size-3" />
              </a>
              <hr className="border-line" />
              <div className="flex items-center justify-between py-1 px-1">
                <span className="text-xs font-mono font-normal text-zinc-650 dark:text-zinc-400">
                  Theme
                </span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle theme"
                  className="text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-55"
                >
                  {!mounted ? (
                    <div className="size-3.5 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                  ) : theme === 'dark' ? (
                    <SunIcon className="size-3.5" />
                  ) : (
                    <MoonIcon className="size-3.5" />
                  )}
                </Button>
              </div>
              <hr className="border-line" />
              <div className="flex flex-col gap-3">
                <Button
                  className="w-full text-xs"
                  render={<Link href="/docs" />}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
