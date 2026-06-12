"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface HalftoneGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The spacing between dots in pixels */
  dotSpacing?: number
  /** The base radius of the dots when mouse is far away */
  baseRadius?: number
  /** The maximum radius of dots when mouse is hovering directly on them */
  maxRadius?: number
  /** The radius of mouse influence in pixels */
  hoverRadius?: number
  /** The dot color. If 'currentColor', it uses the text color of the parent. */
  dotColor?: string
  /** The background color. Default is transparent. */
  paperColor?: string
  /** Enable mouse hover scaling effect */
  interactive?: boolean
  /** Render children content above the grid background */
  children?: React.ReactNode
}

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (value: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value)
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}

const HalftoneGrid = React.forwardRef<HTMLDivElement, HalftoneGridProps>(
  (
    {
      dotSpacing = 24,
      baseRadius = 1.2,
      maxRadius = 5,
      hoverRadius = 120,
      dotColor = "currentColor",
      paperColor = "transparent",
      interactive = true,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const mouseRef = React.useRef({ x: -1000, y: -1000, active: false })
    const animationFrameId = React.useRef<number | null>(null)

    // Draw grid of dots
    const draw = React.useCallback(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const width = canvas.width
      const height = canvas.height

      // Read computed text color if using currentColor
      let resolvedDotColor = dotColor
      if (dotColor === "currentColor") {
        const computedStyle = window.getComputedStyle(canvas)
        resolvedDotColor = computedStyle.color || "rgba(0, 0, 0, 0.15)"
      }

      ctx.clearRect(0, 0, width, height)
      if (paperColor !== "transparent") {
        ctx.fillStyle = paperColor
        ctx.fillRect(0, 0, width, height)
      }

      ctx.fillStyle = resolvedDotColor
      const mouse = mouseRef.current

      for (let y = dotSpacing / 2; y < height; y += dotSpacing) {
        for (let x = dotSpacing / 2; x < width; x += dotSpacing) {
          let radius = baseRadius

          if (interactive && mouse.active) {
            const dx = mouse.x - x
            const dy = mouse.y - y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < hoverRadius) {
              const influence = 1.0 - distance / hoverRadius
              // Smooth easing curve
              const easeInfluence = Math.sin(influence * (Math.PI / 2))
              radius = baseRadius + (maxRadius - baseRadius) * easeInfluence
            }
          }

          if (radius > 0.1) {
            ctx.beginPath()
            ctx.arc(x, y, radius, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }
    }, [dotSpacing, baseRadius, maxRadius, hoverRadius, dotColor, paperColor, interactive])

    // Smooth animation loop
    const loop = React.useCallback(() => {
      draw()
      if (interactive && mouseRef.current.active) {
        animationFrameId.current = requestAnimationFrame(loop)
      }
    }, [draw, interactive])

    // Handle Resize
    React.useEffect(() => {
      const canvas = canvasRef.current
      const container = containerRef.current
      if (!canvas || !container) return

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect
          if (width > 0 && height > 0) {
            const dpr = window.devicePixelRatio || 1
            canvas.width = width * dpr
            canvas.height = height * dpr
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`

            const ctx = canvas.getContext("2d")
            if (ctx) {
              ctx.scale(dpr, dpr)
            }
            draw()
          }
        }
      })

      resizeObserver.observe(container)
      return () => {
        resizeObserver.disconnect()
      }
    }, [draw])

    // Mouse events
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || !canvasRef.current) return

      const rect = canvasRef.current.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      }

      if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(loop)
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
        animationFrameId.current = null
      }
      draw()
    }

    return (
      <div
        ref={mergeRefs(ref, containerRef)}
        className={cn("relative w-full h-full min-h-[100px]", className)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full pointer-events-none"
        />
        {/* Render children content on top of background */}
        <div className="relative z-10 w-full h-full">{children}</div>
      </div>
    )
  }
)

HalftoneGrid.displayName = "HalftoneGrid"

export { HalftoneGrid }
