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
  showCropMarks = false,
  interactive = true,
  ...props
}: GlowCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-[32px] border bg-[#05070b] text-zinc-50',
        'shadow-[0_8px_32px_rgba(0,0,0,0.4)] ring-1 ring-ring ring-inset transition-all duration-500 ease-out',
        interactive && 'hover:ring-white/15',
        className
      )}
      {...props}
    >
      {/* 
        Premium Base Glow — soft, dispersed blue light anchoring the bottom edges.
        Lowered opacities prevent harsh color banding and make it look volumetric.
      */}
      <div className="pointer-events-none absolute inset-0 z-0 [background:radial-gradient(100%_100%_at_30%_0%,transparent_45%,rgba(48, 51, 252, 1)_75%,rgba(49, 103, 254, 1)_100%)]" />

      {/* 
        Interactive Hover Bloom — intensifies the glow with a smooth ease.
      */}
      {interactive && (
        <div className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out [background:radial-gradient(100%_100%_at_30%_0%,transparent_35%,rgba(0, 4, 255, 0.97)_65%,rgba(26,86,255,0.9)_100%)]" />
      )}

      {/* Subtle top border highlight (Premium Glassmorphism look) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-[32px]"
        style={{
          boxShadow: 'inset 0 1px 1px 0 rgba(255,255,255,0.1)',
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0.04) 0%, transparent 50%)',
        }}
      />

      {/* Blueprint Corner Crop Marks */}
      {showCropMarks && (
        <>
          <div className="absolute left-4 top-4 h-6 w-6 border-l border-t border-white/20" />
          <div className="absolute right-4 top-4 h-6 w-6 border-r border-t border-white/20" />
          <div className="absolute left-4 bottom-4 h-6 w-6 border-l border-b border-white/20" />
          <div className="absolute right-4 bottom-4 h-6 w-6 border-r border-b border-white/20" />
        </>
      )}

      {/* Inner Content Area */}
      <div className="relative z-10 p-8">{children}</div>
    </div>
  );
}

export { GlowCard };
export type { GlowCardProps };
