'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BrowserLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The visual layout variant of the mock browser contents.
   * @default 'browser'
   */
  variant?: 'browser' | 'sidebar' | 'dashboard';
  /**
   * The color theme of the loading traces.
   * Can be one of the presets or any valid CSS color (hex, rgb, hsl).
   * @default 'cyan'
   */
  themeColor?:
    | 'indigo'
    | 'cyan'
    | 'emerald'
    | 'rose'
    | 'amber'
    | 'monochrome'
    | string;
  /**
   * Custom loading text displayed in the browser window header.
   * @default 'Loading...'
   */
  loadingText?: string;
  /**
   * Whether to show the background grid lines.
   * @default true
   */
  showGrid?: boolean;
  /**
   * Animation duration for the flow lines in seconds.
   * @default 5
   */
  flowDuration?: number;
  /**
   * Accent glow intensity multiplier (0 to 1).
   * @default 0.6
   */
  glowIntensity?: number;
}

const themeColorMap: Record<string, string> = {
  indigo: '#6366f1',
  cyan: '#00ccff',
  emerald: '#10b981',
  rose: '#f43f5e',
  amber: '#f59e0b',
  monochrome: 'currentColor',
};

function BrowserLoader({
  variant = 'browser',
  themeColor = 'cyan',
  loadingText = 'Loading...',
  showGrid = true,
  flowDuration = 5,
  glowIntensity = 0.6,
  className,
  ...props
}: BrowserLoaderProps) {
  // Resolve theme color to hex or CSS variable
  const resolvedColor = React.useMemo(() => {
    if (themeColor in themeColorMap) {
      return themeColorMap[themeColor];
    }
    return themeColor;
  }, [themeColor]);

  // Unique ID prefix for gradients to prevent collision if multiple loaders are rendered
  const idPrefix = React.useId().replace(/:/g, '');

  return (
    <div
      className={cn(
        'relative flex items-center justify-center w-full h-full min-h-[300px] overflow-hidden bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-xl border border-zinc-200 dark:border-zinc-900 transition-colors duration-300',
        className
      )}
      {...props}
    >
      {/* SVG Loader Content */}
      <svg
        viewBox="0 0 900 900"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full opacity-90 transition-opacity duration-300"
      >
        <defs>
          <linearGradient
            id={`${idPrefix}-traceGradient1`}
            x1={250}
            y1={120}
            x2={100}
            y2={200}
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0%"
              stopColor={
                resolvedColor === 'currentColor'
                  ? 'currentColor'
                  : resolvedColor
              }
              stopOpacity={1}
            />
            <stop
              offset="100%"
              stopColor={
                resolvedColor === 'currentColor'
                  ? 'currentColor'
                  : resolvedColor
              }
              stopOpacity={0.2}
            />
          </linearGradient>
          <linearGradient
            id={`${idPrefix}-traceGradient2`}
            x1={650}
            y1={120}
            x2={800}
            y2={300}
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0%"
              stopColor={
                resolvedColor === 'currentColor'
                  ? 'currentColor'
                  : resolvedColor
              }
              stopOpacity={1}
            />
            <stop
              offset="100%"
              stopColor={
                resolvedColor === 'currentColor'
                  ? 'currentColor'
                  : resolvedColor
              }
              stopOpacity={0.2}
            />
          </linearGradient>
          <linearGradient
            id={`${idPrefix}-traceGradient3`}
            x1={250}
            y1={380}
            x2={400}
            y2={400}
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0%"
              stopColor={
                resolvedColor === 'currentColor'
                  ? 'currentColor'
                  : resolvedColor
              }
              stopOpacity={1}
            />
            <stop
              offset="100%"
              stopColor={
                resolvedColor === 'currentColor'
                  ? 'currentColor'
                  : resolvedColor
              }
              stopOpacity={0.2}
            />
          </linearGradient>
          <linearGradient
            id={`${idPrefix}-traceGradient4`}
            x1={650}
            y1={120}
            x2={500}
            y2={100}
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0%"
              stopColor={
                resolvedColor === 'currentColor'
                  ? 'currentColor'
                  : resolvedColor
              }
              stopOpacity={1}
            />
            <stop
              offset="100%"
              stopColor={
                resolvedColor === 'currentColor'
                  ? 'currentColor'
                  : resolvedColor
              }
              stopOpacity={0.2}
            />
          </linearGradient>
        </defs>

        {/* Grid Background */}
        {showGrid && (
          <g
            id="grid"
            className="opacity-30 dark:opacity-40 transition-opacity duration-300"
          >
            {/* Vertical grid lines */}
            <line
              x1={0}
              y1={0}
              x2={0}
              y2="100%"
              className="stroke-zinc-200 dark:stroke-zinc-900"
              strokeWidth={0.75}
            />
            <line
              x1={100}
              y1={0}
              x2={100}
              y2="100%"
              className="stroke-zinc-200 dark:stroke-zinc-900"
              strokeWidth={0.75}
            />
            <line
              x1={200}
              y1={0}
              x2={200}
              y2="100%"
              className="stroke-zinc-200 dark:stroke-zinc-900"
              strokeWidth={0.75}
            />
            <line
              x1={300}
              y1={0}
              x2={300}
              y2="100%"
              className="stroke-zinc-200 dark:stroke-zinc-900"
              strokeWidth={0.75}
            />
            <line
              x1={400}
              y1={0}
              x2={400}
              y2="100%"
              className="stroke-zinc-200 dark:stroke-zinc-900"
              strokeWidth={0.75}
            />
            <line
              x1={500}
              y1={0}
              x2={500}
              y2="100%"
              className="stroke-zinc-200 dark:stroke-zinc-900"
              strokeWidth={0.75}
            />
            <line
              x1={600}
              y1={0}
              x2={600}
              y2="100%"
              className="stroke-zinc-200 dark:stroke-zinc-900"
              strokeWidth={0.75}
            />
            <line
              x1={700}
              y1={0}
              x2={700}
              y2="100%"
              className="stroke-zinc-200 dark:stroke-zinc-900"
              strokeWidth={0.75}
            />
            <line
              x1={800}
              y1={0}
              x2={800}
              y2="100%"
              className="stroke-zinc-200 dark:stroke-zinc-900"
              strokeWidth={0.75}
            />
            <line
              x1={900}
              y1={0}
              x2={900}
              y2="100%"
              className="stroke-zinc-200 dark:stroke-zinc-900"
              strokeWidth={0.75}
            />

            {/* Horizontal grid lines */}
            <line
              x1={0}
              y1={100}
              x2="100%"
              y2={100}
              className="stroke-zinc-200 dark:stroke-zinc-900"
              strokeWidth={0.75}
            />
            <line
              x1={0}
              y1={200}
              x2="100%"
              y2={200}
              className="stroke-zinc-200 dark:stroke-zinc-900"
              strokeWidth={0.75}
            />
            <line
              x1={0}
              y1={300}
              x2="100%"
              y2={300}
              className="stroke-zinc-200 dark:stroke-zinc-900"
              strokeWidth={0.75}
            />
            <line
              x1={0}
              y1={400}
              x2="100%"
              y2={400}
              className="stroke-zinc-200 dark:stroke-zinc-900"
              strokeWidth={0.75}
            />
            <line
              x1={0}
              y1={500}
              x2="100%"
              y2={500}
              className="stroke-zinc-200 dark:stroke-zinc-900"
              strokeWidth={0.75}
            />
            <line
              x1={0}
              y1={600}
              x2="100%"
              y2={600}
              className="stroke-zinc-200 dark:stroke-zinc-900"
              strokeWidth={0.75}
            />
            <line
              x1={0}
              y1={700}
              x2="100%"
              y2={700}
              className="stroke-zinc-200 dark:stroke-zinc-900"
              strokeWidth={0.75}
            />
            <line
              x1={0}
              y1={800}
              x2="100%"
              y2={800}
              className="stroke-zinc-200 dark:stroke-zinc-900"
              strokeWidth={0.75}
            />
          </g>
        )}

        {/* Traces Group (Translates same as Browser, with Bezier bends at corners) */}
        <g id="traces" transform="translate(0, 200)">
          {/* Path 1: Enters left, bends up along left edge of browser */}
          <path
            d="M100 300 H240 Q250 300 250 290 V120"
            className="animate-kanso-loader-flow fill-none stroke-linejoin-round [stroke-dasharray:120_600] [stroke-dashoffset:720] transition-colors duration-300"
            style={{
              stroke: `url(#${idPrefix}-traceGradient1)`,
              strokeWidth: 1.5,
              animationDuration: `${flowDuration}s`,
              filter:
                resolvedColor === 'currentColor'
                  ? 'none'
                  : `drop-shadow(0 0 ${8 * glowIntensity}px ${resolvedColor})`,
            }}
          />
          {/* Path 2: Enters right, bends down along right edge of browser */}
          <path
            d="M800 200 H660 Q650 200 650 210 V380"
            className="animate-kanso-loader-flow fill-none stroke-linejoin-round [stroke-dasharray:120_600] [stroke-dashoffset:720] transition-colors duration-300"
            style={{
              stroke: `url(#${idPrefix}-traceGradient2)`,
              strokeWidth: 1.5,
              animationDuration: `${flowDuration}s`,
              filter:
                resolvedColor === 'currentColor'
                  ? 'none'
                  : `drop-shadow(0 0 ${8 * glowIntensity}px ${resolvedColor})`,
            }}
          />
          {/* Path 3: Enters bottom, bends left along bottom edge of browser */}
          <path
            d="M400 520 V390 Q400 380 390 380 H250"
            className="animate-kanso-loader-flow fill-none stroke-linejoin-round [stroke-dasharray:120_600] [stroke-dashoffset:720] transition-colors duration-300"
            style={{
              stroke: `url(#${idPrefix}-traceGradient3)`,
              strokeWidth: 1.5,
              animationDuration: `${flowDuration}s`,
              filter:
                resolvedColor === 'currentColor'
                  ? 'none'
                  : `drop-shadow(0 0 ${8 * glowIntensity}px ${resolvedColor})`,
            }}
          />
          {/* Path 4: Enters top, bends right along top edge of browser */}
          <path
            d="M500 50 V110 Q500 120 510 120 H650"
            className="animate-kanso-loader-flow fill-none stroke-linejoin-round [stroke-dasharray:120_600] [stroke-dashoffset:720] transition-colors duration-300"
            style={{
              stroke: `url(#${idPrefix}-traceGradient4)`,
              strokeWidth: 1.5,
              animationDuration: `${flowDuration}s`,
              filter:
                resolvedColor === 'currentColor'
                  ? 'none'
                  : `drop-shadow(0 0 ${8 * glowIntensity}px ${resolvedColor})`,
            }}
          />
        </g>

        {/* Browser Mockup Window */}
        <g id="browser" transform="translate(0, 200)" className="select-none">
          {/* Main Frame */}
          <rect
            x={250}
            y={120}
            width={400}
            height={260}
            rx={10}
            ry={10}
            className="fill-white dark:fill-zinc-950/80 stroke-zinc-200 dark:stroke-zinc-800/80 [filter:drop-shadow(0_10px_30px_rgba(0,0,0,0.03))] dark:[filter:drop-shadow(0_20px_50px_rgba(0,0,0,0.8))] transition-colors duration-300"
            strokeWidth={1.5}
          />
          {/* Header Bar */}
          <rect
            x={250}
            y={120}
            width={400}
            height={34}
            rx={10}
            ry={10}
            className="fill-zinc-50 dark:fill-zinc-900/90 stroke-zinc-200 dark:stroke-zinc-800/60 transition-colors duration-300"
            strokeWidth={1}
          />
          {/* Cover rounded corners of top bar bottom so only top is rounded */}
          <rect
            x={251}
            y={144}
            width={398}
            height={10}
            className="fill-white dark:fill-zinc-950 transition-colors duration-300"
          />

          {/* Browser Window Window Control Dots */}
          <circle
            cx={272}
            cy={137}
            r={3.5}
            className="fill-zinc-200 dark:fill-zinc-800 transition-colors duration-300"
          />
          <circle
            cx={282}
            cy={137}
            r={3.5}
            className="fill-zinc-200 dark:fill-zinc-800 transition-colors duration-300"
          />
          <circle
            cx={292}
            cy={137}
            r={3.5}
            className="fill-zinc-200 dark:fill-zinc-800 transition-colors duration-300"
          />

          {/* Loading Header Text */}
          <text
            x={450}
            y={141}
            textAnchor="middle"
            className="font-mono text-[9px] font-semibold tracking-[0.25em] uppercase fill-zinc-400 dark:fill-zinc-500 transition-colors duration-300"
          >
            {loadingText}
          </text>

          {/* Page Loading Skeletons - VARIANT 1: browser */}
          {variant === 'browser' && (
            <g className="opacity-95">
              {/* Title block */}
              <rect
                x={275}
                y={175}
                width={180}
                height={12}
                rx={3}
                ry={3}
                className="fill-zinc-100 dark:fill-zinc-800/70 animate-pulse transition-colors duration-300"
              />

              {/* Paragraph lines */}
              <rect
                x={275}
                y={205}
                width={350}
                height={8}
                rx={2}
                ry={2}
                className="fill-zinc-50 dark:fill-zinc-900/60 animate-pulse [animation-delay:200ms] transition-colors duration-300"
              />
              <rect
                x={275}
                y={222}
                width={320}
                height={8}
                rx={2}
                ry={2}
                className="fill-zinc-50 dark:fill-zinc-900/60 animate-pulse [animation-delay:400ms] transition-colors duration-300"
              />
              <rect
                x={275}
                y={239}
                width={220}
                height={8}
                rx={2}
                ry={2}
                className="fill-zinc-50 dark:fill-zinc-900/60 animate-pulse [animation-delay:600ms] transition-colors duration-300"
              />

              {/* Visual canvas block */}
              <rect
                x={275}
                y={265}
                width={350}
                height={75}
                rx={6}
                ry={6}
                className="fill-zinc-50/50 dark:fill-zinc-900/40 stroke-zinc-200 dark:stroke-zinc-900/60 animate-pulse [animation-delay:800ms] transition-colors duration-300"
                strokeWidth={1}
              />

              {/* Footer indicator line */}
              <rect
                x={275}
                y={355}
                width={100}
                height={8}
                rx={2}
                ry={2}
                className="fill-zinc-50 dark:fill-zinc-900/50 animate-pulse [animation-delay:1000ms] transition-colors duration-300"
              />
            </g>
          )}

          {/* Page Loading Skeletons - VARIANT 2: sidebar */}
          {variant === 'sidebar' && (
            <g className="opacity-95">
              {/* Sidebar border */}
              <line
                x1={330}
                y1={154}
                x2={330}
                y2={380}
                className="stroke-zinc-200 dark:stroke-zinc-800/80 transition-colors duration-300"
                strokeWidth={1}
              />

              {/* Sidebar items */}
              <rect
                x={265}
                y={175}
                width={50}
                height={10}
                rx={2.5}
                ry={2.5}
                className="fill-zinc-100 dark:fill-zinc-800/70 animate-pulse transition-colors duration-300"
              />
              <rect
                x={265}
                y={195}
                width={50}
                height={10}
                rx={2.5}
                ry={2.5}
                className="fill-zinc-50 dark:fill-zinc-900/60 animate-pulse [animation-delay:150ms] transition-colors duration-300"
              />
              <rect
                x={265}
                y={215}
                width={50}
                height={10}
                rx={2.5}
                ry={2.5}
                className="fill-zinc-50 dark:fill-zinc-900/60 animate-pulse [animation-delay:300ms] transition-colors duration-300"
              />
              <rect
                x={265}
                y={235}
                width={50}
                height={10}
                rx={2.5}
                ry={2.5}
                className="fill-zinc-50 dark:fill-zinc-900/60 animate-pulse [animation-delay:450ms] transition-colors duration-300"
              />

              {/* Main content right side */}
              <rect
                x={350}
                y={175}
                width={120}
                height={12}
                rx={3}
                ry={3}
                className="fill-zinc-100 dark:fill-zinc-800/70 animate-pulse [animation-delay:100ms] transition-colors duration-300"
              />
              <rect
                x={350}
                y={202}
                width={275}
                height={8}
                rx={2}
                ry={2}
                className="fill-zinc-50 dark:fill-zinc-900/60 animate-pulse [animation-delay:250ms] transition-colors duration-300"
              />
              <rect
                x={350}
                y={218}
                width={250}
                height={8}
                rx={2}
                ry={2}
                className="fill-zinc-50 dark:fill-zinc-900/60 animate-pulse [animation-delay:400ms] transition-colors duration-300"
              />

              <rect
                x={350}
                y={242}
                width={275}
                height={95}
                rx={6}
                ry={6}
                className="fill-zinc-50/50 dark:fill-zinc-900/40 stroke-zinc-200 dark:stroke-zinc-900/60 animate-pulse [animation-delay:600ms] transition-colors duration-300"
                strokeWidth={1}
              />

              <rect
                x={350}
                y={355}
                width={80}
                height={8}
                rx={2}
                ry={2}
                className="fill-zinc-50 dark:fill-zinc-900/50 animate-pulse [animation-delay:800ms] transition-colors duration-300"
              />
            </g>
          )}

          {/* Page Loading Skeletons - VARIANT 3: dashboard */}
          {variant === 'dashboard' && (
            <g className="opacity-95">
              {/* Card 1 */}
              <rect
                x={270}
                y={172}
                width={170}
                height={80}
                rx={6}
                ry={6}
                className="fill-zinc-50/30 dark:fill-zinc-900/40 stroke-zinc-200 dark:stroke-zinc-900/60 animate-pulse transition-colors duration-300"
                strokeWidth={1}
              />
              <rect
                x={285}
                y={187}
                width={60}
                height={8}
                rx={2}
                ry={2}
                className="fill-zinc-100 dark:fill-zinc-800/70 animate-pulse transition-colors duration-300"
              />
              <rect
                x={285}
                y={207}
                width={120}
                height={18}
                rx={3}
                ry={3}
                className="fill-zinc-50 dark:fill-zinc-900/50 animate-pulse [animation-delay:200ms] transition-colors duration-300"
              />
              <rect
                x={285}
                y={233}
                width={80}
                height={6}
                rx={1.5}
                ry={1.5}
                className="fill-zinc-50 dark:fill-zinc-900/40 animate-pulse [animation-delay:350ms] transition-colors duration-300"
              />

              {/* Card 2 */}
              <rect
                x={460}
                y={172}
                width={170}
                height={80}
                rx={6}
                ry={6}
                className="fill-zinc-50/30 dark:fill-zinc-900/40 stroke-zinc-200 dark:stroke-zinc-900/60 animate-pulse [animation-delay:150ms] transition-colors duration-300"
                strokeWidth={1}
              />
              <rect
                x={475}
                y={187}
                width={60}
                height={8}
                rx={2}
                ry={2}
                className="fill-zinc-100 dark:fill-zinc-800/70 animate-pulse [animation-delay:150ms] transition-colors duration-300"
              />
              <rect
                x={475}
                y={207}
                width={120}
                height={18}
                rx={3}
                ry={3}
                className="fill-zinc-50 dark:fill-zinc-900/50 animate-pulse [animation-delay:350ms] transition-colors duration-300"
              />
              <rect
                x={475}
                y={233}
                width={80}
                height={6}
                rx={1.5}
                ry={1.5}
                className="fill-zinc-50 dark:fill-zinc-900/40 animate-pulse [animation-delay:500ms] transition-colors duration-300"
              />

              {/* Card 3 (Bottom) */}
              <rect
                x={270}
                y={268}
                width={360}
                height={88}
                rx={6}
                ry={6}
                className="fill-zinc-50/30 dark:fill-zinc-900/40 stroke-zinc-200 dark:stroke-zinc-900/60 animate-pulse [animation-delay:300ms] transition-colors duration-300"
                strokeWidth={1}
              />
              {/* Bar Chart Skeletons inside Bottom Card */}
              <rect
                x={290}
                y={295}
                width={12}
                height={45}
                rx={2}
                ry={2}
                className="fill-zinc-100 dark:fill-zinc-800/50 animate-pulse [animation-delay:400ms] transition-colors duration-300"
              />
              <rect
                x={312}
                y={310}
                width={12}
                height={30}
                rx={2}
                ry={2}
                className="fill-zinc-100 dark:fill-zinc-800/50 animate-pulse [animation-delay:500ms] transition-colors duration-300"
              />
              <rect
                x={334}
                y={285}
                width={12}
                height={55}
                rx={2}
                ry={2}
                className="fill-zinc-100 dark:fill-zinc-800/50 animate-pulse [animation-delay:600ms] transition-colors duration-300"
              />
              <rect
                x={356}
                y={305}
                width={12}
                height={35}
                rx={2}
                ry={2}
                className="fill-zinc-100 dark:fill-zinc-800/50 animate-pulse [animation-delay:700ms] transition-colors duration-300"
              />

              {/* Lines text info inside Bottom Card */}
              <rect
                x={395}
                y={290}
                width={120}
                height={8}
                rx={2}
                ry={2}
                className="fill-zinc-100 dark:fill-zinc-800/70 animate-pulse [animation-delay:450ms] transition-colors duration-300"
              />
              <rect
                x={395}
                y={306}
                width={210}
                height={8}
                rx={2}
                ry={2}
                className="fill-zinc-50 dark:fill-zinc-900/60 animate-pulse [animation-delay:650ms] transition-colors duration-300"
              />
              <rect
                x={395}
                y={322}
                width={160}
                height={8}
                rx={2}
                ry={2}
                className="fill-zinc-50 dark:fill-zinc-900/60 animate-pulse [animation-delay:850ms] transition-colors duration-300"
              />

              {/* Footer indicator line */}
              <rect
                x={275}
                y={363}
                width={100}
                height={6}
                rx={1.5}
                ry={1.5}
                className="fill-zinc-50 dark:fill-zinc-900/50 animate-pulse [animation-delay:1000ms] transition-colors duration-300"
              />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}

export { BrowserLoader };
