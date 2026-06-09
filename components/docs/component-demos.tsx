"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/kanso/button"
import { MagneticButton } from "@/components/kanso/magnetic-button"
import { RealismButton } from "@/components/kanso/realism-button"
import { KeyboardButton } from "@/components/kanso/keyboard-button"
import { GlowLineButton } from "@/components/kanso/glow-line-button"
import { ShimmerBorder } from "@/components/kanso/shimmer-border"
import { TextReveal } from "@/components/kanso/text-reveal"

/**
 * Component demo renderers for the docs pages.
 *
 * Each function returns a live, interactive demo for a registered component.
 * When adding a new component to the registry, add a corresponding demo here.
 */

const demos: Record<string, React.ComponentType> = {
  "button": function ButtonDemo() {
    type ButtonColor = "zinc" | "blue" | "emerald" | "violet" | "amber" | "rose"
    const [selectedColor, setSelectedColor] = React.useState<ButtonColor>("zinc")
    const colors: { name: ButtonColor; class: string }[] = [
      { name: "zinc", class: "bg-zinc-950 dark:bg-zinc-50" },
      { name: "blue", class: "bg-blue-500" },
      { name: "emerald", class: "bg-emerald-500" },
      { name: "violet", class: "bg-violet-500" },
      { name: "amber", class: "bg-amber-500" },
      { name: "rose", class: "bg-rose-500" },
    ]

    const handleRandomize = () => {
      const remainingColors = colors.filter((c) => c.name !== selectedColor)
      const randomColor = remainingColors[Math.floor(Math.random() * remainingColors.length)].name
      setSelectedColor(randomColor)
    }

    return (
      <div className="flex flex-col gap-8 w-full max-w-lg items-center">
        {/* Color customizer playground */}
        <div className="flex flex-col items-center gap-3 w-full rounded-xl border border-zinc-200/60 bg-zinc-50/20 p-4 dark:border-zinc-800/60 dark:bg-zinc-900/10">
          <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">
            Select Color & Active Theming
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3.5 mt-1">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                className={cn(
                  "size-5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-400 dark:focus:ring-zinc-700 cursor-pointer",
                  c.class,
                  selectedColor === c.name ? "ring-2 ring-zinc-500 ring-offset-2 scale-110" : "opacity-80 hover:opacity-100 hover:scale-105"
                )}
                aria-label={`Select ${c.name} theme`}
              />
            ))}
            <button
              onClick={handleRandomize}
              className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 py-1 text-[11px] font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-850 cursor-pointer"
            >
              🎲 Randomize
            </button>
          </div>
        </div>

        {/* Paired Buttons Showcase Row */}
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="text-xs font-medium text-zinc-400 dark:text-zinc-500 text-center">
            All variants pair and style dynamically matching the &ldquo;{selectedColor}&rdquo; color family:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="primary" color={selectedColor}>Primary</Button>
            <Button variant="secondary" color={selectedColor}>Secondary</Button>
            <Button variant="outline" color={selectedColor}>Outline</Button>
            <Button variant="ghost" color={selectedColor}>Ghost</Button>
            <Button variant="link" color={selectedColor}>Link</Button>
          </div>
        </div>

        {/* Sizes & Inactive displays */}
        <hr className="w-full border-zinc-200/80 dark:border-zinc-800/60" />

        <div className="grid gap-6 w-full sm:grid-cols-2">
          {/* Sizes */}
          <div className="flex flex-col items-center gap-3">
            <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
              Sizes
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button size="sm" color={selectedColor}>Small</Button>
              <Button size="default" color={selectedColor}>Default</Button>
              <Button size="lg" color={selectedColor}>Large</Button>
            </div>
          </div>

          {/* Inactive States */}
          <div className="flex flex-col items-center gap-3">
            <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
              Inactive States
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button inactive color={selectedColor}>Inactive</Button>
              <Button variant="outline" inactive color={selectedColor}>Inactive Outline</Button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  "magnetic-button": function MagneticButtonDemo() {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4">
        <MagneticButton>Hover me</MagneticButton>
        <MagneticButton magneticStrength={0.5} variant="outline">
          Outline Style
        </MagneticButton>
        <MagneticButton magneticStrength={0.15}>
          Subtle Pull
        </MagneticButton>
      </div>
    )
  },
  "realism-button": function RealismButtonDemo() {
    return (
      <div className="flex flex-wrap items-center justify-center gap-6">
        <RealismButton variantColor="cyan">Cyan Glow</RealismButton>
        <RealismButton variantColor="rose">Rose Glow</RealismButton>
        <RealismButton variantColor="emerald">Emerald Glow</RealismButton>
        <RealismButton variantColor="violet">Violet Glow</RealismButton>
      </div>
    )
  },
  "keyboard-button": function KeyboardButtonDemo() {
    return (
      <div className="flex flex-wrap items-center justify-center gap-6">
        <KeyboardButton
          variantColor="dark"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
              <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" />
              <path d="M9 3a3 3 0 0 0-3 3v12a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" />
              <path d="M3 9a3 3 0 0 0 3 3h12a3 3 0 0 0 0-6H6a3 3 0 0 0-3 3z" />
              <path d="M3 15a3 3 0 0 0 3 3h12a3 3 0 0 0 0-6H6a3 3 0 0 0-3 3z" />
            </svg>
          }
        >
          cmd
        </KeyboardButton>

        <KeyboardButton
          variantColor="light"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          }
        >
          shift
        </KeyboardButton>

        <KeyboardButton
          variantColor="blue"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          }
        >
          enter
        </KeyboardButton>
      </div>
    )
  },
  "glow-line-button": function GlowLineButtonDemo() {
    const [customColor, setCustomColor] = React.useState("#3fe9ff")

    return (
      <div className="flex flex-col gap-6 w-full max-w-md items-center">
        {/* Presets */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <GlowLineButton glowColor="white">White Glow</GlowLineButton>
          <GlowLineButton glowColor="blue">Blue Glow</GlowLineButton>
          <GlowLineButton glowColor="emerald">Emerald Glow</GlowLineButton>
          <GlowLineButton glowColor="rose">Rose Glow</GlowLineButton>
        </div>

        {/* Custom Color Selector Wheel */}
        <div className="flex flex-col items-center gap-3 w-full rounded-xl border border-zinc-200/60 bg-zinc-50/20 p-4 dark:border-zinc-800/60 dark:bg-zinc-900/10 mt-2">
          <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest text-center">
            Custom Color Wheel Picker
          </div>
          <div className="flex items-center gap-4">
            <div className="relative size-10 rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-700 cursor-pointer shadow-sm">
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="absolute inset-[-4px] size-[48px] p-0 border-0 cursor-pointer rounded-full"
                title="Choose custom glow color"
              />
            </div>
            <code className="text-xs font-mono text-zinc-500 dark:text-zinc-400 select-all uppercase">
              {customColor}
            </code>
            <GlowLineButton glowColor={customColor}>
              Custom Glow
            </GlowLineButton>
          </div>
        </div>
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
