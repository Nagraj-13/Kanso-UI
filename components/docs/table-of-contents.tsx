'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ListIcon,
  CompassIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  /** Whether the component has a props section */
  hasProps?: boolean;
}

interface TocItem {
  id: string;
  label: string;
}

export function TableOfContents({ hasProps = false }: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string>('preview');
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);

  const items: TocItem[] = React.useMemo(() => {
    const list = [
      { id: 'preview', label: 'Preview' },
      { id: 'usage', label: 'Usage' },
      { id: 'installation', label: 'Installation' },
      { id: 'source-code', label: 'Source Code' },
    ];
    if (hasProps) {
      list.push({ id: 'props', label: 'Props' });
    }
    return list;
  }, [hasProps]);

  // Scroll Spy: Tracks active section in view
  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -60% 0px', // Trigger active state when section is near top of viewport
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Find the first entry that is intersecting
      const visibleEntry = entries.find((entry) => entry.isIntersecting);
      if (visibleEntry) {
        setActiveId(visibleEntry.target.id);
      }
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    // Observe all section elements
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      items.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [items]);

  const handleScrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      // Offset slightly to account for the header bar
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
      setActiveId(id);
    }
  };

  return (
    <motion.div
      animate={{
        width: isCollapsed ? 48 : 240,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className={cn(
        'relative rounded-xl border border-zinc-200/60 bg-zinc-50/30 p-4 dark:border-zinc-800/40 dark:bg-zinc-900/10 transition-colors duration-200 select-none',
        isCollapsed ? 'px-2' : 'px-4'
      )}
    >
      {/* Collapse/Expand Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          'absolute -left-3 top-3.5 flex size-6 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-xs hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-all active:scale-95 z-20 cursor-pointer'
        )}
        aria-label={
          isCollapsed
            ? 'Expand table of contents'
            : 'Collapse table of contents'
        }
      >
        {isCollapsed ? (
          <ChevronLeftIcon className="size-3.5" />
        ) : (
          <ChevronRightIcon className="size-3.5" />
        )}
      </button>

      {/* Collapsed State View */}
      {isCollapsed ? (
        <div className="flex flex-col items-center gap-4 py-2">
          <ListIcon className="size-4 text-zinc-400 dark:text-zinc-600" />
          <div className="flex flex-col gap-2.5 mt-2">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleScrollToSection(e, item.id)}
                  className={cn(
                    'size-2.5 rounded-full transition-all duration-300 relative group cursor-pointer',
                    isActive
                      ? 'bg-zinc-900 scale-125 dark:bg-zinc-100'
                      : 'bg-zinc-200 dark:bg-zinc-850 hover:bg-zinc-400 dark:hover:bg-zinc-700'
                  )}
                >
                  {/* Floating micro tooltip on hover */}
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 rounded bg-zinc-900/90 dark:bg-zinc-100/95 px-1.5 py-0.5 text-[10px] font-medium text-white dark:text-zinc-900 shadow-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      ) : (
        /* Expanded State View */
        <div className="overflow-hidden">
          <div className="flex items-center gap-1.5 mb-4 text-zinc-400 dark:text-zinc-500">
            <CompassIcon className="size-3.5 shrink-0" />
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              On This Page
            </h4>
          </div>

          <ul className="space-y-2 text-sm relative">
            {/* Sliding vertical indicator pill */}
            <div className="absolute left-0 top-0 bottom-0 w-[1.5px] bg-zinc-200 dark:bg-zinc-850" />

            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id} className="relative pl-3.5">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleScrollToSection(e, item.id)}
                    className={cn(
                      'block py-0.5 font-medium transition-colors duration-200 cursor-pointer',
                      isActive
                        ? 'text-zinc-950 dark:text-zinc-50 font-semibold'
                        : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
                    )}
                  >
                    {item.label}
                  </a>
                  {isActive && (
                    <motion.div
                      layoutId="toc-active-line"
                      className="absolute left-0 top-0.5 bottom-0.5 w-[2px] bg-zinc-900 dark:bg-zinc-200 rounded-full"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
