import * as React from "react"
import { cn } from "@/lib/utils"

interface ShimmerBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Border radius in pixels (default: 12) */
  borderRadius?: number
  /** Shimmer highlight color (default: "rgba(255, 255, 255, 0.15)") */
  shimmerColor?: string
  /** Width of the shimmer highlight in pixels (default: 200) */
  shimmerSize?: number
  /** Animation duration in seconds (default: 3) */
  duration?: number
  /** Border width in pixels (default: 1.5) */
  borderWidth?: number
  /** Background color of the inner content area */
  background?: string
  /** Children to render inside the bordered container */
  children: React.ReactNode
}

/**
 * ShimmerBorder — A container with a subtle animated shimmer running along its border.
 *
 * Uses pure CSS `@keyframes` and `conic-gradient` masking for a performant,
 * GPU-accelerated shimmer effect. No JavaScript animation loop required.
 *
 * @example
 * ```tsx
 * import { ShimmerBorder } from "@/components/kanso/shimmer-border"
 *
 * export default function Demo() {
 *   return (
 *     <ShimmerBorder>
 *       <div className="p-6">
 *         <h3 className="font-semibold">Kanso UI</h3>
 *         <p className="text-sm text-zinc-500">
 *           Beautiful, minimal components.
 *         </p>
 *       </div>
 *     </ShimmerBorder>
 *   )
 * }
 * ```
 */
function ShimmerBorder({
  children,
  className,
  borderRadius = 12,
  shimmerColor = "rgba(255, 255, 255, 0.15)",
  shimmerSize = 200,
  duration = 3,
  borderWidth = 1.5,
  background,
  style,
  ...props
}: ShimmerBorderProps) {
  return (
    <div
      style={
        {
          "--shimmer-border-radius": `${borderRadius}px`,
          "--shimmer-color": shimmerColor,
          "--shimmer-size": `${shimmerSize}px`,
          "--shimmer-duration": `${duration}s`,
          "--shimmer-border-width": `${borderWidth}px`,
          "--shimmer-background": background ?? "transparent",
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        "shimmer-border relative overflow-hidden rounded-[var(--shimmer-border-radius)] p-[var(--shimmer-border-width)]",
        className
      )}
      {...props}
    >
      {/* Animated shimmer layer (behind content) */}
      <div
        className="absolute inset-0 animate-[shimmer-spin_var(--shimmer-duration)_linear_infinite]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, var(--shimmer-color) 10%, transparent 20%)`,
          borderRadius: "inherit",
        }}
      />

      {/* Static border underneath for always-visible edge */}
      <div
        className="absolute inset-0 rounded-[inherit] border border-zinc-200 dark:border-zinc-800"
        style={{ borderRadius: "inherit" }}
      />

      {/* Inner content area */}
      <div
        className="relative z-10 rounded-[calc(var(--shimmer-border-radius)-var(--shimmer-border-width))] bg-white dark:bg-zinc-950"
        style={{
          background:
            background ??
            undefined,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export { ShimmerBorder }
export type { ShimmerBorderProps }
