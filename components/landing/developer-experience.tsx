import * as React from 'react';
import { CodeBlock, TerminalBlock } from '@/components/docs/code-block';
import { SectionDivider } from '@/components/landing/editorial-grid';

interface DeveloperExperienceProps {
  dxHtml: string;
  dxRaw: string;
}

export function DeveloperExperience({
  dxHtml,
  dxRaw,
}: DeveloperExperienceProps) {
  return (
    <section id="developer" className="py-28 bg-background relative">
      <SectionDivider />
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 w-full min-w-0">
          {/* Dx Left Text */}
          <div className="flex flex-col justify-center text-left">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Developer Experience Built First
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Start with a single copy-paste operation. Kanso UI elements slot
              right into standard tailwind structures.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-foreground text-[11px] font-bold text-background font-mono">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    Install Helper Modules
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Configure your Tailwind classes with our minimalist
                    configurations and helper package.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-foreground text-[11px] font-bold text-background font-mono">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    Copy and Customise
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Grab exact TSX structures and paste them directly into your
                    `/components/ui/` route.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dx Right Terminal and Code Snippet */}
          <div className="flex flex-col gap-4 justify-center w-full min-w-0">
            <TerminalBlock command="npm install @kanso/ui" />

            <CodeBlock
              html={dxHtml}
              rawCode={dxRaw}
              filename="index.tsx"
              showLineNumbers={true}
              collapsible={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
