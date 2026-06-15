"use client"

import * as React from "react"
import { SectionDivider } from "@/components/landing/editorial-grid"

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [count, setCount] = React.useState(0)
  const elementRef = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    const start = 0
    const end = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0
    if (start === end) return

    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / 1000, 1)
      const current = Math.floor(progress * (end - start) + start)
      setCount(current)
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(animate)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={elementRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

export function Statistics() {
  return (
    <section className="border-t border-b border-dashed border-border bg-background  relative">
       <SectionDivider />
      <div className="mx-auto max-w-7xl border-r border-l border-dashed border-border px-6 py-24 md:px-8">
        <div className="grid gap-12 text-center sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold tracking-tight text-foreground">
              <AnimatedCounter value="50" suffix="+" />
            </span>
            <span className="mt-2 text-sm font-medium text-muted-foreground">
              Components
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold tracking-tight text-foreground">
              <AnimatedCounter value="100" suffix="%" />
            </span>
            <span className="mt-2 text-sm font-medium text-muted-foreground">
              TypeScript Coverage
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold tracking-tight text-foreground">
              WCAG
            </span>
            <span className="mt-2 text-sm font-medium text-muted-foreground">
              Accessible by Default
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold tracking-tight text-foreground">
              MIT
            </span>
            <span className="mt-2 text-sm font-medium text-muted-foreground">
              Open Source
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
