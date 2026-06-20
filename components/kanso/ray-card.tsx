'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface RayCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The visual layout variant of the card content.
   * @default 'metric'
   */
  variant?: 'metric' | 'feature' | 'custom';
  /**
   * Main stat or headline text for the 'metric' variant (e.g. "750k").
   */
  value?: string;
  /**
   * Descriptive label text underneath the value.
   */
  label?: string;
  /**
   * Icon element rendered at the top for the 'feature' variant.
   */
  icon?: React.ReactNode;
  /**
   * Title text for the 'feature' variant.
   */
  title?: string;
  /**
   * The color theme of the card.
   * @default 'silver'
   */
  themeColor?: 'silver' | 'cyan' | 'gold' | 'violet';
  /**
   * The surface finish styling of the card.
   * @default 'glossy'
   */
  styleVariant?: 'glossy' | 'matte';
  /**
   * Whether to display the blueprint grid drafting lines.
   * @default true
   */
  showGridLines?: boolean;
  /**
   * Rotation duration of the border tracing dot in seconds.
   * @default 6
   */
  speed?: number;
  /**
   * Custom child elements (rendered directly in the 'custom' variant).
   */
  children?: React.ReactNode;
}

const themeGlows: Record<
  string,
  {
    dotColor: string;
    rayShadow: string;
    dark: {
      outerBg: string;
      cardBg: string;
      outerBgMatte: string;
      cardBgMatte: string;
      textGradient: string;
      lineGradientTop: string;
      lineGradientLeft: string;
      lineBorder: string;
      lineBorderMatte: string;
    };
    light: {
      outerBg: string;
      cardBg: string;
      outerBgMatte: string;
      cardBgMatte: string;
      textGradient: string;
      lineGradientTop: string;
      lineGradientLeft: string;
      lineBorder: string;
      lineBorderMatte: string;
    };
  }
