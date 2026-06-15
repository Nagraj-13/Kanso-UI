//app/LandingPageClient.tsx
"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  AccessibilityIcon,
  CopyIcon,
  CheckIcon,
  Code2Icon,
  MoonIcon,
  SunIcon,
  SparklesIcon,
  CheckCircle2Icon,
  SearchIcon,
  ArrowUpRightIcon,
  MenuIcon,
  XIcon,
  SparkleIcon,
  SettingsIcon,
  UserIcon
} from "lucide-react"
import { useTheme } from "next-themes"

import { CodeBlock, TerminalBlock } from "@/components/docs/code-block"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { MagneticButton } from "@/components/kanso/magnetic-button"
import { ShimmerBorder } from "@/components/kanso/shimmer-border"
import { TextReveal } from "@/components/kanso/text-reveal"
import { GITHUB_URL } from "@/lib/constants"
import { GithubButton } from "@/components/kanso/github-button"
import { RealismButton } from "@/components/kanso/realism-button"
import { KeyboardButton } from "@/components/kanso/keyboard-button"
import { GlowLineButton } from "@/components/kanso/glow-line-button"
import { LiquidMetalCard, LiquidMetalCardRoot, LiquidMetalCardVisual } from "@/components/kanso/liquid-metal-card"
import { HalftoneImage } from "@/components/kanso/halftone-image"
import { HalftoneGrid } from "@/components/kanso/halftone-grid"
import { MagicRings } from "@/components/kanso/magic-rings"
import { Antigravity } from "@/components/kanso/antigravity"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator
} from "@/components/ui/command"

function GithubIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function DiscordIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

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

interface LandingPageClientProps {
  showcaseHtmls: Record<string, string>
  showcaseRaws: Record<string, string>
  dxHtml: string
  dxRaw: string
}

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

