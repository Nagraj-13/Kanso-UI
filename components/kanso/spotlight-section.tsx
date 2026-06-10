import * as React from "react"
import { cn } from "@/lib/utils"

export interface SpotlightSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  title?: string
  /** The color of the spotlight. Supports presets ('white', 'blue', 'emerald', 'violet', 'rose') or any custom CSS color */
  spotlightColor?: "white" | "blue" | "emerald" | "violet" | "rose" | string
  /** The intensity scale of the glow effect */
  intensity?: "subtle" | "medium" | "high"
  /** Position variant of the spotlight boundaries */
  variant?: "both" | "top-only" | "bottom-only"
}

const colorMap = {
  white: {
    light: "rgba(0, 0, 0, 0.04)",
    dark: "rgba(255, 255, 255, 0.08)",
    lineLight: "rgba(0, 0, 0, 0.1)",
    lineDark: "rgba(255, 255, 255, 0.15)",
  },
  blue: {
    light: "rgba(59, 130, 246, 0.08)",
    dark: "rgba(59, 130, 246, 0.12)",
    lineLight: "rgba(59, 130, 246, 0.3)",
    lineDark: "rgba(59, 130, 246, 0.5)",
  },
  emerald: {
    light: "rgba(16, 185, 129, 0.08)",
    dark: "rgba(16, 185, 129, 0.12)",
    lineLight: "rgba(16, 185, 129, 0.3)",
    lineDark: "rgba(16, 185, 129, 0.5)",
  },
  violet: {
    light: "rgba(139, 92, 246, 0.08)",
    dark: "rgba(139, 92, 246, 0.12)",
    lineLight: "rgba(139, 92, 246, 0.3)",
    lineDark: "rgba(139, 92, 246, 0.5)",
  },
  rose: {
    light: "rgba(244, 63, 94, 0.08)",
    dark: "rgba(244, 63, 94, 0.12)",
    lineLight: "rgba(244, 63, 94, 0.3)",
    lineDark: "rgba(244, 63, 94, 0.5)",
  },
}

export function SpotlightSection({
  children,
  title,
  spotlightColor = "white",
  intensity = "medium",
  variant = "both",
  className,
  ...props
}: SpotlightSectionProps) {
  const isPreset = ["white", "blue", "emerald", "violet", "rose"].includes(spotlightColor)

  const intensityMap = {
    subtle: 0.5,
    medium: 1.0,
    high: 1.6,
  }
  const intensityMultiplier = intensityMap[intensity]

  // Construct color definitions
  const customGlowLight = `color-mix(in srgb, ${spotlightColor} ${6 * intensityMultiplier}%, transparent)`
  const customGlowDark = `color-mix(in srgb, ${spotlightColor} ${10 * intensityMultiplier}%, transparent)`
  const customLineLight = `color-mix(in srgb, ${spotlightColor} ${30 * intensityMultiplier}%, transparent)`
  const customLineDark = `color-mix(in srgb, ${spotlightColor} ${50 * intensityMultiplier}%, transparent)`

  const cssVariables = isPreset
    ? {
        "--spotlight-glow-light": colorMap[spotlightColor as keyof typeof colorMap].light,
        "--spotlight-glow-dark": colorMap[spotlightColor as keyof typeof colorMap].dark,
        "--spotlight-line-light": colorMap[spotlightColor as keyof typeof colorMap].lineLight,
        "--spotlight-line-dark": colorMap[spotlightColor as keyof typeof colorMap].lineDark,
      }
    : {
        "--spotlight-glow-light": customGlowLight,
        "--spotlight-glow-dark": customGlowDark,
        "--spotlight-line-light": customLineLight,
        "--spotlight-line-dark": customLineDark,
      }

  const showTop = variant === "both" || variant === "top-only"
  const showBottom = variant === "both" || variant === "bottom-only"

  return (
    <section
      className={cn(
        "w-full [--spotlight-glow:var(--spotlight-glow-light)] dark:[--spotlight-glow:var(--spotlight-glow-dark)] [--spotlight-line:var(--spotlight-line-light)] dark:[--spotlight-line:var(--spotlight-line-dark)]",
        className
      )}
      style={cssVariables as React.CSSProperties}
      {...props}
    >
      {/* --- Top Divider & Title --- */}
      {showTop && (
        <div className="border-zinc-200/80 dark:border-zinc-800/80 relative rounded-3xl border-t pt-16">
          {/* Top Linear Gradient Line */}
          <div
            aria-hidden="true"
            className="select-none center pointer-events-none absolute left-1/2 top-0 h-px w-full -translate-x-1/2 -translate-y-1/2 md:w-[600px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, var(--spotlight-line) 50%, rgba(0, 0, 0, 0) 100%)",
            }}
          />
          {/* Top Conic/Radial Spotlight */}
          <div
            aria-hidden="true"
            className="select-none center pointer-events-none absolute top-0 left-1/2 h-[120px] w-full -translate-x-1/2 md:max-w-[500px]"
            style={{
              background:
                "radial-gradient(50% 100% at 50% 0%, var(--spotlight-glow) 0%, transparent 100%)",
            }}
          />
          {title && (
            <h2 className="mx-auto text-center text-[2.25rem] leading-[130%] tracking-tight text-zinc-900 dark:text-zinc-50 font-semibold">
              {title}
            </h2>
          )}
        </div>
      )}

      {/* --- Main Content (Passed as Children) --- */}
      <div className={cn("relative z-10", showTop && "mt-10")}>
        {children}
      </div>

      {/* --- Bottom Divider --- */}
      {showBottom && (
        <div className="border-zinc-200/80 dark:border-zinc-800/80 relative mt-16 rounded-3xl border-b pt-16">
          {/* Bottom Conic/Radial Spotlight (Flipped) */}
          <div
            aria-hidden="true"
            className="select-none center pointer-events-none absolute bottom-0 left-1/2 h-[120px] w-full -translate-x-1/2 md:max-w-[500px]"
            style={{
              background:
                "radial-gradient(50% 100% at 50% 100%, var(--spotlight-glow) 0%, transparent 100%)",
            }}
          />
          {/* Bottom Linear Gradient Line */}
          <div
            aria-hidden="true"
            className="select-none center pointer-events-none absolute -bottom-[1px] left-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 md:w-[600px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, var(--spotlight-line) 50%, rgba(0, 0, 0, 0) 100%)",
            }}
          />
        </div>
      )}
    </section>
  )
}

