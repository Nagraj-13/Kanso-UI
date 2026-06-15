import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { SectionDivider } from "@/components/landing/editorial-grid"

export function Testimonials() {
  return (
    <section className="border-t border-dashed border-zinc-200/50 py-28 dark:border-zinc-900/40 dark:bg-zinc-950/20 relative">
      <SectionDivider />
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-col items-center text-center gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
            Trusted by Frontend Engineers
          </h2>
          <p className="max-w-xl text-base text-zinc-500 dark:text-zinc-400">
            Read what designers and developers say about building interfaces with Kanso UI.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Testimonial 1 */}
          <Card className="border border-border bg-card dark:bg-card/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 p-6 shadow-xs hover:shadow-sm hover:-translate-y-0.5">
            <CardContent className="p-0">
              <p className="text-sm leading-relaxed text-foreground text-left">
                {"\"The layout rules and visual patterns in Kanso UI match exactly what we need for modern enterprise platforms. Simplicity is indeed engineered directly in.\""}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="size-8 rounded-full bg-muted border border-border flex items-center justify-center font-bold text-xs text-muted-foreground select-none">
                  AB
                </div>
                <div className="text-left">
                  <h5 className="text-xs font-semibold text-foreground">Alexander Boyd</h5>
                  <p className="text-[11px] text-muted-foreground">Design Engineer, Linear</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial 2 */}
          <Card className="border border-border bg-card dark:bg-card/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 p-6 shadow-xs hover:shadow-sm hover:-translate-y-0.5">
            <CardContent className="p-0">
              <p className="text-sm leading-relaxed text-foreground text-left">
                {"\"Having WCAG accessibility compliant outlines right out of the box saved us weeks of audit fixing. The styling is perfectly minimal.\""}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="size-8 rounded-full bg-muted border border-border flex items-center justify-center font-bold text-xs text-muted-foreground select-none">
                  MK
                </div>
                <div className="text-left">
                  <h5 className="text-xs font-semibold text-foreground">Mia Koyama</h5>
                  <p className="text-[11px] text-muted-foreground">Lead Frontend, Stripe</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial 3 */}
          <Card className="border border-border bg-card dark:bg-card/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 p-6 shadow-xs hover:shadow-sm hover:-translate-y-0.5">
            <CardContent className="p-0">
              <p className="text-sm leading-relaxed text-foreground text-left">
                {"\"Copy-paste setup means I don't need to add another complex library bundle. I copy precisely the components I need, modify the props, and build.\""}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="size-8 rounded-full bg-muted border border-border flex items-center justify-center font-bold text-xs text-muted-foreground select-none">
                  DR
                </div>
                <div className="text-left">
                  <h5 className="text-xs font-semibold text-foreground">David Ross</h5>
                  <p className="text-[11px] text-muted-foreground">CTO, Vercel Templates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
