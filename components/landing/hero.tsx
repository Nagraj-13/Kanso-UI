"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { SparklesIcon, CheckIcon, CopyIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { GITHUB_URL } from "@/lib/constants"
import { GithubButton } from "@/components/kanso/github-button"
import { LiquidMetalCardRoot, LiquidMetalCardVisual } from "@/components/kanso/liquid-metal-card"
import { cn } from "@/lib/utils"

const COLOR_THEMES = [
  {
    name: "multicolor",
    label: "Multicolor",
    gradientFrom: "rgba(168, 85, 247, 0.35)",
    gradientTo: "rgba(6, 182, 212, 0.25)",
    glowColor: "#120F17",
    ringColor: "#ec4899",
    particleColor: "#a855f7",
    colors: ["#a855f7", "#06b6d4", "#10b981", "#f43f5e", "#f59e0b"],
    colorClass: "bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-500",
  },
  {
    name: "purple",
    label: "Purple",
    gradientFrom: "rgba(168, 85, 247, 0.35)",
    gradientTo: "rgba(180, 151, 207, 0.25)",
    glowColor: "#120F17",
    ringColor: "#a855f7",
    particleColor: "#a855f7",
    colors: ["#a855f7", "#c084fc", "#e9d5ff", "#c084fc"],
    colorClass: "bg-purple-500",
  },
  {
    name: "cyan",
    label: "Cyan",
    gradientFrom: "rgba(6, 182, 212, 0.35)",
    gradientTo: "rgba(34, 211, 238, 0.25)",
    glowColor: "#081E24",
    ringColor: "#06b6d4",
    particleColor: "#06b6d4",
    colors: ["#06b6d4", "#22d3ee", "#67e8f9", "#22d3ee"],
    colorClass: "bg-cyan-500",
  },
  {
    name: "emerald",
    label: "Emerald",
    gradientFrom: "rgba(16, 185, 129, 0.35)",
    gradientTo: "rgba(52, 211, 153, 0.25)",
    glowColor: "#051F14",
    ringColor: "#10b981",
    particleColor: "#10b981",
    colors: ["#10b981", "#34d399", "#6ee7b7", "#34d399"],
    colorClass: "bg-emerald-500",
  },
  {
    name: "rose",
    label: "Rose",
    gradientFrom: "rgba(244, 63, 94, 0.35)",
    gradientTo: "rgba(251, 113, 133, 0.25)",
    glowColor: "#240509",
    ringColor: "#f43f5e",
    particleColor: "#f43f5e",
    colors: ["#f43f5e", "#fb7185", "#fda4af", "#fb7185"],
    colorClass: "bg-rose-500",
  },
  {
    name: "amber",
    label: "Amber",
    gradientFrom: "rgba(245, 158, 11, 0.35)",
    gradientTo: "rgba(251, 191, 36, 0.25)",
    glowColor: "#241805",
    ringColor: "#f59e0b",
    particleColor: "#f59e0b",
    colors: ["#f59e0b", "#fbbf24", "#fcd34d", "#fbbf24"],
    colorClass: "bg-amber-500",
  },
]

