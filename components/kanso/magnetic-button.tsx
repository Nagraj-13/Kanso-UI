'use client';

import * as React from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const magneticButtonVariants = cva(
  'relative inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border border-zinc-200 bg-zinc-900 px-6 py-2.5 text-white hover:bg-zinc-800 dark:border-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100',
        outline:
          'border border-zinc-200 bg-transparent px-6 py-2.5 text-zinc-900 hover:bg-zinc-100/60 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900/60',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface MagneticButtonProps
  extends
    Omit<HTMLMotionProps<'button'>, 'ref'>,
    VariantProps<typeof magneticButtonVariants> {
  /** Strength of the magnetic pull effect (default: 0.3) */
  magneticStrength?: number;
}

function MagneticButton({
  children,
  className,
  variant,
  magneticStrength = 0.3,
  disabled,
  onClick,
  ...props
}: MagneticButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      x.set((e.clientX - centerX) * magneticStrength);
      y.set((e.clientY - centerY) * magneticStrength);
    },
    [magneticStrength, x, y]
  );

  const handleMouseLeave = React.useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      className={cn(magneticButtonVariants({ variant, className }))}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export { MagneticButton };
export type { MagneticButtonProps };
