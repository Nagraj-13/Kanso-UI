'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/* 1️⃣  Assets & Placeholders ————————————————————————— */
const FALLBACK =
  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ' +
  'width="100" height="100"><rect width="100%" height="100%" ' +
  'fill="%2327272a"/><circle cx="50%" cy="50%" r="40%" fill="%233f3f46"/>' +
  '<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" ' +
  'fill="%23a1a1aa" font-size="12">Image</text></svg>';

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=300&h=300',
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=300&h=300',
  'https://images.unsplash.com/photo-1541562232579-512a21360020?auto=format&fit=crop&q=80&w=300&h=300',
  'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=300&h=300',
  'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&q=80&w=300&h=300',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=300&h=300',
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=300&h=300',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=300&h=300',
  'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=300&h=300',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=300&h=300',
];

/* 2️⃣  Config Defaults ————————————————————————— */
const RADIUS = 200;
const CARD_SIZE = 100;
const DRAG_SENSITIVITY = 0.35;
const INERTIA_FRICTION = 0.95;
const AUTOSPIN_SPEED = 0.05;
const IDLE_TIMEOUT = 2000;

/* 3️⃣  Card Component ————————————————— */
interface CardProps {
  src: string;
  cardSize: number;
  innerRef: (el: HTMLDivElement | null) => void;
}

const Card = React.memo(({ src, cardSize, innerRef }: CardProps) => (
  <div
    ref={innerRef}
    className="absolute origin-center group/card cursor-pointer"
    style={{
      width: cardSize,
      height: cardSize,
      willChange: 'transform, opacity, filter',
      position: 'absolute',
      left: '50%',
      top: '50%',
      marginLeft: -cardSize / 2,
      marginTop: -cardSize / 2,
    }}
  >
    <div
      className="relative size-full rounded-full overflow-hidden bg-zinc-900
                 border border-zinc-200/10 dark:border-zinc-800/60 shadow-lg
                 transition-transform duration-500 ease-out group-hover/card:scale-110 group-hover/card:shadow-2xl group-hover/card:border-zinc-400/30"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Sphere gallery item"
        width={cardSize}
        height={cardSize}
        className="size-full object-cover select-none pointer-events-none"
        loading="lazy"
        draggable="false"
        onError={(e) => {
          e.currentTarget.src = FALLBACK;
        }}
      />
      {/* Dynamic light gradient sheen */}
      <div
        className="absolute inset-0 z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)',
        }}
      />
    </div>
  </div>
));

Card.displayName = 'Card';

/* 4️⃣  Main Component —————————————————— */
export interface SphereCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of image URLs to distribute on the sphere */
  images?: string[];
  /** Radius of the sphere in pixels (default: 200) */
  radius?: number;
  /** Dimension size (width and height) of the circular cards in pixels (default: 100) */
  cardSize?: number;
  /** Whether the sphere auto-spins when idle (default: true) */
  autoSpin?: boolean;
}

