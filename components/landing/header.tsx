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
    <header className="w-full relative">
      <div className="flex h-16 items-center justify-between px-6 md:px-8">
        <div className="flex items-center gap-3">
          <Image
            src="/Kansologo.png"
            alt="Kanso UI Logo"
            width={24}
            height={24}
            className="dark:invert"
          />
          <span className="font-sans text-base font-semibold tracking-tight">
            Kanso UI
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Features
          </a>
          <a
            href="#showcase"
            className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Showcase
          </a>
          <Link
            href="/docs"
            className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Docs
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            GitHub <ArrowUpRightIcon className="size-3" />
          </a>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
            className="text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
          >
            {!mounted ? (
              <div className="size-4 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            ) : theme === 'dark' ? (
              <SunIcon className="size-4" />
            ) : (
              <MoonIcon className="size-4" />
            )}
          </Button>
          <Button size="sm" render={<Link href="/docs" />}>
            Get Started
          </Button>
        </div>

        {/* Mobile Nav Toggle */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="flex items-center justify-center p-2 text-zinc-500 hover:text-zinc-900 md:hidden dark:text-zinc-400 dark:hover:text-zinc-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <XIcon className="size-5" />
          ) : (
            <MenuIcon className="size-5" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation List */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="border-b border-zinc-200 bg-white px-6 py-6 md:hidden dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="flex flex-col gap-5">
              <a
                href="#features"
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#showcase"
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Showcase
              </a>
              <Link
                href="/docs"
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Docs
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                GitHub <ArrowUpRightIcon className="size-3" />
              </a>
              <hr className="border-zinc-150 dark:border-zinc-800" />
              <div className="flex items-center justify-between py-1 px-1">
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  Theme
                </span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle theme"
                  className="text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                >
                  {!mounted ? (
                    <div className="size-4 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                  ) : theme === 'dark' ? (
                    <SunIcon className="size-4" />
                  ) : (
                    <MoonIcon className="size-4" />
                  )}
                </Button>
              </div>
              <hr className="border-zinc-150 dark:border-zinc-800" />
              <div className="flex flex-col gap-3">
                <Button
                  className="w-full"
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
