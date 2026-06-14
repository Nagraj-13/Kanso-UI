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
import { GithubButton } from "@/components/kanso/github-button"
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
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
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

// GithubIcon removed in favor of kanso GithubButton

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
    <SidebarProvider
      defaultOpen={true}
      className="flex bg-white dark:bg-zinc-950 min-h-screen overflow-x-clip"
      style={{
        "--sidebar": "var(--background)",
        "--sidebar-border": "var(--border)",
      } as React.CSSProperties}
    >
      {/* ── Main Workspace: Sidebar & Viewport Content ───────────────── */}
      <div className="flex-1 flex w-full relative">
        <Sidebar className="border-r border-zinc-200/60 bg-white dark:border-zinc-800/40 dark:bg-zinc-950">
          {/* Logo Section */}
          <div className="h-14 flex items-center px-6 border-b border-zinc-200/60 dark:border-zinc-800/60 gap-2.5 shrink-0">
            <Link href="/" className="group flex items-center gap-2.5 select-none">
              <div className="relative flex items-center justify-center">
                <Image
                  src="/Kansologo.png"
                  alt="Kanso UI Logo"
                  width={20}
                  height={20}
                  className="dark:invert transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-12"
                />
                <div className="absolute inset-0 bg-zinc-900/5 dark:bg-white/5 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
              <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 font-sans tracking-tight transition-colors duration-200 group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
                Kanso UI
              </span>
            </Link>
          </div>

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
                  className="h-8 pl-8 text-xs bg-zinc-50/50 border-zinc-200/80 focus:bg-white dark:border-zinc-800/80 dark:bg-zinc-900/30 transition-all duration-200"
                />
              </div>
            </div>

            {/* Component count badge */}
            <div className="mx-3 mb-4 flex items-center justify-between rounded-lg border border-zinc-100 dark:border-zinc-900/60 bg-zinc-50/50 dark:bg-zinc-900/20 px-3.5 py-2 select-none">
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 tracking-wide">
                  Components
                </span>
              </div>
              <div className="flex items-center justify-center rounded-full bg-zinc-900/5 px-2 py-0.5 text-[10px] font-bold text-zinc-800 dark:bg-zinc-50/10 dark:text-zinc-300 tabular-nums">
                {totalCount}
              </div>
            </div>

            {/* Category Groups */}
            {filteredGroups.map((group) => (
              <SidebarGroup key={group.category} className="px-0 py-1.5">
                <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-400/80 dark:text-zinc-650 px-3 flex items-center gap-1.5">
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
                              "relative w-full rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 flex items-center justify-between border-l-2 pl-2.5 group/menu-button",
                              isActive
                                ? "bg-zinc-50/80 text-zinc-950 border-zinc-900 font-semibold dark:bg-zinc-900/40 dark:text-zinc-50 dark:border-zinc-100"
                                : "text-zinc-500 border-transparent hover:bg-zinc-50/30 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/20 dark:hover:text-zinc-200 hover:translate-x-0.5"
                            )}
                            render={item.isExternal ? (
                              <a href={item.href} target="_blank" rel="noreferrer" />
                            ) : (
                              <Link href={item.href} />
                            )}
                          >
                            <span>{item.title}</span>
                            {item.badge ? (
                              <span className="text-[8px] font-extrabold uppercase tracking-widest px-1.5 py-0.25 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-xs">
                                {item.badge}
                              </span>
                            ) : (
                              !isActive && (
                                <span className="opacity-0 -translate-x-1 group-hover/menu-button:opacity-100 group-hover/menu-button:translate-x-0 transition-all duration-200 text-zinc-400 dark:text-zinc-650 text-xs">
                                  →
                                </span>
                              )
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

          {/* Sidebar Footer */}
          <SidebarFooter className="p-3 border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-950">
            <a
              href="https://github.com/Nagraj-13"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 cursor-pointer transition-all duration-200 group"
            >
              <Avatar className="h-8 w-8 border border-zinc-200/60 dark:border-zinc-800/60">
                <AvatarImage src="https://github.com/Nagraj-13.png" alt="Nagraj" />
                <AvatarFallback className="font-semibold text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">N</AvatarFallback>
              </Avatar>
              <div className="text-sm leading-tight overflow-hidden">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  Nagraj
                </p>
                <p className="text-zinc-400 dark:text-zinc-500 text-xs truncate">
                  @Nagraj13
                </p>
              </div>
              <span className="ml-auto opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-zinc-400 dark:text-zinc-650 text-xs font-semibold">
                ↗
              </span>
            </a>
          </SidebarFooter>
        </Sidebar>

        {/* Content Pane */}
        <div className="flex-1 flex flex-col min-w-0 overflow-x-clip content-pane">
          {/* ── Top Header Bar ────────────────────────── */}
          <header className="sticky top-0 z-50 w-full h-14 border-b border-zinc-200/60 bg-white/80 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-950/80">
            <div className="flex h-14 items-center justify-between px-4 sm:px-6 w-full">
              {/* Left: Sidebar Trigger & Logo */}
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 cursor-pointer" />
                <span className="hidden sm:inline text-zinc-300 dark:text-zinc-800 header-logo-container">|</span>
                <Link href="/" className="flex items-center gap-2.5 header-logo-container">
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
                
                {/* GitHub Stars Badge (Real component) */}
                <GithubButton
                  variantDesign="rainbow"
                  href="https://github.com/Nagraj-13/Kanso-UI"
                  className="h-8 text-xs font-semibold"
                />

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
          
          <main className="px-4 py-8 sm:px-6 lg:px-12 lg:py-10 flex-1 min-w-0 overflow-x-clip max-w-5xl w-full mx-auto">
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
