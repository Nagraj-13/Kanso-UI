'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const MouseEnterContext = React.createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

interface CardContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  containerClassName?: string;
  tiltSensitivity?: number;
}

/**
 * CardContainer — The outer perspective wrapper for the 3D tilt card effect.
 */
function CardContainer({
  children,
  className,
  containerClassName,
  tiltSensitivity = 25,
  ...props
}: CardContainerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / tiltSensitivity;
    const y = (e.clientY - top - height / 2) / tiltSensitivity;

    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    containerRef.current.style.setProperty('--mouse-x', `${mouseX}px`);
    containerRef.current.style.setProperty('--mouse-y', `${mouseY}px`);
    containerRef.current.style.setProperty(
      '--mouse-x-pct',
      `${(mouseX / width) * 100}%`
    );
    containerRef.current.style.setProperty(
      '--mouse-y-pct',
      `${(mouseY / height) * 100}%`
    );

    // Disable transition during active mouse movement for real-time tracking
    containerRef.current.style.transition = 'none';
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
    if (!containerRef.current) return;
    // Smooth transition on hover entrance
    containerRef.current.style.transition = 'transform 0.3s ease-out';
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    // Buttery smooth snap-back transition on leave
    containerRef.current.style.transition =
      'transform 0.5s cubic-bezier(0.03, 0.98, 0.52, 0.99)';
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;

    containerRef.current.style.removeProperty('--mouse-x');
    containerRef.current.style.removeProperty('--mouse-y');
    containerRef.current.style.removeProperty('--mouse-x-pct');
    containerRef.current.style.removeProperty('--mouse-y-pct');
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn(
          'py-12 flex items-center justify-center',
          containerClassName
        )}
        style={{
          perspective: '1000px',
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn('flex items-center justify-center relative', className)}
          style={{
            transformStyle: 'preserve-3d',
          }}
          {...props}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
}

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * CardBody — A structural wrapper that preserves 3D rendering context.
 */
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

/**
 * CardItem — An element that pops out along the Z-axis (and other coordinates) when hovered.
 */
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

/**
 * Custom hook to safely consume MouseEnterContext from parent containers.
 */
function useMouseEnter() {
  const context = React.useContext(MouseEnterContext);
  // Fallback to prevent crash if rendered outside CardContainer
  if (context === undefined) {
    return [false, () => {}] as [
      boolean,
      React.Dispatch<React.SetStateAction<boolean>>,
    ];
  }
  return context;
}

export { CardContainer, CardBody, CardItem, useMouseEnter };
export type { CardContainerProps, CardBodyProps, CardItemProps };
