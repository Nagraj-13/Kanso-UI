'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

type ThemeColor = 'emerald' | 'blue' | 'violet' | 'rose' | 'amber' | 'zinc';

interface FeatureGridCardProps extends Omit<
  React.ComponentProps<typeof Card>,
  'title'
> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  themeColor?: ThemeColor;
  gridLines?: boolean;
}

const themeStyles: Record<
  ThemeColor,
  {
    iconText: string;
    iconBg: string;
    iconRing: string;
    tileBg: string;
    darkGlow: string;
    lightGlow: string;
  }
> = {
  emerald: {
    iconText: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
    iconBg: 'group-hover:bg-emerald-500/10 dark:group-hover:bg-emerald-400/10',
    iconRing:
      'group-hover:ring-emerald-500/20 dark:group-hover:ring-emerald-400/20',
    tileBg: 'bg-emerald-500/[0.08] dark:bg-emerald-400/[0.06]',
    darkGlow:
      'conic-gradient(from 205deg at 50% 50%, rgba(16,185,129,0) 0deg, #10B981 25deg, rgba(52,211,153,0.18) 295deg, rgba(16,185,129,0) 360deg)',
    lightGlow:
      'conic-gradient(from 225deg at 50% 50%, rgba(16,185,129,0) 0deg, #10B981 25deg, #EDFAF6 285deg, #FFFFFF 345deg, rgba(16,185,129,0) 360deg)',
  },
  blue: {
    iconText: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
    iconBg: 'group-hover:bg-blue-500/10 dark:group-hover:bg-blue-400/10',
    iconRing: 'group-hover:ring-blue-500/20 dark:group-hover:ring-blue-400/20',
    tileBg: 'bg-blue-500/[0.08] dark:bg-blue-400/[0.06]',
    darkGlow:
      'conic-gradient(from 205deg at 50% 50%, rgba(59,130,246,0) 0deg, #3B82F6 25deg, rgba(96,165,250,0.18) 295deg, rgba(59,130,246,0) 360deg)',
    lightGlow:
      'conic-gradient(from 225deg at 50% 50%, rgba(59,130,246,0) 0deg, #3B82F6 25deg, #EFF6FF 285deg, #FFFFFF 345deg, rgba(59,130,246,0) 360deg)',
  },
  violet: {
    iconText: 'group-hover:text-violet-600 dark:group-hover:text-violet-400',
    iconBg: 'group-hover:bg-violet-500/10 dark:group-hover:bg-violet-400/10',
    iconRing:
      'group-hover:ring-violet-500/20 dark:group-hover:ring-violet-400/20',
    tileBg: 'bg-violet-500/[0.08] dark:bg-violet-400/[0.06]',
    darkGlow:
      'conic-gradient(from 205deg at 50% 50%, rgba(139,92,246,0) 0deg, #8B5CF6 25deg, rgba(167,139,250,0.18) 295deg, rgba(139,92,246,0) 360deg)',
    lightGlow:
      'conic-gradient(from 225deg at 50% 50%, rgba(139,92,246,0) 0deg, #8B5CF6 25deg, #F5F3FF 285deg, #FFFFFF 345deg, rgba(139,92,246,0) 360deg)',
  },
  rose: {
    iconText: 'group-hover:text-rose-600 dark:group-hover:text-rose-400',
    iconBg: 'group-hover:bg-rose-500/10 dark:group-hover:bg-rose-400/10',
    iconRing: 'group-hover:ring-rose-500/20 dark:group-hover:ring-rose-400/20',
    tileBg: 'bg-rose-500/[0.08] dark:bg-rose-400/[0.06]',
    darkGlow:
      'conic-gradient(from 205deg at 50% 50%, rgba(244,63,94,0) 0deg, #F43F5E 25deg, rgba(251,113,133,0.18) 295deg, rgba(244,63,94,0) 360deg)',
    lightGlow:
      'conic-gradient(from 225deg at 50% 50%, rgba(244,63,94,0) 0deg, #F43F5E 25deg, #FFF1F2 285deg, #FFFFFF 345deg, rgba(244,63,94,0) 360deg)',
  },
  amber: {
    iconText: 'group-hover:text-amber-600 dark:group-hover:text-amber-400',
    iconBg: 'group-hover:bg-amber-500/10 dark:group-hover:bg-amber-400/10',
    iconRing:
      'group-hover:ring-amber-500/20 dark:group-hover:ring-amber-400/20',
    tileBg: 'bg-amber-500/[0.08] dark:bg-amber-400/[0.06]',
    darkGlow:
      'conic-gradient(from 205deg at 50% 50%, rgba(245,158,11,0) 0deg, #F59E0B 25deg, rgba(251,191,36,0.18) 295deg, rgba(245,158,11,0) 360deg)',
    lightGlow:
      'conic-gradient(from 225deg at 50% 50%, rgba(245,158,11,0) 0deg, #F59E0B 25deg, #FFFBEB 285deg, #FFFFFF 345deg, rgba(245,158,11,0) 360deg)',
  },
  zinc: {
    iconText: 'group-hover:text-zinc-900 dark:group-hover:text-white',
    iconBg: 'group-hover:bg-zinc-500/10 dark:group-hover:bg-zinc-400/10',
    iconRing: 'group-hover:ring-zinc-500/20 dark:group-hover:ring-zinc-400/20',
    tileBg: 'bg-zinc-500/[0.08] dark:bg-zinc-400/[0.05]',
    darkGlow:
      'conic-gradient(from 205deg at 50% 50%, rgba(161,161,170,0) 0deg, #A1A1AA 25deg, rgba(212,212,216,0.18) 295deg, rgba(161,161,170,0) 360deg)',
    lightGlow:
      'conic-gradient(from 225deg at 50% 50%, rgba(161,161,170,0) 0deg, #A1A1AA 25deg, #F4F4F5 285deg, #FFFFFF 345deg, rgba(161,161,170,0) 360deg)',
  },
};

