import * as React from 'react';
import { cn } from '@/lib/utils';

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional override to change card container class names */
  className?: string;
  /** Inner content of the card */
  children?: React.ReactNode;
  /** Whether to show the blueprint-style corner crop marks */
  showCropMarks?: boolean;
}

const GlowCard = React.forwardRef<HTMLDivElement, GlowCardProps>(
  ({ className, children, showCropMarks = true, ...props }, ref) => {
    return (
      <div ref={ref} className="relative w-full">
        {/* 
          Outward Base Glow — soft, dispersed blue light spilling outward behind the bottom edges.
          Matches the reference image volumetric aura.
        */}
        <div className="pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 w-[90%] h-32 bg-blue-600/20 blur-[60px] rounded-full z-0" />

        {/* Main Card Container */}
        <div
          className={cn(
            'relative z-10 rounded-[32px] bg-[#05070b] text-zinc-50 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden',
            className
          )}
          {...props}
        >
          {/* 
            Layer 1: Blue Glow Gradient (similar to the hero section gradient)
          */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full z-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(37, 99, 235, 0.7) 0%, rgba(29, 78, 216, 0.35) 45%, rgba(30, 58, 138, 0.1) 70%, transparent 100%)',
            }}
          />

          {/* 
            Layer 2: Dark masking circle sitting on top of the gradient to create the eclipse/crescent glow effect
          */}
          <div className="pointer-events-none absolute left-1/2 top-[-25%] -translate-x-1/2 w-[130%] h-[95%] bg-[#05070b] blur-[30px] rounded-full z-0" />

          {/* 
            Layer 3: Premium Gradient Border Overlay
          */}
          <div
            className="pointer-events-none absolute inset-0 z-10 rounded-[32px] border border-transparent"
            style={{
              backgroundImage:
                'linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(37,99,235,0.45))',
              mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMask:
                'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              WebkitMaskComposite: 'destination-out',
            }}
          />

          {/* Inner Content Area */}
          <div className="relative z-10 p-8">{children}</div>
        </div>
      </div>
    );
  }
);

GlowCard.displayName = 'GlowCard';

export { GlowCard };
export type { GlowCardProps };
