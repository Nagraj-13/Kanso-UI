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
import { BorderGlow } from "@/components/kanso/border-glow"
import { SpotlightCard } from "@/components/kanso/spotlight-card"
import { CardContainer, CardBody, CardItem } from "@/components/kanso/three-d-card"
import { InteractiveCard } from "@/components/kanso/interactive-card"
import { LiquidMetalCard } from "@/components/kanso/liquid-metal-card"
import { HalftoneImage } from "@/components/kanso/halftone-image"
import { HalftoneGrid } from "@/components/kanso/halftone-grid"
import { MagicRings } from "@/components/kanso/magic-rings"
import { Antigravity } from "@/components/kanso/antigravity"
import {
  ColorPicker,
  ColorPickerSelection,
  ColorPickerHue,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerOutput,
  ColorPickerFormat,
} from "@/components/kanso/color-picker"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { GITHUB_URL } from "@/lib/constants"
import Color from "color"

function DialKitSlider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  suffix = ""
}: {
  label: string
  min: number
  max: number
  step?: number
  value: number
  onChange: (val: number) => void
  suffix?: string
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
        <span>{label}</span>
        <span className="font-mono text-zinc-500 dark:text-zinc-400">{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-purple-500 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  )
}

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
    const [borderWidth, setBorderWidth] = React.useState(2)
    const [duration, setDuration] = React.useState(3.5)
    const [shimmerSize, setShimmerSize] = React.useState(20)
    const [borderRadius, setBorderRadius] = React.useState(16)
    
    // Color states
    const [theme, setTheme] = React.useState<"orchid" | "mint" | "solar" | "cyber" | "chrome" | "custom">("orchid")
    const [customColor, setCustomColor] = React.useState("#c084fc")

    const themeColors = {
      orchid: { color: "#c084fc", label: "Orchid Glow", class: "bg-purple-400" },
      mint: { color: "#34d399", label: "Neon Mint", class: "bg-emerald-400" },
      solar: { color: "#f59e0b", label: "Solar Gold", class: "bg-amber-400" },
      cyber: { color: "#60a5fa", label: "Cyber Blue", class: "bg-blue-400" },
      chrome: { color: "rgba(255, 255, 255, 0.4)", label: "Neutral Chrome", class: "bg-zinc-300 dark:bg-zinc-600" }
    }

    const activeColor = theme === "custom" ? customColor : themeColors[theme].color

    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        {/* Modern ShimmerBorder Preview */}
        <ShimmerBorder
          shimmerColor={activeColor}
          borderWidth={borderWidth}
          duration={duration}
          shimmerSize={shimmerSize}
          borderRadius={borderRadius}
          className="w-full shadow-lg"
        >
          <div className="px-6 py-5 flex flex-col justify-between min-h-[140px] bg-white dark:bg-zinc-950">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                  Perimeter Sweep
                </span>
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <h3 className="mt-3 text-base font-bold text-zinc-900 dark:text-white">Active Light Sweep</h3>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed">
                GPU-accelerated conic masking sweeps a flowing fiber-optic light beam around the card boundaries.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-[9px] font-mono text-zinc-400 dark:text-zinc-500 border-t border-zinc-100 dark:border-zinc-900/50 pt-2.5">
              <span>Width: {borderWidth}px</span>
              <span>Speed: {duration}s</span>
              <span>Spread: {shimmerSize}%</span>
            </div>
          </div>
        </ShimmerBorder>

        {/* Theme select controls */}
        <div className="flex flex-col gap-3 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
            Laser Theme Presets
          </div>
          
          <div className="flex flex-wrap gap-1.5">
            {(["orchid", "mint", "solar", "cyber", "chrome", "custom"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-md border transition-all cursor-pointer",
                  theme === t
                    ? "border-zinc-350 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 shadow-xs"
                    : "border-transparent text-zinc-500 hover:text-zinc-850 dark:text-zinc-400 dark:hover:text-zinc-200"
                )}
              >
                {t !== "custom" && (
                  <span className={cn("size-2 rounded-full shrink-0", themeColors[t].class)} />
                )}
                {t === "custom" ? "🎨 Custom" : themeColors[t].label.split(" ")[1]}
              </button>
            ))}
          </div>

          {theme === "custom" && (
            <div className="flex items-center gap-2 mt-1 animate-in fade-in slide-in-from-top-1 duration-150">
              <Popover>
                <PopoverTrigger className="flex items-center gap-2 px-2.5 py-1 text-xs border rounded-md bg-white dark:bg-zinc-950 cursor-pointer shadow-xs">
                  <span
                    className="size-3.5 rounded-full border border-black/10 dark:border-white/10 shrink-0"
                    style={{ backgroundColor: customColor }}
                  />
                  <span className="font-mono text-[10px] uppercase text-zinc-500">{customColor}</span>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4">
                  <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-2">Custom Shimmer Color</div>
                  <ColorPicker
                    value={customColor}
                    onChange={setCustomColor}
                    className="h-auto w-full gap-3"
                  >
                    <ColorPickerSelection className="h-32 rounded-md border border-zinc-200 dark:border-zinc-800" />
                    <ColorPickerHue />
                    <ColorPickerAlpha />
                  </ColorPicker>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        {/* Real-time Config Panel (DialKit) */}
        <div className="grid grid-cols-2 gap-4 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="col-span-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">
            Real-time Config Kit (Props)
          </div>
          <DialKitSlider label="Border Width" min={1.0} max={5.0} step={0.5} value={borderWidth} onChange={setBorderWidth} suffix="px" />
          <DialKitSlider label="Shimmer Speed" min={1.0} max={8.0} step={0.5} value={duration} onChange={setDuration} suffix="s" />
          <DialKitSlider label="Shimmer Spread" min={10} max={50} step={5} value={shimmerSize} onChange={setShimmerSize} suffix="%" />
          <DialKitSlider label="Border Radius" min={6} max={32} step={1} value={borderRadius} onChange={setBorderRadius} suffix="px" />
        </div>
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
      <div className="flex flex-col gap-10 w-full  items-center">
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
  "border-glow": function BorderGlowDemo() {
    const [key, setKey] = React.useState(0)
    const [intensity, setIntensity] = React.useState(1.0)
    const [edgeSensitivity, setEdgeSensitivity] = React.useState(30)
    const [borderRadius, setBorderRadius] = React.useState(28)
    const [glowRadius, setGlowRadius] = React.useState(40)
    const [coneSpread, setConeSpread] = React.useState(25)
    
    // Theme options
    const [theme, setTheme] = React.useState<"orchid" | "mint" | "solar" | "cyber" | "custom">("orchid")
    
    // Custom configurations
    const [customGlow, setCustomGlow] = React.useState("280 80 70")
    const [customColors, setCustomColors] = React.useState(["#c084fc", "#f472b6", "#38bdf8"])

    const themePresets = {
      orchid: {
        glowColor: "280 80 70",
        colors: ["#c084fc", "#f472b6", "#38bdf8"],
        label: "Orchid Glow",
        class: "from-purple-400 via-pink-400 to-sky-400"
      },
      mint: {
        glowColor: "160 80 60",
        colors: ["#34d399", "#22d3ee", "#3b82f6"],
        label: "Neon Mint",
        class: "from-emerald-400 via-cyan-400 to-blue-400"
      },
      solar: {
        glowColor: "340 85 65",
        colors: ["#fb7185", "#f59e0b", "#ec4899"],
        label: "Solar Flare",
        class: "from-rose-450 via-amber-400 to-pink-500"
      },
      cyber: {
        glowColor: "210 90 60",
        colors: ["#60a5fa", "#3b82f6", "#10b981"],
        label: "Cyber Blue",
        class: "from-blue-400 via-indigo-500 to-emerald-400"
      }
    }

    const activeGlowColor = theme === "custom" ? customGlow : themePresets[theme].glowColor
    const activeColors = theme === "custom" ? customColors : themePresets[theme].colors

    const setCustomColorAtIndex = (index: number, val: string) => {
      const copy = [...customColors]
      copy[index] = val
      setCustomColors(copy)
    }

    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-lg">
        {/* Border Glow Showcase */}
        <BorderGlow
          key={`${key}-${theme}`}
          animated={true}
          glowIntensity={intensity}
          edgeSensitivity={edgeSensitivity}
          borderRadius={borderRadius}
          glowRadius={glowRadius}
          coneSpread={coneSpread}
          className="w-full aspect-video"
          glowColor={activeGlowColor}
          colors={activeColors}
        >
          <div className="flex flex-col justify-between h-full p-6 text-zinc-100">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-purple-400 font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                Active Sweep
              </span>
              <h3 className="mt-4 text-xl font-medium tracking-tight text-white">Kanso Border Glow</h3>
              <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                A premium, high-performance card using custom mesh gradient masks. Move your cursor to see the border and glow light up around the coordinates.
              </p>
            </div>
            <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
              <span>Glow: HSL({activeGlowColor})</span>
              <span>Mesh: {activeColors.map(c => c.slice(0, 7)).join(", ")}</span>
            </div>
          </div>
        </BorderGlow>

        {/* Color controls */}
        <div className="flex flex-col gap-4 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
            Border & Glow Themes
          </div>
          
          <div className="flex flex-wrap gap-2">
            {(["orchid", "mint", "solar", "cyber", "custom"] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTheme(t)
                  setKey((k) => k + 1)
                }}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all border cursor-pointer",
                  theme === t
                    ? "border-zinc-300 dark:border-zinc-700 bg-zinc-55 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 shadow-xs"
                    : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                )}
              >
                {t !== "custom" && (
                  <span className={cn("size-2.5 rounded-full bg-gradient-to-r shrink-0", themePresets[t].class)} />
                )}
                {t === "custom" ? "🎨 Custom Color Wheel" : themePresets[t].label}
              </button>
            ))}
          </div>

          {theme === "custom" && (
            <div className="flex flex-wrap gap-4 items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-955/60 border border-zinc-100 dark:border-zinc-900 animate-in fade-in duration-200">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] uppercase font-semibold text-zinc-400">Outer Glow</span>
                <Popover>
                  <PopoverTrigger className="flex items-center gap-2 px-2.5 py-1 text-xs border rounded-md bg-white dark:bg-zinc-900 cursor-pointer shadow-xs">
                    <span
                      className="size-3.5 rounded-full border border-black/10 dark:border-white/10 shrink-0"
                      style={{ backgroundColor: `hsl(${customGlow.split(" ")[0]}deg ${customGlow.split(" ")[1]}% ${customGlow.split(" ")[2]}%)` }}
                    />
                    <span className="font-mono text-[10px]">HSL({customGlow})</span>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-4">
                    <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-2">Glow Base Color</div>
                    <ColorPicker
                      value={(() => {
                        try {
                          const parts = customGlow.split(" ")
                          return Color.hsl(parseFloat(parts[0]), parseFloat(parts[1]), parseFloat(parts[2])).hex()
                        } catch {
                          return "#c084fc"
                        }
                      })()}
                      onChange={(val) => {
                        try {
                          const [h, s, l] = Color(val).hsl().array()
                          setCustomGlow(`${Math.round(h)} ${Math.round(s)} ${Math.round(l)}`)
                        } catch {}
                      }}
                      className="h-auto w-full gap-3"
                    >
                      <ColorPickerSelection className="h-32 rounded-md border border-zinc-200 dark:border-zinc-800" />
                      <ColorPickerHue />
                      <ColorPickerAlpha />
                    </ColorPicker>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] uppercase font-semibold text-zinc-400">Mesh Gradients</span>
                <div className="flex gap-2">
                  {customColors.map((color, index) => (
                    <Popover key={index}>
                      <PopoverTrigger className="flex items-center justify-center p-1.5 border rounded-md bg-white dark:bg-zinc-900 cursor-pointer shadow-xs">
                        <span
                          className="size-4 rounded-full border border-black/10 dark:border-white/10"
                          style={{ backgroundColor: color }}
                        />
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-4">
                        <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-2">Mesh Color {index + 1}</div>
                        <ColorPicker
                          value={color}
                          onChange={(val) => setCustomColorAtIndex(index, val)}
                          className="h-auto w-full gap-3"
                        >
                          <ColorPickerSelection className="h-32 rounded-md border border-zinc-200 dark:border-zinc-800" />
                          <ColorPickerHue />
                          <ColorPickerAlpha />
                        </ColorPicker>
                      </PopoverContent>
                    </Popover>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Real-time Config Panel (DialKit) */}
        <div className="grid grid-cols-2 gap-4 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30 font-sans">
          <div className="col-span-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">
            Real-time Config Kit (Props)
          </div>
          <DialKitSlider label="Glow Intensity" min={0.2} max={2.0} step={0.1} value={intensity} onChange={setIntensity} />
          <DialKitSlider label="Edge Sensitivity" min={10} max={80} step={2} value={edgeSensitivity} onChange={setEdgeSensitivity} />
          <DialKitSlider label="Border Radius" min={8} max={40} step={1} value={borderRadius} onChange={setBorderRadius} suffix="px" />
          <DialKitSlider label="Glow Radius" min={20} max={80} step={5} value={glowRadius} onChange={setGlowRadius} suffix="px" />
          <div className="col-span-2">
            <DialKitSlider label="Conic Spread Angle" min={10} max={60} step={1} value={coneSpread} onChange={setConeSpread} suffix="°" />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between w-full gap-4 mt-1 border-t border-zinc-100 dark:border-zinc-900 pt-4">
          <button
            onClick={() => setKey((k) => k + 1)}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-md border border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900 transition-all shadow-xs cursor-pointer active:scale-95"
          >
            ⚡ Trigger Sweep Animation
          </button>
        </div>
      </div>
    )
  },
  "spotlight-card": function SpotlightCardDemo() {
    return (
      <div className="grid gap-6 sm:grid-cols-3 w-full max-w-3xl">
        <SpotlightCard className="p-6">
          <div className="size-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200/60 dark:border-zinc-800/80">
            ✨
          </div>
          <h4 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-50">Pure Simplicity</h4>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Minimalist aesthetics inspired by Japanese design. Clean, light-weight, and developer-friendly.
          </p>
        </SpotlightCard>

        <SpotlightCard className="p-6" spotlightColor="rgba(168, 85, 247, 0.12)">
          <div className="size-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-650 dark:text-purple-400">
            🔮
          </div>
          <h4 className="mt-4 font-semibold text-purple-650 dark:text-purple-450">Indigo Accent</h4>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Customizable spotlight gradients. Override default options to match your product colors.
          </p>
        </SpotlightCard>

        <SpotlightCard className="p-6">
          <div className="size-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200/60 dark:border-zinc-800/80">
            🚀
          </div>
          <h4 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-50">Zero Re-renders</h4>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Tracks cursor position via direct CSS variable mutations, bypassing component updates.
          </p>
        </SpotlightCard>
      </div>
    )
  },
  "three-d-card": function ThreeDCardDemo() {
    const [translateZTitle, setTranslateZTitle] = React.useState(50)
    const [translateZDesc, setTranslateZDesc] = React.useState(30)
    const [translateZImage, setTranslateZImage] = React.useState(80)
    const [translateZSpecs, setTranslateZSpecs] = React.useState(45)
    const [translateZButton, setTranslateZButton] = React.useState(60)
    const [tiltSensitivity, setTiltSensitivity] = React.useState(25)
    const [sheenOpacity, setSheenOpacity] = React.useState(0.4)
    const [borderRadius, setBorderRadius] = React.useState(24)
    const [glareBlur, setGlareBlur] = React.useState(16)

    return (
      <div className="flex flex-col items-center gap-8 w-full max-w-sm">
        {/* Modern, minimal, and "lit" 3D Card Container */}
        <CardContainer containerClassName="py-2 w-full" tiltSensitivity={tiltSensitivity}>
          <CardBody 
            style={{ borderRadius: `${borderRadius}px` }} 
            className="group relative h-auto w-full border border-zinc-200/60 dark:border-zinc-800/80 bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300"
          >
            {/* Polished inner chamfered border highlight */}
            <div className="absolute inset-0 rounded-[inherit] border border-white/20 dark:border-white/5 pointer-events-none z-20" />

            {/* Specular linear sheen sweep reflection (sharp light reflection) */}
            <div
              className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 mix-blend-overlay"
            >
              <div
                className="absolute -inset-[50%] transition-transform duration-75 ease-out"
                style={{
                  background: `linear-gradient(115deg, transparent 20%, rgba(255,255,255,0) 30%, rgba(56,189,248,${sheenOpacity * 0.15}) 40%, rgba(255,255,255,${sheenOpacity * 0.95}) 50%, rgba(244,114,182,${sheenOpacity * 0.15}) 60%, rgba(255,255,255,0) 70%, transparent 80%)`,
                  transform: `translateX(calc(var(--mouse-x-pct, 50%) * 2.4 - 120%)) translateY(calc(var(--mouse-y-pct, 50%) * 2.4 - 120%)) rotate(25deg)`,
                  filter: glareBlur ? `blur(${glareBlur}px)` : "none",
                }}
              />
            </div>

            {/* Broad soft ambient highlight spotlight */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[inherit] z-10 mix-blend-overlay"
              style={{
                background: `radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, ${sheenOpacity * 0.25}), transparent 80%)`,
                filter: glareBlur ? `blur(${Math.round(glareBlur * 1.5)}px)` : "none",
              }}
            />

            <CardItem
              translateZ={35}
              className="absolute top-6 right-6 text-[9px] font-semibold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/80"
            >
              Limited Concept
            </CardItem>

            <CardItem
              translateZ={translateZTitle}
              className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight"
            >
              Zen Artisan Keycaps
            </CardItem>
            
            <CardItem
              translateZ={translateZDesc}
              className="mt-1 text-xs text-zinc-500 dark:text-zinc-400"
            >
              Frosted obsidian design featuring spring mechanical actions.
            </CardItem>

            {/* Float Shadow Cast effect helper */}
            <div className="relative w-full mt-5">
              <CardItem
                translateZ={translateZImage}
                className="w-full overflow-hidden rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 aspect-video shadow-2xl relative z-10"
              >
                <img
                  src="/3d-card.png"
                  alt="Zen Artisan Card visual"
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </CardItem>
              {/* Dynamic shadow that floats underneath matching image translateZ, wrapped in CardItem to auto-align on hover-exit */}
              <CardItem 
                translateZ={Math.round(translateZImage * 0.35)}
                className="absolute inset-0 size-full rounded-xl bg-black/15 dark:bg-black/60 blur-lg -z-10 w-full"
              />
            </div>

            {/* Specs Grid */}
            <CardItem
              translateZ={translateZSpecs}
              className="grid grid-cols-3 gap-2.5 mt-5 w-full"
            >
              <div className="flex flex-col p-2.5 rounded-lg border border-zinc-200/50 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-900/40">
                <span className="text-[8px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Profile</span>
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-250 font-mono mt-0.5">Cherry MX</span>
              </div>
              <div className="flex flex-col p-2.5 rounded-lg border border-zinc-200/50 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-900/40">
                <span className="text-[8px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Material</span>
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-250 font-mono mt-0.5">Obsidian PBT</span>
              </div>
              <div className="flex flex-col p-2.5 rounded-lg border border-zinc-200/50 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-900/40">
                <span className="text-[8px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Weight</span>
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-250 font-mono mt-0.5">145g Set</span>
              </div>
            </CardItem>

            <div className="flex items-center justify-between mt-6">
              <CardItem
                translateZ={40}
                className="text-base font-bold text-zinc-900 dark:text-white font-mono"
              >
                $189.00
              </CardItem>
              <CardItem
                translateZ={translateZButton}
                as="button"
                className="rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-4 py-2 text-xs font-bold transition-all hover:bg-zinc-800 dark:hover:bg-zinc-200 cursor-pointer shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-650"
              >
                Acquire Pro
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>

        {/* Real-time Config Panel (DialKit) */}
        <div className="grid grid-cols-2 gap-4 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="col-span-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">
            Real-time Config Kit (Props)
          </div>
          <DialKitSlider label="Image Lift (Z)" min={20} max={120} step={5} value={translateZImage} onChange={setTranslateZImage} suffix="px" />
          <DialKitSlider label="Specs Lift (Z)" min={10} max={85} step={5} value={translateZSpecs} onChange={setTranslateZSpecs} suffix="px" />
          <DialKitSlider label="Button Lift (Z)" min={10} max={80} step={5} value={translateZButton} onChange={setTranslateZButton} suffix="px" />
          <DialKitSlider label="Title Lift (Z)" min={10} max={80} step={5} value={translateZTitle} onChange={setTranslateZTitle} suffix="px" />
          <DialKitSlider label="Desc Lift (Z)" min={10} max={60} step={5} value={translateZDesc} onChange={setTranslateZDesc} suffix="px" />
          <DialKitSlider label="Tilt Sensitivity" min={10} max={60} step={1} value={tiltSensitivity} onChange={setTiltSensitivity} />
          
          <div className="col-span-2 border-t border-zinc-100 dark:border-zinc-900 pt-3 mt-1 grid grid-cols-2 gap-4">
            <DialKitSlider label="Sheen Opacity" min={0.0} max={1.0} step={0.05} value={sheenOpacity} onChange={setSheenOpacity} />
            <DialKitSlider label="Glare Blur" min={0} max={40} step={1} value={glareBlur} onChange={setGlareBlur} suffix="px" />
            <div className="col-span-2">
              <DialKitSlider label="Card Border Radius" min={8} max={36} step={1} value={borderRadius} onChange={setBorderRadius} suffix="px" />
            </div>
          </div>
        </div>
      </div>
    )
  },
  "interactive-card": function InteractiveCardDemo() {
    const [key, setKey] = React.useState(0)
    const [intensity, setIntensity] = React.useState(1.0)
    const [spotlightSize, setSpotlightSize] = React.useState(300)
    const [borderRadius, setBorderRadius] = React.useState(24)
    const [glowRadius, setGlowRadius] = React.useState(40)

    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        <InteractiveCard
          key={`${key}-${intensity}-${spotlightSize}-${borderRadius}-${glowRadius}`}
          animated={true}
          glowIntensity={intensity}
          spotlightSize={spotlightSize}
          borderRadius={borderRadius}
          glowRadius={glowRadius}
          className="w-full"
          glowColor="320 80 60"
          spotlightColor="rgba(236, 72, 153, 0.15)"
          colors={["#f472b6", "#ec4899", "#8b5cf6"]}
        >
          <CardBody className="relative h-auto w-full p-6 text-zinc-150 flex flex-col justify-between">
            {/* Ambient backdrop glow circle inside */}
            <div className="absolute inset-0 w-full h-full -z-10 rounded-[inherit] overflow-hidden pointer-events-none opacity-40">
              <div className="absolute bottom-[-10%] left-[-10%] size-[55%] rounded-full bg-pink-600/10 blur-[50px]" />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <CardItem
                  translateZ={50}
                  className="text-xs font-semibold uppercase tracking-wider text-pink-400 px-2 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/20"
                >
                  Supreme Effect
                </CardItem>
                <CardItem translateZ={30} className="text-zinc-500 text-xs font-mono">
                  All-in-One
                </CardItem>
              </div>

              <CardItem
                translateZ={60}
                className="mt-6 text-2xl font-bold tracking-tight text-white"
              >
                Zen Interaction
              </CardItem>

              <CardItem
                translateZ={40}
                className="mt-2 text-xs text-zinc-400 leading-relaxed"
              >
                Moves in 3D perspective, tracks cursor coordinates via spotlight, and glows along the conic mesh gradient edges.
              </CardItem>
            </div>

            <div className="flex items-center justify-between mt-8">
              <CardItem
                translateZ={45}
                className="text-xs font-semibold text-zinc-300 font-mono"
              >
                Interactive Preview
              </CardItem>
              <CardItem
                translateZ={90}
                as="button"
                onClick={() => setKey((k) => k + 1)}
                className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-colors cursor-pointer border border-transparent shadow-md active:scale-95"
              >
                Replay Sweep
              </CardItem>
            </div>
          </CardBody>
        </InteractiveCard>

        {/* Real-time Config Panel (DialKit) */}
        <div className="grid grid-cols-2 gap-4 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="col-span-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 font-sans">
            Real-time Config Kit (Props)
          </div>
          <DialKitSlider label="Glow Intensity" min={0.2} max={2.0} step={0.1} value={intensity} onChange={setIntensity} />
          <DialKitSlider label="Spotlight Radius" min={150} max={450} step={10} value={spotlightSize} onChange={setSpotlightSize} suffix="px" />
          <DialKitSlider label="Border Radius" min={12} max={36} step={1} value={borderRadius} onChange={setBorderRadius} suffix="px" />
          <DialKitSlider label="Glow Radius" min={20} max={80} step={5} value={glowRadius} onChange={setGlowRadius} suffix="px" />
        </div>
      </div>
    )
  },
  "liquid-metal-card": function LiquidMetalCardDemo() {
    const [repetition, setRepetition] = React.useState(6)
    const [softness, setSoftness] = React.useState(0.8)
    const [distortion, setDistortion] = React.useState(0.4)
    const [speed, setSpeed] = React.useState(1.0)
    const [scale, setScale] = React.useState(0.6)
    const [colorTint, setColorTint] = React.useState("#2c5d72")
    const [image, setImage] = React.useState("/Kansologo.png")
    const [theme, setTheme] = React.useState<"default" | "gold" | "cyberpunk" | "emerald" | "amethyst" | "chrome" | "custom">("default")

    const handleThemeChange = (t: "default" | "gold" | "cyberpunk" | "emerald" | "amethyst" | "chrome" | "custom") => {
      setTheme(t)
      if (t === "default") {
        setColorTint("#2c5d72")
        setRepetition(6)
        setSoftness(0.8)
        setDistortion(0.4)
        setSpeed(1.0)
        setScale(0.6)
      } else if (t === "gold") {
        setColorTint("#ffd700")
        setRepetition(5)
        setSoftness(0.6)
        setDistortion(0.5)
        setSpeed(0.8)
        setScale(0.55)
      } else if (t === "cyberpunk") {
        setColorTint("#ff007f")
        setRepetition(10)
        setSoftness(0.8)
        setDistortion(0.7)
        setSpeed(1.2)
        setScale(0.65)
      } else if (t === "emerald") {
        setColorTint("#10b981")
        setRepetition(7)
        setSoftness(0.5)
        setDistortion(0.6)
        setSpeed(1.1)
        setScale(0.6)
      } else if (t === "amethyst") {
        setColorTint("#8a2be2")
        setRepetition(6)
        setSoftness(0.7)
        setDistortion(0.45)
        setSpeed(0.9)
        setScale(0.58)
      } else if (t === "chrome") {
        setColorTint("#888888")
        setRepetition(8)
        setSoftness(0.4)
        setDistortion(0.8)
        setSpeed(1.5)
        setScale(0.7)
      }
    }

    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        {/* Component Display */}
        <LiquidMetalCard
          title="Minimal Shader Card"
          subtitle={theme === "custom" ? "Custom Preset" : `${theme.charAt(0).toUpperCase() + theme.slice(1)} Mode`}
          description="Move your cursor and interact with the real-time liquid metal physics. Drag or hover to warp the liquid surface mask dynamically."
          desktopShaderProps={{
            repetition,
            softness,
            distortion,
            speed,
            scale,
            colorTint,
            image,
          }}
          className="w-full shadow-lg"
        />

        {/* Theme presets row */}
        <div className="flex flex-col gap-3 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
            Shader Theme Presets
          </div>
          
          <div className="flex flex-wrap gap-1.5">
            {(["default", "gold", "cyberpunk", "emerald", "amethyst", "chrome", "custom"] as const).map((t) => (
              <button
                key={t}
                onClick={() => handleThemeChange(t)}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-md border transition-all cursor-pointer capitalize",
                  theme === t
                    ? "border-zinc-350 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 shadow-xs"
                    : "border-transparent text-zinc-500 hover:text-zinc-850 dark:text-zinc-400 dark:hover:text-zinc-200"
                )}
              >
                {t !== "custom" && t !== "default" && (
                  <span
                    className="size-2 rounded-full shrink-0 border border-black/10 dark:border-white/10"
                    style={{
                      backgroundColor:
                        t === "gold"
                          ? "#ffd700"
                          : t === "cyberpunk"
                            ? "#ff007f"
                            : t === "emerald"
                              ? "#10b981"
                              : t === "amethyst"
                                ? "#8a2be2"
                                : t === "chrome"
                                  ? "#888888"
                                  : undefined,
                    }}
                  />
                )}
                {t === "custom" ? "🎨 Custom Color" : t}
              </button>
            ))}
          </div>

          {(theme === "custom" || theme === "default") && (
            <div className="flex items-center gap-3 mt-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
              <span className="text-xs text-zinc-400 font-sans">Color Tint:</span>
              <Popover>
                <PopoverTrigger className="flex items-center gap-2 px-2.5 py-1.5 text-xs border rounded-md bg-white dark:bg-zinc-950 cursor-pointer shadow-xs border-zinc-200 dark:border-zinc-800">
                  <span
                    className="size-3.5 rounded-full border border-black/10 dark:border-white/10 shrink-0"
                    style={{ backgroundColor: colorTint }}
                  />
                  <span className="font-mono text-[10px] uppercase text-zinc-500">{colorTint}</span>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4">
                  <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-2">Custom Color Tint</div>
                  <ColorPicker
                    value={colorTint}
                    onChange={(val) => {
                      setColorTint(val)
                      setTheme("custom")
                    }}
                    className="h-auto w-full gap-3"
                  >
                    <ColorPickerSelection className="h-32 rounded-md border border-zinc-200 dark:border-zinc-800" />
                    <ColorPickerHue />
                    <ColorPickerAlpha />
                  </ColorPicker>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        {/* Shader texture image selection */}
        <div className="flex flex-col gap-3 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
            Shader Texture Image
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-wrap gap-1.5">
              {[
                { name: "Kanso", value: "/Kansologo.png" },
                { name: "Next.js", value: "/next.svg" },
                { name: "Vercel", value: "/vercel.svg" },
                { name: "Globe", value: "/globe.svg" },
                { name: "Window", value: "/window.svg" },
                { name: "File", value: "/file.svg" },
              ].map((img) => (
                <button
                  key={img.value}
                  onClick={() => {
                    setImage(img.value)
                    setTheme("custom")
                  }}
                  className={cn(
                    "px-2.5 py-1 text-[10px] font-semibold rounded-md border transition-all cursor-pointer",
                    image === img.value
                      ? "border-zinc-350 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 shadow-xs"
                      : "border-transparent text-zinc-500 hover:text-zinc-850 dark:text-zinc-400 dark:hover:text-zinc-200"
                  )}
                >
                  {img.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-sans font-semibold shrink-0 uppercase tracking-wide">Custom URL:</span>
              <input
                type="text"
                placeholder="Paste texture image URL..."
                value={image}
                onChange={(e) => {
                  setImage(e.target.value)
                  setTheme("custom")
                }}
                className="flex-1 text-xs border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-2 py-1 rounded-md text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </div>
          </div>
        </div>

        {/* Real-time Config Panel (DialKit) */}
        <div className="grid grid-cols-2 gap-4 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="col-span-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 font-sans">
            Fine-tune Shader Sliders (Props)
          </div>
          <DialKitSlider
            label="Repetition"
            min={1}
            max={15}
            step={1}
            value={repetition}
            onChange={(val) => {
              setRepetition(val)
              setTheme("custom")
            }}
          />
          <DialKitSlider
            label="Softness"
            min={0.1}
            max={2.0}
            step={0.1}
            value={softness}
            onChange={(val) => {
              setSoftness(val)
              setTheme("custom")
            }}
          />
          <DialKitSlider
            label="Distortion"
            min={0.1}
            max={1.5}
            step={0.05}
            value={distortion}
            onChange={(val) => {
              setDistortion(val)
              setTheme("custom")
            }}
          />
          <DialKitSlider
            label="Speed"
            min={0.1}
            max={3.0}
            step={0.1}
            value={speed}
            onChange={(val) => {
              setSpeed(val)
              setTheme("custom")
            }}
          />
          <DialKitSlider
            label="Scale"
            min={0.2}
            max={1.5}
            step={0.05}
            value={scale}
            onChange={(val) => {
              setScale(val)
              setTheme("custom")
            }}
          />
        </div>
      </div>
    )
  },
  "halftone-image": function HalftoneImageDemo() {
    const [dotSpacing, setDotSpacing] = React.useState<number>(8)
    const [contrast, setContrast] = React.useState<number>(1.2)
    const [brightness, setBrightness] = React.useState<number>(1.0)
    const [distortion, setDistortion] = React.useState<number>(8)
    const [interactive, setInteractive] = React.useState<boolean>(true)

    return (
      <div className="flex flex-col gap-8 w-full max-w-md items-center">
        <div className="w-[300px] h-[300px] rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-950 flex items-center justify-center">
          <HalftoneImage
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400"
            dotSpacing={dotSpacing}
            contrast={contrast}
            brightness={brightness}
            distortionStrength={distortion}
            interactive={interactive}
            alt="Halftone portrait preview"
          />
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-2 gap-4 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="col-span-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 font-sans">
            Adjust Halftone Image Props
          </div>
          <DialKitSlider
            label="Dot Spacing"
            min={4}
            max={16}
            step={1}
            value={dotSpacing}
            onChange={setDotSpacing}
            suffix="px"
          />
          <DialKitSlider
            label="Contrast"
            min={0.5}
            max={2.5}
            step={0.1}
            value={contrast}
            onChange={setContrast}
          />
          <DialKitSlider
            label="Brightness"
            min={0.5}
            max={2.0}
            step={0.1}
            value={brightness}
            onChange={setBrightness}
          />
          <DialKitSlider
            label="Warp Strength"
            min={0}
            max={20}
            step={1}
            value={distortion}
            onChange={setDistortion}
            suffix="px"
          />
          <div className="col-span-2 flex items-center justify-between text-xs pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
            <span className="text-zinc-500 font-medium">Interactive Hover Distortion</span>
            <input
              type="checkbox"
              checked={interactive}
              onChange={(e) => setInteractive(e.target.checked)}
              className="accent-purple-500"
            />
          </div>
        </div>
      </div>
    )
  },
  "halftone-grid": function HalftoneGridDemo() {
    const [spacing, setSpacing] = React.useState<number>(14)
    const [radius, setRadius] = React.useState<number>(1.5)
    const [bulge, setBulge] = React.useState<number>(67)
    const [cursorRad, setCursorRad] = React.useState<number>(500)
    const [sparkle, setSparkle] = React.useState<boolean>(false)
    const [colorTheme, setColorTheme] = React.useState<"purple" | "cyan" | "emerald" | "rose" | "amber">("purple")

    const themes = {
      purple: { from: "rgba(168, 85, 247, 0.35)", to: "rgba(180, 151, 207, 0.25)", glow: "#120F17", badge: "bg-purple-500" },
      cyan: { from: "rgba(6, 182, 212, 0.35)", to: "rgba(34, 211, 238, 0.25)", glow: "#081E24", badge: "bg-cyan-500" },
      emerald: { from: "rgba(16, 185, 129, 0.35)", to: "rgba(52, 211, 153, 0.25)", glow: "#051F14", badge: "bg-emerald-500" },
      rose: { from: "rgba(244, 63, 94, 0.35)", to: "rgba(251, 113, 133, 0.25)", glow: "#240509", badge: "bg-rose-500" },
      amber: { from: "rgba(245, 158, 11, 0.35)", to: "rgba(251, 191, 36, 0.25)", glow: "#241805", badge: "bg-amber-500" },
    }

    return (
      <div className="flex flex-col gap-8 w-full max-w-lg items-center">
        <div className="w-full h-[300px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/20 rounded-xl relative overflow-hidden flex items-center justify-center text-center shadow-xs">
          <HalftoneGrid
            dotRadius={radius}
            dotSpacing={spacing}
            cursorRadius={cursorRad}
            bulgeStrength={bulge}
            sparkle={sparkle}
            gradientFrom={themes[colorTheme].from}
            gradientTo={themes[colorTheme].to}
            glowColor={themes[colorTheme].glow}
            className="absolute inset-0"
          />
          <div className="relative z-20 max-w-xs px-4 bg-white/40 dark:bg-black/40 backdrop-blur-xs py-4 rounded-xl border border-white/10 shadow-sm animate-fade-in">
            <h4 className="text-lg font-bold text-zinc-950 dark:text-white mb-2">Interactive Ripple</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Move your mouse over the background to see the dot matrix grid expand and warp dynamically.
            </p>
          </div>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-2 gap-4 w-full p-5 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="col-span-2 flex flex-col gap-2">
            <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest font-sans">
              Adjust Halftone Grid Props
            </div>

            {/* Color Swatches */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-zinc-500 font-medium mr-2">Color Theme:</span>
              {(Object.keys(themes) as Array<keyof typeof themes>).map((tKey) => (
                <button
                  key={tKey}
                  onClick={() => setColorTheme(tKey)}
                  className={cn(
                    "size-5 rounded-full border cursor-pointer transition-all",
                    themes[tKey].badge,
                    colorTheme === tKey
                      ? "border-zinc-900 dark:border-white ring-2 ring-zinc-900/10 dark:ring-white/10 scale-105"
                      : "border-transparent"
                  )}
                />
              ))}
            </div>
          </div>

          <DialKitSlider
            label="Dot Spacing"
            min={8}
            max={25}
            step={1}
            value={spacing}
            onChange={setSpacing}
            suffix="px"
          />
          <DialKitSlider
            label="Dot Radius"
            min={1.0}
            max={3.0}
            step={0.5}
            value={radius}
            onChange={setRadius}
            suffix="px"
          />
          <DialKitSlider
            label="Bulge Strength"
            min={20}
            max={120}
            step={5}
            value={bulge}
            onChange={setBulge}
            suffix="px"
          />
          <DialKitSlider
            label="Cursor Radius"
            min={200}
            max={800}
            step={50}
            value={cursorRad}
            onChange={setCursorRad}
            suffix="px"
          />

          <div className="col-span-2 flex items-center justify-between pt-2 border-t border-zinc-150 dark:border-zinc-800">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Sparkling Effect</span>
            <input
              type="checkbox"
              checked={sparkle}
              onChange={(e) => setSparkle(e.target.checked)}
              className="accent-purple-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    )
  },
  "magic-rings": function MagicRingsDemo() {
    const [color, setColor] = React.useState("#fc42ff")
    const [colorTwo, setColorTwo] = React.useState("#42fcff")
    const [ringCount, setRingCount] = React.useState(6)
    const [speed, setSpeed] = React.useState(1.0)
    const [lineThickness, setLineThickness] = React.useState(2.0)
    const [noiseAmount, setNoiseAmount] = React.useState(0.1)

    return (
      <div className="flex flex-col gap-8 w-full max-w-lg items-center">
        <div className="w-full h-[320px] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 relative shadow-md">
          <MagicRings
            color={color}
            colorTwo={colorTwo}
            ringCount={ringCount}
            speed={speed}
            lineThickness={lineThickness}
            noiseAmount={noiseAmount}
            followMouse={true}
            clickBurst={true}
          />
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <span className="text-[10px] uppercase font-bold text-white/50 tracking-widest font-mono">
              Hover & Click Interactive Shader
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-4 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="col-span-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 font-sans">
            Adjust Shader Uniform Props
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Accent Color</span>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-8 rounded border border-zinc-200 dark:border-zinc-800 bg-transparent p-0 cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Gradient Color</span>
            <input
              type="color"
              value={colorTwo}
              onChange={(e) => setColorTwo(e.target.value)}
              className="w-full h-8 rounded border border-zinc-200 dark:border-zinc-800 bg-transparent p-0 cursor-pointer"
            />
          </div>
          <DialKitSlider
            label="Ring Count"
            min={1}
            max={10}
            step={1}
            value={ringCount}
            onChange={setRingCount}
          />
          <DialKitSlider
            label="Wave Speed"
            min={0.1}
            max={3.0}
            step={0.1}
            value={speed}
            onChange={setSpeed}
          />
          <DialKitSlider
            label="Line Thickness"
            min={0.5}
            max={5.0}
            step={0.5}
            value={lineThickness}
            onChange={setLineThickness}
          />
          <DialKitSlider
            label="Noise Grain"
            min={0.0}
            max={0.5}
            step={0.05}
            value={noiseAmount}
            onChange={setNoiseAmount}
          />
        </div>
      </div>
    )
  },
  "antigravity": function AntigravityDemo() {
    const [count, setCount] = React.useState(250)
    const [magnetRadius, setMagnetRadius] = React.useState(10)
    const [ringRadius, setRingRadius] = React.useState(8)
    const [particleSize, setParticleSize] = React.useState(2.0)
    const [particleShape, setParticleShape] = React.useState<"capsule" | "sphere" | "box" | "tetrahedron">("capsule")

    return (
      <div className="flex flex-col gap-8 w-full max-w-lg items-center">
        <div className="w-full h-[320px] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 relative shadow-md">
          <Antigravity
            count={count}
            magnetRadius={magnetRadius}
            ringRadius={ringRadius}
            particleSize={particleSize}
            particleShape={particleShape}
            color="#FF9FFC"
            autoAnimate={true}
          />
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <span className="text-[10px] uppercase font-bold text-white/50 tracking-widest font-mono">
              React Three Fiber Instanced Field
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-4 w-full p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="col-span-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 font-sans">
            Adjust Particle Instancing Props
          </div>
          <div className="flex flex-col gap-1.5 w-full col-span-2">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Particle Geometry</span>
            <div className="grid grid-cols-4 gap-2">
              {(["capsule", "sphere", "box", "tetrahedron"] as const).map((shape) => (
                <button
                  key={shape}
                  onClick={() => setParticleShape(shape)}
                  className={cn(
                    "text-[10px] font-semibold uppercase tracking-wider py-1.5 border rounded-lg transition-colors cursor-pointer",
                    particleShape === shape
                      ? "bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-900"
                      : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
                  )}
                >
                  {shape}
                </button>
              ))}
            </div>
          </div>
          <DialKitSlider
            label="Particles Count"
            min={100}
            max={500}
            step={50}
            value={count}
            onChange={setCount}
          />
          <DialKitSlider
            label="Magnet Radius"
            min={4}
            max={20}
            step={1}
            value={magnetRadius}
            onChange={setMagnetRadius}
          />
          <DialKitSlider
            label="Orbit Radius"
            min={3}
            max={15}
            step={1}
            value={ringRadius}
            onChange={setRingRadius}
          />
          <DialKitSlider
            label="Particle Scale"
            min={0.5}
            max={4.0}
            step={0.5}
            value={particleSize}
            onChange={setParticleSize}
          />
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
