'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/kanso/button';
import { MagneticButton } from '@/components/kanso/magnetic-button';
import { RealismButton } from '@/components/kanso/realism-button';
import { KeyboardButton } from '@/components/kanso/keyboard-button';
import { GlowLineButton } from '@/components/kanso/glow-line-button';
import { GithubButton } from '@/components/kanso/github-button';
import { ShimmerBorder } from '@/components/kanso/shimmer-border';
import { TextReveal } from '@/components/kanso/text-reveal';
import {
  SpotlightSection,
  SpotSeparator,
} from '@/components/kanso/spotlight-section';
import { BorderGlow } from '@/components/kanso/border-glow';
import { SpotlightCard } from '@/components/kanso/spotlight-card';
import {
  CardContainer,
  CardBody,
  CardItem,
} from '@/components/kanso/three-d-card';
import { InteractiveCard } from '@/components/kanso/interactive-card';
import { LiquidMetalCard } from '@/components/kanso/liquid-metal-card';
import { HalftoneImage } from '@/components/kanso/halftone-image';
import { HalftoneGrid } from '@/components/kanso/halftone-grid';
import { MagicRings } from '@/components/kanso/magic-rings';
import { Antigravity } from '@/components/kanso/antigravity';
import {
  ThreeDMasonryOrbit,
  CurvedRingArchive,
} from '@/components/kanso/three-d-masonry-orbit';
import { ThreeDPhotoCarousel } from '@/components/kanso/three-d-photo-carousel';
import { ThreeDCarousel } from '@/components/kanso/three-d-carousel';
import { SphereCarousel } from '@/components/kanso/sphere-carousel';
import { GlowCard } from '@/components/kanso/glow-card';
import { FeatureGridCard } from '@/components/kanso/feature-grid-card';
import { BlurRevealCode } from '@/components/kanso/blur-reveal-code';
import { NoiseCard } from '@/components/kanso/noise-card';
import { BrowserLoader } from '@/components/kanso/browser-loader';
import { TelemetryGrid } from '@/components/kanso/telemetry-widgets';
import { MagicTree } from '@/components/kanso/magic-tree';
import { Volume2, VolumeX } from 'lucide-react';
import { RayCard } from '@/components/kanso/ray-card';
import {
  ColorPicker,
  ColorPickerSelection,
  ColorPickerHue,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerOutput,
  ColorPickerFormat,
} from '@/components/kanso/color-picker';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { GITHUB_URL } from '@/lib/constants';
import Color from 'color';

function DialKitSlider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  suffix = '',
}: {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (val: number) => void;
  suffix?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
        <span>{label}</span>
        <span className="font-mono text-zinc-500 dark:text-zinc-400">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-purple-500 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}

/**
 * Component demo renderers for the docs pages.
 *
 * Each function returns a live, interactive demo for a registered component.
 * When adding a new component to the registry, add a corresponding demo here.
 */

