'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional override to change card container class names */
  className?: string;
  /** Inner content of the card */
  children?: React.ReactNode;
  /** Whether to show the blueprint-style corner crop marks */
  showCropMarks?: boolean;
  /** Enable hover glow transitions */
  interactive?: boolean;
}

function GlowCard({
  className,
  children,
  showCropMarks = true,
  interactive = true,
  ...props
}: GlowCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#05070b] text-white',
        'shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition-all duration-300',
        interactive && 'hover:border-white/15',
        className
      )}
      {...props}
    >
      {/* Oversized radial glow anchored at top — glow appears at the bottom */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(125%_125%_at_50%_0%,transparent_40%,rgba(99,102,241,0.3)_70%,rgba(26,86,255,0.85)_100%)]" />

      {/* Interactive Hover Bloom — intensifies the bottom glow */}
      {interactive && (
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 [background:radial-gradient(125%_125%_at_50%_0%,transparent_35%,rgba(99,102,241,0.4)_65%,rgba(26,86,255,1)_100%)]" />
      )}

      {/* Subtle top border highlight (Glassmorphism look) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 0%, transparent 15%)',
        }}
      />

      {/* Blueprint Corner Crop Marks */}
      {showCropMarks && (
        <>
          {/* Top Left */}
          <span className="absolute left-4 top-4 size-2.5 border-l border-t border-white/20 pointer-events-none transition-colors duration-300 group-hover:border-white/40" />
          {/* Top Right */}
          <span className="absolute right-4 top-4 size-2.5 border-r border-t border-white/20 pointer-events-none transition-colors duration-300 group-hover:border-white/40" />
          {/* Bottom Left */}
          <span className="absolute left-4 bottom-4 size-2.5 border-l border-b border-white/20 pointer-events-none transition-colors duration-300 group-hover:border-white/40" />
          {/* Bottom Right */}
          <span className="absolute right-4 bottom-4 size-2.5 border-r border-b border-white/20 pointer-events-none transition-colors duration-300 group-hover:border-white/40" />
        </>
      )}

      {/* Inner Content Area */}
      <div className="relative z-10 p-8">{children}</div>
    </div>
  );
}

export { GlowCard };
export type { GlowCardProps };
