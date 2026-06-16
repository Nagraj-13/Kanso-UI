'use client';

import * as React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from '@/lib/utils';

const MouseEnterContext = React.createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

// --- Helpers for HSL Color and Shadow generation ---
function parseHSL(hslStr: string): { h: number; s: number; l: number } {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return {
    h: parseFloat(match[1]),
    s: parseFloat(match[2]),
    l: parseFloat(match[3]),
  };
}

function buildBoxShadow(glowColor: string, intensity: number): string {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const layers: [number, number, number, number, number, boolean][] = [
    [0, 0, 0, 1, 100, true],
    [0, 0, 1, 0, 60, true],
    [0, 0, 3, 0, 50, true],
    [0, 0, 6, 0, 40, true],
    [0, 0, 15, 0, 30, true],
    [0, 0, 25, 2, 20, true],
    [0, 0, 50, 2, 10, true],
    [0, 0, 1, 0, 60, false],
    [0, 0, 3, 0, 50, false],
    [0, 0, 6, 0, 40, false],
    [0, 0, 15, 0, 30, false],
    [0, 0, 25, 2, 20, false],
    [0, 0, 50, 2, 10, false],
  ];
  return layers
    .map(([x, y, blur, spread, alpha, inset]) => {
      const a = Math.min(alpha * intensity, 100);
      return `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px hsl(${base} / ${a}%)`;
    })
    .join(', ');
}

const GRADIENT_POSITIONS = [
  '80% 55%',
  '69% 34%',
  '8% 6%',
  '41% 38%',
  '86% 85%',
  '82% 18%',
  '51% 4%',
];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildMeshGradients(colors: string[]): string[] {
  const gradients: string[] = [];
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    gradients.push(
      `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`
    );
  }
  gradients.push(`linear-gradient(${colors[0]} 0 100%)`);
  return gradients;
}

interface InteractiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  containerClassName?: string;
  // Border Glow Props
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
  // Spotlight Props
  spotlightColor?: string;
  spotlightSize?: number;
}

/**
 * InteractiveCard — A premium card that combines 3D perspective tilting, cursor-following spotlights,
 * and edge-sensitive conic mesh gradient borders into a single, unified client wrapper.
 *
 * Fully optimized with hardware-accelerated style assignments and Framer Motion values to ensure
 * smooth 60fps tracking without triggering React component re-renders.
 */