export function Hero() {
  const { theme } = useTheme()
  const [copied, setCopied] = React.useState(false)
  const [halftoneParams, setHalftoneParams] = React.useState({
    dotRadius: 1.5,
    dotSpacing: 12,
    sparkle: true,
    gradientFrom: "rgba(168, 85, 247, 0.35)",
    gradientTo: "rgba(6, 182, 212, 0.25)",
    glowColor: "#120F17",
    ringColor: "#ec4899",
    particleColor: "#a855f7",
    colors: ["#a855f7", "#06b6d4", "#10b981", "#f43f5e", "#f59e0b"],
    themeName: "multicolor",
  })

  const handleCopy = () => {
    navigator.clipboard.writeText("npx kanso-ui add magnetic-button")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const heroCardRef = React.useRef<HTMLDivElement>(null)

  const handleCardPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = heroCardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const tiltX = (e.clientX - rect.left - rect.width / 2) / 18
    const tiltY = (e.clientY - rect.top - rect.height / 2) / -18
    card.style.transition = "none"
    card.style.transform = `perspective(1000px) rotateY(${tiltX}deg) rotateX(${tiltY}deg) translateZ(4px)`
  }

  const handleCardPointerLeave = () => {
    const card = heroCardRef.current
    if (!card) return
    card.style.transition = "transform 0.5s cubic-bezier(0.03, 0.98, 0.52, 0.99)"
    card.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)"
  }

  const resolvedColorTint = React.useMemo(() => {
    const isDark = theme === "dark" || (theme !== "light" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches)
    if (isDark) {
      return halftoneParams.ringColor || "#a855f7"
    } else {
      const colorMap: Record<string, string> = {
        multicolor: "#6366f1",
        purple: "#7c3aed",
        cyan: "#0891b2",
        emerald: "#059669",
        rose: "#e11d48",
        amber: "#d97706"
      }
      return colorMap[halftoneParams.themeName] || "#27272a"
    }
  }, [theme, halftoneParams.themeName, halftoneParams.ringColor])

  return (
    <section className="relative w-full pt-10 pb-6 overflow-hidden bg-background text-foreground">
      <div className="relative m-4 md:m-6 py-12 md:py-20 rounded-3xl overflow-hidden bg-[linear-gradient(to_bottom,_var(--background)_30%,_#6d18ff_75%,_#9569fe_100%)]">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[95%] bg-[var(--background)] blur-3xl rounded-full z-0" />
        
        {/* Evervault Styled Upward-Sweeping Gradient Aura at the bottom */}
        <div 
          className="absolute inset-x-0 bottom-0 h-[420px] pointer-events-none transition-all duration-500 opacity-95 z-0"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(99, 102, 241, 0.35) 0%, rgba(139, 92, 246, 0.18) 45%, rgba(168, 85, 247, 0.05) 70%, transparent 100%)"
          }}
        />

        {/* Hero Content Container - Split Layout */}
        <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-20 w-full grid gap-12 lg:grid-cols-12 items-center">
        
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Introducing Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100/60 dark:border-zinc-800 dark:bg-zinc-900/60 px-3 py-1 text-xs font-semibold text-zinc-800 dark:text-zinc-300 shadow-xs select-none"
            >
              <SparklesIcon className="size-3 text-zinc-500 dark:text-zinc-400" />
              <span>Introducing Kanso UI</span>
            </motion.div>

            {/* Staggered Word Reveal Animated Headline */}
            <h1 className="max-w-2xl font-sans text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl md:text-6xl md:leading-[1.1] flex flex-wrap justify-start gap-x-3 gap-y-1">
              {"Build Beautiful Interfaces Without Complexity".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.05 + 0.1,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className={cn(
                    "inline-block",
                    (word === "Beautiful" || word === "Complexity") && 
                    "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-600 dark:from-violet-400 dark:via-fuchsia-300 dark:to-indigo-400"
                  )}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-zinc-650 dark:text-zinc-400"
            >
              Thoughtfully designed React components for modern applications. Inspired by Japanese minimalism and engineered for copy-paste ease, customizability, and WCAG accessibility.
            </motion.p>

            {/* Command Install Pill Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="mt-8 flex items-center gap-2.5 rounded-full border border-zinc-200 bg-zinc-100/40 dark:border-zinc-800 dark:bg-zinc-900/40 pl-3.5 pr-2 py-1 font-mono text-[11px] text-zinc-655 dark:text-zinc-400 shadow-xs hover:border-zinc-300 hover:bg-zinc-100/60 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/60 transition-all select-all group"
            >
              <span>$</span>
              <span>npx kanso-ui add magnetic-button</span>
              <button 
                onClick={handleCopy}
                className="ml-2.5 p-1 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800/50 cursor-pointer transition-colors animate-in fade-in"
                title="Copy to clipboard"
              >
                {copied ? <CheckIcon className="size-3.5 text-green-500" /> : <CopyIcon className="size-3.5" />}
              </button>
            </motion.div>

            {/* Action Button Group */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center"
            >
              <Button
                className="w-full sm:w-auto px-8 h-11 text-sm font-semibold cursor-pointer shadow-sm rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 border-none"
                render={<Link href="/docs" />}
              >
                Browse Components
              </Button>
              <GithubButton
                variantDesign="rainbow"
                href={GITHUB_URL}
                className="w-full sm:w-auto h-11 rounded-full font-semibold"
              >
                Star on GitHub
              </GithubButton>
            </motion.div>
          </div>

          {/* Right Column: LiquidMetalCard Sandbox Mockup */}
          <div className="lg:col-span-5 flex justify-center w-full relative z-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="w-full max-w-[400px] shrink-0"
              style={{ perspective: "1000px" }}
            >
              <LiquidMetalCardRoot
                ref={heroCardRef}
                onPointerMove={handleCardPointerMove}
                onPointerLeave={handleCardPointerLeave}
                className="w-full rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-background p-5 shadow-2xl backdrop-blur-md relative overflow-hidden group select-none transition-transform duration-300 ease-out"
                style={{ transformStyle: "preserve-3d" }}
                colorTint={resolvedColorTint}
                distortion={0.5}
                softness={0.7}
                repetition={8}
                scale={0.55}
                image="/Kansologo.png"
              >
                <div className="flex flex-col gap-4 w-full relative z-10 text-left">
                  {/* Sandbox Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-red-400" />
                      <span className="size-2 rounded-full bg-yellow-400" />
                      <span className="size-2 rounded-full bg-green-400" />
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200 dark:text-zinc-400 dark:bg-zinc-900 dark:border-zinc-800">
                      kanso-sandbox.tsx
                    </span>
                  </div>

                  {/* Visual metallic logo container */}
                  <LiquidMetalCardVisual 
                    className="h-28 w-full overflow-hidden rounded-xl bg-zinc-950 relative border border-zinc-800/80 flex items-center justify-center"
                    desktopShaderProps={{
                      image: "/Kansologo.png",
                      colorTint: resolvedColorTint,
                      distortion: 0.45,
                      softness: 0.8,
                      repetition: 7,
                      scale: 0.52,
                    }}
                  />

                  {/* Compact Color Themes row */}
                  <div className="flex flex-col gap-2 p-3 rounded-xl border border-zinc-200/50 bg-zinc-100/20 dark:border-zinc-800/50 dark:bg-zinc-900/20">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                        Ambient Palette Space
                      </span>
                      <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 capitalize">
                        {halftoneParams.themeName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      {COLOR_THEMES.map((themeItem) => (
                        <button
                          key={themeItem.name}
                          onClick={() =>
                            setHalftoneParams((prev) => ({
                              ...prev,
                              gradientFrom: themeItem.gradientFrom,
                              gradientTo: themeItem.gradientTo,
                              glowColor: themeItem.glowColor,
                              ringColor: themeItem.ringColor,
                              particleColor: themeItem.particleColor,
                              colors: themeItem.colors,
                              themeName: themeItem.name,
                            }))
                          }
                          className={cn(
                            "size-5 rounded-full border cursor-pointer transition-all hover:scale-110 flex items-center justify-center shrink-0",
                            themeItem.colorClass,
                            halftoneParams.themeName === themeItem.name
                              ? "border-white ring-2 ring-white/10 scale-105"
                              : "border-transparent"
                          )}
                          title={themeItem.label}
                        >
                          {halftoneParams.themeName === themeItem.name && (
                            <CheckIcon className="size-2 text-white mix-blend-difference" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tactile copy/paste mechanical combo */}
                  <div className="flex flex-col gap-2 p-3 rounded-xl border border-zinc-200/50 bg-zinc-100/20 dark:border-zinc-800/50 dark:bg-zinc-900/20 relative overflow-hidden">
                    <div className="flex items-center justify-between text-[9px] font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-widest">
                      <span>Tactile Copy Code</span>
                      <span className="font-mono text-zinc-600 dark:text-zinc-400 font-semibold">{copied ? "Copied!" : "Click key combination"}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 py-1">
                      {/* Ctrl Key */}
                      <button 
                        onClick={handleCopy}
                        className={cn(
                          "flex flex-col items-start justify-between text-[10px] border border-black/10 p-2 rounded-t-[10px] rounded-b-[8px] cursor-pointer relative h-[45px] w-[50px] select-none transition-all duration-100 ease-in-out [transform:perspective(50px)_rotateX(5deg)] active:[transform:perspective(50px)_rotateX(5deg)_translateY(2px)_scale(0.96)] focus:outline-none focus-visible:ring-1 bg-zinc-900 text-zinc-50 shadow-[inset_-2px_-5px_0px_rgba(255,255,255,0.3),inset_-2px_-4px_0px_rgba(0,0,0,0.3),0px_1px_1px_rgba(0,0,0,0.3)] hover:bg-zinc-800 font-semibold uppercase font-sans tracking-tight"
                        )}
                      >
                        <span className="text-[7px] opacity-60 self-start">ctrl</span>
                        <span className="self-end mt-auto text-[8px] font-bold">Ctrl</span>
                      </button>
                      <span className="text-zinc-500 font-bold text-[9px] select-none">+</span>
                      {/* C Key */}
                      <button 
                        onClick={handleCopy}
                        className={cn(
                          "flex flex-col items-start justify-between text-[10px] border border-black/10 p-2 rounded-t-[10px] rounded-b-[8px] cursor-pointer relative h-[45px] w-[45px] select-none transition-all duration-100 ease-in-out [transform:perspective(50px)_rotateX(5deg)] active:[transform:perspective(50px)_rotateX(5deg)_translateY(2px)_scale(0.96)] focus:outline-none focus-visible:ring-1 bg-zinc-800 text-zinc-100 border-zinc-700 shadow-[inset_-2px_-5px_0px_rgba(255,255,255,0.2),inset_-2px_-4px_0px_rgba(0,0,0,0.3),0px_1px_1px_rgba(0,0,0,0.3)] hover:bg-zinc-700 font-semibold uppercase font-sans tracking-tight"
                        )}
                      >
                        <span className="text-[7px] opacity-60 self-start">copy</span>
                        <span className="self-end mt-auto text-[9px] font-bold">C</span>
                      </button>
                      <span className="text-zinc-500 font-bold text-[9px] select-none">+</span>
                      {/* V Key */}
                      <button 
                        onClick={handleCopy}
                        className={cn(
                          "flex flex-col items-start justify-between text-[10px] border border-black/10 p-2 rounded-t-[10px] rounded-b-[8px] cursor-pointer relative h-[45px] w-[45px] select-none transition-all duration-100 ease-in-out [transform:perspective(50px)_rotateX(5deg)] active:[transform:perspective(50px)_rotateX(5deg)_translateY(2px)_scale(0.96)] focus:outline-none focus-visible:ring-1 bg-blue-600 text-white border-blue-700/50 shadow-[inset_-2px_-5px_0px_rgba(255,255,255,0.4),inset_-2px_-4px_0px_rgba(0,0,0,0.3),0px_1px_1px_rgba(0,0,0,0.3)] hover:bg-blue-500 font-semibold uppercase font-sans tracking-tight"
                        )}
                      >
                        <span className="text-[7px] opacity-60 self-start">paste</span>
                        <span className="self-end mt-auto text-[9px] font-bold">V</span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-xs text-zinc-650 bg-zinc-200/50 dark:text-zinc-450 dark:bg-black/40 p-1.5 rounded border border-zinc-350 dark:border-zinc-800">
                      <span className="font-mono text-zinc-700 dark:text-zinc-400 select-all">npx kanso-ui add magnetic-button</span>
                      <button 
                        onClick={handleCopy}
                        className="text-zinc-800 hover:text-zinc-955 dark:text-zinc-300 dark:hover:text-white cursor-pointer font-sans font-semibold transition-colors"
                      >
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>

                  {/* Footer Section */}
                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800/60 flex justify-between items-center text-[9px] text-zinc-500 font-mono">
                    <span>Interactive Sandbox</span>
                    <span className="font-sans font-medium">v1.0.0</span>
                  </div>
                </div>
              </LiquidMetalCardRoot>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
