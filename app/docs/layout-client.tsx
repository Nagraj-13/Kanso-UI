//app/docs/layout-client.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  MoonIcon,
  SunIcon,
  SearchIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { registry } from "@/lib/registry"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"

interface SidebarGroupData {
  category: string
  label: string
  icon: string
  items: { name: string; title: string; href: string; isExternal?: boolean; badge?: string }[]
}

interface DocsLayoutClientProps {
  sidebarGroups: SidebarGroupData[]
  children: React.ReactNode
}

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

/**
 * DocsLayoutClient — Premium full-width header layout matching the Vengeance UI style.
 * Includes a centered search bar with Cmd+K dialog commands, GitHub stars badge,
 * and categories listing components underneath.
 */
export function DocsLayoutClient({
  sidebarGroups,
  children,
}: DocsLayoutClientProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [openSearchDialog, setOpenSearchDialog] = React.useState(false)

  React.useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(handle)
  }, [])

  // Listen to CMD+K or CTRL+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpenSearchDialog((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

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
  const totalCount = registry.length

  return (
    <SidebarProvider defaultOpen={true} className="flex flex-col bg-white dark:bg-zinc-950 min-h-screen overflow-x-hidden">
      {/* ── Top Header Bar (Full Width) ────────────────────────── */}
      <header className="sticky top-0 z-50 w-full h-14 border-b border-zinc-200/60 bg-white/80 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-950/80">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6 w-full max-w-[1440px] mx-auto">
          {/* Left: Sidebar Trigger & Logo */}
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 cursor-pointer" />
            <span className="hidden sm:inline text-zinc-300 dark:text-zinc-800">|</span>
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/Kansologo.png"
                alt="Kanso UI Logo"
                width={20}
                height={20}
                className="dark:invert"
              />
              <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 font-sans tracking-tight">
                Kanso UI
              </span>
            </Link>
          </div>

          {/* Middle: Command Search Bar (Centered) */}
          <div className="flex-1 max-w-sm mx-4 hidden md:block">
            <button
              onClick={() => setOpenSearchDialog(true)}
              className="w-full flex h-8 items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50/50 px-3 py-1.5 text-xs text-zinc-400 hover:bg-zinc-50 dark:border-zinc-800/60 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/50 select-none cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <SearchIcon className="size-3.5" />
                <span>Search documentation...</span>
              </div>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-zinc-200 bg-white px-1.5 font-mono text-[9px] font-medium text-zinc-400 dark:border-zinc-850 dark:bg-zinc-900">
                <span className="text-[10px]">⌘</span>K
              </kbd>
            </button>
          </div>

          {/* Right: Navigation Links, GitHub Star, Theme Toggle */}
          <div className="flex items-center gap-4">
            <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
              <Link
                href="/"
                className="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
              >
                Templates
              </Link>
              <Link
                href="/docs"
                className="text-zinc-950 dark:text-white font-medium transition-colors"
              >
                Docs
              </Link>
            </nav>
            
            {/* GitHub Stars Badge (Replicating Vengeance UI 693 stars style) */}
            <a
              href="https://github.com/Nagraj-13/Kanso-UI"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-850 shadow-xs cursor-pointer"
            >
              <GithubIcon className="size-3.5" />
              <span className="text-zinc-300 dark:text-zinc-800">|</span>
              <span className="flex items-center gap-0.5">
                ⭐ 1
              </span>
            </a>

            {/* Light/Dark Toggle */}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50 cursor-pointer"
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

      {/* ── Main Workspace: Sidebar & Viewport Content ───────────────── */}
      <div className="flex-1 flex w-full max-w-[1440px] mx-auto relative">
        <Sidebar className="top-14! h-[calc(100vh-3.5rem)]! border-r border-zinc-200/60 bg-white dark:border-zinc-800/40 dark:bg-zinc-950">
          <SidebarContent className="px-2 py-4 bg-white dark:bg-zinc-950">
            {/* Search/filter inside sidebar on mobile only */}
            <div className="px-2 pb-3 md:hidden">
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
            <div className="mx-2 mb-3 flex items-center gap-2 rounded-lg bg-zinc-100/80 px-3 py-1.5 dark:bg-zinc-900/50">
              <div className="flex size-5 items-center justify-center rounded bg-zinc-900 text-[10px] font-bold text-white dark:bg-zinc-200 dark:text-zinc-900">
                {totalCount}
              </div>
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Components
              </span>
            </div>

            {/* Category Groups */}
            {filteredGroups.map((group) => (
              <SidebarGroup key={group.category} className="px-0 py-1.5">
                <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-650 px-3 flex items-center gap-1.5">
                  <span className="flex size-4 items-center justify-center rounded text-[10px] font-semibold text-zinc-400 dark:text-zinc-600">
                    {group.icon}
                  </span>
                  {group.label}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="px-2">
                    {group.items.map((item) => {
                      const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                      return (
                        <SidebarMenuItem key={item.name}>
                          <SidebarMenuButton
                            isActive={isActive}
                            className={cn(
                              "relative w-full rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-150 flex items-center justify-between",
                              isActive
                                ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-800/60 dark:text-zinc-50 font-semibold"
                                : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900/40 dark:hover:text-zinc-200"
                            )}
                            render={item.isExternal ? (
                              <a href={item.href} target="_blank" rel="noreferrer" />
                            ) : (
                              <Link href={item.href} />
                            )}
                          >
                            <span>{item.title}</span>
                            {item.badge && (
                              <span className="text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.25 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                {item.badge}
                              </span>
                            )}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}

            {/* No results */}
            {filteredGroups.length === 0 && (
              <div className="px-3 py-8 text-center text-xs text-zinc-400">
                No components match &ldquo;{search}&rdquo;
              </div>
            )}
          </SidebarContent>
        </Sidebar>

        {/* Content Pane */}
        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
          {/* Breadcrumb row above main view on mobile only */}
          <div className="flex items-center gap-2 px-4 pt-6 sm:px-6 lg:px-12 md:hidden">
            <Link href="/docs" className="text-xs font-semibold text-zinc-400">
              Components
            </Link>
            <span className="text-xs text-zinc-350">/</span>
            <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-150 capitalize">
              {pathname.split("/").pop()?.replace("-", " ")}
            </span>
          </div>
          
          <main className="px-4 py-8 sm:px-6 lg:px-12 lg:py-10 flex-1 min-w-0 overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>

      {/* ── Command Dialog (Search Palette) ────────────────────────── */}
      <CommandDialog open={openSearchDialog} onOpenChange={setOpenSearchDialog}>
        <Command>
          <CommandInput placeholder="Type a component name or guide to search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Components">
              {registry.map((item) => (
                <CommandItem
                  key={item.name}
                  onSelect={() => {
                    setOpenSearchDialog(false)
                    router.push(`/docs/components/${item.category}/${item.name}`)
                  }}
                  className="cursor-pointer"
                >
                  <span>{item.title}</span>
                  <span className="ml-2 text-xs text-zinc-400 capitalize">
                    in {item.category}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Installation Guides">
              <CommandItem
                onSelect={() => {
                  setOpenSearchDialog(false)
                  router.push("/docs/installation/nextjs")
                }}
                className="cursor-pointer"
              >
                <span>Install Next.js</span>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  setOpenSearchDialog(false)
                  router.push("/docs/installation/tailwindcss")
                }}
                className="cursor-pointer"
              >
                <span>Install Tailwind CSS</span>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  setOpenSearchDialog(false)
                  router.push("/docs/installation/utilities")
                }}
                className="cursor-pointer"
              >
                <span>Add utilities (cn helper)</span>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  setOpenSearchDialog(false)
                  router.push("/docs/installation/cli")
                }}
                className="cursor-pointer"
              >
                <span>CLI Usage</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </SidebarProvider>
  )
}