const SphereCarousel = React.forwardRef<HTMLDivElement, SphereCarouselProps>(
  (
    {
      images = DEFAULT_IMAGES,
      radius = RADIUS,
      cardSize = CARD_SIZE,
      autoSpin = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);

    const rotationXRef = React.useRef(0);
    const rotationYRef = React.useRef(0);

    const velocityXRef = React.useRef(0);
    const velocityYRef = React.useRef(0);

    const isDraggingRef = React.useRef(false);
    const dragStartRef = React.useRef({ x: 0, y: 0 });
    const initialRotationRef = React.useRef({ x: 0, y: 0 });
    const lastRotationRef = React.useRef({ x: 0, y: 0 });

    const lastInteractionRef = React.useRef(Date.now());
    const animationFrameRef = React.useRef<number | null>(null);
    const [isAutospinActive, setIsAutospinActive] = React.useState(autoSpin);

    // Resolve refs
    const localRef = React.useRef<HTMLDivElement>(null);
    const resolvedRef = (ref ||
      localRef) as React.RefObject<HTMLDivElement | null>;

    // Generate static point vectors on the sphere surface using Fibonacci Sphere distribution
    const basePoints = React.useMemo(() => {
      const N = images.length;
      const points = [];
      const goldenAngle = Math.PI * (3.0 - Math.sqrt(5.0));

      for (let i = 0; i < N; i++) {
        // Distribute y coordinates evenly from 1 to -1
        const yVal = N === 1 ? 0 : 1.0 - (i / (N - 1)) * 2.0;
        const radiusAtY = Math.sqrt(1.0 - yVal * yVal);

        const theta = goldenAngle * i;

        const xVal = Math.cos(theta) * radiusAtY;
        const zVal = Math.sin(theta) * radiusAtY;

        points.push({
          x: xVal * radius,
          y: yVal * radius,
          z: zVal * radius,
        });
      }
      return points;
    }, [images.length, radius]);

    // Physics Animation Engine
    React.useEffect(() => {
      const animate = () => {
        if (!isDraggingRef.current) {
          // Apply velocity dampening
          if (Math.abs(velocityYRef.current) > 0.01) {
            rotationYRef.current += velocityYRef.current;
            velocityYRef.current *= INERTIA_FRICTION;
          }
          if (Math.abs(velocityXRef.current) > 0.01) {
            rotationXRef.current += velocityXRef.current;
            velocityXRef.current *= INERTIA_FRICTION;
          }

          // Idle autoplay spinning
          if (
            isAutospinActive &&
            Date.now() - lastInteractionRef.current > IDLE_TIMEOUT
          ) {
            rotationYRef.current += AUTOSPIN_SPEED;
            // Introduce a subtle vertical wobble
            rotationXRef.current += AUTOSPIN_SPEED * 0.3;
          }
        }

        // Apply 3D Rotations & Billboarding
        const radY = (rotationYRef.current * Math.PI) / 180;
        const cosY = Math.cos(radY);
        const sinY = Math.sin(radY);

        const radX = (rotationXRef.current * Math.PI) / 180;
        const cosX = Math.cos(radX);
        const sinX = Math.sin(radX);

        basePoints.forEach((pt, idx) => {
          const cardEl = cardRefs.current[idx];
          if (!cardEl) return;

          // 1. Rotate Y-axis (left/right)
          const x1 = pt.x * cosY - pt.z * sinY;
          const z1 = pt.x * sinY + pt.z * cosY;

          // 2. Rotate X-axis (up/down)
          const y2 = pt.y * cosX - z1 * sinX;
          const z2 = pt.y * sinX + z1 * cosX;

          // Normalize depth mapping (z2 ranges from -radius to +radius)
          const depth = (z2 + radius) / (2 * radius); // 0 (back) to 1 (front)

          // Premium visual properties mapped to coordinate depth
          const scale = 0.55 + 0.45 * depth; // Scale size
          const opacity = 0.2 + 0.8 * depth; // Fade intensity
          const blurAmount = (1 - depth) * 4.5; // Depth-of-Field blur
          const zIndex = Math.round(depth * 100); // Visual sorting layer

          // Direct DOM updates for maximum performance
          cardEl.style.transform = `translate3d(${x1.toFixed(1)}px, ${y2.toFixed(1)}px, ${z2.toFixed(1)}px) scale(${scale.toFixed(2)})`;
          cardEl.style.opacity = opacity.toFixed(2);
          cardEl.style.filter =
            blurAmount > 0.15 ? `blur(${blurAmount.toFixed(2)}px)` : 'none';
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
    }, [basePoints, isAutospinActive, radius]);

    // Handle Drag Actions
    const handleDragStart = React.useCallback(
      (clientX: number, clientY: number) => {
        lastInteractionRef.current = Date.now();
        isDraggingRef.current = true;
        velocityXRef.current = 0;
        velocityYRef.current = 0;
        dragStartRef.current = { x: clientX, y: clientY };
        initialRotationRef.current = {
          x: rotationXRef.current,
          y: rotationYRef.current,
        };
        lastRotationRef.current = {
          x: rotationXRef.current,
          y: rotationYRef.current,
        };
      },
      []
    );

    const handleDragMove = React.useCallback(
      (clientX: number, clientY: number) => {
        if (!isDraggingRef.current) return;
        lastInteractionRef.current = Date.now();

        const deltaX = clientX - dragStartRef.current.x;
        const deltaY = clientY - dragStartRef.current.y;

        rotationYRef.current =
          initialRotationRef.current.y + deltaX * DRAG_SENSITIVITY;
        rotationXRef.current =
          initialRotationRef.current.x - deltaY * DRAG_SENSITIVITY;

        // Track speed vector for inertia calculations on release
        velocityYRef.current = rotationYRef.current - lastRotationRef.current.y;
        velocityXRef.current = rotationXRef.current - lastRotationRef.current.x;

        lastRotationRef.current = {
          x: rotationXRef.current,
          y: rotationYRef.current,
        };
      },
      []
    );

    const handleDragEnd = React.useCallback(() => {
      isDraggingRef.current = false;
      lastInteractionRef.current = Date.now();
    }, []);

    // Interactive event bindings
    const onMouseDown = (e: React.MouseEvent) => {
      if (e.button !== 0) return; // Left click only
      handleDragStart(e.clientX, e.clientY);
    };

    const onMouseMove = (e: React.MouseEvent) =>
      handleDragMove(e.clientX, e.clientY);
    const onTouchStart = (e: React.TouchEvent) =>
      handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
    const onTouchMove = (e: React.TouchEvent) =>
      handleDragMove(e.touches[0].clientX, e.touches[0].clientY);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      lastInteractionRef.current = Date.now();
      velocityXRef.current = 0;
      velocityYRef.current = 0;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        rotationYRef.current += 10;
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        rotationYRef.current -= 10;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        rotationXRef.current += 10;
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        rotationXRef.current -= 10;
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        setIsAutospinActive((prev) => !prev);
      }
    };

    return (
      <div
        ref={resolvedRef}
        role="region"
        aria-label="3D Spherical Image Gallery"
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
        {/* Subtle holographic core background glow */}
        <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(9,9,11,0.12)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.5)_100%)]" />

        {/* 3D Space viewport */}
        <div
          className="relative flex items-center justify-center z-10"
          style={{
            perspective: 800,
            perspectiveOrigin: 'center',
            width: radius * 2 + cardSize * 1.5,
            height: radius * 2 + cardSize * 1.5,
          }}
        >
          {/* Central Origin coordinate offset */}
          <div className="relative size-0 transform-style-3d">
            {images.map((src, idx) => (
              <Card
                key={`sphere-card-${idx}`}
                src={src}
                cardSize={cardSize}
                innerRef={(el) => {
                  cardRefs.current[idx] = el;
                }}
              />
            ))}
          </div>
        </div>

        {/* Ambient guidelines help text */}
        <div className="absolute bottom-4 flex items-center gap-4 text-[10px] text-zinc-450 dark:text-zinc-500 font-mono pointer-events-none tracking-wider uppercase z-20">
          <span>Drag in any direction to spin</span>
          <span className="text-zinc-300 dark:text-zinc-800">•</span>
          <span>Arrows to steer</span>
          <span className="text-zinc-300 dark:text-zinc-800">•</span>
          <span>Space to play</span>
        </div>
      </div>
    );
  }
);

SphereCarousel.displayName = 'SphereCarousel';

export { SphereCarousel };
