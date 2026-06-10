"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The spotlight hover color (e.g. "rgba(99, 102, 241, 0.15)"). Falls back to zinc theme default if omitted. */
  spotlightColor?: string
  /** The radius size of the spotlight gradient circle in pixels (default: 300) */
  spotlightSize?: number
  /** Content to render inside the card */
  children: React.ReactNode
}

/**
 * SpotlightCard — A layout container with a subtle ambient spotlight that follows the cursor on hover.
 *
 * Implements high-performance mouse tracking via CSS custom properties, ensuring 60fps animations
 * with zero component re-renders. Integrates seamlessly with keyboard focus and system dark mode.
 *
 * @example
 * ```tsx
 * import { SpotlightCard } from "@/components/kanso/spotlight-card"
 *
 * export default function Demo() {
 *   return (
 *     <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.1)">
 *       <div className="p-6">
 *         <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Interactive Spot</h3>
 *         <p className="text-zinc-500">Move your cursor over this card.</p>
 *       </div>
 *     </SpotlightCard>
 *   )
 * }
 * ```
 */
function SpotlightCard({
  children,
  className,
  spotlightColor,
  spotlightSize = 300,
  style,
  onMouseMove,
  ...props
}: SpotlightCardProps) {
  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
      e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)
      if (onMouseMove) onMouseMove(e)
    },
    [onMouseMove]
  )

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative rounded-3xl border border-zinc-200/80 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-zinc-400 dark:focus-within:ring-zinc-850",
        className
      )}
      style={
        {
          ...style,
          "--spotlight-size": `${spotlightSize}px`,
          ...(spotlightColor ? { "--spotlight-color": spotlightColor } : {}),
        } as React.CSSProperties
      }
      {...props}
    >
      {/* Spotlight overlay (binds to mouse-x/y or defaults to center 50% 50% for focus) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 [--kanso-spotlight:rgba(9,9,11,0.03)] dark:[--kanso-spotlight:rgba(255,255,255,0.06)]"
        style={{
          background: `radial-gradient(var(--spotlight-size) circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--spotlight-color, var(--kanso-spotlight)), transparent 80%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export { SpotlightCard }
export type { SpotlightCardProps }