const tiles = [
  { top: '0', left: '0', height: '10%', width: '22.5%', delay: '0s' },
  { top: '0', left: '22.5%', height: '10%', width: '27.5%', delay: '-6s' },
  { top: '0', left: '50%', height: '10%', width: '27.5%', delay: '-4s' },
  { top: '0', left: '77.5%', height: '10%', width: '22.5%', delay: '-2s' },
  { top: '10%', left: '0', height: '22.5%', width: '22.5%', delay: '-4s' },
  { top: '10%', left: '22.5%', height: '22.5%', width: '27.5%', delay: '-2s' },
  { top: '10%', left: '50%', height: '22.5%', width: '27.5%', delay: '0s' },
  { top: '10%', left: '77.5%', height: '22.5%', width: '22.5%', delay: '-4s' },
  { top: '32.5%', left: '50%', height: '22.5%', width: '27.5%', delay: '-6s' },
  {
    top: '32.5%',
    left: '77.5%',
    height: '22.5%',
    width: '22.5%',
    delay: '-2s',
  },
];

function FeatureGridCard({
  icon,
  title,
  description,
  themeColor = 'emerald',
  gridLines = true,
  className,
  ...props
}: FeatureGridCardProps) {
  const t = themeStyles[themeColor];

  return (
    <Card
      className={cn(
        'group relative overflow-hidden transition-all duration-300 cursor-pointer border-zinc-200/50 dark:border-white/10',
        'hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:border-zinc-300 dark:hover:border-white/20',
        className
      )}
      {...props}
    >
      {/* Background Subtle Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-transparent to-zinc-50/50 dark:to-[rgba(255,255,255,0.02)]" />

      {/* Grid and Animation Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          maskImage:
            'radial-gradient(circle at 60% 0%, black 0%, black 15%, transparent 60%)',
          WebkitMaskImage:
            'radial-gradient(circle at 60% 0%, black 0%, black 15%, transparent 60%)',
        }}
      >
        {/* Animated Tiles Container */}
        <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {tiles.map((tile, i) => (
            <div
              key={i}
              className={cn(
                'absolute opacity-0 group-hover:animate-[kanso-tile_8s_infinite]',
                t.tileBg
              )}
              style={{
                top: tile.top,
                left: tile.left,
                width: tile.width,
                height: tile.height,
                animationDelay: tile.delay,
              }}
            />
          ))}
        </div>

        {/* Animated Grid Lines */}
        {gridLines && (
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            {/* Horizontal Lines */}
            {[10, 32.5, 55].map((top, i) => (
              <div
                key={`h-${i}`}
                className="absolute left-0 right-0 h-[1px] origin-left scale-x-0 bg-black/[0.04] transition-transform duration-500 group-hover:scale-x-100 dark:bg-white/[0.04]"
                style={{ top: `${top}%`, transitionDelay: `${i * 150}ms` }}
              />
            ))}
            {/* Vertical Lines */}
            {[22.5, 50, 77.5].map((left, i) => (
              <div
                key={`v-${i}`}
                className="absolute bottom-0 top-0 w-[1px] origin-top scale-y-0 bg-black/[0.04] transition-transform duration-500 group-hover:scale-y-100 dark:bg-white/[0.04]"
                style={{ left: `${left}%`, transitionDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Shine Highlight effect (hover) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-0 transition-opacity duration-700 group-hover:opacity-100">
        <div
          className="absolute left-1/2 bottom-[45%] w-[150%] -translate-x-1/2 rounded-full opacity-40 blur-[40px] dark:opacity-0"
          style={{ paddingBottom: '150%', backgroundImage: t.lightGlow }}
        />
        <div
          className="absolute left-1/2 bottom-[45%] w-[150%] -translate-x-1/2 rounded-full opacity-0 blur-[40px] dark:opacity-25"
          style={{ paddingBottom: '150%', backgroundImage: t.darkGlow }}
        />
      </div>

      {/* Content Area */}
      <CardHeader className="relative z-10 pt-10 pb-4">
        {icon && (
          <div className="mb-4 table">
            <div className="relative flex size-10 items-center justify-center rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50 ring-1 ring-zinc-200 dark:ring-zinc-700 backdrop-blur-md transition-all duration-300 shadow-sm">
              {/* Dynamic hover ring */}
              <div
                className={cn(
                  'absolute inset-0 rounded-xl bg-transparent ring-1 ring-transparent transition-colors duration-300',
                  t.iconBg,
                  t.iconRing
                )}
              />
              <div
                className={cn(
                  'relative z-10 size-5 text-zinc-600 dark:text-zinc-400 transition-colors duration-300',
                  t.iconText
                )}
              >
                {icon}
              </div>
            </div>
          </div>
        )}
        <CardTitle className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10 pt-0 pb-6">
        <CardDescription className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export { FeatureGridCard };
export type { FeatureGridCardProps };
