"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/kanso/button"
import { MagneticButton } from "@/components/kanso/magnetic-button"
import { RealismButton } from "@/components/kanso/realism-button"
import { KeyboardButton } from "@/components/kanso/keyboard-button"
import { GlowLineButton } from "@/components/kanso/glow-line-button"
import { GithubButton } from "@/components/kanso/github-button"
import { ShimmerBorder } from "@/components/kanso/shimmer-border"
import { TextReveal } from "@/components/kanso/text-reveal"
import { SpotlightSection, SpotSeparator } from "@/components/kanso/spotlight-section"
import {
  ColorPicker,
  ColorPickerSelection,
  ColorPickerHue,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerOutput,
  ColorPickerFormat,
} from "@/components/kanso/color-picker"
import { Button as UiButton } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { GITHUB_URL } from "@/lib/constants"

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
            <div suppressHydrationWarning className="relative size-10 rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-700 cursor-pointer shadow-sm">
              <input
                suppressHydrationWarning
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
  "github-button": function GithubButtonDemo() {
    type GlowPreset = "default" | "violet" | "rose" | "emerald" | "blue" | "orange"
    const [selectedGlow, setSelectedGlow] = React.useState<GlowPreset>("default")
    const glowPresets: { name: GlowPreset; label: string; class: string }[] = [
      { name: "default", label: "Default", class: "bg-gradient-to-r from-violet-500 via-rose-500 to-orange-400" },
      { name: "violet", label: "Violet", class: "bg-violet-500" },
      { name: "rose", label: "Rose", class: "bg-rose-500" },
      { name: "emerald", label: "Emerald", class: "bg-emerald-500" },
      { name: "blue", label: "Blue", class: "bg-blue-500" },
      { name: "orange", label: "Orange", class: "bg-orange-500" },
    ]

    return (
      <div className="flex flex-col gap-8 w-full max-w-lg items-center">
        {/* Row 1: Classic & Tooltip */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
              Classic Pill
            </span>
            <GithubButton variantDesign="classic" href={GITHUB_URL} />
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
              Tooltip Icon
            </span>
            <GithubButton variantDesign="tooltip" href={GITHUB_URL}>
              Star on GitHub
            </GithubButton>
          </div>
        </div>

        <hr className="w-full border-zinc-200/80 dark:border-zinc-800/60" />

        {/* Row 2: Rainbow & Glow */}
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
              Rainbow Star Glow
            </span>
            <GithubButton variantDesign="rainbow" href={GITHUB_URL} />
          </div>

          <div className="flex flex-col items-center gap-2 mt-2">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
              Gradient Glow
            </span>
            <GithubButton
              variantDesign="glow"
              href={GITHUB_URL}
              glowColor={selectedGlow === "default" ? undefined : selectedGlow}
            >
              Star Kanso UI
            </GithubButton>
          </div>
        </div>

        <hr className="w-full border-zinc-200/80 dark:border-zinc-800/60" />

        {/* Glow Color Customization Picker */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
            Customize Glow Color
          </span>
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20">
            {glowPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => setSelectedGlow(preset.name)}
                className={cn(
                  "relative flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md transition-all border",
                  selectedGlow === preset.name
                    ? "border-zinc-250 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-xs"
                    : "border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                )}
              >
                <span className={cn("size-2 rounded-full shrink-0", preset.class)} />
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  },

  "shimmer-border": function ShimmerBorderDemo() {
    return (
      <div className="flex flex-col gap-6 w-full max-w-sm">
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

  "spotlight-section": function SpotlightSectionDemo() {
    type PresetColor = "white" | "blue" | "emerald" | "violet" | "rose"
    const [selectedColor, setSelectedColor] = React.useState<PresetColor | "custom">("violet")
    const [customColor, setCustomColor] = React.useState("#d946ef")
    const [variant, setVariant] = React.useState<"both" | "top-only" | "bottom-only">("both")
    const [intensity, setIntensity] = React.useState<"subtle" | "medium" | "high">("medium")

    const colors: { name: PresetColor | "custom"; label: string; class: string }[] = [
      { name: "white", label: "White", class: "bg-zinc-300 dark:bg-zinc-600" },
      { name: "blue", label: "Blue", class: "bg-blue-500" },
      { name: "emerald", label: "Emerald", class: "bg-emerald-500" },
      { name: "violet", label: "Violet", class: "bg-violet-500" },
      { name: "rose", label: "Rose", class: "bg-rose-500" },
      { name: "custom", label: "Custom", class: "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" },
    ]

    const activeColor = selectedColor === "custom" ? customColor : selectedColor

    return (
      <div className="flex flex-col gap-10 w-full max-w-2xl items-center">
        {/* Controls Panel */}
        <div className="grid gap-6 w-full sm:grid-cols-2 p-5 rounded-2xl border border-zinc-200/60 bg-zinc-50/20 dark:border-zinc-800/60 dark:bg-zinc-900/10">
          {/* Left Controls: Colors */}
          <div className="flex flex-col gap-3">
            <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">
              Spotlight Color Theme
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md transition-all border cursor-pointer",
                    selectedColor === c.name
                      ? "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-xs"
                      : "border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  )}
                  aria-label={`Select ${c.label} color`}
                >
                  <span className={cn("size-2 rounded-full shrink-0", c.class)} />
                  {c.label}
                </button>
              ))}
            </div>

            {selectedColor === "custom" && (
              <div className="flex items-center gap-3 mt-2 pl-1 animate-in fade-in slide-in-from-top-1 duration-200">
                <Popover>
                  <PopoverTrigger
                    className="inline-flex shrink-0 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2 h-8 gap-2 px-3 py-1 cursor-pointer text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900/50 shadow-xs"
                  >
                    <span
                      className="size-3.5 rounded-full border border-black/10 dark:border-white/10 shrink-0"
                      style={{ backgroundColor: customColor }}
                    />
                    <span className="font-mono text-xs uppercase text-zinc-600 dark:text-zinc-350">
                      {customColor}
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 flex flex-col gap-3 p-4">
                    <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
                      Custom Color Picker
                    </div>
                    <ColorPicker
                      value={customColor}
                      onChange={(val) => setCustomColor(val)}
                      className="h-auto w-full gap-3"
                    >
                      <ColorPickerSelection className="h-32 rounded-md border border-zinc-200 dark:border-zinc-800" />
                      <ColorPickerHue />
                      <ColorPickerAlpha />
                      <div className="flex items-center gap-2 mt-1">
                        <ColorPickerEyeDropper />
                        <ColorPickerOutput />
                        <ColorPickerFormat />
                      </div>
                    </ColorPicker>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>

          {/* Right Controls: Variants & Intensity */}
          <div className="flex flex-col gap-4">
            {/* Variants */}
            <div className="flex flex-col gap-2">
              <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">
                Layout Border Variant
              </div>
              <div className="flex rounded-md border border-zinc-200 dark:border-zinc-800 p-0.5 w-fit bg-zinc-100/50 dark:bg-zinc-950/40">
                {(["both", "top-only", "bottom-only"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={cn(
                      "px-2.5 py-1 text-[11px] font-medium rounded-sm capitalize transition-all cursor-pointer",
                      variant === v
                        ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-xs"
                        : "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200"
                    )}
                  >
                    {v.replace("-only", "")}
                  </button>
                ))}
              </div>
            </div>

            {/* Intensity */}
            <div className="flex flex-col gap-2">
              <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">
                Glow Intensity
              </div>
              <div className="flex rounded-md border border-zinc-200 dark:border-zinc-800 p-0.5 w-fit bg-zinc-100/50 dark:bg-zinc-950/40">
                {(["subtle", "medium", "high"] as const).map((i) => (
                  <button
                    key={i}
                    onClick={() => setIntensity(i)}
                    className={cn(
                      "px-2.5 py-1 text-[11px] font-medium rounded-sm capitalize transition-all cursor-pointer",
                      intensity === i
                        ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-xs"
                        : "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200"
                    )}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Spotlight Section Demo Container */}
        <div className="w-full rounded-2xl border border-zinc-200/50 bg-zinc-50/5 p-4 dark:border-zinc-900/40 dark:bg-zinc-950/5 overflow-hidden">
          <SpotlightSection
            title="Ambient Interface Spotlight"
            spotlightColor={activeColor}
            variant={variant}
            intensity={intensity}
            className="w-full"
          >
            <div className="flex flex-col items-center justify-center text-center py-20 px-6 max-w-md mx-auto">
              <span className="text-[11px] font-semibold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase px-2 py-0.5 rounded-full border border-zinc-200/60 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/30">
                Layout Element
              </span>
              <h3 className="mt-4 text-xl font-medium text-zinc-800 dark:text-zinc-200">
                Minimalist Content Container
              </h3>
              <p className="mt-2.5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Add beautiful ambient glows to structure your product pages, landing sections, or feature highlights. Fits beautifully with dark themes.
              </p>
            </div>
          </SpotlightSection>
        </div>

        {/* Separator Showcase */}
        <div className="flex flex-col gap-6 w-full mt-2">
          <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest text-center">
            SpotSeparator Presets & Variations
          </div>
          
          <div className="flex flex-col gap-8 w-full p-6 rounded-2xl border border-zinc-200/60 bg-zinc-50/20 dark:border-zinc-800/60 dark:bg-zinc-900/10">
            <div className="flex flex-col gap-2.5 w-full">
              <div className="text-[10px] text-zinc-400 font-mono">Zinc preset (80% width)</div>
              <SpotSeparator color="zinc" width="80%" />
            </div>

            <div className="flex flex-col gap-2.5 w-full">
              <div className="text-[10px] text-zinc-400 font-mono">Blue preset (60% width)</div>
              <SpotSeparator color="blue" width="60%" />
            </div>

            <div className="flex flex-col gap-2.5 w-full">
              <div className="text-[10px] text-zinc-400 font-mono">Emerald preset (40% width)</div>
              <SpotSeparator color="emerald" width="40%" />
            </div>

            <div className="flex flex-col gap-2.5 w-full">
              <div className="text-[10px] text-zinc-400 font-mono">Violet preset (20% width)</div>
              <SpotSeparator color="violet" width="20%" />
            </div>

            <div className="flex flex-col gap-2.5 w-full">
              <div className="text-[10px] text-zinc-400 font-mono">Rose preset (95% width, 2px height)</div>
              <SpotSeparator color="rose" width="95%" height="2px" />
            </div>

            {selectedColor === "custom" && (
              <div className="flex flex-col gap-2.5 w-full animate-in fade-in duration-300">
                <div className="text-[10px] text-zinc-400 font-mono">Custom color separator ({customColor})</div>
                <SpotSeparator color={customColor} width="85%" />
              </div>
            )}
          </div>
        </div>
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