const demos: Record<string, React.ComponentType> = {
  'magic-tree': function MagicTreeDemo() {
    return (
      <div className="flex flex-col items-center gap-8 w-full max-w-sm">
        <div className="w-full rounded-xl border border-zinc-200/60 bg-white/50 p-6 dark:border-zinc-800/60 dark:bg-zinc-950/50 shadow-xs">
          <MagicTree />
        </div>
      </div>
    );
  },
  'telemetry-widgets': function TelemetryWidgetsDemo() {
    const [soundEnabled, setSoundEnabled] = React.useState(true);

    return (
      <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
        {/* Customizer controls */}
        <div className="flex flex-col sm:flex-row gap-6 w-full rounded-xl border border-zinc-200/60 bg-zinc-50/20 p-5 dark:border-zinc-800/60 dark:bg-zinc-900/10 justify-between items-center text-left">
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              Interactive Telemetry Dashboard
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              A premium, hardware-inspired bento grid with Web Audio ticks, heap
              memory sensor rings, and an active canvas oscilloscope.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer text-zinc-805 dark:text-zinc-200"
          >
            {soundEnabled ? (
              <Volume2 className="size-4 text-emerald-500 animate-pulse" />
            ) : (
              <VolumeX className="size-4 text-rose-500" />
            )}
            <span>Clock ticks: {soundEnabled ? 'ON' : 'MUTED'}</span>
          </button>
        </div>

        {/* Live Grid */}
        <div className="w-full flex justify-center p-2">
          <TelemetryGrid
            className="w-full"
            soundEnabled={soundEnabled}
            key={soundEnabled ? 'sound-on' : 'sound-off'}
          />
        </div>
      </div>
    );
  },
  'ray-card': function RayCardDemo() {
    type ThemeColor = 'silver' | 'cyan' | 'gold' | 'violet';
    type CardVariant = 'metric' | 'feature' | 'custom';
    type StyleVariant = 'glossy' | 'matte';
    const [color, setColor] = React.useState<ThemeColor>('silver');
    const [variant, setVariant] = React.useState<CardVariant>('metric');
    const [finish, setFinish] = React.useState<StyleVariant>('glossy');
    const [value, setValue] = React.useState('750k');
    const [label, setLabel] = React.useState('Total Page Views');
    const [showGridLines, setShowGridLines] = React.useState(true);
    const [speed, setSpeed] = React.useState(6);

    const colors: { name: ThemeColor; class: string }[] = [
      {
        name: 'silver',
        class: 'bg-zinc-400 border border-zinc-500 dark:border-zinc-300',
      },
      { name: 'cyan', class: 'bg-cyan-500' },
      { name: 'gold', class: 'bg-amber-500' },
      { name: 'violet', class: 'bg-violet-500' },
    ];

    return (
      <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
        {/* Customizer controls */}
        <div className="flex flex-col md:flex-row gap-6 w-full rounded-xl border border-zinc-200/60 bg-zinc-50/20 p-5 dark:border-zinc-800/60 dark:bg-zinc-900/10 text-left">
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">
                Glow / Tracer Color
              </div>
              <div className="flex flex-wrap items-center gap-3.5 mt-1">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(c.name)}
                    className={cn(
                      'size-5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-400 dark:focus:ring-zinc-700 cursor-pointer',
                      c.class,
                      color === c.name
                        ? 'ring-2 ring-zinc-500 ring-offset-2 scale-110'
                        : 'opacity-80 hover:opacity-100 hover:scale-105'
                    )}
                    aria-label={`Select ${c.name} glow color`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">
                Card Variant
              </span>
              <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-900 p-0.5 rounded-lg border border-zinc-200/50 dark:border-zinc-800/80">
                {(['metric', 'feature', 'custom'] as CardVariant[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVariant(v)}
                    className={cn(
                      'flex-1 text-[10px] font-mono capitalize py-1.5 rounded-md transition-all cursor-pointer',
                      variant === v
                        ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-semibold'
                        : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">
                Surface Finish
              </span>
              <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-900 p-0.5 rounded-lg border border-zinc-200/50 dark:border-zinc-800/80">
                {(['glossy', 'matte'] as StyleVariant[]).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFinish(f)}
                    className={cn(
                      'flex-1 text-[10px] font-mono capitalize py-1.5 rounded-md transition-all cursor-pointer',
                      finish === f
                        ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-semibold'
                        : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            {variant === 'metric' && (
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="metric-value-input"
                  className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest cursor-pointer"
                >
                  Metric Value
                </label>
                <input
                  id="metric-value-input"
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                  placeholder="e.g. 750k"
                />
              </div>
            )}

            {variant === 'feature' && (
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="feature-label-input"
                  className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest cursor-pointer"
                >
                  Feature Description
                </label>
                <input
                  id="feature-label-input"
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                  placeholder="e.g. Total Page Views"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <label
                htmlFor="show-card-grid-checkbox"
                className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest select-none cursor-pointer"
              >
                Show Drafting Grid
              </label>
              <input
                id="show-card-grid-checkbox"
                type="checkbox"
                checked={showGridLines}
                onChange={(e) => setShowGridLines(e.target.checked)}
                className="size-4 rounded border-zinc-300 dark:border-zinc-800 accent-zinc-500 cursor-pointer"
              />
            </div>

            <DialKitSlider
              label="Tracer speed"
              min={1}
              max={15}
              step={0.5}
              value={speed}
              onChange={setSpeed}
              suffix="s"
            />
          </div>
        </div>

        {/* Live Demo Container */}
        <div className="flex items-center justify-center p-4">
          <RayCard
            variant={variant}
            value={value}
            label={variant === 'feature' ? label : 'Total Views'}
            title="Premium Performance"
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6 flex items-center justify-center"
              >
                <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
              </svg>
            }
            themeColor={color}
            styleVariant={finish}
            showGridLines={showGridLines}
            speed={speed}
          >
            {variant === 'custom' && (
              <div className="flex flex-col items-center gap-2">
                <span className="text-zinc-500 dark:text-zinc-400 text-xs font-mono">
                  Custom Layout
                </span>
                <button
                  type="button"
                  className="px-4 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black border border-zinc-800 dark:border-zinc-200 hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
                >
                  Deploy App
                </button>
              </div>
            )}
          </RayCard>
        </div>
      </div>
    );
  },
  'browser-loader': function BrowserLoaderDemo() {
    type ThemeColor =
      | 'indigo'
      | 'cyan'
      | 'emerald'
      | 'rose'
      | 'amber'
      | 'monochrome';
    type LoaderVariant = 'browser' | 'sidebar' | 'dashboard';
    const [theme, setTheme] = React.useState<ThemeColor>('cyan');
    const [variant, setVariant] = React.useState<LoaderVariant>('browser');
    const [loadingText, setLoadingText] = React.useState(
      'Deploying project...'
    );
    const [showGrid, setShowGrid] = React.useState(true);
    const [flowDuration, setFlowDuration] = React.useState(5);

    const colors: { name: ThemeColor; class: string }[] = [
      { name: 'cyan', class: 'bg-cyan-500' },
      { name: 'indigo', class: 'bg-indigo-500' },
      { name: 'emerald', class: 'bg-emerald-500' },
      { name: 'rose', class: 'bg-rose-500' },
      { name: 'amber', class: 'bg-amber-500' },
      {
        name: 'monochrome',
        class: 'bg-white border border-zinc-200 dark:border-zinc-800',
      },
    ];

    return (
      <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
        {/* Customizer controls */}
        <div className="flex flex-col md:flex-row gap-6 w-full rounded-xl border border-zinc-200/60 bg-zinc-50/20 p-5 dark:border-zinc-800/60 dark:bg-zinc-900/10 text-left">
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">
                Select Theme Color
              </div>
              <div className="flex flex-wrap items-center gap-3.5 mt-1">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setTheme(c.name)}
                    className={cn(
                      'size-5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-400 dark:focus:ring-zinc-700 cursor-pointer',
                      c.class,
                      theme === c.name
                        ? 'ring-2 ring-zinc-500 ring-offset-2 scale-110'
                        : 'opacity-80 hover:opacity-100 hover:scale-105'
                    )}
                    aria-label={`Select ${c.name} theme`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="loading-text-input"
                className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest cursor-pointer"
              >
                Loading Tab Text
              </label>
              <input
                id="loading-text-input"
                type="text"
                value={loadingText}
                onChange={(e) => setLoadingText(e.target.value)}
                className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                placeholder="Enter text..."
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">
                Layout Variant
              </span>
              <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-900 p-0.5 rounded-lg border border-zinc-200/50 dark:border-zinc-800/80">
                {(['browser', 'sidebar', 'dashboard'] as LoaderVariant[]).map(
                  (v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVariant(v)}
                      className={cn(
                        'flex-1 text-[10px] font-mono capitalize py-1.5 rounded-md transition-all cursor-pointer',
                        variant === v
                          ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-semibold'
                          : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
                      )}
                    >
                      {v}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label
                htmlFor="show-grid-checkbox"
                className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest select-none cursor-pointer"
              >
                Show Background Grid
              </label>
              <input
                id="show-grid-checkbox"
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
                className="size-4 rounded border-zinc-300 dark:border-zinc-800 accent-zinc-500 cursor-pointer"
              />
            </div>

            <DialKitSlider
              label="Flow duration"
              min={1}
              max={15}
              step={0.5}
              value={flowDuration}
              onChange={setFlowDuration}
              suffix="s"
            />
          </div>
        </div>

        {/* Live Demo Container */}
        <div className="w-full aspect-[4/3] max-h-[500px]">
          <BrowserLoader
            variant={variant}
            themeColor={theme}
            loadingText={loadingText}
            showGrid={showGrid}
            flowDuration={flowDuration}
            className="w-full h-full"
          />
        </div>
      </div>
    );
  },
  'blur-reveal-code': function BlurRevealCodeDemo() {
    return (
      <div className="flex items-center justify-center w-full min-h-[400px]">
        <BlurRevealCode code="034872" label="Glide To Reveal Secret Code" />
      </div>
    );
  },
  'feature-grid-card': function FeatureGridCardDemo() {
    type ThemeColor = 'emerald' | 'blue' | 'violet' | 'rose' | 'amber' | 'zinc';
    const [theme, setTheme] = React.useState<ThemeColor>('emerald');

    const colors: { name: ThemeColor; class: string }[] = [
      { name: 'zinc', class: 'bg-zinc-500' },
      { name: 'blue', class: 'bg-blue-500' },
      { name: 'emerald', class: 'bg-emerald-500' },
      { name: 'violet', class: 'bg-violet-500' },
      { name: 'amber', class: 'bg-amber-500' },
      { name: 'rose', class: 'bg-rose-500' },
    ];

    return (
      <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
        {/* Color customizer */}
        <div className="flex flex-col items-center gap-3 w-full rounded-xl border border-zinc-200/60 bg-zinc-50/20 p-4 dark:border-zinc-800/60 dark:bg-zinc-900/10">
          <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">
            Select Hover Theme Color
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3.5 mt-1">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setTheme(c.name)}
                className={cn(
                  'size-5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-400 dark:focus:ring-zinc-700 cursor-pointer',
                  c.class,
                  theme === c.name
                    ? 'ring-2 ring-zinc-500 ring-offset-2 scale-110'
                    : 'opacity-80 hover:opacity-100 hover:scale-105'
                )}
                aria-label={`Select ${c.name} theme`}
              />
            ))}
          </div>
        </div>

        {/* Demo Cards */}
        <div className="flex flex-wrap gap-8 items-center justify-center w-full">
          <div className="w-[280px]">
            <FeatureGridCard
              themeColor={theme}
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-full"
                >
                  <path d="M14.5 3.5C14.5 3.5 14.5 5.5 12 5.5C9.5 5.5 9.5 3.5 9.5 3.5H7.5L4.20711 6.79289C3.81658 7.18342 3.81658 7.81658 4.20711 8.20711L6.5 10.5V20.5H17.5V10.5L19.7929 8.20711C20.1834 7.81658 20.1834 7.18342 19.7929 6.79289L16.5 3.5H14.5Z" />
                </svg>
              }
              title="Products"
              description="A beautiful card component that uses shadcn/ui Card primitives under the hood with a premium hover grid."
            />
          </div>
          <div className="w-[280px]">
            <FeatureGridCard
              themeColor={theme}
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-full"
                >
                  <path d="M4.5 9.5V5.5C4.5 4.94772 4.94772 4.5 5.5 4.5H9.5C10.0523 4.5 10.5 4.94772 10.5 5.5V9.5C10.5 10.0523 10.0523 10.5 9.5 10.5H5.5C4.94772 10.5 4.5 10.0523 4.5 9.5Z" />
                  <path d="M13.5 18.5V14.5C13.5 13.9477 13.9477 13.5 14.5 13.5H18.5C19.0523 13.5 19.5 13.9477 19.5 14.5V18.5C19.5 19.0523 19.0523 19.5 18.5 19.5H14.5C13.9477 19.5 13.5 19.0523 13.5 18.5Z" />
                  <path d="M4.5 19.5L7.5 13.5L10.5 19.5H4.5Z" />
                  <path d="M16.5 4.5C18.1569 4.5 19.5 5.84315 19.5 7.5C19.5 9.15685 18.1569 10.5 16.5 10.5C14.8431 10.5 13.5 9.15685 13.5 7.5C13.5 5.84315 14.8431 4.5 16.5 4.5Z" />
                </svg>
              }
              title="Categories"
              description="Customize the colors to match your brand. Fully accessible and responsive with dark mode support."
            />
          </div>
        </div>
      </div>
    );
  },
  'noise-card': function NoiseCardDemo() {
    const [theme, setTheme] = React.useState<
      'kanso' | 'indigo' | 'sunset' | 'light' | 'glass' | 'none'
    >('indigo');
    const [animated, setAnimated] = React.useState(true);
    const [noiseOpacity, setNoiseOpacity] = React.useState(0.06);
    const [grainSize, setGrainSize] = React.useState(1);
    const [interactive, setInteractive] = React.useState(true);
    const [spotlightSize, setSpotlightSize] = React.useState(300);

    const themes: { name: typeof theme; label: string; class: string }[] = [
      {
        name: 'kanso',
        label: 'Kanso Minimal',
        class: 'bg-zinc-900 border-zinc-700',
      },
      {
        name: 'indigo',
        label: 'Deep Indigo',
        class: 'bg-indigo-950 border-indigo-700',
      },
      {
        name: 'sunset',
        label: 'Sunset Amber',
        class: 'bg-rose-950 border-rose-800',
      },
      {
        name: 'light',
        label: 'Pure Light',
        class: 'bg-zinc-200 border-zinc-400 text-zinc-900',
      },
      {
        name: 'glass',
        label: 'Frosted Glass',
        class: 'bg-white/10 dark:bg-black/10 border-white/20',
      },
      {
        name: 'none',
        label: 'Custom Flat',
        class: 'bg-blue-600 border-blue-400',
      },
    ];

    const handleThemeChange = (newTheme: typeof theme) => {
      setTheme(newTheme);
      if (newTheme === 'light') {
        setNoiseOpacity(0.02);
      } else if (newTheme === 'glass') {
        setNoiseOpacity(0.035);
      } else {
        setNoiseOpacity(0.06);
      }
    };

    return (
      <div className="flex flex-col items-center gap-10 w-full max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center w-full">
          <div className="flex-1 flex items-center justify-center p-6 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl bg-zinc-50/10 dark:bg-zinc-950/20 min-h-[350px]">
            <NoiseCard
              theme={theme}
              animated={animated}
              noiseOpacity={noiseOpacity}
              grainSize={grainSize}
              interactive={interactive}
              spotlightSize={spotlightSize}
              bgColor="bg-indigo-600"
              className="w-full max-w-sm h-64 shadow-2xl transition-all duration-500"
            >
              <div className="flex flex-col justify-between h-full select-none">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                      Telemetry Node
                    </span>
                    <span
                      className={cn(
                        'size-2 rounded-full',
                        animated
                          ? 'bg-emerald-500 animate-pulse'
                          : 'bg-zinc-600'
                      )}
                    />
                  </div>
                  <h3 className="text-xl font-bold mt-4 tracking-tight">
                    {theme === 'kanso' && 'Kanso Simplicity'}
                    {theme === 'indigo' && 'Quantum Wavefront'}
                    {theme === 'sunset' && 'Solar Flare Core'}
                    {theme === 'light' && 'Clean Canvas'}
                    {theme === 'glass' && 'Frosted Silica'}
                    {theme === 'none' && 'Flat Field Override'}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                    A premium React container with hardware-accelerated
                    static/animated noise grain layers and hover interactions.
                  </p>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500/70 border-t border-zinc-200/20 dark:border-zinc-800/30 pt-4 mt-4">
                  <span>GRAIN: {grainSize}px</span>
                  <span>OPACITY: {(noiseOpacity * 100).toFixed(1)}%</span>
                  <span>ACTIVE</span>
                </div>
              </div>
            </NoiseCard>
          </div>

          <div className="w-full md:w-80 flex flex-col gap-6 p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900/30 justify-between">
            <div className="flex flex-col gap-5">
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Card Parameters (Props)
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Theme Preset
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20">
                  {themes.map((t) => (
                    <button
                      key={t.name}
                      onClick={() => handleThemeChange(t.name)}
                      className={cn(
                        'px-2 py-1 text-[10px] font-semibold rounded-md border transition-all cursor-pointer text-center',
                        theme === t.name
                          ? 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-xs'
                          : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                      )}
                    >
                      {t.name === 'none' ? 'Custom' : t.name}
                    </button>
                  ))}
                </div>
              </div>

              <DialKitSlider
                label="Noise Opacity"
                min={0.01}
                max={0.2}
                step={0.005}
                value={noiseOpacity}
                onChange={setNoiseOpacity}
                suffix=""
              />

              <DialKitSlider
                label="Grain Size"
                min={1}
                max={4}
                step={1}
                value={grainSize}
                onChange={setGrainSize}
                suffix="px"
              />

              <DialKitSlider
                label="Spotlight Size"
                min={150}
                max={500}
                step={25}
                value={spotlightSize}
                onChange={setSpotlightSize}
                suffix="px"
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-zinc-100 dark:border-zinc-800/80 pt-4 mt-2">
              <label className="flex items-center gap-2.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={animated}
                  onChange={(e) => setAnimated(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-zinc-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer size-3.5"
                />
                Animated Noise Grain
              </label>

              <label className="flex items-center gap-2.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={interactive}
                  onChange={(e) => setInteractive(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-zinc-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer size-3.5"
                />
                Hover Spotlight & Lift
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest text-center">
            Theme Gallery Showcase
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            <NoiseCard theme="kanso" className="h-44 shadow-lg">
              <div className="flex flex-col justify-between h-full">
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">
                  Preset: kanso
                </span>
                <h4 className="text-base font-bold text-zinc-50 mt-1">
                  Kanso Minimal
                </h4>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-400 leading-relaxed mt-1">
                  Ultra-minimalist dark slate/zinc finish.
                </p>
              </div>
            </NoiseCard>

            <NoiseCard theme="indigo" className="h-44 shadow-lg">
              <div className="flex flex-col justify-between h-full">
                <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-400">
                  Preset: indigo
                </span>
                <h4 className="text-base font-bold text-zinc-50 mt-1">
                  Deep Indigo
                </h4>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-400 leading-relaxed mt-1">
                  Sophisticated deep navy and purple glow.
                </p>
              </div>
            </NoiseCard>

            <NoiseCard theme="sunset" className="h-44 shadow-lg">
              <div className="flex flex-col justify-between h-full">
                <span className="text-[9px] font-bold uppercase tracking-widest text-rose-400">
                  Preset: sunset
                </span>
                <h4 className="text-base font-bold text-zinc-50 mt-1">
                  Sunset Amber
                </h4>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-400 leading-relaxed mt-1">
                  Warm amber and rich burgundy glow.
                </p>
              </div>
            </NoiseCard>

            <NoiseCard theme="light" className="h-44 shadow-lg">
              <div className="flex flex-col justify-between h-full">
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                  Preset: light
                </span>
                <h4 className="text-base font-bold text-zinc-900 mt-1">
                  Pure Light
                </h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed mt-1">
                  Crisp paper-white with micro shadow and dark grain.
                </p>
              </div>
            </NoiseCard>

            <NoiseCard theme="glass" className="h-44 shadow-lg">
              <div className="flex flex-col justify-between h-full">
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Preset: glass
                </span>
                <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mt-1">
                  Frosted Glass
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">
                  Semi-transparent blur overlay.
                </p>
              </div>
            </NoiseCard>

            <NoiseCard
              theme="none"
              bgColor="bg-emerald-900"
              className="h-44 border border-emerald-800/30 shadow-lg"
            >
              <div className="flex flex-col justify-between h-full">
                <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-300">
                  Preset: none (Custom)
                </span>
                <h4 className="text-base font-bold text-white mt-1">
                  Custom Emerald
                </h4>
                <p className="text-[11px] text-emerald-100/70 leading-relaxed mt-1">
                  Leverages custom class names and backgrounds.
                </p>
              </div>
            </NoiseCard>
          </div>
        </div>
      </div>
    );
  },
  button: function ButtonDemo() {
    type ButtonColor =
      | 'zinc'
      | 'blue'
      | 'emerald'
      | 'violet'
      | 'amber'
      | 'rose';
    const [selectedColor, setSelectedColor] =
      React.useState<ButtonColor>('zinc');
    const colors: { name: ButtonColor; class: string }[] = [
      { name: 'zinc', class: 'bg-zinc-950 dark:bg-zinc-50' },
      { name: 'blue', class: 'bg-blue-500' },
      { name: 'emerald', class: 'bg-emerald-500' },
      { name: 'violet', class: 'bg-violet-500' },
      { name: 'amber', class: 'bg-amber-500' },
      { name: 'rose', class: 'bg-rose-500' },
    ];

    const handleRandomize = () => {
      const remainingColors = colors.filter((c) => c.name !== selectedColor);
      const randomColor =
        remainingColors[Math.floor(Math.random() * remainingColors.length)]
          .name;
      setSelectedColor(randomColor);
    };

    return (
      <div className="flex flex-col gap-8 w-full max-w-lg items-center">
        {/* Color customizer playground */}
        <div className="flex flex-col items-center gap-3 w-full rounded-xl border border-zinc-200/60 bg-zinc-50/20 p-4 dark:border-zinc-800/60 dark:bg-zinc-900/10">
          <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">
            Select Color & Active Theming
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3.5 mt-1">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                className={cn(
                  'size-5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-400 dark:focus:ring-zinc-700 cursor-pointer',
                  c.class,
                  selectedColor === c.name
                    ? 'ring-2 ring-zinc-500 ring-offset-2 scale-110'
                    : 'opacity-80 hover:opacity-100 hover:scale-105'
                )}
                aria-label={`Select ${c.name} theme`}
              />
            ))}
            <button
              onClick={handleRandomize}
              className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 py-1 text-[11px] font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-850 cursor-pointer"
            >
              🎲 Randomize
            </button>
          </div>
        </div>

        {/* Paired Buttons Showcase Row */}
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="text-xs font-medium text-zinc-400 dark:text-zinc-500 text-center">
            All variants pair and style dynamically matching the &ldquo;
            {selectedColor}&rdquo; color family:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="primary" color={selectedColor}>
              Primary
            </Button>
            <Button variant="secondary" color={selectedColor}>
              Secondary
            </Button>
            <Button variant="outline" color={selectedColor}>
              Outline
            </Button>
            <Button variant="ghost" color={selectedColor}>
              Ghost
            </Button>
            <Button variant="link" color={selectedColor}>
              Link
            </Button>
          </div>
        </div>

        {/* Sizes & Inactive displays */}
        <hr className="w-full border-zinc-200/80 dark:border-zinc-800/60" />

        <div className="grid gap-6 w-full sm:grid-cols-2">
          {/* Sizes */}
          <div className="flex flex-col items-center gap-3">
            <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
              Sizes
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button size="sm" color={selectedColor}>
                Small
              </Button>
              <Button size="default" color={selectedColor}>
                Default
              </Button>
              <Button size="lg" color={selectedColor}>
                Large
              </Button>
            </div>
          </div>

          {/* Inactive States */}
          <div className="flex flex-col items-center gap-3">
            <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
              Inactive States
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button inactive color={selectedColor}>
                Inactive
              </Button>
              <Button variant="outline" inactive color={selectedColor}>
                Inactive Outline
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
  'magnetic-button': function MagneticButtonDemo() {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4">
        <MagneticButton>Hover me</MagneticButton>
        <MagneticButton magneticStrength={0.5} variant="outline">
          Outline Style
        </MagneticButton>
        <MagneticButton magneticStrength={0.15}>Subtle Pull</MagneticButton>
      </div>
    );
  },
  'realism-button': function RealismButtonDemo() {
    return (
      <div className="flex flex-wrap items-center justify-center gap-6">
        <RealismButton variantColor="cyan">Cyan Glow</RealismButton>
        <RealismButton variantColor="rose">Rose Glow</RealismButton>
        <RealismButton variantColor="emerald">Emerald Glow</RealismButton>
        <RealismButton variantColor="violet">Violet Glow</RealismButton>
      </div>
    );
  },
  'keyboard-button': function KeyboardButtonDemo() {
    return (
      <div className="flex flex-wrap items-center justify-center gap-6">
        <KeyboardButton
          variantColor="dark"
          icon={
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3.5"
            >
              <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" />
              <path d="M9 3a3 3 0 0 0-3 3v12a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" />
              <path d="M3 9a3 3 0 0 0 3 3h12a3 3 0 0 0 0-6H6a3 3 0 0 0-3 3z" />
              <path d="M3 15a3 3 0 0 0 3 3h12a3 3 0 0 0 0-6H6a3 3 0 0 0-3 3z" />
            </svg>
          }
        >
          cmd
        </KeyboardButton>

        <KeyboardButton
          variantColor="light"
          icon={
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3.5"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          }
        >
          shift
        </KeyboardButton>

        <KeyboardButton
          variantColor="blue"
          icon={
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          }
        >
          enter
        </KeyboardButton>
      </div>
    );
  },
  'glow-line-button': function GlowLineButtonDemo() {
    const [customColor, setCustomColor] = React.useState('#3fe9ff');

    return (
      <div className="flex flex-col gap-6 w-full max-w-md items-center">
        {/* Presets */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <GlowLineButton glowColor="white">White Glow</GlowLineButton>
          <GlowLineButton glowColor="blue">Blue Glow</GlowLineButton>
          <GlowLineButton glowColor="emerald">Emerald Glow</GlowLineButton>
          <GlowLineButton glowColor="rose">Rose Glow</GlowLineButton>
        </div>

        {/* Custom Color Selector Wheel */}
        <div className="flex flex-col items-center gap-3 w-full rounded-xl border border-zinc-200/60 bg-zinc-50/20 p-4 dark:border-zinc-800/60 dark:bg-zinc-900/10 mt-2">
          <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest text-center">
            Custom Color Wheel Picker
          </div>
          <div className="flex items-center gap-4">
            <div
              suppressHydrationWarning
              className="relative size-10 rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-700 cursor-pointer shadow-sm"
            >
              <input
                suppressHydrationWarning
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="absolute inset-[-4px] size-[48px] p-0 border-0 cursor-pointer rounded-full"
                title="Choose custom glow color"
              />
            </div>
            <code className="text-xs font-mono text-zinc-500 dark:text-zinc-400 select-all uppercase">
              {customColor}
            </code>
            <GlowLineButton glowColor={customColor}>Custom Glow</GlowLineButton>
          </div>
        </div>
      </div>
    );
  },
  'github-button': function GithubButtonDemo() {
    type GlowPreset =
      | 'default'
      | 'violet'
      | 'rose'
      | 'emerald'
      | 'blue'
      | 'orange';
    const [selectedGlow, setSelectedGlow] =
      React.useState<GlowPreset>('default');
    const glowPresets: { name: GlowPreset; label: string; class: string }[] = [
      {
        name: 'default',
        label: 'Default',
        class: 'bg-gradient-to-r from-violet-500 via-rose-500 to-orange-400',
      },
      { name: 'violet', label: 'Violet', class: 'bg-violet-500' },
      { name: 'rose', label: 'Rose', class: 'bg-rose-500' },
      { name: 'emerald', label: 'Emerald', class: 'bg-emerald-500' },
      { name: 'blue', label: 'Blue', class: 'bg-blue-500' },
      { name: 'orange', label: 'Orange', class: 'bg-orange-500' },
    ];

    return (
      <div className="flex flex-col gap-8 w-full max-w-lg items-center">
        {/* Row 1: Classic & Tooltip */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
              Classic Pill
            </span>
            <GithubButton variantDesign="classic" href={GITHUB_URL} />
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
              Tooltip Icon
            </span>
            <GithubButton variantDesign="tooltip" href={GITHUB_URL}>
              Star on GitHub
            </GithubButton>
          </div>
        </div>

        <hr className="w-full border-zinc-200/80 dark:border-zinc-800/60" />

        {/* Row 2: Rainbow & Glow */}
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
              Rainbow Star Glow
            </span>
            <GithubButton variantDesign="rainbow" href={GITHUB_URL} />
          </div>

          <div className="flex flex-col items-center gap-2 mt-2">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
              Gradient Glow
            </span>
            <GithubButton
              variantDesign="glow"
              href={GITHUB_URL}
              glowColor={selectedGlow === 'default' ? undefined : selectedGlow}
            >
              Star Kanso UI
            </GithubButton>
          </div>
        </div>

        <hr className="w-full border-zinc-200/80 dark:border-zinc-800/60" />

        {/* Glow Color Customization Picker */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
            Customize Glow Color
          </span>
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20">
            {glowPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => setSelectedGlow(preset.name)}
                className={cn(
                  'relative flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md transition-all border',
                  selectedGlow === preset.name
                    ? 'border-zinc-250 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-xs'
                    : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                )}
              >
                <span
                  className={cn('size-2 rounded-full shrink-0', preset.class)}
                />
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  },

  'shimmer-border': function ShimmerBorderDemo() {
    const [borderWidth, setBorderWidth] = React.useState(2);
    const [duration, setDuration] = React.useState(3.5);
    const [shimmerSize, setShimmerSize] = React.useState(20);
    const [borderRadius, setBorderRadius] = React.useState(16);

    // Color states
    const [theme, setTheme] = React.useState<
      'orchid' | 'mint' | 'solar' | 'cyber' | 'chrome' | 'custom'
    >('orchid');
    const [customColor, setCustomColor] = React.useState('#c084fc');

    const themeColors = {
      orchid: {
        color: '#c084fc',
        label: 'Orchid Glow',
        class: 'bg-purple-400',
      },
      mint: { color: '#34d399', label: 'Neon Mint', class: 'bg-emerald-400' },
      solar: { color: '#f59e0b', label: 'Solar Gold', class: 'bg-amber-400' },
      cyber: { color: '#60a5fa', label: 'Cyber Blue', class: 'bg-blue-400' },
      chrome: {
        color: 'rgba(255, 255, 255, 0.4)',
        label: 'Neutral Chrome',
        class: 'bg-zinc-300 dark:bg-zinc-600',
      },
    };

    const activeColor =
      theme === 'custom' ? customColor : themeColors[theme].color;

    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        {/* Modern ShimmerBorder Preview */}
        <ShimmerBorder
          shimmerColor={activeColor}
          borderWidth={borderWidth}
          duration={duration}
          shimmerSize={shimmerSize}
          borderRadius={borderRadius}
          className="w-full shadow-lg"
        >
          <div className="px-6 py-5 flex flex-col justify-between min-h-[140px] bg-white dark:bg-zinc-950">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                  Perimeter Sweep
                </span>
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <h3 className="mt-3 text-base font-bold text-zinc-900 dark:text-white">
                Active Light Sweep
              </h3>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed">
                GPU-accelerated conic masking sweeps a flowing fiber-optic light
                beam around the card boundaries.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-[9px] font-mono text-zinc-400 dark:text-zinc-500 border-t border-zinc-100 dark:border-zinc-900/50 pt-2.5">
              <span>Width: {borderWidth}px</span>
              <span>Speed: {duration}s</span>
              <span>Spread: {shimmerSize}%</span>
            </div>
          </div>
        </ShimmerBorder>

        {/* Theme select controls */}
        <div className="flex flex-col gap-3 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
            Laser Theme Presets
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(
              ['orchid', 'mint', 'solar', 'cyber', 'chrome', 'custom'] as const
            ).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-md border transition-all cursor-pointer',
                  theme === t
                    ? 'border-zinc-350 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 shadow-xs'
                    : 'border-transparent text-zinc-500 hover:text-zinc-850 dark:text-zinc-400 dark:hover:text-zinc-200'
                )}
              >
                {t !== 'custom' && (
                  <span
                    className={cn(
                      'size-2 rounded-full shrink-0',
                      themeColors[t].class
                    )}
                  />
                )}
                {t === 'custom'
                  ? '🎨 Custom'
                  : themeColors[t].label.split(' ')[1]}
              </button>
            ))}
          </div>

          {theme === 'custom' && (
            <div className="flex items-center gap-2 mt-1 animate-in fade-in slide-in-from-top-1 duration-150">
              <Popover>
                <PopoverTrigger className="flex items-center gap-2 px-2.5 py-1 text-xs border rounded-md bg-white dark:bg-zinc-950 cursor-pointer shadow-xs">
                  <span
                    className="size-3.5 rounded-full border border-black/10 dark:border-white/10 shrink-0"
                    style={{ backgroundColor: customColor }}
                  />
                  <span className="font-mono text-[10px] uppercase text-zinc-500">
                    {customColor}
                  </span>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4">
                  <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-2">
                    Custom Shimmer Color
                  </div>
                  <ColorPicker
                    value={customColor}
                    onChange={setCustomColor}
                    className="h-auto w-full gap-3"
                  >
                    <ColorPickerSelection className="h-32 rounded-md border border-zinc-200 dark:border-zinc-800" />
                    <ColorPickerHue />
                    <ColorPickerAlpha />
                  </ColorPicker>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        {/* Real-time Config Panel (DialKit) */}
        <div className="grid grid-cols-2 gap-4 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="col-span-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">
            Real-time Config Kit (Props)
          </div>
          <DialKitSlider
            label="Border Width"
            min={1.0}
            max={5.0}
            step={0.5}
            value={borderWidth}
            onChange={setBorderWidth}
            suffix="px"
          />
          <DialKitSlider
            label="Shimmer Speed"
            min={1.0}
            max={8.0}
            step={0.5}
            value={duration}
            onChange={setDuration}
            suffix="s"
          />
          <DialKitSlider
            label="Shimmer Spread"
            min={10}
            max={50}
            step={5}
            value={shimmerSize}
            onChange={setShimmerSize}
            suffix="%"
          />
          <DialKitSlider
            label="Border Radius"
            min={6}
            max={32}
            step={1}
            value={borderRadius}
            onChange={setBorderRadius}
            suffix="px"
          />
        </div>
      </div>
    );
  },

  'text-reveal': function TextRevealDemo() {
    return (
      <div className="flex flex-col items-center gap-8">
        <TextReveal
          text="Simplicity, Engineered."
          className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl"
        />
        <TextReveal
          text="Build beautiful interfaces without unnecessary complexity."
          delay={0.5}
          staggerDelay={0.02}
          className="text-base text-zinc-500 dark:text-zinc-400 max-w-lg text-center"
        />
      </div>
    );
  },

  'spotlight-section': function SpotlightSectionDemo() {
    type PresetColor = 'white' | 'blue' | 'emerald' | 'violet' | 'rose';
    const [selectedColor, setSelectedColor] = React.useState<
      PresetColor | 'custom'
    >('violet');
    const [customColor, setCustomColor] = React.useState('#d946ef');
    const [variant, setVariant] = React.useState<
      'both' | 'top-only' | 'bottom-only'
    >('both');
    const [intensity, setIntensity] = React.useState<
      'subtle' | 'medium' | 'high'
    >('medium');

    const colors: {
      name: PresetColor | 'custom';
      label: string;
      class: string;
    }[] = [
      { name: 'white', label: 'White', class: 'bg-zinc-300 dark:bg-zinc-600' },
      { name: 'blue', label: 'Blue', class: 'bg-blue-500' },
      { name: 'emerald', label: 'Emerald', class: 'bg-emerald-500' },
      { name: 'violet', label: 'Violet', class: 'bg-violet-500' },
      { name: 'rose', label: 'Rose', class: 'bg-rose-500' },
      {
        name: 'custom',
        label: 'Custom',
        class: 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500',
      },
    ];

    const activeColor =
      selectedColor === 'custom' ? customColor : selectedColor;

    return (
      <div className="flex flex-col gap-10 w-full  items-center">
        {/* Controls Panel */}
        <div className="grid gap-6 w-full sm:grid-cols-2 p-5 rounded-2xl border border-zinc-200/60 bg-zinc-50/20 dark:border-zinc-800/60 dark:bg-zinc-900/10">
          {/* Left Controls: Colors */}
          <div className="flex flex-col gap-3">
            <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">
              Spotlight Color Theme
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={cn(
                    'flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md transition-all border cursor-pointer',
                    selectedColor === c.name
                      ? 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-xs'
                      : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                  )}
                  aria-label={`Select ${c.label} color`}
                >
                  <span
                    className={cn('size-2 rounded-full shrink-0', c.class)}
                  />
                  {c.label}
                </button>
              ))}
            </div>

            {selectedColor === 'custom' && (
              <div className="flex items-center gap-3 mt-2 pl-1 animate-in fade-in slide-in-from-top-1 duration-200">
                <Popover>
                  <PopoverTrigger className="inline-flex shrink-0 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2 h-8 gap-2 px-3 py-1 cursor-pointer text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900/50 shadow-xs">
                    <span
                      className="size-3.5 rounded-full border border-black/10 dark:border-white/10 shrink-0"
                      style={{ backgroundColor: customColor }}
                    />
                    <span className="font-mono text-xs uppercase text-zinc-600 dark:text-zinc-350">
                      {customColor}
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 flex flex-col gap-3 p-4">
                    <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
                      Custom Color Picker
                    </div>
                    <ColorPicker
                      value={customColor}
                      onChange={(val) => setCustomColor(val)}
                      className="h-auto w-full gap-3"
                    >
                      <ColorPickerSelection className="h-32 rounded-md border border-zinc-200 dark:border-zinc-800" />
                      <ColorPickerHue />
                      <ColorPickerAlpha />
                      <div className="flex items-center gap-2 mt-1">
                        <ColorPickerEyeDropper />
                        <ColorPickerOutput />
                        <ColorPickerFormat />
                      </div>
                    </ColorPicker>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>

          {/* Right Controls: Variants & Intensity */}
          <div className="flex flex-col gap-4">
            {/* Variants */}
            <div className="flex flex-col gap-2">
              <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">
                Layout Border Variant
              </div>
              <div className="flex rounded-md border border-zinc-200 dark:border-zinc-800 p-0.5 w-fit bg-zinc-100/50 dark:bg-zinc-950/40">
                {(['both', 'top-only', 'bottom-only'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={cn(
                      'px-2.5 py-1 text-[11px] font-medium rounded-sm capitalize transition-all cursor-pointer',
                      variant === v
                        ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-xs'
                        : 'text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200'
                    )}
                  >
                    {v.replace('-only', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Intensity */}
            <div className="flex flex-col gap-2">
              <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">
                Glow Intensity
              </div>
              <div className="flex rounded-md border border-zinc-200 dark:border-zinc-800 p-0.5 w-fit bg-zinc-100/50 dark:bg-zinc-950/40">
                {(['subtle', 'medium', 'high'] as const).map((i) => (
                  <button
                    key={i}
                    onClick={() => setIntensity(i)}
                    className={cn(
                      'px-2.5 py-1 text-[11px] font-medium rounded-sm capitalize transition-all cursor-pointer',
                      intensity === i
                        ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-xs'
                        : 'text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200'
                    )}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Spotlight Section Demo Container */}
        <div className="w-full rounded-2xl border border-zinc-200/50 bg-zinc-50/5 p-4 dark:border-zinc-900/40 dark:bg-zinc-950/5 overflow-hidden">
          <SpotlightSection
            title="Ambient Interface Spotlight"
            spotlightColor={activeColor}
            variant={variant}
            intensity={intensity}
            className="w-full"
          >
            <div className="flex flex-col items-center justify-center text-center py-20 px-6 max-w-md mx-auto">
              <span className="text-[11px] font-semibold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase px-2 py-0.5 rounded-full border border-zinc-200/60 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/30">
                Layout Element
              </span>
              <h3 className="mt-4 text-xl font-medium text-zinc-800 dark:text-zinc-200">
                Minimalist Content Container
              </h3>
              <p className="mt-2.5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Add beautiful ambient glows to structure your product pages,
                landing sections, or feature highlights. Fits beautifully with
                dark themes.
              </p>
            </div>
          </SpotlightSection>
        </div>

        {/* Separator Showcase */}
        <div className="flex flex-col gap-6 w-full mt-2">
          <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest text-center">
            SpotSeparator Presets & Variations
          </div>

          <div className="flex flex-col gap-8 w-full p-6 rounded-2xl border border-zinc-200/60 bg-zinc-50/20 dark:border-zinc-800/60 dark:bg-zinc-900/10">
            <div className="flex flex-col gap-2.5 w-full">
              <div className="text-[10px] text-zinc-400 font-mono">
                Zinc preset (80% width)
              </div>
              <SpotSeparator color="zinc" width="80%" />
            </div>

            <div className="flex flex-col gap-2.5 w-full">
              <div className="text-[10px] text-zinc-400 font-mono">
                Blue preset (60% width)
              </div>
              <SpotSeparator color="blue" width="60%" />
            </div>

            <div className="flex flex-col gap-2.5 w-full">
              <div className="text-[10px] text-zinc-400 font-mono">
                Emerald preset (40% width)
              </div>
              <SpotSeparator color="emerald" width="40%" />
            </div>

            <div className="flex flex-col gap-2.5 w-full">
              <div className="text-[10px] text-zinc-400 font-mono">
                Violet preset (20% width)
              </div>
              <SpotSeparator color="violet" width="20%" />
            </div>

            <div className="flex flex-col gap-2.5 w-full">
              <div className="text-[10px] text-zinc-400 font-mono">
                Rose preset (95% width, 2px height)
              </div>
              <SpotSeparator color="rose" width="95%" height="2px" />
            </div>

            {selectedColor === 'custom' && (
              <div className="flex flex-col gap-2.5 w-full animate-in fade-in duration-300">
                <div className="text-[10px] text-zinc-400 font-mono">
                  Custom color separator ({customColor})
                </div>
                <SpotSeparator color={customColor} width="85%" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
  'border-glow': function BorderGlowDemo() {
    const [key, setKey] = React.useState(0);
    const [intensity, setIntensity] = React.useState(1.0);
    const [edgeSensitivity, setEdgeSensitivity] = React.useState(30);
    const [borderRadius, setBorderRadius] = React.useState(28);
    const [glowRadius, setGlowRadius] = React.useState(40);
    const [coneSpread, setConeSpread] = React.useState(25);

    // Theme options
    const [theme, setTheme] = React.useState<
      'orchid' | 'mint' | 'solar' | 'cyber' | 'custom'
    >('orchid');

    // Custom configurations
    const [customGlow, setCustomGlow] = React.useState('280 80 70');
    const [customColors, setCustomColors] = React.useState([
      '#c084fc',
      '#f472b6',
      '#38bdf8',
    ]);

    const themePresets = {
      orchid: {
        glowColor: '280 80 70',
        colors: ['#c084fc', '#f472b6', '#38bdf8'],
        label: 'Orchid Glow',
        class: 'from-purple-400 via-pink-400 to-sky-400',
      },
      mint: {
        glowColor: '160 80 60',
        colors: ['#34d399', '#22d3ee', '#3b82f6'],
        label: 'Neon Mint',
        class: 'from-emerald-400 via-cyan-400 to-blue-400',
      },
      solar: {
        glowColor: '340 85 65',
        colors: ['#fb7185', '#f59e0b', '#ec4899'],
        label: 'Solar Flare',
        class: 'from-rose-450 via-amber-400 to-pink-500',
      },
      cyber: {
        glowColor: '210 90 60',
        colors: ['#60a5fa', '#3b82f6', '#10b981'],
        label: 'Cyber Blue',
        class: 'from-blue-400 via-indigo-500 to-emerald-400',
      },
    };

    const activeGlowColor =
      theme === 'custom' ? customGlow : themePresets[theme].glowColor;
    const activeColors =
      theme === 'custom' ? customColors : themePresets[theme].colors;

    const setCustomColorAtIndex = (index: number, val: string) => {
      const copy = [...customColors];
      copy[index] = val;
      setCustomColors(copy);
    };

    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-lg">
        {/* Border Glow Showcase */}
        <BorderGlow
          key={`${key}-${theme}`}
          animated={true}
          glowIntensity={intensity}
          edgeSensitivity={edgeSensitivity}
          borderRadius={borderRadius}
          glowRadius={glowRadius}
          coneSpread={coneSpread}
          className="w-full aspect-video"
          glowColor={activeGlowColor}
          colors={activeColors}
        >
          <div className="flex flex-col justify-between h-full p-6 text-zinc-100">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-purple-400 font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                Active Sweep
              </span>
              <h3 className="mt-4 text-xl font-medium tracking-tight text-white">
                Kanso Border Glow
              </h3>
              <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                A premium, high-performance card using custom mesh gradient
                masks. Move your cursor to see the border and glow light up
                around the coordinates.
              </p>
            </div>
            <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
              <span>Glow: HSL({activeGlowColor})</span>
              <span>
                Mesh: {activeColors.map((c) => c.slice(0, 7)).join(', ')}
              </span>
            </div>
          </div>
        </BorderGlow>

        {/* Color controls */}
        <div className="flex flex-col gap-4 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
            Border & Glow Themes
          </div>

          <div className="flex flex-wrap gap-2">
            {(['orchid', 'mint', 'solar', 'cyber', 'custom'] as const).map(
              (t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTheme(t);
                    setKey((k) => k + 1);
                  }}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all border cursor-pointer',
                    theme === t
                      ? 'border-zinc-300 dark:border-zinc-700 bg-zinc-55 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 shadow-xs'
                      : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                  )}
                >
                  {t !== 'custom' && (
                    <span
                      className={cn(
                        'size-2.5 rounded-full bg-gradient-to-r shrink-0',
                        themePresets[t].class
                      )}
                    />
                  )}
                  {t === 'custom'
                    ? '🎨 Custom Color Wheel'
                    : themePresets[t].label}
                </button>
              )
            )}
          </div>

          {theme === 'custom' && (
            <div className="flex flex-wrap gap-4 items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-955/60 border border-zinc-100 dark:border-zinc-900 animate-in fade-in duration-200">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] uppercase font-semibold text-zinc-400">
                  Outer Glow
                </span>
                <Popover>
                  <PopoverTrigger className="flex items-center gap-2 px-2.5 py-1 text-xs border rounded-md bg-white dark:bg-zinc-900 cursor-pointer shadow-xs">
                    <span
                      className="size-3.5 rounded-full border border-black/10 dark:border-white/10 shrink-0"
                      style={{
                        backgroundColor: `hsl(${customGlow.split(' ')[0]}deg ${customGlow.split(' ')[1]}% ${customGlow.split(' ')[2]}%)`,
                      }}
                    />
                    <span className="font-mono text-[10px]">
                      HSL({customGlow})
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-4">
                    <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-2">
                      Glow Base Color
                    </div>
                    <ColorPicker
                      value={(() => {
                        try {
                          const parts = customGlow.split(' ');
                          return Color.hsl(
                            parseFloat(parts[0]),
                            parseFloat(parts[1]),
                            parseFloat(parts[2])
                          ).hex();
                        } catch {
                          return '#c084fc';
                        }
                      })()}
                      onChange={(val) => {
                        try {
                          const [h, s, l] = Color(val).hsl().array();
                          setCustomGlow(
                            `${Math.round(h)} ${Math.round(s)} ${Math.round(l)}`
                          );
                        } catch {}
                      }}
                      className="h-auto w-full gap-3"
                    >
                      <ColorPickerSelection className="h-32 rounded-md border border-zinc-200 dark:border-zinc-800" />
                      <ColorPickerHue />
                      <ColorPickerAlpha />
                    </ColorPicker>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] uppercase font-semibold text-zinc-400">
                  Mesh Gradients
                </span>
                <div className="flex gap-2">
                  {customColors.map((color, index) => (
                    <Popover key={index}>
                      <PopoverTrigger className="flex items-center justify-center p-1.5 border rounded-md bg-white dark:bg-zinc-900 cursor-pointer shadow-xs">
                        <span
                          className="size-4 rounded-full border border-black/10 dark:border-white/10"
                          style={{ backgroundColor: color }}
                        />
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-4">
                        <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-2">
                          Mesh Color {index + 1}
                        </div>
                        <ColorPicker
                          value={color}
                          onChange={(val) => setCustomColorAtIndex(index, val)}
                          className="h-auto w-full gap-3"
                        >
                          <ColorPickerSelection className="h-32 rounded-md border border-zinc-200 dark:border-zinc-800" />
                          <ColorPickerHue />
                          <ColorPickerAlpha />
                        </ColorPicker>
                      </PopoverContent>
                    </Popover>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Real-time Config Panel (DialKit) */}
        <div className="grid grid-cols-2 gap-4 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30 font-sans">
          <div className="col-span-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">
            Real-time Config Kit (Props)
          </div>
          <DialKitSlider
            label="Glow Intensity"
            min={0.2}
            max={2.0}
            step={0.1}
            value={intensity}
            onChange={setIntensity}
          />
          <DialKitSlider
            label="Edge Sensitivity"
            min={10}
            max={80}
            step={2}
            value={edgeSensitivity}
            onChange={setEdgeSensitivity}
          />
          <DialKitSlider
            label="Border Radius"
            min={8}
            max={40}
            step={1}
            value={borderRadius}
            onChange={setBorderRadius}
            suffix="px"
          />
          <DialKitSlider
            label="Glow Radius"
            min={20}
            max={80}
            step={5}
            value={glowRadius}
            onChange={setGlowRadius}
            suffix="px"
          />
          <div className="col-span-2">
            <DialKitSlider
              label="Conic Spread Angle"
              min={10}
              max={60}
              step={1}
              value={coneSpread}
              onChange={setConeSpread}
              suffix="°"
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between w-full gap-4 mt-1 border-t border-zinc-100 dark:border-zinc-900 pt-4">
          <button
            onClick={() => setKey((k) => k + 1)}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-md border border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900 transition-all shadow-xs cursor-pointer active:scale-95"
          >
            ⚡ Trigger Sweep Animation
          </button>
        </div>
      </div>
    );
  },
  'spotlight-card': function SpotlightCardDemo() {
    return (
      <div className="grid gap-6 sm:grid-cols-3 w-full max-w-3xl">
        <SpotlightCard className="p-6">
          <div className="size-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200/60 dark:border-zinc-800/80">
            ✨
          </div>
          <h4 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-50">
            Pure Simplicity
          </h4>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Minimalist aesthetics inspired by Japanese design. Clean,
            light-weight, and developer-friendly.
          </p>
        </SpotlightCard>

        <SpotlightCard
          className="p-6"
          spotlightColor="rgba(168, 85, 247, 0.12)"
        >
          <div className="size-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-650 dark:text-purple-400">
            🔮
          </div>
          <h4 className="mt-4 font-semibold text-purple-650 dark:text-purple-450">
            Indigo Accent
          </h4>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Customizable spotlight gradients. Override default options to match
            your product colors.
          </p>
        </SpotlightCard>

        <SpotlightCard className="p-6">
          <div className="size-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200/60 dark:border-zinc-800/80">
            🚀
          </div>
          <h4 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-50">
            Zero Re-renders
          </h4>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Tracks cursor position via direct CSS variable mutations, bypassing
            component updates.
          </p>
        </SpotlightCard>
      </div>
    );
  },
  'three-d-card': function ThreeDCardDemo() {
    const [translateZTitle, setTranslateZTitle] = React.useState(50);
    const [translateZDesc, setTranslateZDesc] = React.useState(30);
    const [translateZImage, setTranslateZImage] = React.useState(80);
    const [translateZSpecs, setTranslateZSpecs] = React.useState(45);
    const [translateZButton, setTranslateZButton] = React.useState(60);
    const [tiltSensitivity, setTiltSensitivity] = React.useState(25);
    const [sheenOpacity, setSheenOpacity] = React.useState(0.4);
    const [borderRadius, setBorderRadius] = React.useState(24);
    const [glareBlur, setGlareBlur] = React.useState(16);

    return (
      <div className="flex flex-col items-center gap-8 w-full max-w-sm">
        {/* Modern, minimal, and "lit" 3D Card Container */}
        <CardContainer
          containerClassName="py-2 w-full"
          tiltSensitivity={tiltSensitivity}
        >
          <CardBody
            style={{ borderRadius: `${borderRadius}px` }}
            className="group relative h-auto w-full border border-zinc-200/60 dark:border-zinc-800/80 bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300"
          >
            {/* Polished inner chamfered border highlight */}
            <div className="absolute inset-0 rounded-[inherit] border border-white/20 dark:border-white/5 pointer-events-none z-20" />

            {/* Specular linear sheen sweep reflection (sharp light reflection) */}
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 mix-blend-overlay">
              <div
                className="absolute -inset-[50%] transition-transform duration-75 ease-out"
                style={{
                  background: `linear-gradient(115deg, transparent 20%, rgba(255,255,255,0) 30%, rgba(56,189,248,${sheenOpacity * 0.15}) 40%, rgba(255,255,255,${sheenOpacity * 0.95}) 50%, rgba(244,114,182,${sheenOpacity * 0.15}) 60%, rgba(255,255,255,0) 70%, transparent 80%)`,
                  transform: `translateX(calc(var(--mouse-x-pct, 50%) * 2.4 - 120%)) translateY(calc(var(--mouse-y-pct, 50%) * 2.4 - 120%)) rotate(25deg)`,
                  filter: glareBlur ? `blur(${glareBlur}px)` : 'none',
                }}
              />
            </div>

            {/* Broad soft ambient highlight spotlight */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[inherit] z-10 mix-blend-overlay"
              style={{
                background: `radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, ${sheenOpacity * 0.25}), transparent 80%)`,
                filter: glareBlur
                  ? `blur(${Math.round(glareBlur * 1.5)}px)`
                  : 'none',
              }}
            />

            <CardItem
              translateZ={35}
              className="absolute top-6 right-6 text-[9px] font-semibold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/80"
            >
              Limited Concept
            </CardItem>

            <CardItem
              translateZ={translateZTitle}
              className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight"
            >
              Zen Artisan Keycaps
            </CardItem>

            <CardItem
              translateZ={translateZDesc}
              className="mt-1 text-xs text-zinc-500 dark:text-zinc-400"
            >
              Frosted obsidian design featuring spring mechanical actions.
            </CardItem>

            {/* Float Shadow Cast effect helper */}
            <div className="relative w-full mt-5">
              <CardItem
                translateZ={translateZImage}
                className="w-full overflow-hidden rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 aspect-video shadow-2xl relative z-10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/3d-card.png"
                  alt="Zen Artisan Card visual"
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </CardItem>
              {/* Dynamic shadow that floats underneath matching image translateZ, wrapped in CardItem to auto-align on hover-exit */}
              <CardItem
                translateZ={Math.round(translateZImage * 0.35)}
                className="absolute inset-0 size-full rounded-xl bg-black/15 dark:bg-black/60 blur-lg -z-10 w-full"
              />
            </div>

            {/* Specs Grid */}
            <CardItem
              translateZ={translateZSpecs}
              className="grid grid-cols-3 gap-2.5 mt-5 w-full"
            >
              <div className="flex flex-col p-2.5 rounded-lg border border-zinc-200/50 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-900/40">
                <span className="text-[8px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  Profile
                </span>
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-250 font-mono mt-0.5">
                  Cherry MX
                </span>
              </div>
              <div className="flex flex-col p-2.5 rounded-lg border border-zinc-200/50 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-900/40">
                <span className="text-[8px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  Material
                </span>
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-250 font-mono mt-0.5">
                  Obsidian PBT
                </span>
              </div>
              <div className="flex flex-col p-2.5 rounded-lg border border-zinc-200/50 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-900/40">
                <span className="text-[8px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  Weight
                </span>
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-250 font-mono mt-0.5">
                  145g Set
                </span>
              </div>
            </CardItem>

            <div className="flex items-center justify-between mt-6">
              <CardItem
                translateZ={40}
                className="text-base font-bold text-zinc-900 dark:text-white font-mono"
              >
                $189.00
              </CardItem>
              <CardItem
                translateZ={translateZButton}
                as="button"
                className="rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-4 py-2 text-xs font-bold transition-all hover:bg-zinc-800 dark:hover:bg-zinc-200 cursor-pointer shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-650"
              >
                Acquire Pro
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>

        {/* Real-time Config Panel (DialKit) */}
        <div className="grid grid-cols-2 gap-4 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="col-span-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">
            Real-time Config Kit (Props)
          </div>
          <DialKitSlider
            label="Image Lift (Z)"
            min={20}
            max={120}
            step={5}
            value={translateZImage}
            onChange={setTranslateZImage}
            suffix="px"
          />
          <DialKitSlider
            label="Specs Lift (Z)"
            min={10}
            max={85}
            step={5}
            value={translateZSpecs}
            onChange={setTranslateZSpecs}
            suffix="px"
          />
          <DialKitSlider
            label="Button Lift (Z)"
            min={10}
            max={80}
            step={5}
            value={translateZButton}
            onChange={setTranslateZButton}
            suffix="px"
          />
          <DialKitSlider
            label="Title Lift (Z)"
            min={10}
            max={80}
            step={5}
            value={translateZTitle}
            onChange={setTranslateZTitle}
            suffix="px"
          />
          <DialKitSlider
            label="Desc Lift (Z)"
            min={10}
            max={60}
            step={5}
            value={translateZDesc}
            onChange={setTranslateZDesc}
            suffix="px"
          />
          <DialKitSlider
            label="Tilt Sensitivity"
            min={10}
            max={60}
            step={1}
            value={tiltSensitivity}
            onChange={setTiltSensitivity}
          />

          <div className="col-span-2 border-t border-zinc-100 dark:border-zinc-900 pt-3 mt-1 grid grid-cols-2 gap-4">
            <DialKitSlider
              label="Sheen Opacity"
              min={0.0}
              max={1.0}
              step={0.05}
              value={sheenOpacity}
              onChange={setSheenOpacity}
            />
            <DialKitSlider
              label="Glare Blur"
              min={0}
              max={40}
              step={1}
              value={glareBlur}
              onChange={setGlareBlur}
              suffix="px"
            />
            <div className="col-span-2">
              <DialKitSlider
                label="Card Border Radius"
                min={8}
                max={36}
                step={1}
                value={borderRadius}
                onChange={setBorderRadius}
                suffix="px"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
  'interactive-card': function InteractiveCardDemo() {
    const [key, setKey] = React.useState(0);
    const [intensity, setIntensity] = React.useState(1.0);
    const [spotlightSize, setSpotlightSize] = React.useState(300);
    const [borderRadius, setBorderRadius] = React.useState(24);
    const [glowRadius, setGlowRadius] = React.useState(40);

    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        <InteractiveCard
          key={`${key}-${intensity}-${spotlightSize}-${borderRadius}-${glowRadius}`}
          animated={true}
          glowIntensity={intensity}
          spotlightSize={spotlightSize}
          borderRadius={borderRadius}
          glowRadius={glowRadius}
          className="w-full"
          glowColor="320 80 60"
          spotlightColor="rgba(236, 72, 153, 0.15)"
          colors={['#f472b6', '#ec4899', '#8b5cf6']}
        >
          <CardBody className="relative h-auto w-full p-6 text-zinc-150 flex flex-col justify-between">
            {/* Ambient backdrop glow circle inside */}
            <div className="absolute inset-0 w-full h-full -z-10 rounded-[inherit] overflow-hidden pointer-events-none opacity-40">
              <div className="absolute bottom-[-10%] left-[-10%] size-[55%] rounded-full bg-pink-600/10 blur-[50px]" />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <CardItem
                  translateZ={50}
                  className="text-xs font-semibold uppercase tracking-wider text-pink-400 px-2 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/20"
                >
                  Supreme Effect
                </CardItem>
                <CardItem
                  translateZ={30}
                  className="text-zinc-500 text-xs font-mono"
                >
                  All-in-One
                </CardItem>
              </div>

              <CardItem
                translateZ={60}
                className="mt-6 text-2xl font-bold tracking-tight text-white"
              >
                Zen Interaction
              </CardItem>

              <CardItem
                translateZ={40}
                className="mt-2 text-xs text-zinc-400 leading-relaxed"
              >
                Moves in 3D perspective, tracks cursor coordinates via
                spotlight, and glows along the conic mesh gradient edges.
              </CardItem>
            </div>

            <div className="flex items-center justify-between mt-8">
              <CardItem
                translateZ={45}
                className="text-xs font-semibold text-zinc-300 font-mono"
              >
                Interactive Preview
              </CardItem>
              <CardItem
                translateZ={90}
                as="button"
                onClick={() => setKey((k) => k + 1)}
                className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-colors cursor-pointer border border-transparent shadow-md active:scale-95"
              >
                Replay Sweep
              </CardItem>
            </div>
          </CardBody>
        </InteractiveCard>

        {/* Real-time Config Panel (DialKit) */}
        <div className="grid grid-cols-2 gap-4 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="col-span-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 font-sans">
            Real-time Config Kit (Props)
          </div>
          <DialKitSlider
            label="Glow Intensity"
            min={0.2}
            max={2.0}
            step={0.1}
            value={intensity}
            onChange={setIntensity}
          />
          <DialKitSlider
            label="Spotlight Radius"
            min={150}
            max={450}
            step={10}
            value={spotlightSize}
            onChange={setSpotlightSize}
            suffix="px"
          />
          <DialKitSlider
            label="Border Radius"
            min={12}
            max={36}
            step={1}
            value={borderRadius}
            onChange={setBorderRadius}
            suffix="px"
          />
          <DialKitSlider
            label="Glow Radius"
            min={20}
            max={80}
            step={5}
            value={glowRadius}
            onChange={setGlowRadius}
            suffix="px"
          />
        </div>
      </div>
    );
  },
  'liquid-metal-card': function LiquidMetalCardDemo() {
    const [repetition, setRepetition] = React.useState(6);
    const [softness, setSoftness] = React.useState(0.8);
    const [distortion, setDistortion] = React.useState(0.4);
    const [speed, setSpeed] = React.useState(1.0);
    const [scale, setScale] = React.useState(0.6);
    const [colorTint, setColorTint] = React.useState('#2c5d72');
    const [image, setImage] = React.useState('/Kansologo.png');
    const [theme, setTheme] = React.useState<
      | 'default'
      | 'gold'
      | 'cyberpunk'
      | 'emerald'
      | 'amethyst'
      | 'chrome'
      | 'custom'
    >('default');

    const handleThemeChange = (
      t:
        | 'default'
        | 'gold'
        | 'cyberpunk'
        | 'emerald'
        | 'amethyst'
        | 'chrome'
        | 'custom'
    ) => {
      setTheme(t);
      if (t === 'default') {
        setColorTint('#2c5d72');
        setRepetition(6);
        setSoftness(0.8);
        setDistortion(0.4);
        setSpeed(1.0);
        setScale(0.6);
      } else if (t === 'gold') {
        setColorTint('#ffd700');
        setRepetition(5);
        setSoftness(0.6);
        setDistortion(0.5);
        setSpeed(0.8);
        setScale(0.55);
      } else if (t === 'cyberpunk') {
        setColorTint('#ff007f');
        setRepetition(10);
        setSoftness(0.8);
        setDistortion(0.7);
        setSpeed(1.2);
        setScale(0.65);
      } else if (t === 'emerald') {
        setColorTint('#10b981');
        setRepetition(7);
        setSoftness(0.5);
        setDistortion(0.6);
        setSpeed(1.1);
        setScale(0.6);
      } else if (t === 'amethyst') {
        setColorTint('#8a2be2');
        setRepetition(6);
        setSoftness(0.7);
        setDistortion(0.45);
        setSpeed(0.9);
        setScale(0.58);
      } else if (t === 'chrome') {
        setColorTint('#888888');
        setRepetition(8);
        setSoftness(0.4);
        setDistortion(0.8);
        setSpeed(1.5);
        setScale(0.7);
      }
    };

    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        {/* Component Display */}
        <LiquidMetalCard
          title="Minimal Shader Card"
          subtitle={
            theme === 'custom'
              ? 'Custom Preset'
              : `${theme.charAt(0).toUpperCase() + theme.slice(1)} Mode`
          }
          description="Move your cursor and interact with the real-time liquid metal physics. Drag or hover to warp the liquid surface mask dynamically."
          desktopShaderProps={{
            repetition,
            softness,
            distortion,
            speed,
            scale,
            colorTint,
            image,
          }}
          className="w-full shadow-lg"
        />

        {/* Theme presets row */}
        <div className="flex flex-col gap-3 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
            Shader Theme Presets
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(
              [
                'default',
                'gold',
                'cyberpunk',
                'emerald',
                'amethyst',
                'chrome',
                'custom',
              ] as const
            ).map((t) => (
              <button
                key={t}
                onClick={() => handleThemeChange(t)}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-md border transition-all cursor-pointer capitalize',
                  theme === t
                    ? 'border-zinc-350 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 shadow-xs'
                    : 'border-transparent text-zinc-500 hover:text-zinc-850 dark:text-zinc-400 dark:hover:text-zinc-200'
                )}
              >
                {t !== 'custom' && t !== 'default' && (
                  <span
                    className="size-2 rounded-full shrink-0 border border-black/10 dark:border-white/10"
                    style={{
                      backgroundColor:
                        t === 'gold'
                          ? '#ffd700'
                          : t === 'cyberpunk'
                            ? '#ff007f'
                            : t === 'emerald'
                              ? '#10b981'
                              : t === 'amethyst'
                                ? '#8a2be2'
                                : t === 'chrome'
                                  ? '#888888'
                                  : undefined,
                    }}
                  />
                )}
                {t === 'custom' ? '🎨 Custom Color' : t}
              </button>
            ))}
          </div>

          {(theme === 'custom' || theme === 'default') && (
            <div className="flex items-center gap-3 mt-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
              <span className="text-xs text-zinc-400 font-sans">
                Color Tint:
              </span>
              <Popover>
                <PopoverTrigger className="flex items-center gap-2 px-2.5 py-1.5 text-xs border rounded-md bg-white dark:bg-zinc-950 cursor-pointer shadow-xs border-zinc-200 dark:border-zinc-800">
                  <span
                    className="size-3.5 rounded-full border border-black/10 dark:border-white/10 shrink-0"
                    style={{ backgroundColor: colorTint }}
                  />
                  <span className="font-mono text-[10px] uppercase text-zinc-500">
                    {colorTint}
                  </span>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4">
                  <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-2">
                    Custom Color Tint
                  </div>
                  <ColorPicker
                    value={colorTint}
                    onChange={(val) => {
                      setColorTint(val);
                      setTheme('custom');
                    }}
                    className="h-auto w-full gap-3"
                  >
                    <ColorPickerSelection className="h-32 rounded-md border border-zinc-200 dark:border-zinc-800" />
                    <ColorPickerHue />
                    <ColorPickerAlpha />
                  </ColorPicker>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        {/* Shader texture image selection */}
        <div className="flex flex-col gap-3 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
            Shader Texture Image
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-wrap gap-1.5">
              {[
                { name: 'Kanso', value: '/Kansologo.png' },
                { name: 'Next.js', value: '/next.svg' },
                { name: 'Vercel', value: '/vercel.svg' },
                { name: 'Globe', value: '/globe.svg' },
                { name: 'Window', value: '/window.svg' },
                { name: 'File', value: '/file.svg' },
              ].map((img) => (
                <button
                  key={img.value}
                  onClick={() => {
                    setImage(img.value);
                    setTheme('custom');
                  }}
                  className={cn(
                    'px-2.5 py-1 text-[10px] font-semibold rounded-md border transition-all cursor-pointer',
                    image === img.value
                      ? 'border-zinc-350 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 shadow-xs'
                      : 'border-transparent text-zinc-500 hover:text-zinc-850 dark:text-zinc-400 dark:hover:text-zinc-200'
                  )}
                >
                  {img.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-sans font-semibold shrink-0 uppercase tracking-wide">
                Custom URL:
              </span>
              <input
                type="text"
                placeholder="Paste texture image URL..."
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                  setTheme('custom');
                }}
                className="flex-1 text-xs border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-2 py-1 rounded-md text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </div>
          </div>
        </div>

        {/* Real-time Config Panel (DialKit) */}
        <div className="grid grid-cols-2 gap-4 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="col-span-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 font-sans">
            Fine-tune Shader Sliders (Props)
          </div>
          <DialKitSlider
            label="Repetition"
            min={1}
            max={15}
            step={1}
            value={repetition}
            onChange={(val) => {
              setRepetition(val);
              setTheme('custom');
            }}
          />
          <DialKitSlider
            label="Softness"
            min={0.1}
            max={2.0}
            step={0.1}
            value={softness}
            onChange={(val) => {
              setSoftness(val);
              setTheme('custom');
            }}
          />
          <DialKitSlider
            label="Distortion"
            min={0.1}
            max={1.5}
            step={0.05}
            value={distortion}
            onChange={(val) => {
              setDistortion(val);
              setTheme('custom');
            }}
          />
          <DialKitSlider
            label="Speed"
            min={0.1}
            max={3.0}
            step={0.1}
            value={speed}
            onChange={(val) => {
              setSpeed(val);
              setTheme('custom');
            }}
          />
          <DialKitSlider
            label="Scale"
            min={0.2}
            max={1.5}
            step={0.05}
            value={scale}
            onChange={(val) => {
              setScale(val);
              setTheme('custom');
            }}
          />
        </div>
      </div>
    );
  },
  'halftone-image': function HalftoneImageDemo() {
    const [dotSpacing, setDotSpacing] = React.useState<number>(8);
    const [contrast, setContrast] = React.useState<number>(1.2);
    const [brightness, setBrightness] = React.useState<number>(1.0);
    const [distortion, setDistortion] = React.useState<number>(8);
    const [interactive, setInteractive] = React.useState<boolean>(true);
    const [inkColor, setInkColor] = React.useState<string>('currentColor');
    const [useMulticolor, setUseMulticolor] = React.useState<boolean>(false);
    const colorsList = [
      'currentColor',
      '#3b82f6',
      '#10b981',
      '#f43f5e',
      '#f59e0b',
      '#a855f7',
    ];
    const multiColors = ['#3b82f6', '#10b981', '#f43f5e', '#f59e0b', '#a855f7'];

    return (
      <div className="flex flex-col gap-8 w-full max-w-md items-center">
        <div className="w-[300px] h-[300px] rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-950 flex items-center justify-center">
          <HalftoneImage
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400"
            allowUpload={true}
            dotSpacing={dotSpacing}
            contrast={contrast}
            brightness={brightness}
            distortionStrength={distortion}
            interactive={interactive}
            inkColor={useMulticolor ? undefined : inkColor}
            colors={useMulticolor ? multiColors : undefined}
            alt="Halftone portrait preview"
          />
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-2 gap-4 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="col-span-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 font-sans">
            Adjust Halftone Image Props
          </div>
          <DialKitSlider
            label="Dot Spacing"
            min={4}
            max={16}
            step={1}
            value={dotSpacing}
            onChange={setDotSpacing}
            suffix="px"
          />
          <DialKitSlider
            label="Contrast"
            min={0.5}
            max={2.5}
            step={0.1}
            value={contrast}
            onChange={setContrast}
          />
          <DialKitSlider
            label="Brightness"
            min={0.5}
            max={2.0}
            step={0.1}
            value={brightness}
            onChange={setBrightness}
          />
          <DialKitSlider
            label="Warp Strength"
            min={0}
            max={20}
            step={1}
            value={distortion}
            onChange={setDistortion}
            suffix="px"
          />
          <div className="col-span-2 flex items-center justify-between text-xs pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
            <span className="text-zinc-500 font-medium">
              Interactive Hover Distortion
            </span>
            <input
              type="checkbox"
              checked={interactive}
              onChange={(e) => setInteractive(e.target.checked)}
              className="accent-purple-500 cursor-pointer"
            />
          </div>

          <div className="col-span-2 flex items-center justify-between text-xs pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
            <span className="text-zinc-500 font-medium">
              Enable Multi-Color Particles
            </span>
            <input
              type="checkbox"
              checked={useMulticolor}
              onChange={(e) => setUseMulticolor(e.target.checked)}
              className="accent-purple-500 cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1.5 col-span-2 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 opacity-80">
            <span
              className={cn(
                'text-[10px] font-semibold uppercase tracking-wider',
                useMulticolor
                  ? 'text-zinc-350 dark:text-zinc-600'
                  : 'text-zinc-400'
              )}
            >
              Ink Color {useMulticolor && '(Single color disabled)'}
            </span>
            <div className="flex gap-2">
              {colorsList.map((c) => (
                <button
                  key={c}
                  disabled={useMulticolor}
                  onClick={() => setInkColor(c)}
                  className={cn(
                    'size-5 rounded-full border cursor-pointer transition-all hover:scale-105',
                    c === 'currentColor'
                      ? 'bg-zinc-900 dark:bg-zinc-50 border-zinc-300'
                      : c === '#3b82f6'
                        ? 'bg-blue-500'
                        : c === '#10b981'
                          ? 'bg-emerald-500'
                          : c === '#f43f5e'
                            ? 'bg-rose-500'
                            : c === '#f59e0b'
                              ? 'bg-amber-500'
                              : 'bg-purple-500',
                    !useMulticolor && inkColor === c
                      ? 'border-zinc-900 dark:border-white ring-2 ring-zinc-900/10 dark:ring-white/10 scale-105'
                      : 'border-transparent',
                    useMulticolor &&
                      'opacity-40 cursor-not-allowed hover:scale-100'
                  )}
                  title={c === 'currentColor' ? 'Theme Default' : c}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
  'halftone-grid': function HalftoneGridDemo() {
    const [spacing, setSpacing] = React.useState<number>(14);
    const [radius, setRadius] = React.useState<number>(1.5);
    const [bulge, setBulge] = React.useState<number>(67);
    const [cursorRad, setCursorRad] = React.useState<number>(500);
    const [sparkle, setSparkle] = React.useState<boolean>(false);
    const [colorTheme, setColorTheme] = React.useState<
      'purple' | 'cyan' | 'emerald' | 'rose' | 'amber'
    >('purple');
    const [useMulticolor, setUseMulticolor] = React.useState<boolean>(false);

    const themes = {
      purple: {
        from: 'rgba(168, 85, 247, 0.35)',
        to: 'rgba(180, 151, 207, 0.25)',
        glow: '#120F17',
        badge: 'bg-purple-500',
        colors: ['#a855f7', '#c084fc', '#e9d5ff', '#c084fc'],
      },
      cyan: {
        from: 'rgba(6, 182, 212, 0.35)',
        to: 'rgba(34, 211, 238, 0.25)',
        glow: '#081E24',
        badge: 'bg-cyan-500',
        colors: ['#06b6d4', '#22d3ee', '#67e8f9', '#22d3ee'],
      },
      emerald: {
        from: 'rgba(16, 185, 129, 0.35)',
        to: 'rgba(52, 211, 153, 0.25)',
        glow: '#051F14',
        badge: 'bg-emerald-500',
        colors: ['#10b981', '#34d399', '#6ee7b7', '#34d399'],
      },
      rose: {
        from: 'rgba(244, 63, 94, 0.35)',
        to: 'rgba(251, 113, 133, 0.25)',
        glow: '#240509',
        badge: 'bg-rose-500',
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#fb7185'],
      },
      amber: {
        from: 'rgba(245, 158, 11, 0.35)',
        to: 'rgba(251, 191, 36, 0.25)',
        glow: '#241805',
        badge: 'bg-amber-500',
        colors: ['#f59e0b', '#fbbf24', '#fcd34d', '#fbbf24'],
      },
    };

    return (
      <div className="flex flex-col gap-8 w-full max-w-lg items-center">
        <div className="w-full h-[300px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/20 rounded-xl relative overflow-hidden flex items-center justify-center text-center shadow-xs">
          <HalftoneGrid
            dotRadius={radius}
            dotSpacing={spacing}
            cursorRadius={cursorRad}
            bulgeStrength={bulge}
            sparkle={sparkle}
            gradientFrom={themes[colorTheme].from}
            gradientTo={themes[colorTheme].to}
            glowColor={themes[colorTheme].glow}
            colors={useMulticolor ? themes[colorTheme].colors : undefined}
            className="absolute inset-0"
          />
          <div className="relative z-20 max-w-xs px-4 bg-white/40 dark:bg-black/40 backdrop-blur-xs py-4 rounded-xl border border-white/10 shadow-sm animate-fade-in">
            <h4 className="text-lg font-bold text-zinc-950 dark:text-white mb-2">
              Interactive Ripple
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Move your mouse over the background to see the dot matrix grid
              expand and warp dynamically.
            </p>
          </div>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-2 gap-4 w-full p-5 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="col-span-2 flex flex-col gap-2">
            <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest font-sans">
              Adjust Halftone Grid Props
            </div>

            {/* Color Swatches */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-zinc-500 font-medium mr-2">
                Color Theme:
              </span>
              {(Object.keys(themes) as Array<keyof typeof themes>).map(
                (tKey) => (
                  <button
                    key={tKey}
                    onClick={() => setColorTheme(tKey)}
                    className={cn(
                      'size-5 rounded-full border cursor-pointer transition-all',
                      themes[tKey].badge,
                      colorTheme === tKey
                        ? 'border-zinc-900 dark:border-white ring-2 ring-zinc-900/10 dark:ring-white/10 scale-105'
                        : 'border-transparent'
                    )}
                  />
                )
              )}
            </div>
          </div>

          <DialKitSlider
            label="Dot Spacing"
            min={8}
            max={25}
            step={1}
            value={spacing}
            onChange={setSpacing}
            suffix="px"
          />
          <DialKitSlider
            label="Dot Radius"
            min={1.0}
            max={3.0}
            step={0.5}
            value={radius}
            onChange={setRadius}
            suffix="px"
          />
          <DialKitSlider
            label="Bulge Strength"
            min={20}
            max={120}
            step={5}
            value={bulge}
            onChange={setBulge}
            suffix="px"
          />
          <DialKitSlider
            label="Cursor Radius"
            min={200}
            max={800}
            step={50}
            value={cursorRad}
            onChange={setCursorRad}
            suffix="px"
          />

          <div className="col-span-2 flex items-center justify-between pt-2 border-t border-zinc-150 dark:border-zinc-800">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              Enable Multi-Color Particles
            </span>
            <input
              type="checkbox"
              checked={useMulticolor}
              onChange={(e) => setUseMulticolor(e.target.checked)}
              className="accent-purple-500 cursor-pointer"
            />
          </div>

          <div className="col-span-2 flex items-center justify-between pt-2 border-t border-zinc-150 dark:border-zinc-800">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              Sparkling Effect
            </span>
            <input
              type="checkbox"
              checked={sparkle}
              onChange={(e) => setSparkle(e.target.checked)}
              className="accent-purple-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    );
  },
  'magic-rings': function MagicRingsDemo() {
    const [color, setColor] = React.useState('#fc42ff');
    const [colorTwo, setColorTwo] = React.useState('#42fcff');
    const [ringCount, setRingCount] = React.useState(6);
    const [speed, setSpeed] = React.useState(1.0);
    const [lineThickness, setLineThickness] = React.useState(2.0);
    const [noiseAmount, setNoiseAmount] = React.useState(0.1);

    return (
      <div className="flex flex-col gap-8 w-full max-w-lg items-center">
        <div className="w-full h-[320px] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 relative shadow-md">
          <MagicRings
            color={color}
            colorTwo={colorTwo}
            ringCount={ringCount}
            speed={speed}
            lineThickness={lineThickness}
            noiseAmount={noiseAmount}
            followMouse={true}
            clickBurst={true}
          />
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <span className="text-[10px] uppercase font-bold text-white/50 tracking-widest font-mono">
              Hover & Click Interactive Shader
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-4 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="col-span-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 font-sans">
            Adjust Shader Uniform Props
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              Accent Color
            </span>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-8 rounded border border-zinc-200 dark:border-zinc-800 bg-transparent p-0 cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              Gradient Color
            </span>
            <input
              type="color"
              value={colorTwo}
              onChange={(e) => setColorTwo(e.target.value)}
              className="w-full h-8 rounded border border-zinc-200 dark:border-zinc-800 bg-transparent p-0 cursor-pointer"
            />
          </div>
          <DialKitSlider
            label="Ring Count"
            min={1}
            max={10}
            step={1}
            value={ringCount}
            onChange={setRingCount}
          />
          <DialKitSlider
            label="Wave Speed"
            min={0.1}
            max={3.0}
            step={0.1}
            value={speed}
            onChange={setSpeed}
          />
          <DialKitSlider
            label="Line Thickness"
            min={0.5}
            max={5.0}
            step={0.5}
            value={lineThickness}
            onChange={setLineThickness}
          />
          <DialKitSlider
            label="Noise Grain"
            min={0.0}
            max={0.5}
            step={0.05}
            value={noiseAmount}
            onChange={setNoiseAmount}
          />
        </div>
      </div>
    );
  },
  antigravity: function AntigravityDemo() {
    const [count, setCount] = React.useState(250);
    const [magnetRadius, setMagnetRadius] = React.useState(10);
    const [ringRadius, setRingRadius] = React.useState(8);
    const [particleSize, setParticleSize] = React.useState(2.0);
    const [particleShape, setParticleShape] = React.useState<
      'capsule' | 'sphere' | 'box' | 'tetrahedron'
    >('capsule');
    const [color, setColor] = React.useState<string>('#FF9FFC');
    const [useMulticolor, setUseMulticolor] = React.useState<boolean>(true);
    const colorsList = [
      '#FF9FFC',
      '#3b82f6',
      '#10b981',
      '#f43f5e',
      '#f59e0b',
      '#a855f7',
    ];

    return (
      <div className="flex flex-col gap-8 w-full max-w-lg items-center">
        <div className="w-full h-[320px] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 relative shadow-md">
          <Antigravity
            count={count}
            magnetRadius={magnetRadius}
            ringRadius={ringRadius}
            particleSize={particleSize}
            particleShape={particleShape}
            color={useMulticolor ? undefined : color}
            colors={useMulticolor ? colorsList : undefined}
            autoAnimate={true}
          />
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <span className="text-[10px] uppercase font-bold text-white/50 tracking-widest font-mono">
              React Three Fiber Instanced Field
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-4 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="col-span-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 font-sans">
            Adjust Particle Instancing Props
          </div>
          <div className="flex flex-col gap-1.5 w-full col-span-2">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              Particle Geometry
            </span>
            <div className="grid grid-cols-4 gap-2">
              {(['capsule', 'sphere', 'box', 'tetrahedron'] as const).map(
                (shape) => (
                  <button
                    key={shape}
                    onClick={() => setParticleShape(shape)}
                    className={cn(
                      'text-[10px] font-semibold uppercase tracking-wider py-1.5 border rounded-lg transition-colors cursor-pointer',
                      particleShape === shape
                        ? 'bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-900'
                        : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900'
                    )}
                  >
                    {shape}
                  </button>
                )
              )}
            </div>
          </div>
          <DialKitSlider
            label="Particles Count"
            min={100}
            max={500}
            step={50}
            value={count}
            onChange={setCount}
          />
          <DialKitSlider
            label="Magnet Radius"
            min={4}
            max={20}
            step={1}
            value={magnetRadius}
            onChange={setMagnetRadius}
          />
          <DialKitSlider
            label="Orbit Radius"
            min={3}
            max={15}
            step={1}
            value={ringRadius}
            onChange={setRingRadius}
          />
          <DialKitSlider
            label="Particle Scale"
            min={0.5}
            max={4.0}
            step={0.5}
            value={particleSize}
            onChange={setParticleSize}
          />

          <div className="col-span-2 flex items-center justify-between pt-2 border-t border-zinc-150 dark:border-zinc-800">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              Enable Multi-Color Particles
            </span>
            <input
              type="checkbox"
              checked={useMulticolor}
              onChange={(e) => setUseMulticolor(e.target.checked)}
              className="accent-purple-500 cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1.5 col-span-2 pt-3 border-t border-zinc-150 dark:border-zinc-800 opacity-80">
            <span
              className={cn(
                'text-[10px] font-semibold uppercase tracking-wider',
                useMulticolor
                  ? 'text-zinc-350 dark:text-zinc-655'
                  : 'text-zinc-400'
              )}
            >
              Particle Color {useMulticolor && '(Single color disabled)'}
            </span>
            <div className="flex gap-2">
              {colorsList.map((c) => (
                <button
                  key={c}
                  disabled={useMulticolor}
                  onClick={() => setColor(c)}
                  className={cn(
                    'size-5 rounded-full border cursor-pointer transition-all hover:scale-105',
                    c === '#FF9FFC'
                      ? 'bg-[#FF9FFC]'
                      : c === '#3b82f6'
                        ? 'bg-blue-500'
                        : c === '#10b981'
                          ? 'bg-emerald-500'
                          : c === '#f43f5e'
                            ? 'bg-rose-500'
                            : c === '#f59e0b'
                              ? 'bg-amber-500'
                              : 'bg-purple-500',
                    !useMulticolor && color === c
                      ? 'border-zinc-900 dark:border-white ring-2 ring-zinc-900/10 dark:ring-white/10 scale-105'
                      : 'border-transparent',
                    useMulticolor &&
                      'opacity-40 cursor-not-allowed hover:scale-100'
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
  'three-d-masonry-orbit': function ThreeDMasonryOrbitDemo() {
    const [variant, setVariant] = React.useState<'threejs' | 'gsap'>('threejs');
    const [columns, setColumns] = React.useState(14);
    const [rows, setRows] = React.useState(3);
    const [radius, setRadius] = React.useState(16);
    const [borderRadius, setBorderRadius] = React.useState(0.15);
    const [columnSpacing, setColumnSpacing] = React.useState(1.0);
    const [speed, setSpeed] = React.useState(0.002);
    const [density, setDensity] = React.useState(0.025);
    const [hideUI, setHideUI] = React.useState(false);
    const [title, setTitle] = React.useState('Gallery');
    const [desc, setDesc] = React.useState('Drag to explore • Hover to focus');

    return (
      <div className="flex flex-col gap-6 w-full max-w-5xl  items-center">
        {/* Variant selection tabs */}
        <div className="flex rounded-md border border-zinc-200 dark:border-zinc-800 p-0.5 w-fit bg-zinc-100/50 dark:bg-zinc-950/40">
          <button
            onClick={() => setVariant('threejs')}
            className={cn(
              'px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer',
              variant === 'threejs'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
            )}
          >
            Three.js Cylindrical Grid
          </button>
          <button
            onClick={() => setVariant('gsap')}
            className={cn(
              'px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer',
              variant === 'gsap'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
            )}
          >
            GSAP Curved Ring Archive
          </button>
        </div>

        {variant === 'threejs' ? (
          <div className="flex flex-col gap-6 w-full max-w-5xl items-center">
            <div className="w-full  h-[500px] rounded-xl overflow-hidden border-3 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#09090b] relative shadow-md animate-fade-in">
              <ThreeDMasonryOrbit
                columns={columns}
                rows={rows}
                radius={radius}
                borderRadius={borderRadius}
                columnSpacing={columnSpacing}
                autoRotationSpeed={speed}
                fogDensity={density}
                hideUI={hideUI}
                titleText={title}
                descText={desc}
                height="100%"
              />
            </div>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-4 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
              <div className="col-span-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 font-sans">
                Adjust 3D Masonry Orbit Props
              </div>
              <DialKitSlider
                label="Columns"
                min={6}
                max={20}
                step={1}
                value={columns}
                onChange={setColumns}
              />
              <DialKitSlider
                label="Rows"
                min={1}
                max={5}
                step={1}
                value={rows}
                onChange={setRows}
              />
              <DialKitSlider
                label="Radius"
                min={10}
                max={25}
                step={1}
                value={radius}
                onChange={setRadius}
                suffix="px"
              />
              <DialKitSlider
                label="Border Radius"
                min={0.0}
                max={0.5}
                step={0.05}
                value={borderRadius}
                onChange={setBorderRadius}
              />
              <DialKitSlider
                label="Column Width/Spacing"
                min={0.4}
                max={2.0}
                step={0.1}
                value={columnSpacing}
                onChange={setColumnSpacing}
              />
              <DialKitSlider
                label="Rotation Speed"
                min={0}
                max={0.01}
                step={0.0005}
                value={speed}
                onChange={setSpeed}
              />
              <div className="col-span-2">
                <DialKitSlider
                  label="Fog Density"
                  min={0.0}
                  max={0.1}
                  step={0.005}
                  value={density}
                  onChange={setDensity}
                />
              </div>

              <div className="col-span-2 flex items-center justify-between pt-2 border-t border-zinc-150 dark:border-zinc-800">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Hide Overlay UI
                </span>
                <input
                  type="checkbox"
                  checked={hideUI}
                  onChange={(e) => setHideUI(e.target.checked)}
                  className="accent-purple-500 cursor-pointer"
                />
              </div>

              {!hideUI && (
                <>
                  <div className="flex flex-col gap-1.5 w-full col-span-2 pt-2 border-t border-zinc-150 dark:border-zinc-800">
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                      Title Text
                    </span>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full text-xs border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-2.5 py-1.5 rounded-md text-zinc-850 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 w-full col-span-2">
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                      Description Text
                    </span>
                    <input
                      type="text"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      className="w-full text-xs border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-2.5 py-1.5 rounded-md text-zinc-850 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-5xl h-[650px] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative shadow-md">
            <CurvedRingArchive embedded={true} />
          </div>
        )}
      </div>
    );
  },
  'three-d-carousel': function ThreeDCarouselDemo() {
    const [radius, setRadius] = React.useState(240);
    const [cardW, setCardW] = React.useState(180);
    const [cardH, setCardH] = React.useState(240);
    const [autoSpin, setAutoSpin] = React.useState(true);

    return (
      <div className="flex flex-col gap-8 w-full max-w-5xl items-center">
        <div className="w-full h-[500px] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950/5 dark:bg-zinc-950/40 relative shadow-md">
          <ThreeDCarousel
            radius={radius}
            cardW={cardW}
            cardH={cardH}
            autoSpin={autoSpin}
            className="size-full border-0 rounded-none bg-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full p-6 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="col-span-1 md:col-span-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1 font-sans">
            Adjust 3D Carousel Parameters
          </div>

          <div className="flex flex-col gap-5">
            <DialKitSlider
              label="Orbit Radius"
              min={150}
              max={400}
              step={10}
              value={radius}
              onChange={setRadius}
              suffix="px"
            />
            <DialKitSlider
              label="Card Width"
              min={120}
              max={250}
              step={10}
              value={cardW}
              onChange={setCardW}
              suffix="px"
            />
          </div>

          <div className="flex flex-col gap-5 justify-between">
            <DialKitSlider
              label="Card Height"
              min={160}
              max={320}
              step={10}
              value={cardH}
              onChange={setCardH}
              suffix="px"
            />

            <div className="flex items-center justify-between pt-2 border-t border-zinc-150 dark:border-zinc-800">
              <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                Enable Autospin When Idle
              </span>
              <input
                type="checkbox"
                checked={autoSpin}
                onChange={(e) => setAutoSpin(e.target.checked)}
                className="accent-indigo-600 cursor-pointer size-4"
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 text-[9px] text-zinc-400/85 dark:text-zinc-500/85 italic text-center font-mono mt-1 leading-normal border-t border-zinc-150 dark:border-zinc-800 pt-3">
            * Drag cards vertically or horizontally to spin with inertia. Move
            mouse up/down to tilt perspective. Keyboard Focus support: select
            container and use ArrowLeft/Right to manually step, Space to toggle
            Autospin.
          </div>
        </div>
      </div>
    );
  },
  'sphere-carousel': function SphereCarouselDemo() {
    const [radius, setRadius] = React.useState(200);
    const [cardSize, setCardSize] = React.useState(100);
    const [autoSpin, setAutoSpin] = React.useState(true);

    return (
      <div className="flex flex-col gap-8 w-full max-w-5xl items-center">
        <div className="w-full h-[550px] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950/5 dark:bg-zinc-950/40 relative shadow-md">
          <SphereCarousel
            radius={radius}
            cardSize={cardSize}
            autoSpin={autoSpin}
            className="size-full border-0 rounded-none bg-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full p-6 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="col-span-1 md:col-span-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1 font-sans">
            Adjust Sphere Carousel Parameters
          </div>

          <div className="flex flex-col gap-5">
            <DialKitSlider
              label="Sphere Radius"
              min={120}
              max={300}
              step={10}
              value={radius}
              onChange={setRadius}
              suffix="px"
            />
          </div>

          <div className="flex flex-col gap-5 justify-between">
            <DialKitSlider
              label="Card Dimension Size"
              min={60}
              max={150}
              step={5}
              value={cardSize}
              onChange={setCardSize}
              suffix="px"
            />

            <div className="flex items-center justify-between pt-2 border-t border-zinc-150 dark:border-zinc-800">
              <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                Enable Idle Autospin
              </span>
              <input
                type="checkbox"
                checked={autoSpin}
                onChange={(e) => setAutoSpin(e.target.checked)}
                className="accent-indigo-600 cursor-pointer size-4"
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 text-[9px] text-zinc-400/85 dark:text-zinc-500/85 italic text-center font-mono mt-1 leading-normal border-t border-zinc-150 dark:border-zinc-800 pt-3">
            * Drag the sphere in any direction (X or Y coordinates) to rotate.
            Release to spin with inertia. Keyboard Focus support: select
            container and use Arrow keys to steer, Space to toggle Autospin.
          </div>
        </div>
      </div>
    );
  },
  'three-d-photo-carousel': function ThreeDPhotoCarouselDemo() {
    const [spacing, setSpacing] = React.useState(1.0);
    const [borderRadius, setBorderRadius] = React.useState(12);
    const [cylinderWidth, setCylinderWidth] = React.useState(1800);
    const [speed, setSpeed] = React.useState(0.0); // auto-rotation speed
    const [hideUI, setHideUI] = React.useState(false);

    return (
      <div className="flex flex-col gap-8 w-full max-w-5xl items-center">
        <div className="w-full h-[500px] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950/5 dark:bg-zinc-950/40 relative shadow-md animate-fade-in">
          <ThreeDPhotoCarousel
            spacing={spacing}
            borderRadius={`${borderRadius}px`}
            cylinderWidth={cylinderWidth}
            autoRotationSpeed={speed}
            hideOverlayUI={hideUI}
            height="100%"
          />
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-4 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="col-span-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 font-sans">
            Adjust 3D Photo Carousel Props
          </div>
          <DialKitSlider
            label="Spacing (Column Distance)"
            min={0.5}
            max={2.0}
            step={0.1}
            value={spacing}
            onChange={setSpacing}
          />
          <DialKitSlider
            label="Border Radius"
            min={0}
            max={32}
            step={2}
            value={borderRadius}
            onChange={setBorderRadius}
            suffix="px"
          />
          <DialKitSlider
            label="Cylinder Width"
            min={800}
            max={2400}
            step={100}
            value={cylinderWidth}
            onChange={setCylinderWidth}
            suffix="px"
          />
          <DialKitSlider
            label="Auto Rotation Speed"
            min={0.0}
            max={0.2}
            step={0.02}
            value={speed}
            onChange={setSpeed}
          />

          <div className="col-span-2 flex items-center justify-between pt-2 border-t border-zinc-150 dark:border-zinc-800">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              Hide Close UI Hint
            </span>
            <input
              type="checkbox"
              checked={hideUI}
              onChange={(e) => setHideUI(e.target.checked)}
              className="accent-purple-500 cursor-pointer"
            />
          </div>
          <div className="col-span-2 text-[9px] text-zinc-400/85 dark:text-zinc-500/85 italic text-center font-mono mt-1 leading-normal">
            * Click a card to expand. Click background/press ESC to close. Focus
            container & press Left/Right arrow keys to spin.
          </div>
        </div>
      </div>
    );
  },
  'glow-card': function GlowCardDemo() {
    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-xl">
        <GlowCard className="w-full">
          {/* Card Title Header */}
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 text-blue-500"
            >
              <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
              <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
              <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
              <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 9v-2"></path>
              <path d="M12 17v-2"></path>
              <path d="M9 12H7"></path>
              <path d="M17 12h-2"></path>
            </svg>
            Real time location tracking
          </div>

          <h3 className="text-2xl font-bold text-white tracking-tight leading-snug">
            Advanced tracking system,
            <br />
            instantly locate all your assets.
          </h3>

          <div className="h-px bg-white/10 my-6 border-dashed border-t" />

          {/* Payments Section */}
          <div className="flex flex-col gap-1.5 mb-5">
            <h4 className="text-base font-semibold text-white">Payments</h4>
            <p className="text-xs text-zinc-450">Track your transactions</p>
          </div>

          {/* Filter Bar mock */}
          <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 rounded-lg px-4 py-2.5 mb-6 text-sm">
            <span className="text-zinc-300">Transaction</span>
            <span className="flex items-center gap-1.5 text-zinc-400 cursor-pointer hover:text-white transition-colors">
              Custom
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </div>

          {/* Table List mock */}
          <div className="flex flex-col text-sm">
            {/* Table Header */}
            <div className="grid grid-cols-[30px_1fr_1fr_1fr] pb-3 border-b border-white/5 text-zinc-500 font-medium text-xs">
              <div className="flex items-center">
                <span className="size-3.5 rounded-full border border-white/10" />
              </div>
              <div>Status</div>
              <div>Date</div>
              <div className="text-right">Amount</div>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-[30px_1fr_1fr_1fr] py-3.5 border-b border-white/[0.03] items-center">
              <div className="flex items-center">
                <span className="size-3.5 rounded-full border border-white/10" />
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-green-500" />
                <span className="text-zinc-200">Success</span>
              </div>
              <div className="text-zinc-400">May 15</div>
              <div className="text-right text-zinc-100 font-medium">
                $2,450.00
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-[30px_1fr_1fr_1fr] py-3.5 border-b border-white/[0.03] items-center">
              <div className="flex items-center">
                <span className="size-3.5 rounded-full border border-white/10" />
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-red-500" />
                <span className="text-zinc-200">Failed</span>
              </div>
              <div className="text-zinc-400">May 14</div>
              <div className="text-right text-zinc-100 font-medium">
                $950.00
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-[30px_1fr_1fr_1fr] py-3.5 items-center">
              <div className="flex items-center">
                <span className="size-3.5 rounded-full border border-blue-500/50 flex items-center justify-center">
                  <span className="size-1.5 rounded-full bg-blue-500" />
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-blue-500" />
                <span className="text-zinc-200">Processing</span>
              </div>
              <div className="text-zinc-400">orders@acme.com</div>
              <div className="text-right text-zinc-100 font-medium">
                $3,250.00
              </div>
            </div>
          </div>
        </GlowCard>
      </div>
    );
  },
};

/**
 * Get the demo component for a given registry component name.
 */
function ComponentDemo({ name }: { name: string }) {
  const Demo = demos[name];

  if (!Demo) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-zinc-400">
        No demo available for this component.
      </div>
    );
  }

  return <Demo />;
}

export { ComponentDemo, demos };
