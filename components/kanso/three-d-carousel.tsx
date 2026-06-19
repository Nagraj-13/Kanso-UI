'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/* 1️⃣  Assets & Placeholders ————————————————————————— */
const FALLBACK =
  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ' +
  'width="160" height="220"><rect width="100%" height="100%" ' +
  'fill="%2327272a"/><text x="50%" y="50%" dominant-baseline="middle"' +
  ' text-anchor="middle" fill="%2371717a" font-size="14">Image</text></svg>';

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600&h=800',
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=600&h=800',
  'https://images.unsplash.com/photo-1541562232579-512a21360020?auto=format&fit=crop&q=80&w=600&h=800',
  'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=600&h=800',
  'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&q=80&w=600&h=800',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600&h=800',
];

/* 2️⃣  Config Defaults ————————————————————————— */
const CARD_W = 180;
const CARD_H = 240;
const RADIUS = 240;
const TILT_SENSITIVITY = 10;
const DRAG_SENSITIVITY = 0.5;
const INERTIA_FRICTION = 0.95;
const AUTOSPIN_SPEED = 0.08;
const IDLE_TIMEOUT = 2000;

/* 3️⃣  Card Component ————————————————— */
interface CardProps {
  src: string;
  transform: string;
  cardW: number;
  cardH: number;
  innerRef: (el: HTMLDivElement | null) => void;
}

const Card = React.memo(
  ({ src, transform, cardW, cardH, innerRef }: CardProps) => (
    <div
      ref={innerRef}
      className="absolute group/card cursor-pointer"
      style={{
        width: cardW,
        height: cardH,
        transform,
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity, filter',
        // Reflection progressive enhancement for WebKit/Blink
        WebkitBoxReflect:
          'below 12px linear-gradient(transparent 60%, rgba(0, 0, 0, 0.15))',
      }}
    >
      <div
        className="relative size-full rounded-2xl overflow-hidden bg-zinc-900
                 border border-zinc-200/10 dark:border-zinc-800/60 shadow-lg
                 transition-transform duration-500 ease-out group-hover/card:scale-[1.03] group-hover/card:shadow-2xl"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="Carousel gallery item"
          width={cardW}
          height={cardH}
          className="size-full object-cover select-none pointer-events-none"
          loading="lazy"
          draggable="false"
          onError={(e) => {
            e.currentTarget.src = FALLBACK;
          }}
        />

        {/* Glossy reflection glass sheen overlay on hover */}
        <div
          className="absolute inset-0 z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 100%)',
          }}
        />
      </div>
    </div>
  )
);

Card.displayName = 'Card';

/* 4️⃣  Main Component —————————————————— */
export interface ThreeDCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of image source URLs */
  images?: string[];
  /** Outer orbit cylinder radius (default: 240) */
  radius?: number;
  /** Width of each card in pixels (default: 180) */
  cardW?: number;
  /** Height of each card in pixels (default: 240) */
  cardH?: number;
  /** Whether autospin is active by default (default: true) */
  autoSpin?: boolean;
}

