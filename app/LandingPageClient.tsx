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
  UserIcon,
  ShieldAlertIcon
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
import { InteractiveCard, CardBody, CardItem } from "@/components/kanso/interactive-card"
import { SpotlightCard } from "@/components/kanso/spotlight-card"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
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
  heroHtml: string
  heroRaw: string
  showcaseHtmls: Record<string, string>
  showcaseRaws: Record<string, string>
  dxHtml: string
  dxRaw: string
}

export default function LandingPageClient({
  heroHtml,
  heroRaw,
  showcaseHtmls,
  showcaseRaws,
  dxHtml,
  dxRaw,
}: LandingPageClientProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [selectedShowcase, setSelectedShowcase] = React.useState<
    "buttons" | "cards" | "dialogs" | "inputs" | "command" | "pricing"
  >("buttons")
  const [heroTab, setHeroTab] = React.useState<"preview" | "code">("preview")
  React.useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(handle)
  }, [])

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-50 dark:selection:bg-zinc-50 dark:selection:text-zinc-950">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/60 bg-white/70 backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-950/70">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8">
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

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 pt-24 pb-32 md:px-8 md:pt-32 overflow-hidden">
        {/* Ambient background blob */}
        <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 animate-pulse duration-[8s]" aria-hidden="true">
          <div className="relative left-[calc(50%-15rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-500/10 to-indigo-600/15 opacity-40 dark:from-purple-500/15 dark:to-indigo-600/20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} />
        </div>

        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12 relative z-10">
          {/* Hero Left Content */}
          <div className="flex flex-col items-start lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-medium dark:border-zinc-800 dark:bg-zinc-900/50">
              <SparklesIcon className="size-3.5 text-zinc-650 dark:text-zinc-400" />
              <span className="text-zinc-600 dark:text-zinc-400">Introducing Kanso UI</span>
            </div>

            <h1 className="max-w-2xl font-sans text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl md:text-6xl md:leading-[1.1] dark:text-white">
              Build Beautiful Interfaces Without Complexity
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-500 dark:text-zinc-455">
              Thoughtfully designed React components for modern applications. Inspired by Zen minimalism and engineered for peak performance and copy-paste ease.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 w-full sm:w-auto items-center">
              <Button
                className="w-full sm:w-auto px-6 h-11 text-sm font-semibold cursor-pointer shadow-sm"
                render={<Link href="/docs" />}
              >
                Browse Components
              </Button>
              <GithubButton
                variantDesign="rainbow"
                href={GITHUB_URL}
                className="w-full h-11"
              >
                Star on GitHub
              </GithubButton>
            </div>
          </div>

          {/* Hero Right Code Card (Floating Tabbed Showcase) */}
          <div className="flex flex-col items-center justify-center lg:col-span-5 w-full min-w-0 gap-6">
            {/* Tab Selector Buttons */}
            <div className="flex rounded-lg border border-zinc-200/80 p-0.5 bg-zinc-150/40 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-xs">
              <button
                onClick={() => setHeroTab("preview")}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer",
                  heroTab === "preview"
                    ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                )}
              >
                Interactive Preview
              </button>
              <button
                onClick={() => setHeroTab("code")}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer",
                  heroTab === "code"
                    ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                )}
              >
                Code Snippet
              </button>
            </div>

            {/* Display container */}
            <div className="w-full max-w-[420px] min-h-[400px] flex items-center justify-center min-w-0">
              <AnimatePresence mode="wait">
                {heroTab === "preview" ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="w-full flex justify-center"
                  >
                    <InteractiveCard
                      animated={true}
                      glowColor="280 80 70"
                      spotlightColor="rgba(168, 85, 247, 0.15)"
                      colors={["#c084fc", "#f472b6", "#38bdf8"]}
                      className="w-full max-w-[360px]"
                      borderRadius={24}
                    >
                      <CardBody className="relative h-auto w-full p-6 text-zinc-150 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <CardItem
                              translateZ={40}
                              className="text-[10px] font-semibold uppercase tracking-wider text-purple-400 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20"
                            >
                              Interact Me
                            </CardItem>
                            <span className="text-zinc-650 dark:text-zinc-550 text-[10px] font-mono select-none">
                              Kanso UI
                            </span>
                          </div>

                          <CardItem
                            translateZ={60}
                            className="mt-6 text-2xl font-bold tracking-tight text-white"
                          >
                            Zen Interaction
                          </CardItem>

                          <CardItem
                            translateZ={30}
                            className="mt-2.5 text-xs text-zinc-400 leading-relaxed"
                          >
                            Hover, tilt in 3D, and move your cursor to explore high-performance spotlights and conic mesh gradient borders.
                          </CardItem>
                        </div>

                        <div className="flex items-center justify-between mt-8">
                          <CardItem
                            translateZ={25}
                            className="text-xs font-semibold text-zinc-500 font-mono"
                          >
                            Copy-Paste Ready
                          </CardItem>
                          <CardItem
                            translateZ={70}
                            as={Link}
                            href="/docs"
                            className="rounded-lg bg-white px-3.5 py-2 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-colors cursor-pointer border border-transparent shadow-md"
                          >
                            Get Started
                          </CardItem>
                        </div>
                      </CardBody>
                    </InteractiveCard>
                  </motion.div>
                ) : (
                  <motion.div
                    key="code"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="w-full min-w-0"
                  >
                    <CodeBlock
                      html={heroHtml}
                      rawCode={heroRaw}
                      filename="CardDemo.tsx"
                      showLineNumbers={true}
                      collapsible={false}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-zinc-200/60 bg-zinc-50/50 py-28 dark:border-zinc-900 dark:bg-zinc-950/20">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              Simplicity, Engineered.
            </h2>
            <p className="max-w-xl text-base text-zinc-500 dark:text-zinc-400">
              Each feature is focused on making interfaces clean, robust, accessible, and enjoyable to build.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <SpotlightCard className="p-6 border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900/40 shadow-xs rounded-2xl">
              <div className="flex size-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                <AccessibilityIcon className="size-5 text-zinc-650 dark:text-zinc-400" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">Accessible by Default</h3>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Engineered using Radix and Base UI primitive outlines. Full keyboard navigation and proper screen reader support.
              </p>
            </SpotlightCard>

            {/* Feature 2 */}
            <SpotlightCard className="p-6 border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900/40 shadow-xs rounded-2xl">
              <div className="flex size-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                <CopyIcon className="size-5 text-zinc-650 dark:text-zinc-400" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">Copy-Paste Components</h3>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                No complex setup or heavy registry dependencies. Copy the component code directly into your folder structure.
              </p>
            </SpotlightCard>

            {/* Feature 3 */}
            <SpotlightCard className="p-6 border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900/40 shadow-xs rounded-2xl">
              <div className="flex size-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                <Code2Icon className="size-5 text-zinc-650 dark:text-zinc-400" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">TypeScript First</h3>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Fully typed components with explicit contracts. Get code completion and compile-time warnings right in your editor.
              </p>
            </SpotlightCard>

            {/* Feature 4 */}
            <SpotlightCard className="p-6 border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900/40 shadow-xs rounded-2xl">
              <div className="flex size-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                <MoonIcon className="size-5 text-zinc-650 dark:text-zinc-400" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">Dark Mode Ready</h3>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Native class-based dark mode design. Easily adapt color schemes using CSS variables and Tailwind variables.
              </p>
            </SpotlightCard>

            {/* Feature 5 */}
            <SpotlightCard className="p-6 border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900/40 shadow-xs rounded-2xl">
              <div className="flex size-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                <SparkleIcon className="size-5 text-zinc-650 dark:text-zinc-400" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">Beautiful Defaults</h3>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Clean, minimalist aesthetics inspired by Zen. Neutral borders, clear indicators, and generous spacing.
              </p>
            </SpotlightCard>

            {/* Feature 6 */}
            <SpotlightCard className="p-6 border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900/40 shadow-xs rounded-2xl">
              <div className="flex size-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                <CheckCircle2Icon className="size-5 text-zinc-650 dark:text-zinc-400" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">Production Ready</h3>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Optimized for fast rendering and minimal bundle overhead. Battle-tested component design for scaling web apps.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Kanso Custom Components Section */}
      <section id="premium-components" className="border-t border-zinc-200/60 py-28 dark:border-zinc-900 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
              ✦ Zen Interactions
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              Premium Kanso Effects
            </h2>
            <p className="max-w-xl text-base text-zinc-500 dark:text-zinc-400">
              Add polish to your interface with our copy-paste motion effects. Experience the interactive previews below and click to view installation guides.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: Magnetic Button */}
            <Card className="flex flex-col justify-between border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40">
              <div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-white">Magnetic Button</h3>
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed min-h-[40px]">
                  Attracts elements smoothly to the user&apos;s cursor on hover. Built with spring physics for natural, responsive movement.
                </p>
                <div className="mt-6 flex h-40 items-center justify-center rounded-lg border border-dashed border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/30">
                  <MagneticButton>Hover Magnet</MagneticButton>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  variant="link"
                  size="sm"
                  className="gap-1.5 px-0 text-zinc-950 dark:text-zinc-50"
                  render={<Link href="/docs/components/buttons/magnetic-button" />}
                >
                  View Installation <ArrowUpRightIcon className="size-3.5" />
                </Button>
              </div>
            </Card>

            {/* Card 2: Shimmer Border */}
            <Card className="flex flex-col justify-between border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40">
              <div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-white">Shimmer Border</h3>
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed min-h-[40px]">
                  An elegant border lighting outline that cycles continuously. Leverages GPU-accelerated CSS conic-gradients for optimal performance.
                </p>
                <div className="mt-6 flex h-40 items-center justify-center rounded-lg border border-dashed border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/30 p-4">
                  <ShimmerBorder borderRadius={8}>
                    <div className="px-5 py-3 text-xs font-semibold bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300">
                      Shimmer Border
                    </div>
                  </ShimmerBorder>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  variant="link"
                  size="sm"
                  className="gap-1.5 px-0 text-zinc-950 dark:text-zinc-50"
                  render={<Link href="/docs/components/effects/shimmer-border" />}
                >
                  View Installation <ArrowUpRightIcon className="size-3.5" />
                </Button>
              </div>
            </Card>

            {/* Card 3: Text Reveal */}
            <Card className="flex flex-col justify-between border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40">
              <div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-white">Text Reveal</h3>
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed min-h-[40px]">
                  Fades in text character-by-character as it scrolls into viewport. Uses staggering and subtle blur overrides for readability.
                </p>
                <div className="mt-6 flex h-40 items-center justify-center rounded-lg border border-dashed border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/30 p-6">
                  <TextReveal
                    text="Zen focus. Pure clarity. Kanso UI."
                    className="text-xs font-medium text-zinc-700 dark:text-zinc-300 text-center leading-relaxed"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  variant="link"
                  size="sm"
                  className="gap-1.5 px-0 text-zinc-950 dark:text-zinc-50"
                  render={<Link href="/docs/components/typography/text-reveal" />}
                >
                  View Installation <ArrowUpRightIcon className="size-3.5" />
                </Button>
              </div>
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
            {/* Left selector menu */}
            <div className="flex gap-2 overflow-x-auto pb-4 lg:col-span-3 lg:flex-col lg:overflow-visible lg:pb-0 w-full">
              {([
                { id: "buttons", label: "Buttons" },
                { id: "cards", label: "Cards" },
                { id: "dialogs", label: "Dialogs" },
                { id: "inputs", label: "Inputs" },
                { id: "command", label: "Command Menu" },
                { id: "pricing", label: "Pricing Cards" }
              ] as const).map((item) => (
                <Button
                  key={item.id}
                  variant={selectedShowcase === item.id ? "default" : "ghost"}
                  onClick={() => setSelectedShowcase(item.id)}
                  className={cn(
                    "justify-start px-4 py-2.5 text-sm font-medium transition-all shrink-0",
                    selectedShowcase !== item.id && "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  )}
                >
                  {item.label}
                </Button>
              ))}
            </div>

            {/* Right side: Live preview and Code snippet */}
            <div className="grid gap-6 lg:col-span-9 w-full min-w-0">
              {/* Preview Box */}
              <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-6 sm:p-12 dark:border-zinc-800 dark:bg-zinc-900/10 w-full overflow-hidden">
                {selectedShowcase === "buttons" && (
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button variant="default">Primary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline" size="icon-sm">
                      <SearchIcon className="size-4" />
                    </Button>
                  </div>
                )}

                {selectedShowcase === "cards" && (
                  <Card className="w-full max-w-[360px] border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900/40">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold">Security Alert</CardTitle>
                        <ShieldAlertIcon className="size-5 text-zinc-500" />
                      </div>
                      <CardDescription className="mt-1">
                        A login attempt was detected from a new location.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2.5 py-4 border-y border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
                      <div className="flex justify-between">
                        <span>Device</span>
                        <span className="font-medium text-zinc-800 dark:text-zinc-300">Chrome (macOS)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Location</span>
                        <span className="font-medium text-zinc-800 dark:text-zinc-300">San Francisco, CA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IP Address</span>
                        <span className="font-medium text-zinc-800 dark:text-zinc-300">192.168.1.84</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 pt-4">
                      <Button variant="ghost" size="sm">
                        Dismiss
                      </Button>
                      <Button variant="default" size="sm">
                        Verify Location
                      </Button>
                    </CardFooter>
                  </Card>
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
                      <Button className="w-full mt-8 bg-white text-zinc-950 hover:bg-zinc-200">
                        Upgrade
                      </Button>
                    </Card>
                  </div>
                )}
              </div>

              {/* Code Snippet Box */}
              <CodeBlock
                html={showcaseHtmls[selectedShowcase]}
                rawCode={showcaseRaws[selectedShowcase]}
                filename={
                  selectedShowcase === "buttons"
                    ? "ButtonDemo.tsx"
                    : selectedShowcase === "cards"
                    ? "CardDemo.tsx"
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
          </div>
        </div>
      </section>

      {/* Developer Experience (Dx) Section */}
      <section id="developer" className="border-t border-zinc-200/60 py-28 dark:border-zinc-900 dark:bg-zinc-950/20">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 w-full min-w-0">
            {/* Dx Left Text */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                Developer Experience Built First
              </h2>
              <p className="mt-6 text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
                Start with a single copy-paste operation. Kanso UI elements slot right into standard tailwind structures.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-[11px] font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Install Helper Modules</h4>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      Configure your Tailwind classes with our minimalist configurations and helper package.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-[11px] font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Copy and Customise</h4>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
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
      <section className="border-t border-zinc-200/60 bg-zinc-50/20 py-24 dark:border-zinc-900 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="grid gap-12 text-center sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
                <AnimatedCounter value="50" suffix="+" />
              </span>
              <span className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Components
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
                <AnimatedCounter value="100" suffix="%" />
              </span>
              <span className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                TypeScript Coverage
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
                WCAG
              </span>
              <span className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Accessible by Default
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
                MIT
              </span>
              <span className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
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
            <SpotlightCard className="border border-zinc-200/80 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/40 rounded-2xl">
              <p className="text-sm leading-relaxed text-zinc-655 dark:text-zinc-300">
                {"\"The layout rules and visual patterns in Kanso UI match exactly what we need for modern enterprise platforms. Simplicity is indeed engineered directly in.\""}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="size-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs">
                  AB
                </div>
                <div>
                  <h5 className="text-xs font-semibold">Alexander Boyd</h5>
                  <p className="text-[11px] text-zinc-550">Design Engineer, Linear</p>
                </div>
              </div>
            </SpotlightCard>

            {/* Testimonial 2 */}
            <SpotlightCard className="border border-zinc-200/80 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/40 rounded-2xl">
              <p className="text-sm leading-relaxed text-zinc-655 dark:text-zinc-300">
                {"\"Having WCAG accessibility compliant outlines right out of the box saved us weeks of audit fixing. The styling is perfectly minimal.\""}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="size-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs">
                  MK
                </div>
                <div>
                  <h5 className="text-xs font-semibold">Mia Koyama</h5>
                  <p className="text-[11px] text-zinc-555">Lead Frontend, Stripe</p>
                </div>
              </div>
            </SpotlightCard>

            {/* Testimonial 3 */}
            <SpotlightCard className="border border-zinc-200/80 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/40 rounded-2xl">
              <p className="text-sm leading-relaxed text-zinc-655 dark:text-zinc-300">
                {"\"Copy-paste setup means I don't need to add another complex library bundle. I copy precisely the components I need, modify the props, and build.\""}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="size-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs">
                  DR
                </div>
                <div>
                  <h5 className="text-xs font-semibold">David Ross</h5>
                  <p className="text-[11px] text-zinc-555">CTO, Vercel Templates</p>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="border-t border-zinc-200/60 py-32 text-center dark:border-zinc-900 dark:bg-zinc-950">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <h2 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
            Build Faster. Design Less.
          </h2>
          <p className="mt-6 max-w-md mx-auto text-base text-zinc-500 dark:text-zinc-400">
            Kanso UI gives you the building blocks for beautiful, high-performance web applications.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 items-center">
            <Button
              size="lg"
              className="px-8 h-12"
              render={<Link href="/docs" />}
            >
              Start Building
            </Button>
            <GithubButton
              variantDesign="glow"
              href={GITHUB_URL}
              glowColor="linear-gradient(135deg, oklch(0.65 0.24 300), oklch(0.6 0.22 340))"
              className="h-12 "
            >
              Star Kanso UI
            </GithubButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-16 dark:border-zinc-900 dark:bg-zinc-950">
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
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[200px]">
                A design system built with React 19, Next.js 16, and Tailwind CSS v4.
              </p>
            </div>

            <div>
              <h6 className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider">
                Library
              </h6>
              <ul className="mt-4 space-y-2 text-xs">
                <li>
                  <a href="#showcase" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
                    Components
                  </a>
                </li>
                <li>
                  <a href="#showcase" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
                    Registry
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h6 className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider">
                Resources
              </h6>
              <ul className="mt-4 space-y-2 text-xs">
                <li>
                  <Link href="/docs" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
                    Documentation
                  </Link>
                </li>
                <li>
                  <a href="https://nextjs.org" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
                    Next.js Docs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h6 className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider">
                Community
              </h6>
              <ul className="mt-4 space-y-2 text-xs">
                <li>
                  <a href={GITHUB_URL} className="flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
                    GitHub <GithubIcon className="size-3" />
                  </a>
                </li>
                <li>
                  <a href="https://discord.com" className="flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
                    Discord <DiscordIcon className="size-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-zinc-150 pt-8 sm:flex-row dark:border-zinc-900">
            <span className="text-[11px] text-zinc-500">
              &copy; {new Date().getFullYear()} Kanso UI. Open Source under MIT License.
            </span>
            <span className="text-[11px] text-zinc-500">
              Designed and engineered with simplicity.
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
