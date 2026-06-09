import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface GithubButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  /** The design variant of the GitHub button */
  variantDesign?: "rainbow" | "classic" | "tooltip" | "glow"
  /** Number of stars to display (static or fallback value) */
  stars?: number | string
  /** The repository link or target URL */
  href?: string
  /** Custom glow color (preset name or CSS color/gradient) for the glow variant */
  glowColor?: string
  /** Specific GitHub repository path (e.g. "owner/repo"). If omitted, parsed from href. */
  repo?: string
}

// Production-ready shared client-side cache & pending fetch registry
const starCache = new Map<string, number>()
const pendingFetches = new Map<string, Promise<number>>()

type StarListener = (count: number) => void
const starListeners = new Map<string, Set<StarListener>>()

const subscribeToRepoStars = (repo: string, callback: StarListener) => {
  if (!starListeners.has(repo)) {
    starListeners.set(repo, new Set())
  }
  starListeners.get(repo)!.add(callback)
  return () => {
    starListeners.get(repo)?.delete(callback)
    if (starListeners.get(repo)?.size === 0) {
      starListeners.delete(repo)
    }
  }
}

const broadcastRepoStars = (repo: string, count: number) => {
  starListeners.get(repo)?.forEach((cb) => cb(count))
}

const fetchRepoStars = async (repo: string): Promise<number> => {
  if (starCache.has(repo)) {
    return starCache.get(repo)!
  }
  if (pendingFetches.has(repo)) {
    return pendingFetches.get(repo)!
  }

  const promise = (async () => {
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}`)
      if (!res.ok) throw new Error("GitHub API response error")
      const data = await res.json()
      const count = data.stargazers_count
      if (typeof count === "number") {
        starCache.set(repo, count)
        broadcastRepoStars(repo, count)
        return count
      }
      throw new Error("Invalid count format")
    } catch (err) {
      console.error(`Failed to fetch stars for repo ${repo}:`, err)
      return 0
    } finally {
      pendingFetches.delete(repo)
    }
  })()

  pendingFetches.set(repo, promise)
  return promise
}

const GithubButton = React.forwardRef<HTMLButtonElement, GithubButtonProps>(
  ({ className, variantDesign = "classic", stars = 11, href, glowColor, repo, children, ...props }, ref) => {
    // Shared GitHub SVG Logo path
    const githubIcon = (
      <svg className="size-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    )

    // Resolve glow color to a CSS background gradient
    const getGlowBg = (color?: string) => {
      if (!color) {
        return "linear-gradient(135deg, rgb(122, 105, 249), rgb(242, 99, 120), rgb(245, 131, 63))"
      }
      const presets: Record<string, string> = {
        violet: "linear-gradient(135deg, oklch(0.6 0.25 300), oklch(0.5 0.3 320))",
        rose: "linear-gradient(135deg, oklch(0.65 0.25 0), oklch(0.55 0.3 20))",
        emerald: "linear-gradient(135deg, oklch(0.7 0.25 140), oklch(0.6 0.3 160))",
        blue: "linear-gradient(135deg, oklch(0.6 0.25 250), oklch(0.5 0.3 270))",
        orange: "linear-gradient(135deg, oklch(0.7 0.25 45), oklch(0.6 0.3 65))",
        rainbow: "linear-gradient(90deg, hsl(0, 100%, 63%), hsl(90, 100%, 63%), hsl(210, 100%, 63%), hsl(195, 100%, 63%), hsl(270, 100%, 63%))"
      }
      if (color in presets) {
        return presets[color]
      }
      if (color.includes("gradient") || color.includes("var(") || color.includes("rgb") || color.includes("hsl") || color.includes("#")) {
        return color
      }
      return `linear-gradient(135deg, ${color}, ${color}cc)`
    }

    // Dynamic Live Star Count State
    const [starCount, setStarCount] = React.useState<number | string>(stars)

    React.useEffect(() => {
      setStarCount(stars)
    }, [stars])

    React.useEffect(() => {
      let targetRepo = repo
      if (!targetRepo && href) {
        // Try parsing from GitHub URL format: github.com/owner/repo
        const match = href.match(/github\.com\/([^\/]+\/[^\/#?]+)/)
        if (match) {
          targetRepo = match[1]
        }
      }

      if (!targetRepo) return

      if (starCache.has(targetRepo)) {
        setStarCount(starCache.get(targetRepo)!)
      }

      const unsubscribe = subscribeToRepoStars(targetRepo, (count) => {
        setStarCount(count)
      })

      fetchRepoStars(targetRepo).then((count) => {
        if (count > 0) {
          setStarCount(count)
        }
      })

      return () => unsubscribe()
    }, [repo, href])

    // Standard button element to render (using primitive Button from shadcn)
    const buttonElement = (
      <Button
        ref={ref}
        variant="ghost"
        className={cn(
          "transition-all duration-200 cursor-pointer h-auto hover:bg-transparent text-inherit select-none",
          
          // Rainbow variant styling
          variantDesign === "rainbow" && [
            "animate-rainbow-button items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group relative animate-rainbow text-foreground hover:scale-105 active:scale-95 px-4 py-2 inline-flex",
            "before:absolute before:bottom-[-20%] before:left-1/2 before:z-[0] before:h-[20%] before:w-[60%] before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] before:bg-[length:200%_auto] before:[filter:blur(calc(0.8*1rem))]",
          ],

          // Classic variant styling
          variantDesign === "classic" && [
            "gap-2 rounded-full font-bold justify-center px-4 py-2.5 text-xs bg-zinc-900/90 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),inset_0_0_0_1px_rgba(255,255,255,0.04)] dark:bg-zinc-950/90 hover:bg-zinc-950 hover:text-yellow-300 dark:hover:bg-zinc-900 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),inset_0_0_0_1px_rgba(252,232,3,0.08)] hover:-translate-y-1 hover:scale-102 transition-all duration-300 ease-out",
          ],

          // Tooltip variant styling (button portion)
          variantDesign === "tooltip" && [
            "rounded-lg p-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-950 dark:text-zinc-50 hover:scale-110 active:scale-95 transition-all duration-200",
          ],

          // Glow variant styling
          variantDesign === "glow" && [
            "group/glow relative rounded-full p-[1.5px] overflow-hidden dark:bg-neutral-800 bg-neutral-200 border-0 hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-lg dark:hover:shadow-black/50",
          ],
          
          className
        )}
        {...props}
      >
        {variantDesign === "rainbow" && (
          <>
            <div className="flex items-center gap-1.5 relative z-10">
              {githubIcon}
              <span className="text-zinc-900 dark:text-zinc-50 font-medium">
                {children || "Star on GitHub"}
              </span>
            </div>
            <div className="ml-3 flex items-center gap-1.5 text-xs relative z-10 border-l border-zinc-200 dark:border-zinc-800 pl-3">
              <svg
                className="size-3.5 text-zinc-400 group-hover:text-yellow-500 group-hover:scale-110 transition-all duration-200"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="tabular-nums font-semibold text-zinc-600 dark:text-zinc-400">
                {starCount}
              </span>
            </div>
          </>
        )}

        {variantDesign === "classic" && (
          <>
            {githubIcon}
            <span>{children || "View on Github"}</span>
          </>
        )}

        {variantDesign === "tooltip" && (
          <div className="size-5 flex items-center justify-center">
            {githubIcon}
          </div>
        )}

        {variantDesign === "glow" && (
          <>
            {/* Animated Left Glow Border background */}
            <span className="absolute inset-0 rounded-full overflow-hidden">
              <span className="inset-0 absolute pointer-events-none select-none">
                <span
                  className="block -translate-x-1/2 -translate-y-1/3 size-24 blur-xl animate-glow-translate"
                  style={{
                    background: getGlowBg(glowColor),
                  }}
                />
              </span>
            </span>

            {/* Animated Right Glow Border background */}
            <span className="absolute inset-0 rounded-full overflow-hidden">
              <span className="inset-0 absolute pointer-events-none select-none">
                <span
                  className="block translate-x-1/2 translate-y-1/3 size-24 blur-xl animate-glow-translate-right"
                  style={{
                    background: getGlowBg(glowColor),
                  }}
                />
              </span>
            </span>

            {/* Left scaling glow */}
            <span className="inset-0 absolute pointer-events-none select-none animate-glow-translate">
              <span
                className="block z-0 h-full w-12 blur-xl -translate-x-1/2 rounded-full animate-glow-scale"
                style={{
                  background: getGlowBg(glowColor),
                }}
              />
            </span>

            {/* Right scaling glow */}
            <span className="inset-0 absolute pointer-events-none select-none animate-glow-translate">
              <span
                className="block z-0 h-full w-12 blur-xl translate-x-1/2 rounded-full animate-glow-scale"
                style={{
                  background: getGlowBg(glowColor),
                }}
              />
            </span>

            {/* Inner Content pill */}
            <span className="flex items-center justify-center gap-2 relative z-10 dark:bg-neutral-950/90 bg-neutral-50/90 rounded-full py-2 px-4 pl-3.5 w-full h-full text-zinc-900 dark:text-zinc-50 hover:bg-neutral-100/90 dark:hover:bg-neutral-900/90">
              <span className="relative group-hover/glow:scale-105 group-hover/glow:rotate-[360deg] transition-all duration-700 ease-in-out">
                {githubIcon}
                <span
                  className="rounded-full size-11 absolute opacity-0 dark:opacity-35 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-lg animate-star-shine"
                  style={{
                    background: getGlowBg(glowColor),
                  }}
                />
              </span>
              <span className="bg-gradient-to-b ml-0.5 dark:from-white dark:to-white/50 from-neutral-950 to-neutral-950/60 bg-clip-text text-xs text-transparent font-semibold">
                {children || "Star on Github"}
              </span>
              <span className="ml-1.5 tabular-nums text-[10px] font-semibold bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-1.5 py-0.5 rounded-full">
                {starCount}
              </span>
            </span>
          </>
        )}
      </Button>
    )

    // Wrap in tooltip layout if variant is tooltip
    if (variantDesign === "tooltip") {
      return (
        <div className="group relative inline-block">
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="block focus:outline-none">
              {buttonElement}
            </a>
          ) : (
            buttonElement
          )}
          {/* Tooltip box */}
          <span className="absolute -top-12 left-[50%] -translate-x-[50%] z-20 origin-bottom scale-0 px-2.5 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-semibold text-zinc-800 shadow-sm transition-all duration-200 ease-in-out group-hover:scale-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
            {children || "GitHub"}
          </span>
        </div>
      )
    }

    if (href) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block focus:outline-none">
          {buttonElement}
        </a>
      )
    }

    return buttonElement
  }
)

GithubButton.displayName = "GithubButton"

export { GithubButton }