const ThreeDCarousel = React.forwardRef<HTMLDivElement, ThreeDCarouselProps>(
  (
    {
      images = DEFAULT_IMAGES,
      radius = RADIUS,
      cardW = CARD_W,
      cardH = CARD_H,
      autoSpin = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const parentRef = React.useRef<HTMLDivElement>(null);
    const wheelRef = React.useRef<HTMLDivElement>(null);
    const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);

    const rotationRef = React.useRef(0);
    const tiltRef = React.useRef(0);
    const targetTiltRef = React.useRef(0);
    const velocityRef = React.useRef(0);
    const isDraggingRef = React.useRef(false);
    const dragStartRef = React.useRef(0);
    const initialRotationRef = React.useRef(0);
    const lastInteractionRef = React.useRef(Date.now());
    const animationFrameRef = React.useRef<number | null>(null);
    const [isAutospinActive, setIsAutospinActive] = React.useState(autoSpin);

    // Resolve combined refs
    const localRef = React.useRef<HTMLDivElement>(null);
    const resolvedRef = (ref ||
      localRef) as React.RefObject<HTMLDivElement | null>;

    // Handle mouse movement for ambient perspective tilting
    React.useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        const container = resolvedRef.current;
        if (!container || isDraggingRef.current) return;

        lastInteractionRef.current = Date.now();
        const rect = container.getBoundingClientRect();
        const mouseY = e.clientY - rect.top;
        const normalizedY = (mouseY / rect.height - 0.5) * 2;

        targetTiltRef.current = -normalizedY * TILT_SENSITIVITY;
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, [resolvedRef]);

    // Carousel Physics & Camera Depth-of-Field Animation Engine
    React.useEffect(() => {
      const animate = () => {
        if (!isDraggingRef.current) {
          // Apply rotation inertia
          if (Math.abs(velocityRef.current) > 0.01) {
            rotationRef.current += velocityRef.current;
            velocityRef.current *= INERTIA_FRICTION;
          } else if (
            isAutospinActive &&
            Date.now() - lastInteractionRef.current > IDLE_TIMEOUT
          ) {
            rotationRef.current += AUTOSPIN_SPEED;
          }
        }

        tiltRef.current += (targetTiltRef.current - tiltRef.current) * 0.1;

        if (wheelRef.current) {
          wheelRef.current.style.transform = `rotateX(${tiltRef.current}deg) rotateY(${rotationRef.current}deg)`;
        }

        // Apply Premium Depth-of-Field camera focus mapping
        const totalCards = images.length;
        cardRefs.current.forEach((cardEl, idx) => {
          if (!cardEl) return;

          // Calculate absolute visual angle of this card relative to front camera view
          const cardBaseAngle = (idx * 360) / totalCards;
          const absoluteAngle = cardBaseAngle + rotationRef.current;

          // Cosine of current angle represents Z depth (-1 is back, 1 is front)
          const cos = Math.cos((absoluteAngle * Math.PI) / 180);
          const depth = (cos + 1) / 2; // 0 (back of carousel) to 1 (front center of carousel)

          // 1. Map depth to opacity: front cards are opaque, back cards fade out softly
          const opacity = 0.25 + 0.75 * depth;
          cardEl.style.opacity = opacity.toFixed(2);

          // 2. Map depth to blur: back cards undergo cinematic blur
          const blurAmount = (1 - depth) * 3.5; // Up to 3.5px blur at the very back
          cardEl.style.filter =
            blurAmount > 0.15 ? `blur(${blurAmount.toFixed(2)}px)` : 'none';

          // 3. Map depth to visual z-index stacking layers
          const zIndex = Math.round(depth * 100);
          cardEl.style.zIndex = zIndex.toString();
        });

        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animationFrameRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isAutospinActive, images.length]);

    const handleDragStart = React.useCallback((clientX: number) => {
      lastInteractionRef.current = Date.now();
      isDraggingRef.current = true;
      velocityRef.current = 0;
      dragStartRef.current = clientX;
      initialRotationRef.current = rotationRef.current;
    }, []);

    const handleDragMove = React.useCallback((clientX: number) => {
      if (!isDraggingRef.current) return;
      lastInteractionRef.current = Date.now();

      const deltaX = clientX - dragStartRef.current;
      const newRotation =
        initialRotationRef.current + deltaX * DRAG_SENSITIVITY;

      velocityRef.current = newRotation - rotationRef.current;
      rotationRef.current = newRotation;
    }, []);

    const handleDragEnd = React.useCallback(() => {
      isDraggingRef.current = false;
      lastInteractionRef.current = Date.now();
    }, []);

    // Drag event handlers
    const onMouseDown = (e: React.MouseEvent) => {
      if (e.button !== 0) return; // Only left click
      handleDragStart(e.clientX);
    };

    const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
    const onTouchStart = (e: React.TouchEvent) =>
      handleDragStart(e.touches[0].clientX);
    const onTouchMove = (e: React.TouchEvent) =>
      handleDragMove(e.touches[0].clientX);

    // Keyboard accessibility navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      lastInteractionRef.current = Date.now();
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        velocityRef.current = 0;
        rotationRef.current += 15; // Rotate clockwise
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        velocityRef.current = 0;
        rotationRef.current -= 15; // Rotate counter-clockwise
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        setIsAutospinActive((prev) => !prev);
      }
    };

    // Pre-compute 3D position vectors for card layouts
    const cards = React.useMemo(
      () =>
        images.map((src, idx) => {
          const angle = (idx * 360) / images.length;
          return {
            key: idx,
            src,
            transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
          };
        }),
      [images, radius]
    );

    return (
      <div
        ref={resolvedRef}
        role="region"
        aria-label="3D Image Gallery Carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={handleDragEnd}
        className={cn(
          'w-full h-full flex flex-col items-center justify-center overflow-hidden font-sans outline-none select-none relative',
          'cursor-grab active:cursor-grabbing border border-zinc-200/50 dark:border-zinc-800/40 rounded-2xl bg-zinc-50/10 dark:bg-zinc-950/20',
          'focus-visible:ring-1 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-700',
          className
        )}
        style={{ ...style, userSelect: 'none' }}
        {...props}
      >
        {/* Subtle atmospheric vignette backdrop */}
        <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(9,9,11,0.15)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)]" />

        <div
          className="relative flex items-center justify-center z-10"
          style={{
            perspective: 1000,
            perspectiveOrigin: 'center',
            width: Math.max(cardW * 1.5, radius * 2.2),
            height: Math.max(cardH * 1.8, radius * 1.5),
          }}
        >
          {/* Cylinder Wheel Container */}
          <div
            ref={wheelRef}
            className="relative"
            style={{
              width: cardW,
              height: cardH,
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              position: 'absolute',
              left: '50%',
              top: '50%',
              marginLeft: -cardW / 2,
              marginTop: -cardH / 2,
            }}
          >
            {cards.map((card, idx) => (
              <Card
                key={card.key}
                src={card.src}
                transform={card.transform}
                cardW={cardW}
                cardH={cardH}
                innerRef={(el) => {
                  cardRefs.current[idx] = el;
                }}
              />
            ))}
          </div>
        </div>

        {/* Ambient guidelines help text (fades out on interaction) */}
        <div className="absolute bottom-4 flex items-center gap-4 text-[10px] text-zinc-450 dark:text-zinc-500 font-mono pointer-events-none tracking-wider uppercase z-20">
          <span>Drag or Left/Right arrows to rotate</span>
          <span className="text-zinc-300 dark:text-zinc-800">•</span>
          <span>Space to toggle play</span>
        </div>
      </div>
    );
  }
);

ThreeDCarousel.displayName = 'ThreeDCarousel';

export { ThreeDCarousel };