export default function LandingPageClient({
  showcaseHtmls,
  showcaseRaws,
  dxHtml,
  dxRaw,
}: LandingPageClientProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [selectedShowcase, setSelectedShowcase] = React.useState<
    "buttons" | "cards" | "dialogs" | "inputs" | "command" | "pricing" | "halftone" | "magic-rings" | "antigravity"
  >("buttons")
  const [activeSandboxTab, setActiveSandboxTab] = React.useState<"preview" | "code">("preview")
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
  React.useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(handle)
  }, [])

  const [copied, setCopied] = React.useState(false)
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
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-50 dark:selection:bg-zinc-50 dark:selection:text-zinc-950">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-zinc-200/60 bg-white/70 backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-950/70">
        <div className="mx-auto flex h-16 items-center justify-between px-6 md:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="/Kansologo.png"
              alt="Kanso UI Logo"
              width={24}
              height={24}
              className="dark:invert"
            />
            <span className="font-sans text-base font-semibold tracking-tight">Kanso UI</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Features
            </a>
            <a
              href="#showcase"
              className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Showcase
            </a>
            <Link
              href="/docs"
              className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Docs
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              GitHub <ArrowUpRightIcon className="size-3" />
            </a>
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
            >
              {!mounted ? (
                <div className="size-4 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
              ) : theme === "dark" ? (
                <SunIcon className="size-4" />
              ) : (
                <MoonIcon className="size-4" />
              )}
            </Button>
            <Button size="sm" render={<Link href="/docs" />}>
              Get Started
            </Button>
          </div>

          {/* Mobile Nav Toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="flex items-center justify-center p-2 text-zinc-500 hover:text-zinc-900 md:hidden dark:text-zinc-400 dark:hover:text-zinc-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </Button>
        </div>

        {/* Mobile Navigation List */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="border-b border-zinc-200 bg-white px-6 py-6 md:hidden dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex flex-col gap-5">
                <a
                  href="#features"
                  className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#showcase"
                  className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Showcase
                </a>
                <Link
                  href="/docs"
                  className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Docs
                </Link>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  GitHub <ArrowUpRightIcon className="size-3" />
                </a>
                <hr className="border-zinc-150 dark:border-zinc-800" />
                <div className="flex items-center justify-between py-1 px-1">
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Theme</span>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    aria-label="Toggle theme"
                    className="text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                  >
                    {!mounted ? (
                      <div className="size-4 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                    ) : theme === "dark" ? (
                      <SunIcon className="size-4" />
                    ) : (
                      <MoonIcon className="size-4" />
                    )}
                  </Button>
                </div>
                <hr className="border-zinc-150 dark:border-zinc-800" />
                <div className="flex flex-col gap-3">
                  <Button className="w-full" render={<Link href="/docs" />} onClick={() => setMobileMenuOpen(false)}>
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Redesigned Hero Section (Next.js & Evervault Inspired) */}
      <section className="relative w-full pt-20 pb-6 overflow-hidden bg-background text-foreground">
        <div className="relative m-4 md:m-6 py-12 md:py-20 rounded-3xl overflow-hidden bg-[linear-gradient(to_bottom,_var(--background)_30%,_#6d18ff_75%,_#9569fe_100%)]">
          <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[95%] bg-[var(--background)] blur-3xl rounded-full z-0"></div>
          
          {/* Halftone & Particles background overlays */}
          {/* <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
            <HalftoneGrid
              dotRadius={halftoneParams.dotRadius}
              dotSpacing={halftoneParams.dotSpacing}
              sparkle={halftoneParams.sparkle}
              gradientFrom={halftoneParams.gradientFrom}
              gradientTo={halftoneParams.gradientTo}
              glowColor={halftoneParams.glowColor}
              colors={halftoneParams.colors}
            />
          </div> */}

          {/* <div className="absolute inset-0 pointer-events-none opacity-15 z-0">
            <Antigravity
              count={80}
              magnetRadius={6}
              ringRadius={5}
              waveSpeed={0.2}
              waveAmplitude={0.4}
              particleSize={1.2}
              color={halftoneParams.particleColor || "#a855f7"}
              colors={halftoneParams.colors}
              autoAnimate={true}
              particleShape="capsule"
            />
          </div> */}

          {/* Evervault Styled Upward-Sweeping Gradient Aura at the bottom */}
          <div 
            className="absolute inset-x-0 bottom-0 h-[420px] pointer-events-none transition-all duration-500 opacity-95 z-0"
            style={{
              background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(99, 102, 241, 0.35) 0%, rgba(139, 92, 246, 0.18) 45%, rgba(168, 85, 247, 0.05) 70%, transparent 100%)"
            }}
          />

          {/* Hero Content Container - Split Layout */}
          <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10 w-full grid gap-12 lg:grid-cols-12 items-center pt-8">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Introducing Badge - using shadcn component style */}
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

            {/* Subtitle with fade-in delay */}
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
                className="w-full rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bgbackground p-5 shadow-2xl backdrop-blur-md relative overflow-hidden group select-none transition-transform duration-300 ease-out"
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
                        className="text-zinc-800 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white cursor-pointer font-sans font-semibold transition-colors"
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

      {/* Features Section */}
      <section id="features" className="py-28 ">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Simplicity, Engineered.
            </h2>
            <p className="max-w-xl text-base text-muted-foreground">
              Each feature is focused on making interfaces clean, robust, accessible, and enjoyable to build.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <Card className="border border-border bg-card dark:bg-card/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 shadow-xs hover:shadow-sm hover:-translate-y-0.5">
              <CardHeader className="pb-2">
                <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted dark:bg-muted/50">
                  <AccessibilityIcon className="size-5 text-muted-foreground" />
                </div>
                <CardTitle className="mt-4 text-base font-semibold text-foreground">Accessible by Default</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                  Engineered using Radix and Base UI primitive outlines. Full keyboard navigation and proper screen reader support.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border border-border bg-card dark:bg-card/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 shadow-xs hover:shadow-sm hover:-translate-y-0.5">
              <CardHeader className="pb-2">
                <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted dark:bg-muted/50">
                  <CopyIcon className="size-5 text-muted-foreground" />
                </div>
                <CardTitle className="mt-4 text-base font-semibold text-foreground">Copy-Paste Components</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                  No complex setup or heavy registry dependencies. Copy the component code directly into your folder structure.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border border-border bg-card dark:bg-card/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 shadow-xs hover:shadow-sm hover:-translate-y-0.5">
              <CardHeader className="pb-2">
                <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted dark:bg-muted/50">
                  <Code2Icon className="size-5 text-muted-foreground" />
                </div>
                <CardTitle className="mt-4 text-base font-semibold text-foreground">TypeScript First</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                  Fully typed components with explicit contracts. Get code completion and compile-time warnings right in your editor.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border border-border bg-card dark:bg-card/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 shadow-xs hover:shadow-sm hover:-translate-y-0.5">
              <CardHeader className="pb-2">
                <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted dark:bg-muted/50">
                  <MoonIcon className="size-5 text-muted-foreground" />
                </div>
                <CardTitle className="mt-4 text-base font-semibold text-foreground">Dark Mode Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                  Native class-based dark mode design. Easily adapt color schemes using CSS variables and Tailwind variables.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="border border-border bg-card dark:bg-card/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 shadow-xs hover:shadow-sm hover:-translate-y-0.5">
              <CardHeader className="pb-2">
                <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted dark:bg-muted/50">
                  <SparkleIcon className="size-5 text-muted-foreground" />
                </div>
                <CardTitle className="mt-4 text-base font-semibold text-foreground">Beautiful Defaults</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                  Clean, minimalist aesthetics inspired by Zen. Neutral borders, clear indicators, and generous spacing.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="border border-border bg-card dark:bg-card/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 shadow-xs hover:shadow-sm hover:-translate-y-0.5">
              <CardHeader className="pb-2">
                <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted dark:bg-muted/50">
                  <CheckCircle2Icon className="size-5 text-muted-foreground" />
                </div>
                <CardTitle className="mt-4 text-base font-semibold text-foreground">Production Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                  Optimized for fast rendering and minimal bundle overhead. Battle-tested component design for scaling web apps.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Kanso Custom Components Section */}
      <section id="premium-components" className="  py-28 bg-background">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              ✦ Zen Interactions
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Premium Kanso Effects
            </h2>
            <p className="max-w-xl text-base text-muted-foreground">
              Add polish to your interface with our copy-paste motion effects. Experience the interactive previews below and click to view installation guides.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: Magnetic Button */}
            <Card className="flex flex-col justify-between border border-border bg-card shadow-xs hover:shadow-md transition-all duration-300 dark:bg-card/40 hover:-translate-y-0.5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-foreground">Magnetic Button</CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed min-h-[40px]">
                  Attracts elements smoothly to the user&apos;s cursor on hover. Built with spring physics for natural, responsive movement.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-2">
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 dark:bg-muted/15 relative overflow-hidden group">
                  <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,var(--color-primary),transparent)]" />
                  <MagneticButton className="relative z-10 shadow-sm">Hover Magnet</MagneticButton>
                </div>
              </CardContent>
              <CardFooter className="mt-4 flex justify-end pb-4">
                <Button
                  variant="link"
                  size="sm"
                  className="gap-1.5 px-0 text-foreground cursor-pointer"
                  render={<Link href="/docs/components/buttons/magnetic-button" />}
                >
                  View Installation <ArrowUpRightIcon className="size-3.5" />
                </Button>
              </CardFooter>
            </Card>

            {/* Card 2: Shimmer Border */}
            <Card className="flex flex-col justify-between border border-border bg-card shadow-xs hover:shadow-md transition-all duration-300 dark:bg-card/40 hover:-translate-y-0.5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-foreground">Shimmer Border</CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed min-h-[40px]">
                  An elegant border lighting outline that cycles continuously. Leverages GPU-accelerated CSS conic-gradients for optimal performance.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-2">
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 dark:bg-muted/15 relative overflow-hidden">
                  <ShimmerBorder borderRadius={8}>
                    <div className="px-5 py-3 text-xs font-semibold bg-card text-foreground rounded-[6px] shadow-xs">
                      Shimmer Border
                    </div>
                  </ShimmerBorder>
                </div>
              </CardContent>
              <CardFooter className="mt-4 flex justify-end pb-4">
                <Button
                  variant="link"
                  size="sm"
                  className="gap-1.5 px-0 text-foreground cursor-pointer"
                  render={<Link href="/docs/components/effects/shimmer-border" />}
                >
                  View Installation <ArrowUpRightIcon className="size-3.5" />
                </Button>
              </CardFooter>
            </Card>

            {/* Card 3: Text Reveal */}
            <Card className="flex flex-col justify-between border border-border bg-card shadow-xs hover:shadow-md transition-all duration-300 dark:bg-card/40 hover:-translate-y-0.5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-foreground">Text Reveal</CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed min-h-[40px]">
                  Fades in text character-by-character as it scrolls into viewport. Uses staggering and subtle blur overrides for readability.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-2">
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 dark:bg-muted/15 p-6 text-center">
                  <TextReveal
                    text="Zen focus. Pure clarity. Kanso UI."
                    className="text-xs font-semibold text-foreground tracking-tight text-center leading-relaxed"
                  />
                </div>
              </CardContent>
              <CardFooter className="mt-4 flex justify-end pb-4">
                <Button
                  variant="link"
                  size="sm"
                  className="gap-1.5 px-0 text-foreground cursor-pointer"
                  render={<Link href="/docs/components/typography/text-reveal" />}
                >
                  View Installation <ArrowUpRightIcon className="size-3.5" />
                </Button>
              </CardFooter>
            </Card>

            {/* Card 4: Halftone Image */}
            <Card className="flex flex-col justify-between border border-border bg-card shadow-xs hover:shadow-md transition-all duration-300 dark:bg-card/40 hover:-translate-y-0.5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-foreground">Halftone Image</CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed min-h-[40px]">
                  Converts images into custom halftone illustrations. Includes real-time mouse dither warp distortions.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-2">
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 dark:bg-muted/15">
                  <div className="size-24 rounded-2xl overflow-hidden border border-border bg-card flex items-center justify-center shadow-xs">
                    <HalftoneImage
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200"
                      dotSpacing={5}
                      contrast={1.3}
                      inkColor="currentColor"
                      paperColor="transparent"
                      className="size-full"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-4 flex justify-end pb-4">
                <Button
                  variant="link"
                  size="sm"
                  className="gap-1.5 px-0 text-foreground cursor-pointer"
                  render={<Link href="/docs/components/effects/halftone-image" />}
                >
                  View Installation <ArrowUpRightIcon className="size-3.5" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Component Showcase Section */}
      <section id="showcase" className="border-t border-zinc-200/60 py-28 dark:border-zinc-900 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              Component Showcase
            </h2>
            <p className="max-w-xl text-base text-zinc-500 dark:text-zinc-400">
              Inspect and interact with premium components. See the exact code that builds them.
            </p>
          </div>

          <div className="mt-16 grid items-start gap-8 lg:grid-cols-12 w-full min-w-0">
            {/* Left selector menu styled as IDE workspace */}
            <div className="lg:col-span-3 w-full flex flex-col gap-4">
              <div className="flex flex-col border border-border bg-card dark:bg-card/45 rounded-2xl overflow-hidden shadow-xs">
                <div className="flex items-center justify-between border-b border-border bg-muted/40 dark:bg-muted/15 px-4 py-3 font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-wider select-none">
                  <span>workspace</span>
                  <span className="text-[9px] text-zinc-400 font-medium">9 files</span>
                </div>
                <div className="flex flex-col gap-1 p-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest select-none">
                    <span>components</span>
                  </div>
                  {([
                    { id: "buttons", label: "Buttons.tsx" },
                    { id: "cards", label: "Cards.tsx" },
                    { id: "halftone", label: "Halftone.tsx" },
                    { id: "magic-rings", label: "MagicRings.tsx" },
                    { id: "antigravity", label: "Antigravity.tsx" },
                    { id: "dialogs", label: "Dialogs.tsx" },
                    { id: "inputs", label: "Inputs.tsx" },
                    { id: "command", label: "CommandMenu.tsx" },
                    { id: "pricing", label: "PricingCards.tsx" }
                  ] as const).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedShowcase(item.id)
                        setActiveSandboxTab("preview")
                      }}
                      className={cn(
                        "flex items-center gap-2 justify-start px-3 py-2 text-xs rounded-md font-mono transition-all shrink-0 cursor-pointer select-none border-l-2 text-left",
                        selectedShowcase === item.id
                          ? "bg-muted text-foreground border-primary font-semibold"
                          : "border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                      )}
                    >
                      <span className={cn(
                        "size-1.5 rounded-full shrink-0",
                        selectedShowcase === item.id ? "bg-violet-500" : "bg-zinc-400/60 dark:bg-zinc-600"
                      )} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Modern Unified Editor & Preview Sandbox window */}
            <div className="lg:col-span-9 w-full min-w-0 border border-border bg-card dark:bg-card/45 rounded-2xl overflow-hidden shadow-md flex flex-col">
              
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-border bg-muted/40 dark:bg-muted/15 px-4 py-2 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  {/* Mac dots */}
                  <div className="flex items-center gap-1.5 select-none shrink-0">
                    <span className="size-2.5 rounded-full bg-red-400/80" />
                    <span className="size-2.5 rounded-full bg-yellow-400/80" />
                    <span className="size-2.5 rounded-full bg-green-400/80" />
                  </div>
                  {/* Tab Selectors */}
                  <div className="flex items-center gap-1 border-l border-border pl-4 shrink-0">
                    <button
                      onClick={() => setActiveSandboxTab("preview")}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-all select-none",
                        activeSandboxTab === "preview"
                          ? "bg-background text-foreground shadow-xs border border-border"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/45"
                      )}
                    >
                      <SparklesIcon className="size-3 text-violet-500" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={() => setActiveSandboxTab("code")}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-all select-none",
                        activeSandboxTab === "code"
                          ? "bg-background text-foreground shadow-xs border border-border"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/45"
                      )}
                    >
                      <Code2Icon className="size-3 text-blue-500" />
                      <span>Code</span>
                    </button>
                  </div>
                </div>
                {/* Active filename */}
                <span className="font-mono text-[10px] text-zinc-400 bg-background/50 dark:bg-zinc-900/50 px-2 py-0.5 rounded border border-border/40 select-all shrink-0">
                  {selectedShowcase === "buttons"
                    ? "ButtonDemo.tsx"
                    : selectedShowcase === "cards"
                    ? "CardDemo.tsx"
                    : selectedShowcase === "halftone"
                    ? "HalftoneDemo.tsx"
                    : selectedShowcase === "magic-rings"
                    ? "MagicRingsDemo.tsx"
                    : selectedShowcase === "antigravity"
                    ? "AntigravityDemo.tsx"
                    : selectedShowcase === "dialogs"
                    ? "DialogDemo.tsx"
                    : selectedShowcase === "inputs"
                    ? "InputDemo.tsx"
                    : selectedShowcase === "command"
                    ? "CommandDemo.tsx"
                    : "PriceCard.tsx"}
                </span>
              </div>

              {/* Window Content */}
              <div className="w-full bg-background dark:bg-zinc-950/45 min-h-[380px] flex flex-col justify-center relative overflow-hidden">
                {activeSandboxTab === "preview" ? (
                  <div className="flex w-full h-full items-center justify-center p-6 sm:p-12 overflow-hidden">
                    {/* Live Preview Elements */}
                    {selectedShowcase === "buttons" && (
                      <div className="flex flex-wrap items-center justify-center gap-6">
                        <RealismButton variantColor="cyan">Cyan Glow</RealismButton>
                        <KeyboardButton variantColor="dark">cmd</KeyboardButton>
                        <GlowLineButton glowColor="rose">Rose Glow</GlowLineButton>
                      </div>
                    )}

                    {selectedShowcase === "cards" && (
                      <div className="w-full max-w-[360px]">
                        <LiquidMetalCard
                          title="Liquid Metal"
                          subtitle="Interactive"
                          description="WebGL shader reflections on a copy-paste React container card."
                          className="w-full"
                        />
                      </div>
                    )}

                    {selectedShowcase === "dialogs" && (
                      <Dialog>
                        <DialogTrigger render={<Button variant="outline">Open Confirm Dialog</Button>} />
                        <DialogContent className="border border-zinc-200 dark:border-zinc-800">
                          <DialogHeader>
                            <DialogTitle>Reset API Key</DialogTitle>
                            <DialogDescription>
                              This will immediately revoke access for your current key. This operation is permanent and irreversible.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="mt-6">
                            <DialogClose render={<Button variant="ghost">Cancel</Button>} />
                            <DialogClose render={<Button variant="default">Confirm Reset</Button>} />
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}

                    {selectedShowcase === "inputs" && (
                      <div className="flex w-full max-w-[360px] flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                          <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                            Create Secret Key
                          </Label>
                          <div className="flex gap-2">
                            <Input type="text" placeholder="sk_live_..." className="font-mono" />
                            <Button variant="default">Generate</Button>
                          </div>
                          <p className="text-xs text-zinc-500">Provide an identifier for this API key.</p>
                        </div>
                      </div>
                    )}

                    {selectedShowcase === "command" && (
                      <div className="w-full max-w-[420px] rounded-xl border border-zinc-200 bg-white p-2 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/60">
                        <Command className="bg-transparent">
                          <CommandInput placeholder="Type a search command..." />
                          <CommandList className="max-h-[200px] mt-2">
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="Suggestions">
                              <CommandItem>
                                <SearchIcon className="size-4 mr-2 opacity-50" />
                                Search Documentation
                              </CommandItem>
                              <CommandItem>
                                <SettingsIcon className="size-4 mr-2 opacity-50" />
                                System Preferences
                                <CommandShortcut>⌘,</CommandShortcut>
                              </CommandItem>
                            </CommandGroup>
                            <CommandSeparator className="my-2" />
                            <CommandGroup heading="Developer Settings">
                              <CommandItem>
                                <UserIcon className="size-4 mr-2 opacity-50" />
                                Manage API Accounts
                              </CommandItem>
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </div>
                    )}

                    {selectedShowcase === "pricing" && (
                      <div className="flex flex-wrap items-stretch justify-center gap-6 w-full">
                        {/* Hobby tier */}
                        <Card className="flex flex-col justify-between w-full max-w-[280px] border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/30">
                          <div>
                            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Hobby</div>
                            <h3 className="text-2xl font-bold tracking-tight text-zinc-950 mt-1 dark:text-white">
                              $0 <span className="text-sm font-normal text-zinc-500">/ mo</span>
                            </h3>
                            <p className="text-xs text-zinc-500 mt-2">Essential components to build small, personal apps.</p>
                            <div className="space-y-2 mt-6 text-sm text-zinc-500 dark:text-zinc-400">
                              <div className="flex items-center gap-2">
                                <CheckIcon className="size-4 text-zinc-800 dark:text-zinc-300" />
                                <span>Basic Components</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckIcon className="size-4 text-zinc-800 dark:text-zinc-300" />
                                <span>Community Support</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full mt-8">
                            Get Started
                          </Button>
                        </Card>

                        {/* Pro tier */}
                        <Card className="flex flex-col justify-between w-full max-w-[280px] border border-zinc-900 bg-zinc-950 p-6 shadow-lg dark:border-zinc-800">
                          <div>
                            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Professional</div>
                            <h3 className="text-2xl font-bold tracking-tight text-white mt-1">
                              $19 <span className="text-sm font-normal text-zinc-500">/ mo</span>
                            </h3>
                            <p className="text-xs text-zinc-400 mt-2">Advanced layouts and premium layout abstractions.</p>
                            <div className="space-y-2 mt-6 text-sm text-zinc-400">
                              <div className="flex items-center gap-2">
                                <CheckIcon className="size-4 text-zinc-100" />
                                <span>All 50+ Components</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckIcon className="size-4 text-zinc-100" />
                                <span>Figma Design Files</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckIcon className="size-4 text-zinc-100" />
                                <span>Priority Slack Channel</span>
                              </div>
                            </div>
                          </div>
                          <Button className="w-full mt-8 bg-white text-zinc-950 hover:bg-zinc-200 border-none">
                            Upgrade
                          </Button>
                        </Card>
                      </div>
                    )}

                    {selectedShowcase === "halftone" && (
                      <div className="relative w-full h-[280px] flex items-center justify-center overflow-hidden">
                        <HalftoneGrid
                          dotRadius={1.5}
                          dotSpacing={14}
                          gradientFrom="rgba(168, 85, 247, 0.35)"
                          gradientTo="rgba(180, 151, 207, 0.25)"
                          glowColor="#120F17"
                          className="absolute inset-0"
                        />
                        <div className="relative size-44 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-center shadow-md">
                          <HalftoneImage
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300"
                            dotSpacing={6}
                            contrast={1.3}
                            inkColor="currentColor"
                            paperColor="transparent"
                            className="size-full"
                            alt="Halftone showcase preview"
                          />
                        </div>
                      </div>
                    )}

                    {selectedShowcase === "magic-rings" && (
                      <div className="relative w-full h-[320px] rounded-xl overflow-hidden bg-zinc-950 flex items-center justify-center p-6 border border-zinc-800">
                        <MagicRings
                          color="#fc42ff"
                          colorTwo="#42fcff"
                          speed={1}
                          ringCount={6}
                          followMouse={true}
                          clickBurst={true}
                        />
                        <span className="relative z-10 text-white font-mono text-xs select-none bg-black/40 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/10">
                          Hover & Click to Burst
                        </span>
                      </div>
                    )}

                    {selectedShowcase === "antigravity" && (
                      <div className="relative w-full h-[320px] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                        <Antigravity
                          count={200}
                          color="#FF9FFC"
                          particleShape="capsule"
                          magnetRadius={10}
                          autoAnimate={true}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full p-4 overflow-auto max-h-[420px] bg-zinc-950 text-zinc-100 font-mono text-xs text-left">
                    <CodeBlock
                      html={showcaseHtmls[selectedShowcase === "magic-rings" ? "magicRings" : selectedShowcase]}
                      rawCode={showcaseRaws[selectedShowcase === "magic-rings" ? "magicRings" : selectedShowcase]}
                      filename={
                        selectedShowcase === "buttons"
                          ? "ButtonDemo.tsx"
                          : selectedShowcase === "cards"
                          ? "CardDemo.tsx"
                          : selectedShowcase === "halftone"
                          ? "HalftoneDemo.tsx"
                          : selectedShowcase === "magic-rings"
                          ? "MagicRingsDemo.tsx"
                          : selectedShowcase === "antigravity"
                          ? "AntigravityDemo.tsx"
                          : selectedShowcase === "dialogs"
                          ? "DialogDemo.tsx"
                          : selectedShowcase === "inputs"
                          ? "InputDemo.tsx"
                          : selectedShowcase === "command"
                          ? "CommandDemo.tsx"
                          : "PriceCard.tsx"
                      }
                      showLineNumbers={true}
                      collapsible={false}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Experience (Dx) Section */}
      <section id="developer" className="border-t border-border py-28 bg-muted/20 dark:bg-muted/10">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 w-full min-w-0">
            {/* Dx Left Text */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                Developer Experience Built First
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Start with a single copy-paste operation. Kanso UI elements slot right into standard tailwind structures.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-foreground text-[11px] font-bold text-background">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Install Helper Modules</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Configure your Tailwind classes with our minimalist configurations and helper package.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-foreground text-[11px] font-bold text-background">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Copy and Customise</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Grab exact TSX structures and paste them directly into your `/components/ui/` route.
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

      {/* Statistics Section */}
      <section className="border-t border-border bg-muted/20 py-24 dark:bg-muted/10">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
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

      {/* Testimonials Section */}
      <section className="border-t border-zinc-200/60 py-28 dark:border-zinc-900 dark:bg-zinc-950/20">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
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
                <p className="text-sm leading-relaxed text-foreground">
                  {"\"The layout rules and visual patterns in Kanso UI match exactly what we need for modern enterprise platforms. Simplicity is indeed engineered directly in.\""}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="size-8 rounded-full bg-muted border border-border flex items-center justify-center font-bold text-xs text-muted-foreground">
                    AB
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-foreground">Alexander Boyd</h5>
                    <p className="text-[11px] text-muted-foreground">Design Engineer, Linear</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="border border-border bg-card dark:bg-card/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 p-6 shadow-xs hover:shadow-sm hover:-translate-y-0.5">
              <CardContent className="p-0">
                <p className="text-sm leading-relaxed text-foreground">
                  {"\"Having WCAG accessibility compliant outlines right out of the box saved us weeks of audit fixing. The styling is perfectly minimal.\""}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="size-8 rounded-full bg-muted border border-border flex items-center justify-center font-bold text-xs text-muted-foreground">
                    MK
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-foreground">Mia Koyama</h5>
                    <p className="text-[11px] text-muted-foreground">Lead Frontend, Stripe</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="border border-border bg-card dark:bg-card/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300 p-6 shadow-xs hover:shadow-sm hover:-translate-y-0.5">
              <CardContent className="p-0">
                <p className="text-sm leading-relaxed text-foreground">
                  {"\"Copy-paste setup means I don't need to add another complex library bundle. I copy precisely the components I need, modify the props, and build.\""}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="size-8 rounded-full bg-muted border border-border flex items-center justify-center font-bold text-xs text-muted-foreground">
                    DR
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-foreground">David Ross</h5>
                    <p className="text-[11px] text-muted-foreground">CTO, Vercel Templates</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="border-t border-border py-32 text-center bg-background">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Build Faster. Design Less.
          </h2>
          <p className="mt-6 max-w-md mx-auto text-base text-muted-foreground">
            Kanso UI gives you the building blocks for beautiful, high-performance web applications.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 items-center">
            <Button
              size="lg"
              className="px-8 h-12 shadow-sm cursor-pointer rounded-full"
              render={<Link href="/docs" />}
            >
              Start Building
            </Button>
            <GithubButton
              variantDesign="glow"
              href={GITHUB_URL}
              glowColor="linear-gradient(135deg, oklch(0.65 0.24 300), oklch(0.6 0.22 340))"
              className="h-12 rounded-full font-semibold"
            >
              Star Kanso UI
            </GithubButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-16">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-6">
            <div className="col-span-2 flex flex-col gap-4">
              <div className="flex items-center">
                <Image
                  src="/KansoUiCompletelogo.png"
                  alt="Kanso UI Complete Logo"
                  width={140}
                  height={32}
                  className="dark:invert object-contain"
                />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
                A design system built with React 19, Next.js 16, and Tailwind CSS v4.
              </p>
            </div>

            <div>
              <h6 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Library
              </h6>
              <ul className="mt-4 space-y-2 text-xs">
                <li>
                  <a href="#showcase" className="text-muted-foreground hover:text-foreground transition-colors">
                    Components
                  </a>
                </li>
                <li>
                  <a href="#showcase" className="text-muted-foreground hover:text-foreground transition-colors">
                    Registry
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h6 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Resources
              </h6>
              <ul className="mt-4 space-y-2 text-xs">
                <li>
                  <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <a href="https://nextjs.org" className="text-muted-foreground hover:text-foreground transition-colors">
                    Next.js Docs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h6 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Community
              </h6>
              <ul className="mt-4 space-y-2 text-xs">
                <li>
                  <a href={GITHUB_URL} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                    GitHub <GithubIcon className="size-3" />
                  </a>
                </li>
                <li>
                  <a href="https://discord.com" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                    Discord <DiscordIcon className="size-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
            <span className="text-[11px] text-muted-foreground">
              &copy; {new Date().getFullYear()} Kanso UI. Open Source under MIT License.
            </span>
            <span className="text-[11px] text-muted-foreground">
              Designed and engineered with simplicity.
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