export interface SpotSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string
  height?: string
  /** The color of the separator glow center. Supports presets ('zinc', 'blue', 'emerald', 'violet', 'rose') or any custom CSS color */
  color?: "zinc" | "blue" | "emerald" | "violet" | "rose" | string
}

const separatorColorMap = {
  zinc: {
    baseLight: "rgba(120, 120, 120, 0.25)",
    baseDark: "rgba(120, 120, 120, 0.35)",
    centerLight: "rgba(180, 180, 180, 0.5)",
    centerDark: "rgba(200, 200, 200, 0.65)",
    glossLight: "rgba(150, 150, 150, 0.3)",
    glossDark: "rgba(150, 150, 150, 0.4)",
  },
  blue: {
    baseLight: "rgba(59, 130, 246, 0.25)",
    baseDark: "rgba(59, 130, 246, 0.35)",
    centerLight: "rgba(59, 130, 246, 0.6)",
    centerDark: "rgba(59, 130, 246, 0.8)",
    glossLight: "rgba(147, 197, 253, 0.3)",
    glossDark: "rgba(147, 197, 253, 0.4)",
  },
  emerald: {
    baseLight: "rgba(16, 185, 129, 0.25)",
    baseDark: "rgba(16, 185, 129, 0.35)",
    centerLight: "rgba(16, 185, 129, 0.6)",
    centerDark: "rgba(16, 185, 129, 0.8)",
    glossLight: "rgba(110, 231, 183, 0.3)",
    glossDark: "rgba(110, 231, 183, 0.4)",
  },
  violet: {
    baseLight: "rgba(139, 92, 246, 0.25)",
    baseDark: "rgba(139, 92, 246, 0.35)",
    centerLight: "rgba(139, 92, 246, 0.6)",
    centerDark: "rgba(139, 92, 246, 0.8)",
    glossLight: "rgba(196, 181, 253, 0.3)",
    glossDark: "rgba(196, 181, 253, 0.4)",
  },
  rose: {
    baseLight: "rgba(244, 63, 94, 0.25)",
    baseDark: "rgba(244, 63, 94, 0.35)",
    centerLight: "rgba(244, 63, 94, 0.6)",
    centerDark: "rgba(244, 63, 94, 0.8)",
    glossLight: "rgba(252, 165, 165, 0.3)",
    glossDark: "rgba(252, 165, 165, 0.4)",
  },
}

export function SpotSeparator({
  width = "80%",
  height = "1px",
  color = "zinc",
  className,
  style,
  ...props
}: SpotSeparatorProps) {
  const isPreset = ["zinc", "blue", "emerald", "violet", "rose"].includes(color)

  const customBaseLight = `color-mix(in srgb, ${color} 25%, transparent)`
  const customBaseDark = `color-mix(in srgb, ${color} 35%, transparent)`
  const customCenterLight = `color-mix(in srgb, ${color} 60%, transparent)`
  const customCenterDark = `color-mix(in srgb, ${color} 80%, transparent)`
  const customGlossLight = `color-mix(in srgb, ${color} 30%, transparent)`
  const customGlossDark = `color-mix(in srgb, ${color} 40%, transparent)`

  const cssVariables = isPreset
    ? {
        "--separator-base-light": separatorColorMap[color as keyof typeof separatorColorMap].baseLight,
        "--separator-base-dark": separatorColorMap[color as keyof typeof separatorColorMap].baseDark,
        "--separator-center-light": separatorColorMap[color as keyof typeof separatorColorMap].centerLight,
        "--separator-center-dark": separatorColorMap[color as keyof typeof separatorColorMap].centerDark,
        "--separator-gloss-light": separatorColorMap[color as keyof typeof separatorColorMap].glossLight,
        "--separator-gloss-dark": separatorColorMap[color as keyof typeof separatorColorMap].glossDark,
      }
    : {
        "--separator-base-light": customBaseLight,
        "--separator-base-dark": customBaseDark,
        "--separator-center-light": customCenterLight,
        "--separator-center-dark": customCenterDark,
        "--separator-gloss-light": customGlossLight,
        "--separator-gloss-dark": customGlossDark,
      }

  return (
    <div
      className={cn(
        "relative mx-auto [--separator-base:var(--separator-base-light)] dark:[--separator-base:var(--separator-base-dark)] [--separator-center:var(--separator-center-light)] dark:[--separator-center:var(--separator-center-dark)] [--separator-gloss:var(--separator-gloss-light)] dark:[--separator-gloss:var(--separator-gloss-dark)] shadow-[0_1px_2px_rgba(0,0,0,0.15)]",
        className
      )}
      style={{
        width,
        height,
        background:
          "linear-gradient(90deg, transparent 0%, var(--separator-base) 20%, var(--separator-center) 50%, var(--separator-base) 80%, transparent 100%)",
        ...cssVariables,
        ...style,
      } as React.CSSProperties}
      {...props}
    >
      {/* Subtle center gloss effect */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-full opacity-40 blur-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--separator-gloss), transparent)",
        }}
      />
    </div>
  )
}
