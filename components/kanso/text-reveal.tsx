'use client';

import * as React from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The text string to reveal */
  text: string;
  /** Delay before animation starts in seconds (default: 0) */
  delay?: number;
  /** Delay between each character in seconds (default: 0.03) */
  staggerDelay?: number;
}

/**
 * TextReveal — Text that reveals character by character when scrolled into view.
 *
 * Uses Framer Motion's `useInView` hook to trigger a staggered opacity animation
 * on each character. Creates an elegant typewriter-like reveal effect.
 *
 * @example
 * ```tsx
 * import { TextReveal } from "@/components/kanso/text-reveal"
 *
 * export default function Demo() {
 *   return (
 *     <TextReveal
 *       text="Simplicity, Engineered."
 *       className="text-4xl font-semibold tracking-tight"
 *     />
 *   )
 * }
 * ```
 */
function TextReveal({
  text,
  className,
  delay = 0,
  staggerDelay = 0.03,
  ...props
}: TextRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  const words = text.split(' ');

  return (
    <div ref={ref} className={cn('flex flex-wrap', className)} {...props}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em]">
          {word.split('').map((char, charIndex) => {
            // Calculate global index for stagger
            const globalIndex =
              words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) +
              charIndex;

            return (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                className="inline-block"
                initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 8, filter: 'blur(4px)' }
                }
                transition={{
                  duration: 0.3,
                  delay: delay + globalIndex * staggerDelay,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </div>
  );
}

export { TextReveal };
export type { TextRevealProps };
