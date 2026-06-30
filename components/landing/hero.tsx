'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SparklesIcon, CheckIcon, CopyIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { GITHUB_URL } from '@/lib/constants';
import { GithubButton } from '@/components/kanso/github-button';
import { KeyboardButton } from '@/components/kanso/keyboard-button';
import {
  LiquidMetalCardRoot,
  LiquidMetalCardVisual,
} from '@/components/kanso/liquid-metal-card';
import { Panel, PanelContent } from '@/components/landing/panel';
import { cn } from '@/lib/utils';

const COLOR_THEMES = [
  {
    name: 'multicolor',
    label: 'Multicolor',
    gradientFrom: 'rgba(168, 85, 247, 0.35)',
    gradientTo: 'rgba(6, 182, 212, 0.25)',
    glowColor: '#120F17',
    ringColor: '#ec4899',
    particleColor: '#a855f7',
    colors: ['#a855f7', '#06b6d4', '#10b981', '#f43f5e', '#f59e0b'],
    colorClass: 'bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-500',
  },
  {
    name: 'purple',
    label: 'Purple',
    gradientFrom: 'rgba(168, 85, 247, 0.35)',
    gradientTo: 'rgba(180, 151, 207, 0.25)',
    glowColor: '#120F17',
    ringColor: '#a855f7',
    particleColor: '#a855f7',
    colors: ['#a855f7', '#c084fc', '#e9d5ff', '#c084fc'],
    colorClass: 'bg-purple-500',
  },
  {
    name: 'cyan',
    label: 'Cyan',
    gradientFrom: 'rgba(6, 182, 212, 0.35)',
    gradientTo: 'rgba(34, 211, 238, 0.25)',
    glowColor: '#081E24',
    ringColor: '#06b6d4',
    particleColor: '#06b6d4',
    colors: ['#06b6d4', '#22d3ee', '#67e8f9', '#22d3ee'],
    colorClass: 'bg-cyan-500',
  },
  {
    name: 'emerald',
    label: 'Emerald',
    gradientFrom: 'rgba(16, 185, 129, 0.35)',
    gradientTo: 'rgba(52, 211, 153, 0.25)',
    glowColor: '#051F14',
    ringColor: '#10b981',
    particleColor: '#10b981',
    colors: ['#10b981', '#34d399', '#6ee7b7', '#34d399'],
    colorClass: 'bg-emerald-500',
  },
  {
    name: 'rose',
    label: 'Rose',
    gradientFrom: 'rgba(244, 63, 94, 0.35)',
    gradientTo: 'rgba(251, 113, 133, 0.25)',
    glowColor: '#240509',
    ringColor: '#f43f5e',
    particleColor: '#f43f5e',
    colors: ['#f43f5e', '#fb7185', '#fda4af', '#fb7185'],
    colorClass: 'bg-rose-500',
  },
  {
    name: 'amber',
    label: 'Amber',
    gradientFrom: 'rgba(245, 158, 11, 0.35)',
    gradientTo: 'rgba(251, 191, 36, 0.25)',
    glowColor: '#241805',
    ringColor: '#f59e0b',
    particleColor: '#f59e0b',
    colors: ['#f59e0b', '#fbbf24', '#fcd34d', '#fbbf24'],
    colorClass: 'bg-amber-500',
  },
];

