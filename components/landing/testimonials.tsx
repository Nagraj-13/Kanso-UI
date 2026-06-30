import * as React from 'react';
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelDescription,
  PanelContent,
} from '@/components/landing/panel';

export function Testimonials() {
  return (
    <Panel id="testimonials">
      <PanelHeader>
        <div className="flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground/50 uppercase select-none">
          <span>§07 / SOCIAL</span>
        </div>
        <PanelTitle>Trusted by Frontend Engineers</PanelTitle>
        <PanelDescription>
          Read what designers and developers say about building interfaces with
          Kanso UI.
        </PanelDescription>
      </PanelHeader>

      <PanelContent className="bg-background">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Testimonial 1 */}
          <div className="border border-line bg-card p-4 rounded-sm flex flex-col justify-between relative overflow-hidden group">
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 text-left">
              {
                '"The layout rules and visual patterns in Kanso UI match exactly what we need for modern enterprise platforms. Simplicity is indeed engineered directly in."'
              }
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="size-6 rounded-sm border border-line bg-muted flex items-center justify-center font-mono text-[9px] text-muted-foreground select-none">
                AB
              </div>
              <div className="text-left">
                <h5 className="text-[11px] font-semibold text-zinc-900 dark:text-white leading-none">
                  Alexander Boyd
                </h5>
                <p className="text-[9px] font-mono text-muted-foreground mt-0.5">
                  Design Engineer, Linear
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="border border-line bg-card p-4 rounded-sm flex flex-col justify-between relative overflow-hidden group">
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 text-left">
              {
                '"Having WCAG accessibility compliant outlines right out of the box saved us weeks of audit fixing. The styling is perfectly minimal."'
              }
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="size-6 rounded-sm border border-line bg-muted flex items-center justify-center font-mono text-[9px] text-muted-foreground select-none">
                MK
              </div>
              <div className="text-left">
                <h5 className="text-[11px] font-semibold text-zinc-900 dark:text-white leading-none">
                  Mia Koyama
                </h5>
                <p className="text-[9px] font-mono text-muted-foreground mt-0.5">
                  Lead Frontend, Stripe
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="border border-line bg-card p-4 rounded-sm flex flex-col justify-between relative overflow-hidden group">
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 text-left">
              {
                '"Copy-paste setup means I don\'t need to add another complex library bundle. I copy precisely the components I need, modify the props, and build."'
              }
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="size-6 rounded-sm border border-line bg-muted flex items-center justify-center font-mono text-[9px] text-muted-foreground select-none">
                DR
              </div>
              <div className="text-left">
                <h5 className="text-[11px] font-semibold text-zinc-900 dark:text-white leading-none">
                  David Ross
                </h5>
                <p className="text-[9px] font-mono text-muted-foreground mt-0.5">
                  CTO, Vercel Templates
                </p>
              </div>
            </div>
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}
