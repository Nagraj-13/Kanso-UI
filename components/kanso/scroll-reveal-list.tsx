'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ScrollRevealListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The list of items/words that scroll through the viewport */
  items?: string[];
  /** Sticky prefix text next to the scrolling words list */
  stickyPrefix?: string;
  /** Large title text for the opening header section */
  headerText?: string;
  /** Title text for the final ending section */
  footerText?: string;
  /** Starting hue for the OKLCH color spectrum color shift (0-360+) */
  hueStart?: number;
  /** Ending hue for the OKLCH color spectrum color shift (0-360+) */
  hueEnd?: number;
  /** Base chroma value for OKLCH colors */
  baseChroma?: number;
  /** Enables scroll snapping to list items */
  snap?: boolean;
  /** Optional container element ref to track scroll within rather than the global window */
  containerRef?: React.RefObject<HTMLElement | null>;
}

/**
 * ScrollRevealList — A premium scroll-driven reveal text list.
 *
 * It keeps a prefix phrase (like "you can ") sticky in the center of the screen
 * while list items scroll past, highlighting the active item with a shifting
 * OKLCH color gradient hue.
 *
 * @example
 * ```tsx
 * import { ScrollRevealList } from "@/components/kanso/scroll-reveal-list"
 *
 * export default function Demo() {
 *   return (
 *     <ScrollRevealList
 *       stickyPrefix="you can "
 *       items={["design.", "prototype.", "ship."]}
 *     />
 *   )
 * }
 * ```
 */
function ScrollRevealList({
  items = [
    'design.',
    'prototype.',
    'solve.',
    'build.',
    'develop.',
    'debug.',
    'learn.',
    'cook.',
    'ship.',
    'prompt.',
    'collaborate.',
    'create.',
    'inspire.',
    'follow.',
    'innovate.',
    'test.',
    'optimize.',
    'teach.',
    'visualize.',
    'transform.',
    'scale.',
    'do it.',
  ],
  stickyPrefix = 'you can ',
  headerText = 'you can scroll.',
  footerText = 'fin.',
  hueStart = 0,
  hueEnd = 360,
  baseChroma = 0.25,
  snap = true,
  containerRef,
  className,
  ...props
}: ScrollRevealListProps) {
  return (
    <div
      className={cn(
        'w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800 transition-colors duration-300 relative',
        snap && 'snap-y snap-proximity',
        className
      )}
      {...props}
    >
      {/* Dynamic CSS theme tokens injected locally to keep the component fully self-contained */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        :root {
          --kanso-scroll-lightness: 55%;
        }
        .dark {
          --kanso-scroll-lightness: 75%;
        }
      `,
        }}
      />

      {/* Screen Reader Only descriptive block for accessibility */}
      <div className="sr-only">
        <p>
          A scrolling list of capabilities: {stickyPrefix}{' '}
          {items.join(`, ${stickyPrefix} `)}
        </p>
      </div>

      {/* Main interactive area hidden from screen readers to prevent reading repetition */}
      <div aria-hidden="true">
        {/* Opening Header Section */}
        <header className="min-h-screen flex items-center px-8 md:px-24 snap-start">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-zinc-900 dark:text-white max-w-2xl text-left bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-600 bg-clip-text text-transparent">
            {headerText.split('\n').map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < headerText.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
        </header>

        {/* Sticky List Section */}
        <main className="w-full relative">
          <section className="flex flex-col md:flex-row items-start justify-start px-8 md:px-24 py-[40vh] relative min-h-screen gap-4">
            {/* Sticky Prefix sentence part */}
            <div className="sticky top-[50%] -translate-y-[50%] z-10 w-full md:w-auto text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-8 md:mb-0 text-left">
              <span>{stickyPrefix}</span>
            </div>

            {/* Scrolling items list */}
            <ul className="flex-1 flex flex-col gap-8 md:gap-12 w-full">
              {items.map((item, index) => (
                <ScrollRevealItem
                  key={index}
                  index={index}
                  total={items.length}
                  hueStart={hueStart}
                  hueEnd={hueEnd}
                  baseChroma={baseChroma}
                  snap={snap}
                  containerRef={containerRef}
                >
                  {item}
                </ScrollRevealItem>
              ))}
            </ul>
          </section>

          {/* Ending Outro Section */}
          <section className="min-h-screen flex items-center justify-center snap-start">
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none bg-gradient-to-b from-zinc-900 to-zinc-400 dark:from-white dark:to-zinc-700 bg-clip-text text-transparent">
              {footerText}
            </h2>
          </section>
        </main>
      </div>
    </div>
  );
}

interface ScrollRevealItemProps {
  children: React.ReactNode;
  index: number;
  total: number;
  hueStart: number;
  hueEnd: number;
  baseChroma: number;
  snap: boolean;
  containerRef?: React.RefObject<HTMLElement | null>;
}

function ScrollRevealItem({
  children,
  index,
  total,
  hueStart,
  hueEnd,
  baseChroma,
  snap,
  containerRef,
}: ScrollRevealItemProps) {
  const ref = React.useRef<HTMLLIElement>(null);

  // Track scroll of this item relative to the scroll container
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ['start end', 'end start'],
  });

  // Calculate OKLCH color based on index
  const step = (hueEnd - hueStart) / Math.max(1, total - 1);
  const hue = hueStart + step * index;
  const colorStr = `oklch(var(--kanso-scroll-lightness, 55%) ${baseChroma} ${hue})`;

  // Animating opacity, scale, and filter as it passes the viewport center
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.04, 0.96]);
  const filter = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      'blur(1px) brightness(0.9)',
      'blur(0px) brightness(1.25)',
      'blur(1px) brightness(0.9)',
    ]
  );

  return (
    <motion.li
      ref={ref}
      style={{
        opacity,
        scale,
        filter,
        color: colorStr,
      }}
      className={cn(
        'text-5xl md:text-7xl font-bold tracking-tight select-none list-none text-left origin-left transition-shadow duration-300',
        snap && 'snap-center'
      )}
    >
      {children}
    </motion.li>
  );
}

export { ScrollRevealList };
