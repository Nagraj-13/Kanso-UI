"use client"

import * as React from "react"
import { MagneticButton } from "@/components/kanso/magnetic-button"
import { ShimmerBorder } from "@/components/kanso/shimmer-border"
import { TextReveal } from "@/components/kanso/text-reveal"

/**
 * Component demo renderers for the docs pages.
 *
 * Each function returns a live, interactive demo for a registered component.
 * When adding a new component to the registry, add a corresponding demo here.
 */

const demos: Record<string, React.ComponentType> = {
  "magnetic-button": function MagneticButtonDemo() {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4">
        <MagneticButton>Hover me</MagneticButton>
        <MagneticButton
          magneticStrength={0.5}
          className="bg-transparent border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          Outline Style
        </MagneticButton>
        <MagneticButton magneticStrength={0.15}>
          Subtle Pull
        </MagneticButton>
      </div>
    )
  },

  "shimmer-border": function ShimmerBorderDemo() {
    return (
      <div className="flex flex-wrap items-center justify-center gap-6">
        <ShimmerBorder>
          <div className="px-6 py-5">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Kanso UI
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Beautiful, minimal components for modern apps.
            </p>
          </div>
        </ShimmerBorder>

        <ShimmerBorder
          shimmerColor="rgba(120, 120, 255, 0.2)"
          duration={2}
          borderRadius={16}
        >
          <div className="px-6 py-5">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Custom Colors
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Adjust shimmer color, speed, and radius.
            </p>
          </div>
        </ShimmerBorder>
      </div>
    )
  },

  "text-reveal": function TextRevealDemo() {
    return (
      <div className="flex flex-col items-center gap-8">
        <TextReveal
          text="Simplicity, Engineered."
          className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl"
        />
        <TextReveal
          text="Build beautiful interfaces without unnecessary complexity."
          delay={0.5}
          staggerDelay={0.02}
          className="text-base text-zinc-500 dark:text-zinc-400 max-w-lg text-center"
        />
      </div>
    )
  },
}

/**
 * Get the demo component for a given registry component name.
 */
function ComponentDemo({ name }: { name: string }) {
  const Demo = demos[name]

  if (!Demo) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-zinc-400">
        No demo available for this component.
      </div>
    )
  }

  return <Demo />
}

export { ComponentDemo, demos }
