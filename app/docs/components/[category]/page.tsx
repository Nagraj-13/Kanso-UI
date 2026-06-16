//app/docs/components/[category]/page.tsx
import * as React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getComponentsByCategory,
  getCategories,
  type RegistryComponent,
} from '@/lib/registry';
import { CategoryShowcase } from '@/components/docs/category-showcase';

interface PageProps {
  params: Promise<{ category: string }>;
}

/** Map categories to labels and descriptions */
const categoryMeta: Record<string, { label: string; description: string }> = {
  buttons: {
    label: 'Buttons',
    description:
      'Attract and engage users with minimalist, interactive button animations.',
  },
  effects: {
    label: 'Effects',
    description:
      'Visual enhancements and GPU-accelerated motion decorations to emphasize elements.',
  },
  cards: {
    label: 'Cards',
    description:
      'Minimalist and interactive cards featuring 3D tilt, spotlight, and border glow effects.',
  },
  typography: {
    label: 'Typography',
    description:
      'Type layouts and scroll-driven typography reveals designed for reading focus.',
  },
  layout: {
    label: 'Layout',
    description:
      'Clean, responsive grid alignments and page layout primitives.',
  },
  feedback: {
    label: 'Feedback',
    description:
      'Subtle indicators and dialog templates to report status actions.',
  },
  'data-display': {
    label: 'Data Display',
    description: 'Minimalist tables, lists, and visual card alignments.',
  },
};

/**
 * Generate static params for categories in the registry.
 */
export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((cat) => ({ category: cat }));
}

/**
 * Generate metadata dynamically.
 */
export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const meta = categoryMeta[category] ?? {
    label:
      category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' '),
    description: `Browse ${category} components.`,
  };
  return {
    title: `${meta.label} — Kanso UI`,
    description: meta.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const components = getComponentsByCategory(
    category as RegistryComponent['category']
  );

  if (components.length === 0) {
    notFound();
  }

  const meta = categoryMeta[category] ?? {
    label:
      category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' '),
    description: `Browse ${category} components.`,
  };

  const categories = getCategories();
  const currentIndex = categories.indexOf(
    category as RegistryComponent['category']
  );
  const prevCategory = currentIndex > 0 ? categories[currentIndex - 1] : null;
  const nextCategory =
    currentIndex < categories.length - 1 ? categories[currentIndex + 1] : null;

  const prevMeta = prevCategory
    ? (categoryMeta[prevCategory] ?? {
        label:
          prevCategory.charAt(0).toUpperCase() +
          prevCategory.slice(1).replace('-', ' '),
      })
    : null;

  const nextMeta = nextCategory
    ? (categoryMeta[nextCategory] ?? {
        label:
          nextCategory.charAt(0).toUpperCase() +
          nextCategory.slice(1).replace('-', ' '),
      })
    : null;

  return (
    <div className="w-full">
      <CategoryShowcase
        categoryLabel={meta.label}
        categoryDescription={meta.description}
        components={components}
      />

      {/* ── Category Navigation Footer ─────────────────────────── */}
      <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
        {prevCategory && prevMeta ? (
          <Link
            href={`/docs/components/${prevCategory}`}
            className="group flex flex-col items-start gap-1 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-350 dark:hover:border-zinc-700 bg-white dark:bg-zinc-950 transition-all hover:shadow-2xs max-w-[45%] min-w-[120px]"
          >
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1">
              ← Prev Category
            </span>
            <span className="text-sm font-semibold text-zinc-750 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors truncate max-w-[180px]">
              {prevMeta.label}
            </span>
          </Link>
        ) : (
          <div className="flex-1 max-w-[45%]" />
        )}

        <Link
          href="/"
          className="inline-flex items-center justify-center p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-350 dark:hover:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/10 text-xs font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-all shadow-3xs"
        >
          Home
        </Link>

        {nextCategory && nextMeta ? (
          <Link
            href={`/docs/components/${nextCategory}`}
            className="group flex flex-col items-end gap-1 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-350 dark:hover:border-zinc-700 bg-white dark:bg-zinc-950 transition-all hover:shadow-2xs text-right max-w-[45%] min-w-[120px]"
          >
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1">
              Next Category →
            </span>
            <span className="text-sm font-semibold text-zinc-750 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors truncate max-w-[180px]">
              {nextMeta.label}
            </span>
          </Link>
        ) : (
          <div className="flex-1 max-w-[45%]" />
        )}
      </div>
    </div>
  );
}
