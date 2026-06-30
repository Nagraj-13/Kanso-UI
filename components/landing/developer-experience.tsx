import * as React from 'react';
import { CodeBlock, TerminalBlock } from '@/components/docs/code-block';
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelDescription,
  PanelContent,
} from '@/components/landing/panel';

interface DeveloperExperienceProps {
  dxHtml: string;
  dxRaw: string;
}

export function DeveloperExperience({
  dxHtml,
  dxRaw,
}: DeveloperExperienceProps) {
  return (
    <Panel id="developer">
      <PanelHeader>
        <div className="flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground/50 uppercase select-none">
          <span>§05 / WORKFLOW</span>
        </div>
        <PanelTitle>Developer Experience Built First</PanelTitle>
        <PanelDescription>
          Start with a single copy-paste operation. Kanso UI elements slot right
          into standard Tailwind structures.
        </PanelDescription>
      </PanelHeader>

      <PanelContent className="bg-background">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 w-full min-w-0">
          {/* Dx Left Steps */}
          <div className="flex flex-col justify-center gap-4 text-left">
            <div className="flex items-start gap-4 border border-line bg-card p-4 rounded-sm">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-sm border border-line bg-muted font-mono text-xs text-muted-foreground select-none">
                01
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Install Helper Modules
                </h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Configure your Tailwind classes with our minimalist
                  configurations and helper package.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 border border-line bg-card p-4 rounded-sm">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-sm border border-line bg-muted font-mono text-xs text-muted-foreground select-none">
                02
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Copy and Customise
                </h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Grab exact TSX structures and paste them directly into your
                  `/components/ui/` route.
                </p>
              </div>
            </div>
          </div>

          {/* Dx Right Terminal and Code Snippet */}
          <div className="flex flex-col gap-3 justify-center w-full min-w-0">
            <TerminalBlock command="npm install @kanso/ui" />

            <div className="border border-line rounded-sm overflow-hidden">
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
      </PanelContent>
    </Panel>
  );
}
