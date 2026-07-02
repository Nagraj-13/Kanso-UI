'use client';

import * as React from 'react';
import {
  Panel,
  PanelContent,
  GapDivider,
  VerticalGapDivider,
  VerticalLineDivider,
} from '@/components/kanso/panel';

function AnimatedCounter({
  value,
  suffix = '',
}: {
  value: string;
  suffix?: string;
}) {
  const [count, setCount] = React.useState(0);
  const elementRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const start = 0;
    const end = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
    if (start === end) return;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 1000, 1);
      const current = Math.floor(progress * (end - start) + start);
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export function Statistics() {
  return (
    <Panel id="statistics">
      <PanelContent className="p-0 md:p-0">
        <div className="flex flex-col lg:flex-row w-full overflow-hidden">
          <div className="flex flex-col items-center justify-center py-12 flex-1">
            <span className="text-4xl font-bold tracking-tight text-foreground">
              <AnimatedCounter value="50" suffix="+" />
            </span>
            <span className="mt-2 text-sm font-medium text-muted-foreground">
              Components
            </span>
          </div>

          <VerticalLineDivider className="hidden lg:block shrink-0" />
          <div className="block lg:hidden w-full h-px bg-[var(--line)]" />

          <div className="flex flex-col items-center justify-center py-12 flex-1">
            <span className="text-4xl font-bold tracking-tight text-foreground">
              <AnimatedCounter value="100" suffix="%" />
            </span>
            <span className="mt-2 text-sm font-medium text-muted-foreground">
              TypeScript Coverage
            </span>
          </div>

          <VerticalLineDivider className="hidden lg:block shrink-0" />
          <div className="block lg:hidden w-full h-px bg-[var(--line)]" />

          <div className="flex flex-col items-center justify-center py-12 flex-1">
            <span className="text-4xl font-bold tracking-tight text-foreground">
              WCAG
            </span>
            <span className="mt-2 text-sm font-medium text-muted-foreground">
              Accessible by Default
            </span>
          </div>

          <VerticalLineDivider className="hidden lg:block shrink-0" />
          <div className="block lg:hidden w-full h-px bg-[var(--line)]" />

          <div className="flex flex-col items-center justify-center py-12 flex-1">
            <span className="text-4xl font-bold tracking-tight text-foreground">
              MIT
            </span>
            <span className="mt-2 text-sm font-medium text-muted-foreground">
              Open Source
            </span>
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}
