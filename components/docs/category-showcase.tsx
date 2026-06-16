'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { RegistryComponent } from '@/lib/registry';
import { ComponentDemo } from '@/components/docs/component-demos';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CategoryShowcaseProps {
  categoryLabel: string;
  categoryDescription: string;
  components: RegistryComponent[];
}

/**
 * CategoryShowcase — Reusable grid showcase for component categories.
 * Shows dynamic live previews of all components belonging to a category
 * and routes to their respective individual documentation pages.
 */
export function CategoryShowcase({
  categoryLabel,
  categoryDescription,
  components,
}: CategoryShowcaseProps) {
  return (
    <div className="space-y-10">
      {/* Category Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
          {categoryLabel}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          {categoryDescription}
        </p>
      </div>

      <hr className="border-zinc-200/80 dark:border-zinc-800/60" />

      {/* Components Showcase Grid */}
      <div className="grid gap-6 grid-cols-1">
        {components.map((component) => (
          <Card
            key={component.name}
            className="flex flex-col justify-between border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40"
          >
            <div className="flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">
                {component.title}
              </h3>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed min-h-[36px]">
                {component.description}
              </p>

              {/* Live Interactive Preview */}
              <div className="mt-6 flex flex-1 min-h-[200px] items-center justify-center rounded-lg border border-dashed border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/30">
                <ComponentDemo name={component.name} />
              </div>
            </div>

            {/* View Documentation Link */}
            <div className="mt-6 flex justify-end">
              <Button
                variant="link"
                size="sm"
                className="gap-1.5 px-0 text-zinc-950 dark:text-zinc-50 hover:underline"
                render={
                  <Link
                    href={`/docs/components/${component.category}/${component.name}`}
                  />
                }
              >
                View Documentation <ArrowRightIcon className="size-3.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
