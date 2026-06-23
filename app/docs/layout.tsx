//app/docs/layout.tsx
import * as React from 'react';
import { getCategories, getComponentsByCategory } from '@/lib/registry';
import { DocsLayoutClient } from './layout-client';

export const metadata = {
  title: 'Components — Kanso UI',
  description: 'Browse, preview, and copy-paste Kanso UI components.',
};

/** Map category slugs to display labels and emoji icons */
const categoryMeta: Record<string, { label: string; icon: string }> = {
  buttons: { label: 'Buttons', icon: '◉' },
  effects: { label: 'Effects', icon: '✦' },
  cards: { label: 'Cards', icon: '❐' },
  layout: { label: 'Layout', icon: '▣' },
  typography: { label: 'Typography', icon: 'Aa' },
  feedback: { label: 'Feedback', icon: '◈' },
  'data-display': { label: 'Data Display', icon: '▤' },
  scroll: { label: 'Scroll', icon: '↕' },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = getCategories();

  const sidebarGroups = [
    {
      category: 'follow',
      label: 'Follow for updates',
      icon: '⚡',
      items: [
        {
          name: 'twitter',
          title: 'X @Nagraj Bhandare',
          href: 'https://x.com/_nagraj_13',
          isExternal: true,
        },
      ],
    },
    {
      category: 'installation',
      label: 'Installation',
      icon: '↓',
      items: [
        {
          name: 'nextjs',
          title: 'Install Next.js',
          href: '/docs/installation/nextjs',
        },
        {
          name: 'tailwindcss',
          title: 'Install Tailwind CSS',
          href: '/docs/installation/tailwindcss',
        },
        {
          name: 'utilities',
          title: 'Add utilities',
          href: '/docs/installation/utilities',
        },
        { name: 'cli', title: 'CLI', href: '/docs/installation/cli' },
      ],
    },
    ...categories.map((cat) => {
      const meta = categoryMeta[cat] ?? {
        label: cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' '),
        icon: '•',
      };
      const components = getComponentsByCategory(cat);
      return {
        category: cat,
        label: meta.label,
        icon: meta.icon,
        items: components.map((c) => {
          // Add "New" badge to some components to match the Vengeance UI aesthetic
          const isNew = [
            'magnetic-button',
            'keyboard-button',
            'glow-line-button',
            'border-glow',
            'interactive-card',
          ].includes(c.name);
          return {
            name: c.name,
            title: c.title,
            href: `/docs/components/${cat}/${c.name}`,
            badge: isNew ? 'New' : undefined,
          };
        }),
      };
    }),
  ];

  return (
    <DocsLayoutClient sidebarGroups={sidebarGroups}>
      {children}
    </DocsLayoutClient>
  );
}
