//app/docs/layout-client.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  MoonIcon,
  SunIcon,
  ArrowLeftIcon,
  SearchIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface SidebarGroupData {
  category: string
  label: string
  icon: string
  items: { name: string; title: string; href: string }[]
}

interface DocsLayoutClientProps {
  sidebarGroups: SidebarGroupData[]
  children: React.ReactNode
}

/**
 * DocsLayoutClient — Premium collapsible docs layout utilizing the shadcn/ui Sidebar:
 * - Collapsible state (Trigger button + Ctrl+B keyboard shortcut)
 * - Custom input search filter
 * - Dynamic category grouping with icons
 * - Dark mode theme toggle
 * - Responsive viewport centering
 */
export function DocsLayoutClient({
  sidebarGroups,
  children,
}: DocsLayoutClientProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    setMounted(true)
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
  const totalCount = sidebarGroups.reduce((sum, g) => sum + g.items.length, 0)

  return (
    <SidebarProvider defaultOpen={true} className="bg-white dark:bg-zinc-950 min-h-screen overflow-x-hidden">
      {/* ── Shadcn UI Sidebar ────────────────────────── */}
      <Sidebar className="border-r border-zinc-200/60 bg-white dark:border-zinc-800/40 dark:bg-zinc-950">
        <SidebarHeader className="p-4 sm:p-8 bg-white dark:border-zinc-850 dark:bg-zinc-950">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/Kansologo.png"
              alt="Kanso UI Logo"
              width={24}
              height={24}
              className="dark:invert"
            />
            <span className="text-md font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Kanso UI
            </span>
          </Link>
        </SidebarHeader>

        <SidebarContent className="px-2 py-4 bg-white dark:bg-zinc-950">
          {/* Search / filter */}
          <div className="px-2 pb-3">
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

          {/* Category groups */}
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
                            "relative w-full rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-150",
                            isActive
                              ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-800/60 dark:text-zinc-50 font-semibold"
                              : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900/40 dark:hover:text-zinc-200"
                          )}
                          render={<Link href={item.href} />}
                        >
                          {item.title}
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

      {/* ── Main content pane ────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Header Bar */}
        <header className="sticky top-0 z-40 w-full border-b border-zinc-200/60 bg-white/80 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-950/80">
          <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
              <SidebarTrigger className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 shrink-0" />
              <span className="text-zinc-350 dark:text-zinc-700 shrink-0">/</span>
              <Link
                href="/docs"
                className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 truncate"
              >
                Components
              </Link>
            </div>

            {/* Theme toggle and Home button */}
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

        {/* Children Viewport content */}
        <main className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-12 lg:py-10 flex-1 min-w-0 overflow-x-hidden">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