> = {
  silver: {
    dotColor: '#ffffff',
    rayShadow: '#ffffff',
    dark: {
      outerBg:
        'radial-gradient(circle 180px at 0% 0%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 60%, transparent 100%)',
      cardBg: 'linear-gradient(180deg, #09090b 0%, #030303 100%)',
      outerBgMatte:
        'radial-gradient(circle 200px at 0% 0%, rgba(255, 255, 255, 0.04) 0%, transparent 100%)',
      cardBgMatte: 'linear-gradient(180deg, #09090b, #030303)',
      textGradient: 'linear-gradient(180deg, #ffffff 0%, #a1a1aa 100%)',
      lineGradientTop:
        'linear-gradient(90deg, rgba(255, 255, 255, 0.12) 30%, rgba(255, 255, 255, 0.04) 70%)',
      lineGradientLeft:
        'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 30%, rgba(255, 255, 255, 0.04) 70%)',
      lineBorder: 'rgba(255, 255, 255, 0.04)',
      lineBorderMatte: 'rgba(255, 255, 255, 0.03)',
    },
    light: {
      outerBg:
        'radial-gradient(circle 180px at 0% 0%, rgba(9, 9, 11, 0.1) 0%, rgba(9, 9, 11, 0.02) 60%, transparent 100%)',
      cardBg: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
      outerBgMatte:
        'radial-gradient(circle 200px at 0% 0%, rgba(9, 9, 11, 0.03) 0%, transparent 100%)',
      cardBgMatte: 'linear-gradient(180deg, #fafafa, #ffffff)',
      textGradient: 'linear-gradient(180deg, #09090b 0%, #52525b 100%)',
      lineGradientTop:
        'linear-gradient(90deg, rgba(9, 9, 11, 0.1) 30%, rgba(9, 9, 11, 0.03) 70%)',
      lineGradientLeft:
        'linear-gradient(180deg, rgba(9, 9, 11, 0.08) 30%, rgba(9, 9, 11, 0.03) 70%)',
      lineBorder: 'rgba(9, 9, 11, 0.03)',
      lineBorderMatte: 'rgba(9, 9, 11, 0.02)',
    },
  },
  cyan: {
    dotColor: '#00ccff',
    rayShadow: '#00ccff',
    dark: {
      outerBg:
        'radial-gradient(circle 180px at 0% 0%, rgba(0, 204, 255, 0.15) 0%, rgba(0, 204, 255, 0.02) 60%, transparent 100%)',
      cardBg: 'linear-gradient(180deg, #02080d 0%, #010406 100%)',
      outerBgMatte:
        'radial-gradient(circle 200px at 0% 0%, rgba(0, 204, 255, 0.04) 0%, transparent 100%)',
      cardBgMatte: 'linear-gradient(180deg, #010a10, #000000)',
      textGradient: 'linear-gradient(180deg, #ffffff 0%, #00ccff 100%)',
      lineGradientTop:
        'linear-gradient(90deg, rgba(0, 204, 255, 0.15) 30%, rgba(0, 204, 255, 0.04) 70%)',
      lineGradientLeft:
        'linear-gradient(180deg, rgba(0, 204, 255, 0.12) 30%, rgba(0, 204, 255, 0.04) 70%)',
      lineBorder: 'rgba(0, 204, 255, 0.04)',
      lineBorderMatte: 'rgba(0, 204, 255, 0.03)',
    },
    light: {
      outerBg:
        'radial-gradient(circle 180px at 0% 0%, rgba(2, 132, 199, 0.12) 0%, rgba(2, 132, 199, 0.02) 60%, transparent 100%)',
      cardBg: 'linear-gradient(180deg, #ffffff 0%, #f4fbfe 100%)',
      outerBgMatte:
        'radial-gradient(circle 200px at 0% 0%, rgba(2, 132, 199, 0.03) 0%, transparent 100%)',
      cardBgMatte: 'linear-gradient(180deg, #f0f9ff, #ffffff)',
      textGradient: 'linear-gradient(180deg, #0369a1 0%, #0284c7 100%)',
      lineGradientTop:
        'linear-gradient(90deg, rgba(2, 132, 199, 0.1) 30%, rgba(2, 132, 199, 0.03) 70%)',
      lineGradientLeft:
        'linear-gradient(180deg, rgba(2, 132, 199, 0.08) 30%, rgba(2, 132, 199, 0.03) 70%)',
      lineBorder: 'rgba(2, 132, 199, 0.03)',
      lineBorderMatte: 'rgba(2, 132, 199, 0.02)',
    },
  },
  gold: {
    dotColor: '#ffd700',
    rayShadow: '#ffd700',
    dark: {
      outerBg:
        'radial-gradient(circle 180px at 0% 0%, rgba(255, 215, 0, 0.15) 0%, rgba(255, 215, 0, 0.02) 60%, transparent 100%)',
      cardBg: 'linear-gradient(180deg, #080602 0%, #020201 100%)',
      outerBgMatte:
        'radial-gradient(circle 200px at 0% 0%, rgba(255, 215, 0, 0.04) 0%, transparent 100%)',
      cardBgMatte: 'linear-gradient(180deg, #070501, #000000)',
      textGradient: 'linear-gradient(180deg, #ffffff 0%, #ffd700 100%)',
      lineGradientTop:
        'linear-gradient(90deg, rgba(255, 215, 0, 0.15) 30%, rgba(255, 215, 0, 0.04) 70%)',
      lineGradientLeft:
        'linear-gradient(180deg, rgba(255, 215, 0, 0.12) 30%, rgba(255, 215, 0, 0.04) 70%)',
      lineBorder: 'rgba(255, 215, 0, 0.04)',
      lineBorderMatte: 'rgba(255, 215, 0, 0.03)',
    },
    light: {
      outerBg:
        'radial-gradient(circle 180px at 0% 0%, rgba(217, 119, 6, 0.12) 0%, rgba(217, 119, 6, 0.02) 60%, transparent 100%)',
      cardBg: 'linear-gradient(180deg, #ffffff 0%, #fffdf4 100%)',
      outerBgMatte:
        'radial-gradient(circle 200px at 0% 0%, rgba(217, 119, 6, 0.03) 0%, transparent 100%)',
      cardBgMatte: 'linear-gradient(180deg, #fffbeb, #ffffff)',
      textGradient: 'linear-gradient(180deg, #b45309 0%, #d97706 100%)',
      lineGradientTop:
        'linear-gradient(90deg, rgba(217, 119, 6, 0.1) 30%, rgba(217, 119, 6, 0.03) 70%)',
      lineGradientLeft:
        'linear-gradient(180deg, rgba(217, 119, 6, 0.08) 30%, rgba(217, 119, 6, 0.03) 70%)',
      lineBorder: 'rgba(217, 119, 6, 0.03)',
      lineBorderMatte: 'rgba(217, 119, 6, 0.02)',
    },
  },
  violet: {
    dotColor: '#8b5cf6',
    rayShadow: '#8b5cf6',
    dark: {
      outerBg:
        'radial-gradient(circle 180px at 0% 0%, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.02) 60%, transparent 100%)',
      cardBg: 'linear-gradient(180deg, #06030c 0%, #020104 100%)',
      outerBgMatte:
        'radial-gradient(circle 200px at 0% 0%, rgba(139, 92, 246, 0.04) 0%, transparent 100%)',
      cardBgMatte: 'linear-gradient(180deg, #05020a, #000000)',
      textGradient: 'linear-gradient(180deg, #ffffff 0%, #8b5cf6 100%)',
      lineGradientTop:
        'linear-gradient(90deg, rgba(139, 92, 246, 0.15) 30%, rgba(139, 92, 246, 0.04) 70%)',
      lineGradientLeft:
        'linear-gradient(180deg, rgba(139, 92, 246, 0.12) 30%, rgba(139, 92, 246, 0.04) 70%)',
      lineBorder: 'rgba(139, 92, 246, 0.04)',
      lineBorderMatte: 'rgba(139, 92, 246, 0.03)',
    },
    light: {
      outerBg:
        'radial-gradient(circle 180px at 0% 0%, rgba(124, 58, 237, 0.12) 0%, rgba(124, 58, 237, 0.02) 60%, transparent 100%)',
      cardBg: 'linear-gradient(180deg, #ffffff 0%, #faf8ff 100%)',
      outerBgMatte:
        'radial-gradient(circle 200px at 0% 0%, rgba(124, 58, 237, 0.03) 0%, transparent 100%)',
      cardBgMatte: 'linear-gradient(180deg, #f5f3ff, #ffffff)',
      textGradient: 'linear-gradient(180deg, #6d28d9 0%, #7c3aed 100%)',
      lineGradientTop:
        'linear-gradient(90deg, rgba(124, 58, 237, 0.1) 30%, rgba(124, 58, 237, 0.03) 70%)',
      lineGradientLeft:
        'linear-gradient(180deg, rgba(124, 58, 237, 0.08) 30%, rgba(124, 58, 237, 0.03) 70%)',
      lineBorder: 'rgba(124, 58, 237, 0.03)',
      lineBorderMatte: 'rgba(124, 58, 237, 0.02)',
    },
  },
};