export function Hero() {
  const { theme } = useTheme();
  const [copied, setCopied] = React.useState(false);
  const [halftoneParams, setHalftoneParams] = React.useState({
    dotRadius: 1.5,
    dotSpacing: 12,
    sparkle: true,
    gradientFrom: 'rgba(168, 85, 247, 0.35)',
    gradientTo: 'rgba(6, 182, 212, 0.25)',
    glowColor: '#120F17',
    ringColor: '#ec4899',
    particleColor: '#a855f7',
    colors: ['#a855f7', '#06b6d4', '#10b981', '#f43f5e', '#f59e0b'],
    themeName: 'multicolor',
  });

  const handleCopy = () => {
    navigator.clipboard.writeText('npx kanso-ui add magnetic-button');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const heroCardRef = React.useRef<HTMLDivElement>(null);

  const handleCardPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = heroCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const tiltX = (e.clientX - rect.left - rect.width / 2) / 18;
    const tiltY = (e.clientY - rect.top - rect.height / 2) / -18;
    card.style.transition = 'none';
    card.style.transform = `perspective(1000px) rotateY(${tiltX}deg) rotateX(${tiltY}deg) translateZ(4px)`;
  };

  const handleCardPointerLeave = () => {
    const card = heroCardRef.current;
    if (!card) return;
    card.style.transition =
      'transform 0.5s cubic-bezier(0.03, 0.98, 0.52, 0.99)';
    card.style.transform =
      'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)';
  };

  const resolvedColorTint = React.useMemo(() => {
    const isDark =
      theme === 'dark' ||
      (theme !== 'light' &&
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      return halftoneParams.ringColor || '#a855f7';
    } else {
      const colorMap: Record<string, string> = {
        multicolor: '#6366f1',
        purple: '#7c3aed',
        cyan: '#0891b2',
        emerald: '#059669',
        rose: '#e11d48',
        amber: '#d97706',
      };
      return colorMap[halftoneParams.themeName] || '#27272a';
    }
  }, [theme, halftoneParams.themeName, halftoneParams.ringColor]);

  return (
    <Panel id="hero" className="border-t-0">
      {/* Plane implicit grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] bg-[size:16px_16px] opacity-15 pointer-events-none" />

      <PanelContent className="pt-16 pb-12">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left relative z-10">
            {/* Introducing Badge / Coordinate Tag */}
            <div className="mb-6 inline-flex items-center gap-1.5 rounded-sm border border-line bg-zinc-50 dark:bg-zinc-900/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground uppercase select-none">
              <SparklesIcon className="size-3 text-muted-foreground/60" />
              <span>FIG.001 / INTRO</span>
            </div>

            {/* Headline */}
            <h1 className="max-w-2xl font-sans text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl md:text-5xl md:leading-[1.15]">
              Build Beautiful Interfaces Without Complexity
            </h1>

            {/* Subtitle */}
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Thoughtfully designed React components for modern applications.
              Inspired by Japanese minimalism and engineered for copy-paste
              ease, customizability, and WCAG accessibility.
            </p>

            {/* Command Install Pill Badge */}
            <div
              onClick={handleCopy}
              className="mt-6 flex items-center gap-2 rounded-sm border border-line bg-zinc-50/50 dark:bg-zinc-900/30 pl-3 pr-2 py-1 font-mono text-[11px] text-muted-foreground hover:border-zinc-400 dark:hover:border-zinc-700 transition-all select-all cursor-pointer group"
            >
              <span>$</span>
              <span>npx kanso-ui add magnetic-button</span>
              <button
                className="ml-2 p-0.5 text-muted-foreground/60 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                title="Copy to clipboard"
              >
                {copied ? (
                  <CheckIcon className="size-3 text-green-500" />
                ) : (
                  <CopyIcon className="size-3" />
                )}
              </button>
            </div>

            {/* Action Button Group */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center">
              <Button
                size="sm"
                className="w-full sm:w-auto px-6 h-9 text-xs font-semibold cursor-pointer rounded-sm"
                render={<Link href="/docs" />}
              >
                Browse Components
              </Button>
              <GithubButton
                variantDesign="classic"
                href={GITHUB_URL}
                className="w-full sm:w-auto h-9 rounded-sm text-xs font-semibold"
              >
                Star on GitHub
              </GithubButton>
            </div>
          </div>

          {/* Right Column: Sandbox Mockup */}
          <div className="lg:col-span-5 flex justify-center w-full relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-[340px] shrink-0"
            >
              <LiquidMetalCardRoot
                ref={heroCardRef}
                onPointerMove={handleCardPointerMove}
                onPointerLeave={handleCardPointerLeave}
                className="w-full rounded-sm border border-line bg-card p-4 relative overflow-hidden group select-none transition-transform duration-300 ease-out"
                style={{ transformStyle: 'preserve-3d' }}
                colorTint={resolvedColorTint}
                distortion={0.5}
                softness={0.7}
                repetition={8}
                scale={0.55}
                image="/Kansologo.png"
              >
                <div className="flex flex-col gap-3 w-full relative z-10 text-left">
                  {/* Sandbox Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                      <span className="size-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                      <span className="size-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground/60 bg-muted px-2 py-0.5 rounded-sm border border-line">
                      kanso-sandbox.tsx
                    </span>
                  </div>

                  {/* Visual metallic logo container */}
                  <LiquidMetalCardVisual
                    className="h-24 w-full overflow-hidden rounded-sm bg-zinc-950 relative border border-line flex items-center justify-center"
                    desktopShaderProps={{
                      image: '/Kansologo.png',
                      colorTint: resolvedColorTint,
                      distortion: 0.45,
                      softness: 0.8,
                      repetition: 7,
                      scale: 0.52,
                    }}
                  />

                  {/* Compact Color Themes row */}
                  <div className="flex flex-col gap-1.5 p-2.5 rounded-sm border border-line bg-muted/40">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-medium text-muted-foreground/50 uppercase tracking-wider">
                        Ambient Palette Space
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground capitalize">
                        {halftoneParams.themeName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {COLOR_THEMES.map((themeItem) => (
                        <button
                          key={themeItem.name}
                          onClick={() =>
                            setHalftoneParams((prev) => ({
                              ...prev,
                              gradientFrom: themeItem.gradientFrom,
                              gradientTo: themeItem.gradientTo,
                              glowColor: themeItem.glowColor,
                              ringColor: themeItem.ringColor,
                              particleColor: themeItem.particleColor,
                              colors: themeItem.colors,
                              themeName: themeItem.name,
                            }))
                          }
                          className={cn(
                            'size-4 rounded-full border border-line cursor-pointer transition-all hover:scale-110 flex items-center justify-center shrink-0',
                            themeItem.colorClass,
                            halftoneParams.themeName === themeItem.name
                              ? 'ring-1 ring-zinc-400 dark:ring-zinc-650'
                              : ''
                          )}
                          title={themeItem.label}
                        >
                          {halftoneParams.themeName === themeItem.name && (
                            <CheckIcon className="size-1.5 text-white mix-blend-difference" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tactile copy/paste mechanical combo */}
                  <div className="flex flex-col gap-1.5 p-2.5 rounded-sm border border-line bg-muted/40 relative overflow-hidden">
                    <div className="flex items-center justify-between text-[9px] font-mono font-medium text-muted-foreground/50 uppercase tracking-wider">
                      <span>Tactile Copy Code</span>
                      <span className="font-mono text-muted-foreground/80">
                        {copied ? 'Copied!' : 'Click key combo'}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-1 py-0.5">
                      <KeyboardButton
                        size="sm"
                        variantColor="dark"
                        icon="ctrl"
                        onClick={handleCopy}
                        className="w-[44px] font-mono text-[9px]"
                      >
                        Ctrl
                      </KeyboardButton>
                      <span className="text-muted-foreground/40 font-mono text-[9px] select-none">
                        +
                      </span>
                      <KeyboardButton
                        size="sm"
                        variantColor="light"
                        icon="copy"
                        onClick={handleCopy}
                        className="w-[36px] font-mono text-[9px]"
                      >
                        C
                      </KeyboardButton>
                      <span className="text-muted-foreground/40 font-mono text-[9px] select-none">
                        +
                      </span>
                      <KeyboardButton
                        size="sm"
                        variantColor="blue"
                        icon="paste"
                        onClick={handleCopy}
                        className="w-[36px] font-mono text-[9px]"
                      >
                        V
                      </KeyboardButton>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground bg-muted p-1 rounded-sm border border-line">
                      <span className="font-mono select-all">
                        add magnetic-button
                      </span>
                      <button
                        onClick={handleCopy}
                        className="text-foreground hover:text-zinc-950 dark:hover:text-white cursor-pointer font-mono font-medium transition-colors"
                      >
                        {copied ? 'Done' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {/* Footer Section */}
                  <div className="pt-2 border-t border-line flex justify-between items-center text-[9px] text-muted-foreground/50 font-mono">
                    <span>REF.01 / HERO_DEMO</span>
                    <span>v1.0.0</span>
                  </div>
                </div>
              </LiquidMetalCardRoot>
            </motion.div>
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}