function InteractiveCard({
  children,
  className,
  containerClassName,
  edgeSensitivity = 30,
  glowColor = '40 80 80',
  backgroundColor = '#120F17',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 25,
  animated = false,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  fillOpacity = 0.5,
  spotlightColor,
  spotlightSize = 300,
  ...props
}: InteractiveCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  // Framer Motion values for tracking cursor and proximity smoothly
  const mouseAngle = useMotionValue(45);
  const edgeProximity = useMotionValue(0);

  // Map values to opacities using linear scaling equations
  const colorSensitivity = edgeSensitivity + 20;

  const borderOpacity = useTransform(edgeProximity, (v) => {
    const scale = v * 100;
    if (scale <= colorSensitivity) return 0;
    return Math.min(1, (scale - colorSensitivity) / (100 - colorSensitivity));
  });

  const glowOpacity = useTransform(edgeProximity, (v) => {
    const scale = v * 100;
    if (scale <= edgeSensitivity) return 0;
    return Math.min(1, (scale - edgeSensitivity) / (100 - edgeSensitivity));
  });

  const getCenterOfElement = React.useCallback((el: HTMLElement) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximityValue = React.useCallback(
    (el: HTMLElement, x: number, y: number) => {
      const [cx, cy] = getCenterOfElement(el);
      const dx = x - cx;
      const dy = y - cy;
      let kx = Infinity;
      let ky = Infinity;
      if (dx !== 0) kx = cx / Math.abs(dx);
      if (dy !== 0) ky = cy / Math.abs(dy);
      return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    },
    [getCenterOfElement]
  );

  const getCursorAngleValue = React.useCallback(
    (el: HTMLElement, x: number, y: number) => {
      const [cx, cy] = getCenterOfElement(el);
      const dx = x - cx;
      const dy = y - cy;
      if (dx === 0 && dy === 0) return 0;
      const radians = Math.atan2(dy, dx);
      let degrees = radians * (180 / Math.PI) + 90;
      if (degrees < 0) degrees += 360;
      return degrees;
    },
    [getCenterOfElement]
  );

  // Unified pointer handler for Spotlight, Border Glow, and 3D Tilt
  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 1. Spotlight updates (update CSS variables directly on DOM node)
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 2. Border Glow updates (update Motion Values)
      const proximity = getEdgeProximityValue(card, x, y);
      const angle = getCursorAngleValue(card, x, y);
      edgeProximity.set(proximity);
      mouseAngle.set(angle);

      // 3. 3D Tilt updates (disable transitions for zero-latency tracking)
      const tiltX = (e.clientX - rect.left - rect.width / 2) / 25;
      const tiltY = (e.clientY - rect.top - rect.height / 2) / 25;
      card.style.transition = 'none';
      card.style.transform = `rotateY(${tiltX}deg) rotateX(${-tiltY}deg)`;
    },
    [getEdgeProximityValue, getCursorAngleValue, edgeProximity, mouseAngle]
  );

  const handlePointerEnter = React.useCallback(() => {
    setIsHovered(true);
    const card = cardRef.current;
    if (card) {
      card.style.transition = 'transform 0.3s ease-out';
    }
    animate(edgeProximity, 1, { duration: 0.2, ease: 'easeOut' });
  }, [edgeProximity]);

  const handlePointerLeave = React.useCallback(() => {
    setIsHovered(false);
    const card = cardRef.current;
    if (card) {
      // Snaps back smoothly
      card.style.transition =
        'transform 0.5s cubic-bezier(0.03, 0.98, 0.52, 0.99)';
      card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    }
    animate(edgeProximity, 0, { duration: 0.5, ease: 'easeInOut' });
  }, [edgeProximity]);

  // Mount animation sweep logic
  React.useEffect(() => {
    if (!animated) return;

    const angleStart = 110;
    const angleEnd = 465;

    mouseAngle.set(angleStart);
    edgeProximity.set(0);

    const proxAnim = animate(edgeProximity, 1, {
      duration: 0.6,
      ease: 'easeOut',
    });

    const angleAnim = animate(mouseAngle, angleEnd, {
      duration: 3.5,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.1,
    });

    const endAnim = animate(edgeProximity, 0, {
      duration: 1.2,
      ease: 'easeIn',
      delay: 2.8,
    });

    return () => {
      proxAnim.stop();
      angleAnim.stop();
      endAnim.stop();
    };
  }, [animated, mouseAngle, edgeProximity]);

  const meshGradients = buildMeshGradients(colors);
  const borderBg = meshGradients.map((g) => `${g} border-box`);
  const fillBg = meshGradients.map((g) => `${g} padding-box`);

  // Dynamically map motion values to string CSS variables
  const angleDeg = useTransform(mouseAngle, (a) => `${a.toFixed(3)}deg`);

  return (
    <MouseEnterContext.Provider value={[isHovered, setIsHovered]}>
      <div
        className={cn(
          'py-12 flex items-center justify-center',
          containerClassName
        )}
        style={{ perspective: '1000px' }}
      >
        <div
          ref={cardRef}
          onPointerMove={handlePointerMove}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          className={cn(
            'relative grid isolate border border-white/10 overflow-hidden',
            className
          )}
          style={
            {
              transformStyle: 'preserve-3d',
              background: backgroundColor,
              borderRadius: `${borderRadius}px`,
              transform: 'translate3d(0, 0, 0.01px)',
              boxShadow:
                'rgba(0,0,0,0.15) 0 1px 2px, rgba(0,0,0,0.15) 0 2px 4px, rgba(0,0,0,0.15) 0 4px 8px, rgba(0,0,0,0.15) 0 8px 16px, rgba(0,0,0,0.15) 0 16px 32px',
              '--spotlight-size': `${spotlightSize}px`,
              ...(spotlightColor
                ? { '--spotlight-color': spotlightColor }
                : {}),
            } as React.CSSProperties
          }
          {...props}
        >
          {/* --- LAYER: Spotlight --- */}
          <div className="absolute inset-0 z-0 overflow-hidden rounded-[inherit] pointer-events-none">
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 [--kanso-spotlight:rgba(255,255,255,0.06)]"
              style={{
                background: `radial-gradient(var(--spotlight-size) circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--spotlight-color, var(--kanso-spotlight)), transparent 80%)`,
              }}
            />
          </div>

          {/* --- LAYER: Border Glow Mesh Gradient --- */}
          <motion.div
            className="absolute inset-0 rounded-[inherit] pointer-events-none -z-[1]"
            style={{
              border: '1px solid transparent',
              background: [
                `linear-gradient(${backgroundColor} 0 100%) padding-box`,
                'linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box',
                ...borderBg,
              ].join(', '),
              opacity: borderOpacity,
              maskImage: useTransform(
                angleDeg,
                (angle) =>
                  `conic-gradient(from ${angle} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`
              ),
              WebkitMaskImage: useTransform(
                angleDeg,
                (angle) =>
                  `conic-gradient(from ${angle} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`
              ),
            }}
          />

          {/* --- LAYER: Border Glow Fill Near Edges --- */}
          <motion.div
            className="absolute inset-0 rounded-[inherit] pointer-events-none -z-[1]"
            style={
              {
                border: '1px solid transparent',
                background: fillBg.join(', '),
                maskImage: useTransform(angleDeg, (angle) =>
                  [
                    'linear-gradient(to bottom, black, black)',
                    'radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)',
                    'radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)',
                    'radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)',
                    'radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)',
                    'radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)',
                    `conic-gradient(from ${angle} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
                  ].join(', ')
                ),
                WebkitMaskImage: useTransform(angleDeg, (angle) =>
                  [
                    'linear-gradient(to bottom, black, black)',
                    'radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)',
                    'radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)',
                    'radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)',
                    'radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)',
                    'radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)',
                    `conic-gradient(from ${angle} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
                  ].join(', ')
                ),
                maskComposite: 'subtract, add, add, add, add, add',
                WebkitMaskComposite:
                  'source-out, source-over, source-over, source-over, source-over, source-over',
                opacity: useTransform(borderOpacity, (v) => v * fillOpacity),
                mixBlendMode: 'soft-light',
              } as unknown as React.CSSProperties
            }
          />

          {/* --- LAYER: Outer Glow --- */}
          <motion.span
            className="absolute pointer-events-none z-[1] rounded-[inherit]"
            style={
              {
                inset: `${-glowRadius}px`,
                maskImage: useTransform(
                  angleDeg,
                  (angle) =>
                    `conic-gradient(from ${angle} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`
                ),
                WebkitMaskImage: useTransform(
                  angleDeg,
                  (angle) =>
                    `conic-gradient(from ${angle} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`
                ),
                opacity: glowOpacity,
                mixBlendMode: 'plus-lighter',
              } as unknown as React.CSSProperties
            }
          >
            <span
              className="absolute rounded-[inherit]"
              style={{
                inset: `${glowRadius}px`,
                boxShadow: buildBoxShadow(glowColor, glowIntensity),
              }}
            />
          </motion.span>

          {/* --- CONTENT --- */}
          <div className="flex flex-col relative z-10 w-full h-full">
            {children}
          </div>
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
}

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function CardBody({ children, className, ...props }: CardBodyProps) {
  return (
    <div
      className={cn(
        'h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type CardItemProps<T extends React.ElementType = 'div'> = {
  as?: T;
  children?: React.ReactNode;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
} & Omit<
  React.ComponentPropsWithoutRef<T>,
  | 'as'
  | 'children'
  | 'translateX'
  | 'translateY'
  | 'translateZ'
  | 'rotateX'
  | 'rotateY'
  | 'rotateZ'
>;

function formatTranslate(val: number | string): string {
  if (typeof val === 'number') return `${val}px`;
  return val;
}

function formatRotate(val: number | string): string {
  if (typeof val === 'number') return `${val}deg`;
  return val;
}

function CardItem<T extends React.ElementType = 'div'>({
  as,
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...props
}: CardItemProps<T>) {
  const ref = React.useRef<HTMLElement>(null);
  const [isMouseEntered] = useMouseEnter();

  React.useEffect(() => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${formatTranslate(translateX)}) translateY(${formatTranslate(translateY)}) translateZ(${formatTranslate(translateZ)}) rotateX(${formatRotate(rotateX)}) rotateY(${formatRotate(rotateY)}) rotateZ(${formatRotate(rotateZ)})`;
    } else {
      ref.current.style.transform =
        'translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
    }
  }, [
    isMouseEntered,
    translateX,
    translateY,
    translateZ,
    rotateX,
    rotateY,
    rotateZ,
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = (as || 'div') as any;

  return (
    <Tag
      ref={ref as unknown as React.Ref<HTMLDivElement>}
      className={cn(
        'w-fit transition-transform duration-300 ease-out',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

function useMouseEnter() {
  const context = React.useContext(MouseEnterContext);
  if (context === undefined) {
    return [false, () => {}] as [
      boolean,
      React.Dispatch<React.SetStateAction<boolean>>,
    ];
  }
  return context;
}

export { InteractiveCard, CardBody, CardItem, useMouseEnter };
export type { InteractiveCardProps, CardBodyProps, CardItemProps };
