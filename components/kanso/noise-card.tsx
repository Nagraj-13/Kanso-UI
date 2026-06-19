'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface NoiseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The theme preset for the card styling */
  theme?: 'kanso' | 'indigo' | 'sunset' | 'light' | 'glass' | 'none';
  /** Width class of the card (default: "w-full") */
  width?: string;
  /** Height class of the card (default: "h-auto") */
  height?: string;
  /** Opacity of the noise grain (0 to 1). If undefined, uses theme-specific defaults */
  noiseOpacity?: number;
  /** Pixel size of the noise grains (default: 1) */
  grainSize?: number;
  /** Whether the noise pattern is animated (default: true) */
  animated?: boolean;
  /** Enable mouse tracking effects (spotlight and hover transitions) */
  interactive?: boolean;
  /** Override the hover spotlight color */
  spotlightColor?: string;
  /** Override the spotlight size in pixels (default: 300) */
  spotlightSize?: number;
  /** Background color override (only used when theme is "none", default: "bg-[#0014FF]") */
  bgColor?: string;
  /** Inner content of the card */
  children?: React.ReactNode;
}

const NoiseCard = React.forwardRef<HTMLDivElement, NoiseCardProps>(
  (
    {
      theme = 'kanso',
      width = 'w-full',
      height = 'h-auto',
      noiseOpacity,
      grainSize = 1,
      animated = true,
      interactive = true,
      spotlightColor,
      spotlightSize = 300,
      bgColor = 'bg-[#0014FF]',
      children,
      className,
      style,
      onMouseMove,
      ...props
    },
    ref
  ) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const frameRef = React.useRef<number>(0);
    const animationFrameIdRef = React.useRef<number>(0);

    // Coordinate local and forwarded refs
    const localRef = React.useRef<HTMLDivElement>(null);
    const resolvedRef = (ref ||
      localRef) as React.RefObject<HTMLDivElement | null>;

    // Pre-generate noise canvases on mount/prop change for high performance
    React.useEffect(() => {
      const canvas = canvasRef.current;
      const container = resolvedRef.current;
      if (!canvas || !container) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Determine default noise opacity based on theme if not overridden
      const actualOpacity =
        noiseOpacity !== undefined
          ? noiseOpacity
          : theme === 'light'
            ? 0.02
            : theme === 'glass'
              ? 0.035
              : 0.05;

      const patternSize = 128;
      const patterns: HTMLCanvasElement[] = [];

      // Generate 6 distinct pattern tiles to prevent repeat artifacts
      for (let f = 0; f < 6; f++) {
        const pCanvas = document.createElement('canvas');
        pCanvas.width = patternSize;
        pCanvas.height = patternSize;
        const pCtx = pCanvas.getContext('2d');
        if (pCtx) {
          if (grainSize <= 1) {
            const imgData = pCtx.createImageData(patternSize, patternSize);
            const data = imgData.data;
            const alpha = Math.floor(actualOpacity * 255);
            for (let i = 0; i < data.length; i += 4) {
              const val = Math.floor(Math.random() * 255);
              data[i] = val;
              data[i + 1] = val;
              data[i + 2] = val;
              data[i + 3] = alpha;
            }
            pCtx.putImageData(imgData, 0, 0);
          } else {
            pCtx.clearRect(0, 0, patternSize, patternSize);
            for (let y = 0; y < patternSize; y += grainSize) {
              for (let x = 0; x < patternSize; x += grainSize) {
                const val = Math.floor(Math.random() * 255);
                pCtx.fillStyle = `rgba(${val}, ${val}, ${val}, ${actualOpacity})`;
                pCtx.fillRect(x, y, grainSize, grainSize);
              }
            }
          }
        }
        patterns.push(pCanvas);
      }

      const drawNoise = () => {
        const { width, height } = canvas;
        if (width === 0 || height === 0) return;

        ctx.clearRect(0, 0, width, height);
        const currentPatternCanvas = patterns[frameRef.current % 6];
        const pattern = ctx.createPattern(currentPatternCanvas, 'repeat');
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, width, height);
        }
      };

      const loop = () => {
        drawNoise();
        frameRef.current += 1;
        animationFrameIdRef.current = requestAnimationFrame(loop);
      };

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const width = Math.round(entry.contentRect.width);
          const height = Math.round(entry.contentRect.height);
          canvas.width = width;
          canvas.height = height;
          if (!animated) {
            drawNoise();
          }
        }
      });

      resizeObserver.observe(container);

      if (animated) {
        loop();
      } else {
        drawNoise();
      }

      return () => {
        if (animated && animationFrameIdRef.current) {
          cancelAnimationFrame(animationFrameIdRef.current);
        }
        resizeObserver.disconnect();
      };
    }, [animated, noiseOpacity, grainSize, theme, resolvedRef]);

    // Handle high-performance cursor spotlight tracking using CSS variables
    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!interactive) return;
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty(
          '--mouse-x',
          `${e.clientX - rect.left}px`
        );
        e.currentTarget.style.setProperty(
          '--mouse-y',
          `${e.clientY - rect.top}px`
        );
        if (onMouseMove) onMouseMove(e);
      },
      [interactive, onMouseMove]
    );

    const getThemeClasses = () => {
      switch (theme) {
        case 'kanso':
          return 'bg-zinc-950 text-zinc-50 border border-zinc-900 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.03)]';
        case 'indigo':
          return 'bg-gradient-to-br from-[#0c0d24] via-[#100720] to-[#04050e] text-zinc-50 border border-indigo-950/40 shadow-[0_8px_30px_rgb(0,0,0,0.4)]';
        case 'sunset':
          return 'bg-gradient-to-br from-[#180812] via-[#0f0a1d] to-[#06070f] text-zinc-50 border border-rose-950/30 shadow-[0_8px_30px_rgb(0,0,0,0.4)]';
        case 'light':
          return 'bg-zinc-50 text-zinc-900 border border-zinc-200/80 shadow-xs';
        case 'glass':
          return 'bg-white/5 dark:bg-zinc-950/25 text-zinc-900 dark:text-zinc-50 border border-white/10 dark:border-zinc-800/40 shadow-xs backdrop-blur-md';
        case 'none':
        default:
          return cn(bgColor, 'text-white');
      }
    };

    const getSpotlightColor = () => {
      if (spotlightColor) return spotlightColor;
      switch (theme) {
        case 'kanso':
          return 'rgba(255, 255, 255, 0.05)';
        case 'indigo':
          return 'rgba(167, 139, 250, 0.12)';
        case 'sunset':
          return 'rgba(251, 113, 133, 0.12)';
        case 'light':
          return 'rgba(9, 9, 11, 0.04)';
        case 'glass':
          return 'rgba(255, 255, 255, 0.06)';
        case 'none':
        default:
          return 'rgba(255, 255, 255, 0.06)';
      }
    };

    return (
      <div
        ref={resolvedRef}
        onMouseMove={handleMouseMove}
        className={cn(
          'group relative overflow-hidden rounded-2xl p-8',
          width,
          height,
          getThemeClasses(),
          interactive &&
            'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-within:ring-2 focus-within:ring-zinc-400 dark:focus-within:ring-zinc-800',
          className
        )}
        style={
          {
            ...style,
            '--spotlight-size': `${spotlightSize}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        {/* Render built-in ambient glows for gradient themes */}
        {theme === 'indigo' && (
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-60"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.12), transparent 70%)',
            }}
          />
        )}
        {theme === 'sunset' && (
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-60"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.12), transparent 70%)',
            }}
          />
        )}

        {/* Dynamic Interactive Spotlight overlay */}
        {interactive && (
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
            style={{
              background: `radial-gradient(var(--spotlight-size) circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${getSpotlightColor()}, transparent 80%)`,
            }}
          />
        )}

        {/* Noise Canvas Overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 size-full pointer-events-none mix-blend-overlay"
        />

        {/* Card Content wrapper */}
        <div className="relative z-20 flex flex-col h-full">{children}</div>
      </div>
    );
  }
);

NoiseCard.displayName = 'NoiseCard';

export { NoiseCard };
