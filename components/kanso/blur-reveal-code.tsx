'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BlurRevealCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The code string to be revealed on hover */
  code?: string;
  /** The top label text */
  label?: React.ReactNode;
  className?: string;
}

const lerpValues = [1, 0.766, 0.707, 0.573, 0.422, 0.258];

function BlurRevealCode({
  code = '034872',
  label = 'Glide To Reveal Secret Code',
  className,
  ...props
}: BlurRevealCodeProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    // Only use elementsFromPoint for touch/pen to enable dragging over smoothly
    if (e.pointerType === 'mouse') return;

    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    const li = elements.find((el) => el.tagName === 'LI');
    if (li && li.parentElement === e.currentTarget) {
      const index = Array.from(e.currentTarget.children).indexOf(li);
      if (index !== -1 && index !== hoveredIndex) {
        setHoveredIndex(index);
      }
    }
  };

  const getActiveValue = (i: number) => {
    if (hoveredIndex === null) return 0;
    const dist = Math.abs(hoveredIndex - i);
    return lerpValues[dist] || 0;
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-10 sm:gap-14 w-full',
        className
      )}
      {...props}
    >
      {label && (
        <div className="text-2xl sm:text-4xl font-bold text-center bg-gradient-to-b from-zinc-700 to-zinc-400 dark:from-zinc-200 dark:to-zinc-500 bg-clip-text text-transparent tracking-tight">
          {label}
        </div>
      )}

      <ul
        className={cn(
          'relative flex flex-nowrap items-center justify-center rounded-3xl overflow-hidden touch-none',
          'bg-white dark:bg-[#0a0a0b] cursor-crosshair',
          'shadow-[0_1px_1px_rgba(0,0,0,0.05)_inset,0_8px_30px_rgba(0,0,0,0.05)] ring-1 ring-zinc-900/5',
          'dark:shadow-[0_1px_1px_rgba(255,255,255,0.15)_inset,0_8px_30px_rgba(0,0,0,0.4)] dark:ring-white/10'
        )}
        onPointerLeave={() => setHoveredIndex(null)}
        onPointerMove={handlePointerMove}
        onPointerCancel={() => setHoveredIndex(null)}
      >
        {/* Subtle inner top highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/20 to-transparent pointer-events-none" />

        {code.split('').map((char, i) => {
          const active = getActiveValue(i);
          return (
            <li
              key={i}
              tabIndex={0}
              className={cn(
                'relative flex h-full items-center justify-center outline-none select-none transition-colors duration-300',
                'px-3 py-10 sm:px-6 sm:py-16', // Large interaction hit area
                i === 0 && 'pl-8 sm:pl-16',
                i === code.length - 1 && 'pr-8 sm:pr-16'
              )}
              onPointerEnter={(e) => {
                if (e.pointerType === 'mouse') setHoveredIndex(i);
              }}
              onFocus={() => setHoveredIndex(i)}
            >
              <motion.span
                className="inline-block text-5xl sm:text-7xl font-bold text-zinc-900 dark:text-zinc-50 drop-shadow-sm"
                initial={false}
                animate={{
                  scale: active + 0.5,
                  filter: `blur(${(1 - active) * 1.5}rem)`,
                }}
                transition={{
                  type: 'tween',
                  ease: [0.2, 0.8, 0.2, 1],
                  duration: 0.5 + (1 - active) * 0.5, // 0.5s for active, up to 1.0s for inactive
                }}
              >
                {char}
              </motion.span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { BlurRevealCode };
export type { BlurRevealCodeProps };
