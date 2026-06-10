"use client"

import * as React from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { cn } from "@/lib/utils"

interface BorderGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Edge sensitivity for the glow effect (default: 30) */
  edgeSensitivity?: number
  /** HSL values (space-separated, e.g. "40 80 80") for the outer glow */
  glowColor?: string
  /** Background color of the container (default: "#120F17") */
  backgroundColor?: string
  /** Border radius in pixels (default: 28) */
  borderRadius?: number
  /** Glow radius in pixels (default: 40) */
  glowRadius?: number
  /** Glow intensity multiplier (default: 1.0) */
  glowIntensity?: number
  /** Conic spread angle in degrees (default: 25) */
  coneSpread?: number
  /** Whether to play a sweep animation on mount (default: false) */
  animated?: boolean
  /** Colors list for the mesh gradient border (default: purple, pink, sky blue) */
  colors?: string[]
  /** Fill opacity for the mesh gradient inside (default: 0.5) */
  fillOpacity?: number
  /** Inner content of the card */
  children: React.ReactNode
}

function parseHSL(hslStr: string): { h: number; s: number; l: number } {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/)
  if (!match) return { h: 40, s: 80, l: 80 }
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) }
}

function buildBoxShadow(glowColor: string, intensity: number): string {
  const { h, s, l } = parseHSL(glowColor)
  const base = `${h}deg ${s}% ${l}%`
  const layers: [number, number, number, number, number, boolean][] = [
    [0, 0, 0, 1, 100, true],
    [0, 0, 1, 0, 60, true],
    [0, 0, 3, 0, 50, true],
    [0, 0, 6, 0, 40, true],
    [0, 0, 15, 0, 30, true],
    [0, 0, 25, 2, 20, true],
    [0, 0, 50, 2, 10, true],
    [0, 0, 1, 0, 60, false],
    [0, 0, 3, 0, 50, false],
    [0, 0, 6, 0, 40, false],
    [0, 0, 15, 0, 30, false],
    [0, 0, 25, 2, 20, false],
    [0, 0, 50, 2, 10, false],
  ]
  return layers
    .map(([x, y, blur, spread, alpha, inset]) => {
      const a = Math.min(alpha * intensity, 100)
      return `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px hsl(${base} / ${a}%)`
    })
    .join(", ")
}

const GRADIENT_POSITIONS = [
  "80% 55%",
  "69% 34%",
  "8% 6%",
  "41% 38%",
  "86% 85%",
  "82% 18%",
  "51% 4%",
]
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1]

function buildMeshGradients(colors: string[]): string[] {
  const gradients: string[] = []
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)]
    gradients.push(`radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`)
  }
  gradients.push(`linear-gradient(${colors[0]} 0 100%)`)
  return gradients
}

/**
 * BorderGlow — A premium card container featuring a dynamic, hover-sensitive conic mesh gradient
 * border and multi-layered glow shadows tracking the mouse pointer.
 *
 * @example
 * ```tsx
 * import { BorderGlow } from "@/components/kanso/border-glow"
 *
 * export default function Demo() {
 *   return (
 *     <BorderGlow animated glowColor="280 80 70">
 *       <div className="p-6">
 *         <h3 className="text-lg font-semibold text-white">Glow Card</h3>
 *         <p className="text-zinc-400">Hover or sweep on mount.</p>
 *       </div>
 *     </BorderGlow>
 *   )
 * }
 * ```
 */
