import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface GlowLineButtonProps extends React.ComponentPropsWithoutRef<
  typeof Button
> {
  /** The color of the bottom glow line. Can be a preset name or a custom color string (e.g. hex #ff0000) */
  glowColor?: 'white' | 'blue' | 'emerald' | 'violet' | 'rose' | string;
}

const GlowLineButton = React.forwardRef<HTMLButtonElement, GlowLineButtonProps>(
  ({ className, glowColor = 'white', children, ...props }, ref) => {
    // Check if glowColor is a custom color (hex, rgb, hsl, etc.)
    const isPreset = ['white', 'blue', 'emerald', 'violet', 'rose'].includes(
      glowColor
    );

    return (
      <Button
        ref={ref}
        variant="ghost"
        className={cn(
          'min-w-[120px] relative cursor-pointer px-[17px] py-[12px] h-auto border-0 rounded-[7px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] bg-[radial-gradient(ellipse_at_bottom,_rgba(71,81,92,1)_0%,_rgba(11,21,30,1)_45%)] text-white/70 transition-all duration-1000 [transition-timing-function:cubic-bezier(0.15,0.83,0.66,1)] hover:text-white hover:scale-105 hover:-translate-y-0.5 group hover:bg-transparent',
          className
        )}
        {...props}
      >
        {children}
        {/* Glowing bottom line */}
        <span
          style={{
            background: !isPreset
              ? `linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, ${glowColor} 50%, rgba(255, 255, 255, 0) 100%)`
              : undefined,
          }}
          className={cn(
            'absolute bottom-0 left-[15%] h-[1px] w-[70%] opacity-20 transition-all duration-1000 group-hover:opacity-100 group-hover:before:opacity-100',
            glowColor === 'white' &&
              'bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_50%,rgba(255,255,255,0)_100%)]',
            glowColor === 'blue' &&
              'bg-[linear-gradient(90deg,rgba(59,130,246,0)_0%,rgba(59,130,246,1)_50%,rgba(59,130,246,0)_100%)]',
            glowColor === 'emerald' &&
              'bg-[linear-gradient(90deg,rgba(16,185,129,0)_0%,rgba(16,185,129,1)_50%,rgba(16,185,129,0)_100%)]',
            glowColor === 'violet' &&
              'bg-[linear-gradient(90deg,rgba(139,92,246,0)_0%,rgba(139,92,246,1)_50%,rgba(139,92,246,0)_100%)]',
            glowColor === 'rose' &&
              'bg-[linear-gradient(90deg,rgba(244,63,94,0)_0%,rgba(244,63,94,1)_50%,rgba(244,63,94,0)_100%)]'
          )}
        />
      </Button>
    );
  }
);

GlowLineButton.displayName = 'GlowLineButton';

export { GlowLineButton };
