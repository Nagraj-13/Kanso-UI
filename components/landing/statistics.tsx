'use client';

import * as React from 'react';
import { SectionDivider } from '@/components/landing/editorial-grid';

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

import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
} from '@/components/landing/panel';

export function Statistics() {
  return (
    <Panel id="metrics">
      <PanelHeader className="sr-only">
        <PanelTitle>Metrics</PanelTitle>
      </PanelHeader>

      <PanelContent className="bg-background py-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-line text-center">
          <div className="flex flex-col items-center py-4">
            <span className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white font-mono">
              <AnimatedCounter value="50" suffix="+" />
            </span>
            <span className="mt-1 text-[10px] font-mono font-medium text-muted-foreground/60 uppercase tracking-wider">
              Components
            </span>
          </div>

          <div className="flex flex-col items-center py-4 sm:border-t-0">
            <span className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white font-mono">
              <AnimatedCounter value="100" suffix="%" />
            </span>
            <span className="mt-1 text-[10px] font-mono font-medium text-muted-foreground/60 uppercase tracking-wider">
              TypeScript Coverage
            </span>
          </div>

          <div className="flex flex-col items-center py-4 sm:border-t-0">
            <span className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white font-mono">
              WCAG
            </span>
            <span className="mt-1 text-[10px] font-mono font-medium text-muted-foreground/60 uppercase tracking-wider">
              Accessible By Default
            </span>
          </div>

          <div className="flex flex-col items-center py-4 sm:border-t-0">
            <span className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white font-mono">
              MIT
            </span>
            <span className="mt-1 text-[10px] font-mono font-medium text-muted-foreground/60 uppercase tracking-wider">
              Open Source
            </span>
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}