function BorderGlow({
  children,
  className,
  edgeSensitivity = 30,
  glowColor = "40 80 80",
  backgroundColor = "#120F17",
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 25,
  animated = false,
  colors = ["#c084fc", "#f472b6", "#38bdf8"],
  fillOpacity = 0.5,
  ...props
}: BorderGlowProps) {
  const cardRef = React.useRef<HTMLDivElement>(null)

  // Framer Motion values for tracking cursor and proximity smoothly
  const mouseAngle = useMotionValue(45)
  const edgeProximity = useMotionValue(0)

  // Map values to opacities using linear scaling equations
  const colorSensitivity = edgeSensitivity + 20
  
  const borderOpacity = useTransform(edgeProximity, (v) => {
    const scale = v * 100
    if (scale <= colorSensitivity) return 0
    return Math.min(1, (scale - colorSensitivity) / (100 - colorSensitivity))
  })

  const glowOpacity = useTransform(edgeProximity, (v) => {
    const scale = v * 100
    if (scale <= edgeSensitivity) return 0
    return Math.min(1, (scale - edgeSensitivity) / (100 - edgeSensitivity))
  })

  const getCenterOfElement = React.useCallback((el: HTMLElement) => {
    const { width, height } = el.getBoundingClientRect()
    return [width / 2, height / 2]
  }, [])

  const getEdgeProximityValue = React.useCallback(
    (el: HTMLElement, x: number, y: number) => {
      const [cx, cy] = getCenterOfElement(el)
      const dx = x - cx
      const dy = y - cy
      let kx = Infinity
      let ky = Infinity
      if (dx !== 0) kx = cx / Math.abs(dx)
      if (dy !== 0) ky = cy / Math.abs(dy)
      return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1)
    },
    [getCenterOfElement]
  )

  const getCursorAngleValue = React.useCallback(
    (el: HTMLElement, x: number, y: number) => {
      const [cx, cy] = getCenterOfElement(el)
      const dx = x - cx
      const dy = y - cy
      if (dx === 0 && dy === 0) return 0
      const radians = Math.atan2(dy, dx)
      let degrees = radians * (180 / Math.PI) + 90
      if (degrees < 0) degrees += 360
      return degrees
    },
    [getCenterOfElement]
  )

  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const card = cardRef.current
      if (!card) return
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const proximity = getEdgeProximityValue(card, x, y)
      const angle = getCursorAngleValue(card, x, y)
      
      edgeProximity.set(proximity)
      mouseAngle.set(angle)
    },
    [getEdgeProximityValue, getCursorAngleValue, edgeProximity, mouseAngle]
  )

  const handlePointerEnter = React.useCallback(() => {
    // Smoothly animate hover in
    animate(edgeProximity, 1, { duration: 0.2, ease: "easeOut" })
  }, [edgeProximity])

  const handlePointerLeave = React.useCallback(() => {
    // Smoothly animate hover out
    animate(edgeProximity, 0, { duration: 0.5, ease: "easeInOut" })
  }, [edgeProximity])

  // Mount animation sweep logic
  React.useEffect(() => {
    if (!animated) return

    const angleStart = 110
    const angleEnd = 465

    // Initialize values
    mouseAngle.set(angleStart)
    edgeProximity.set(0)

    const proxAnim = animate(edgeProximity, 1, { duration: 0.6, ease: "easeOut" })
    
    const angleAnim = animate(mouseAngle, angleEnd, {
      duration: 3.5,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.1,
    })

    const endAnim = animate(edgeProximity, 0, {
      duration: 1.2,
      ease: "easeIn",
      delay: 2.8,
    })

    return () => {
      proxAnim.stop()
      angleAnim.stop()
      endAnim.stop()
    }
  }, [animated, mouseAngle, edgeProximity])

  const meshGradients = buildMeshGradients(colors)
  const borderBg = meshGradients.map((g) => `${g} border-box`)
  const fillBg = meshGradients.map((g) => `${g} padding-box`)

  // Dynamically map motion values to string CSS variables
  const angleDeg = useTransform(mouseAngle, (a) => `${a.toFixed(3)}deg`)

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={cn("relative grid isolate border border-white/10 overflow-hidden", className)}
      style={{
        background: backgroundColor,
        borderRadius: `${borderRadius}px`,
        transform: "translate3d(0, 0, 0.01px)",
        boxShadow:
          "rgba(0,0,0,0.15) 0 1px 2px, rgba(0,0,0,0.15) 0 2px 4px, rgba(0,0,0,0.15) 0 4px 8px, rgba(0,0,0,0.15) 0 8px 16px, rgba(0,0,0,0.15) 0 16px 32px",
      }}
      {...props}
    >
      {/* mesh gradient border */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] -z-[1] pointer-events-none"
        style={{
          border: "1px solid transparent",
          background: [
            `linear-gradient(${backgroundColor} 0 100%) padding-box`,
            "linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box",
            ...borderBg,
          ].join(", "),
          opacity: borderOpacity,
          maskImage: useTransform(
            angleDeg,
            (angle) =>
              `conic-gradient(from ${angle} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`
          ),
          WebkitMaskImage: useTransform(
            angleDeg,
            (angle) =>
              `conic-gradient(from ${angle} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`
          ),
        }}
      />

      {/* mesh gradient fill near edges */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] -z-[1] pointer-events-none"
        style={{
          border: "1px solid transparent",
          background: fillBg.join(", "),
          maskImage: useTransform(
            angleDeg,
            (angle) =>
              [
                "linear-gradient(to bottom, black, black)",
                "radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)",
                "radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)",
                "radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)",
                "radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)",
                "radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)",
                `conic-gradient(from ${angle} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
              ].join(", ")
          ),
          WebkitMaskImage: useTransform(
            angleDeg,
            (angle) =>
              [
                "linear-gradient(to bottom, black, black)",
                "radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)",
                "radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)",
                "radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)",
                "radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)",
                "radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)",
                `conic-gradient(from ${angle} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
              ].join(", ")
          ),
          maskComposite: "subtract, add, add, add, add, add",
          WebkitMaskComposite: "source-out, source-over, source-over, source-over, source-over, source-over",
          opacity: useTransform(borderOpacity, (v) => v * fillOpacity),
          mixBlendMode: "soft-light",
        } as unknown as React.CSSProperties}
      />

      {/* outer glow */}
      <motion.span
        className="absolute pointer-events-none z-[1] rounded-[inherit]"
        style={{
          inset: `${-glowRadius}px`,
          maskImage: useTransform(
            angleDeg,
            (angle) =>
              `conic-gradient(from ${angle} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`
          ),
          WebkitMaskImage: useTransform(
            angleDeg,
            (angle) =>
              `conic-gradient(from ${angle} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`
          ),
          opacity: glowOpacity,
          mixBlendMode: "plus-lighter",
        } as unknown as React.CSSProperties}
      >
        <span
          className="absolute rounded-[inherit]"
          style={{
            inset: `${glowRadius}px`,
            boxShadow: buildBoxShadow(glowColor, glowIntensity),
          }}
        />
      </motion.span>

      {/* Children Wrapper */}
      <div className="flex flex-col relative overflow-hidden z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}

export { BorderGlow }
export type { BorderGlowProps }
