"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import {
  MoonIcon,
  SunIcon,
  MenuIcon,
  XIcon,
  ArrowLeftIcon,
  SearchIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SidebarGroup {
  category: string
  label: string
  icon: string
  items: { name: string; title: string; href: string }[]
}

interface DocsLayoutClientProps {
  sidebarGroups: SidebarGroup[]
  children: React.ReactNode
}

/**
 * DocsLayoutClient — Client-side docs layout with:
 * - Elegant sidebar with active state indicators and category icons
 * - Mobile sidebar drawer with backdrop
 * - Quick search/filter input
 * - Theme toggle
 * - Breadcrumb header
 */
export function DocsLayoutClient({
  sidebarGroups,
  children,
}: DocsLayoutClientProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Close mobile sidebar on navigation
  React.useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Filter items by search query
  const filteredGroups = React.useMemo(() => {
    if (!search.trim()) return sidebarGroups
    const q = search.toLowerCase()
    return sidebarGroups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            item.name.toLowerCase().includes(q)
        ),
      }))
      .filter((group) => group.items.length > 0)
  }, [sidebarGroups, search])

  // Total component count
  const totalCount = sidebarGroups.reduce((sum, g) => sum + g.items.length, 0)

  /* ── Sidebar content (reused in desktop + mobile) ─── */
  const sidebarContent = (
    <nav className="flex flex-col gap-1 py-2">
      {/* Search / filter */}
      <div className="px-3 pb-3">
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-zinc-400 z-10" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter components..."
            className="h-8 pl-8 text-xs bg-zinc-50 border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/50"
          />
        </div>
      </div>

      {/* Component count badge */}
      <div className="mx-3 mb-3 flex items-center gap-2 rounded-lg bg-zinc-100/80 px-3 py-2 dark:bg-zinc-900/50">
        <div className="flex size-5 items-center justify-center rounded bg-zinc-900 text-[10px] font-bold text-white dark:bg-zinc-200 dark:text-zinc-900">
          {totalCount}
        </div>
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Components
        </span>
      </div>

      {/* Category groups */}
      {filteredGroups.map((group) => (
        <div key={group.category} className="mb-2">
          {/* Category header */}
          <div className="flex items-center gap-2 px-3 py-2">
            <span className="flex size-5 items-center justify-center rounded text-[10px] font-semibold text-zinc-400 dark:text-zinc-600">
              {group.icon}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
              {group.label}
            </span>
          </div>

          {/* Items */}
          <ul className="space-y-px px-2">
            {group.items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    data-active={isActive}
                    className={cn(
                      "docs-sidebar-link relative block rounded-md px-3 py-1.5 text-[13px] font-medium transition-all duration-150",
                      isActive
                        ? "bg-zinc-100 pl-4 text-zinc-900 dark:bg-zinc-800/60 dark:text-zinc-100"
                        : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900/40 dark:hover:text-zinc-200"
                    )}
                  >
                    {item.title}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active-pill"
                        className="absolute inset-0 rounded-md bg-zinc-100 dark:bg-zinc-800/60"
                        style={{ zIndex: -1 }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}

      {/* No results */}
      {filteredGroups.length === 0 && (
        <div className="px-3 py-8 text-center text-xs text-zinc-400">
          No components match &ldquo;{search}&rdquo;
        </div>
      )}
    </nav>
  )

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* ── Top header bar ──────────────────────────── */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/60 bg-white/80 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Left: Logo + breadcrumb */}
          <div className="flex items-center gap-2.5">
            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setMobileOpen(true)}
              className="mr-1 lg:hidden text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              aria-label="Open sidebar"
            >
              <MenuIcon className="size-5" />
            </Button>

            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/Kansologo.png"
                alt="Kanso UI Logo"
                width={20}
                height={20}
                className="dark:invert"
              />
              <span className="hidden text-sm font-semibold tracking-tight text-zinc-900 sm:inline dark:text-zinc-100">
                Kanso UI
              </span>
            </Link>

            <span className="text-zinc-300 dark:text-zinc-700">/</span>

            <Link
              href="/docs"
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Components
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 sm:flex dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            >
              <ArrowLeftIcon className="size-3" />
              Home
            </Link>

            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
            >
              {!mounted ? (
                <div className="size-4 rounded-full bg-zinc-200 animate-pulse dark:bg-zinc-800" />
              ) : theme === "dark" ? (
                <SunIcon className="size-4" />
              ) : (
                <MoonIcon className="size-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        {/* ── Desktop sidebar ────────────────────────── */}
        <aside className="hidden w-60 shrink-0 border-r border-zinc-200/60 lg:block dark:border-zinc-800/40">
          <div
            className="sticky top-14 overflow-y-auto px-2 py-4"
            style={{ maxHeight: "calc(100vh - 3.5rem)" }}
          >
            {sidebarContent}
          </div>
        </aside>

        {/* ── Mobile sidebar drawer ──────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
                onClick={() => setMobileOpen(false)}
              />

              {/* Drawer */}
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-y-0 left-0 z-50 w-72 border-r border-zinc-200 bg-white shadow-xl lg:hidden dark:border-zinc-800 dark:bg-zinc-950"
              >
                {/* Drawer header */}
                <div className="flex h-14 items-center justify-between border-b border-zinc-200/60 px-4 dark:border-zinc-800/60">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/Kansologo.png"
                      alt="Kanso UI Logo"
                      width={18}
                      height={18}
                      className="dark:invert"
                    />
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Components
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setMobileOpen(false)}
                    className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    aria-label="Close sidebar"
                  >
                    <XIcon className="size-5" />
                  </Button>
                </div>

                {/* Drawer content */}
                <div
                  className="overflow-y-auto px-2 py-4"
                  style={{ maxHeight: "calc(100vh - 3.5rem)" }}
                >
                  {sidebarContent}
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ── Main content area ──────────────────────── */}
        <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-12 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  )
}