const RayCard = React.forwardRef<HTMLDivElement, RayCardProps>(
  (
    {
      variant = 'metric',
      value,
      label,
      icon,
      title,
      themeColor = 'silver',
      styleVariant = 'glossy',
      showGridLines = true,
      speed = 6,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Resolve theme preset configuration
    const activeTheme = React.useMemo(() => {
      if (themeColor in themeGlows) {
        return themeGlows[themeColor];
      }
      return themeGlows.silver;
    }, [themeColor]);

    // Unique class ID for component-scoping inline styles
    const scopeId = React.useId().replace(/:/g, '');

    const cssVars = {
      '--outer-bg-dark': activeTheme.dark.outerBg,
      '--card-bg-dark': activeTheme.dark.cardBg,
      '--outer-bg-matte-dark': activeTheme.dark.outerBgMatte,
      '--card-bg-matte-dark': activeTheme.dark.cardBgMatte,
      '--text-gradient-dark': activeTheme.dark.textGradient,
      '--line-top-gradient-dark': activeTheme.dark.lineGradientTop,
      '--line-left-gradient-dark': activeTheme.dark.lineGradientLeft,
      '--line-border-dark': activeTheme.dark.lineBorder,
      '--line-border-matte-dark': activeTheme.dark.lineBorderMatte,

      '--outer-bg-light': activeTheme.light.outerBg,
      '--card-bg-light': activeTheme.light.cardBg,
      '--outer-bg-matte-light': activeTheme.light.outerBgMatte,
      '--card-bg-matte-light': activeTheme.light.cardBgMatte,
      '--text-gradient-light': activeTheme.light.textGradient,
      '--line-top-gradient-light': activeTheme.light.lineGradientTop,
      '--line-left-gradient-light': activeTheme.light.lineGradientLeft,
      '--line-border-light': activeTheme.light.lineBorder,
      '--line-border-matte-light': activeTheme.light.lineBorderMatte,

      '--dot-color': activeTheme.dotColor,
      '--ray-shadow': activeTheme.rayShadow,
      '--speed': `${speed}s`,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        style={{ ...cssVars, ...style }}
        className={cn(
          `outer-card-${scopeId} outer-card-container`,
          styleVariant === 'glossy' ? 'style-glossy' : 'style-matte',
          className
        )}
        {...props}
      >
        <style>{`
          @keyframes moveDot-${scopeId} {
            0%, 100% {
              top: 10%;
              right: 10%;
            }
            25% {
              top: 10%;
              right: calc(100% - 35px);
            }
            50% {
              top: calc(100% - 30px);
              right: calc(100% - 35px);
            }
            75% {
              top: calc(100% - 30px);
              right: 10%;
            }
          }

          .outer-card-${scopeId} {
            width: 300px;
            height: 250px;
            border-radius: 10px;
            padding: 1px;
            position: relative;
            box-sizing: border-box;
          }

          /* Glossy Outer Bg */
          .outer-card-${scopeId}.style-glossy {
            background: var(--outer-bg-light);
          }
          .dark .outer-card-${scopeId}.style-glossy {
            background: var(--outer-bg-dark);
          }

          /* Matte Outer Bg */
          .outer-card-${scopeId}.style-matte {
            background: var(--outer-bg-matte-light);
          }
          .dark .outer-card-${scopeId}.style-matte {
            background: var(--outer-bg-matte-dark);
          }

          .outer-card-${scopeId} .kanso-ray-card-dot {
            width: 5px;
            aspect-ratio: 1;
            position: absolute;
            background-color: var(--dot-color);
            box-shadow: 0 0 10px var(--dot-color);
            border-radius: 100px;
            z-index: 2;
            animation: moveDot-${scopeId} var(--speed) linear infinite;
          }

          .outer-card-${scopeId} .kanso-ray-card-body {
            z-index: 1;
            width: 100%;
            height: 100%;
            border-radius: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            flex-direction: column;
            box-sizing: border-box;
            overflow: hidden;
            transition: background 0.3s ease, border-color 0.3s ease;
          }

          /* Glossy Body Styling */
          .outer-card-${scopeId}.style-glossy .kanso-ray-card-body {
            border: solid 1px var(--line-border-light);
            background: var(--card-bg-light);
            color: #18181b;
          }
          .dark .outer-card-${scopeId}.style-glossy .kanso-ray-card-body {
            border: solid 1px var(--line-border-dark);
            background: var(--card-bg-dark);
            color: #ffffff;
          }

          /* Matte Body Styling */
          .outer-card-${scopeId}.style-matte .kanso-ray-card-body {
            border: solid 1px var(--line-border-matte-light);
            background: var(--card-bg-matte-light);
            color: #18181b;
          }
          .dark .outer-card-${scopeId}.style-matte .kanso-ray-card-body {
            border: solid 1px var(--line-border-matte-dark);
            background: var(--card-bg-matte-dark);
            color: #ffffff;
          }

          /* Light Sheen Reflection for Glossy Variant */
          .outer-card-${scopeId} .kanso-ray-card-sheen {
            display: none;
          }
          .outer-card-${scopeId}.style-glossy .kanso-ray-card-sheen {
            display: block;
            position: absolute;
            inset: 0;
            background: radial-gradient(circle 150px at 0% 0%, rgba(9, 9, 11, 0.02) 0%, transparent 100%);
            z-index: 1;
            pointer-events: none;
          }
          .dark .outer-card-${scopeId}.style-glossy .kanso-ray-card-sheen {
            background: radial-gradient(circle 150px at 0% 0%, rgba(255, 255, 255, 0.05) 0%, transparent 100%);
          }

          /* Light Ray Styling */
          .outer-card-${scopeId} .kanso-ray-card-ray {
            width: 220px;
            height: 45px;
            border-radius: 100px;
            position: absolute;
            transform-origin: 10%;
            top: 0%;
            left: 0;
            transform: rotate(40deg);
            pointer-events: none;
            transition: opacity 0.5s ease;
          }

          /* Glossy Ray */
          .outer-card-${scopeId}.style-glossy .kanso-ray-card-ray {
            background-color: transparent;
            opacity: 0.06;
            box-shadow: 0 0 45px 5px var(--ray-shadow);
            filter: blur(24px);
          }
          .dark .outer-card-${scopeId}.style-glossy .kanso-ray-card-ray {
            background-color: transparent;
            opacity: 0.08;
          }
          .outer-card-${scopeId}.style-glossy:hover .kanso-ray-card-ray {
            opacity: 0.12;
          }
          .dark .outer-card-${scopeId}.style-glossy:hover .kanso-ray-card-ray {
            opacity: 0.16;
          }

          /* Matte Ray */
          .outer-card-${scopeId}.style-matte .kanso-ray-card-ray {
            background-color: transparent;
            opacity: 0.03;
            box-shadow: 0 0 35px 2px var(--ray-shadow);
            filter: blur(32px);
          }
          .dark .outer-card-${scopeId}.style-matte .kanso-ray-card-ray {
            background-color: transparent;
            opacity: 0.05;
          }
          .outer-card-${scopeId}.style-matte:hover .kanso-ray-card-ray {
            opacity: 0.06;
          }
          .dark .outer-card-${scopeId}.style-matte:hover .kanso-ray-card-ray {
            opacity: 0.10;
          }

          .outer-card-${scopeId} .kanso-ray-card-text {
            font-weight: 900;
            font-size: 4rem;
            background: var(--text-gradient-light);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            line-height: 1;
            user-select: none;
          }

          .dark .outer-card-${scopeId} .kanso-ray-card-text {
            background: var(--text-gradient-dark);
            background-clip: text;
            -webkit-background-clip: text;
          }

          .outer-card-${scopeId} .kanso-ray-card-line {
            width: 100%;
            height: 1px;
            position: absolute;
            pointer-events: none;
          }

          /* Glossy Lines color */
          .outer-card-${scopeId}.style-glossy .kanso-ray-card-line {
            background-color: var(--line-border-light);
          }
          .dark .outer-card-${scopeId}.style-glossy .kanso-ray-card-line {
            background-color: var(--line-border-dark);
          }

          /* Matte Lines color */
          .outer-card-${scopeId}.style-matte .kanso-ray-card-line {
            background-color: var(--line-border-matte-light);
          }
          .dark .outer-card-${scopeId}.style-matte .kanso-ray-card-line {
            background-color: var(--line-border-matte-dark);
          }

          .outer-card-${scopeId} .kanso-ray-card-topl {
            top: 10%;
            background: var(--line-top-gradient-light);
          }
          .dark .outer-card-${scopeId} .kanso-ray-card-topl {
            background: var(--line-top-gradient-dark);
          }

          .outer-card-${scopeId} .kanso-ray-card-bottoml {
            bottom: 10%;
          }

          .outer-card-${scopeId} .kanso-ray-card-leftl {
            left: 10%;
            width: 1px;
            height: 100%;
            background: var(--line-left-gradient-light);
          }
          .dark .outer-card-${scopeId} .kanso-ray-card-leftl {
            background: var(--line-left-gradient-dark);
          }

          .outer-card-${scopeId} .kanso-ray-card-rightl {
            right: 10%;
            width: 1px;
            height: 100%;
          }
        `}</style>

        {/* Tracing Dot */}
        <div className="kanso-ray-card-dot" />

        {/* Card Body */}
        <div className="kanso-ray-card-body">
          {/* Diagnostic Light Ray */}
          <div className="kanso-ray-card-ray" />

          {/* Glossy Sheen Reflection Overlay */}
          <div className="kanso-ray-card-sheen" />

          {/* Card Content Layout */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center w-full h-full select-none pointer-events-none">
            {variant === 'metric' && (
              <>
                <div className="kanso-ray-card-text">{value || '750k'}</div>
                <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-400 dark:text-zinc-500 font-bold mt-1.5">
                  {label || 'Views'}
                </div>
              </>
            )}

            {variant === 'feature' && (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                {icon && (
                  <div className="mb-3 size-7 flex items-center justify-center text-zinc-800 dark:text-white">
                    {icon}
                  </div>
                )}
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">
                  {title || 'Feature Item'}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-[85%] leading-relaxed">
                  {label || 'Brief description details of this card.'}
                </p>
              </div>
            )}

            {variant === 'custom' && children}
          </div>

          {/* Blueprint Drafting lines */}
          {showGridLines && (
            <>
              <div className="kanso-ray-card-line kanso-ray-card-topl" />
              <div className="kanso-ray-card-line kanso-ray-card-leftl" />
              <div className="kanso-ray-card-line kanso-ray-card-bottoml" />
              <div className="kanso-ray-card-line kanso-ray-card-rightl" />
            </>
          )}
        </div>
      </div>
    );
  }
);

RayCard.displayName = 'RayCard';

export { RayCard };
