"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  /** Strength of the magnetic pull effect (default: 0.3) */
  magneticStrength?: number
  /** Children to render inside the button */
  children: React.ReactNode
  /** Additional CSS classes */
  className?: string
  /** Disabled state */
  disabled?: boolean
  /** Click handler */
  onClick?: () => void
}

/**
 * MagneticButton — A button that magnetically follows the cursor on hover.
 *
 * Uses Framer Motion spring physics for smooth, natural movement.
 * The button subtly shifts toward the cursor when hovered, creating
 * an engaging micro-interaction consistent with Kanso's minimal aesthetic.
 *
 * @example
 * ```tsx
 * import { MagneticButton } from "@/components/kanso/magnetic-button"
 *
 * export default function Demo() {
 *   return (
 *     <MagneticButton>
 *       Hover me
 *     </MagneticButton>
 *   )
 * }
 * ```
 */
function MagneticButton({
  children,
  className,
  magneticStrength = 0.3,
  disabled,
  onClick,
}: MagneticButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 })
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 })

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      x.set((e.clientX - centerX) * magneticStrength)
      y.set((e.clientY - centerY) * magneticStrength)
    },
    [magneticStrength, x, y]
  )

  const handleMouseLeave = React.useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100",
        className
      )}
    >
      {children}
    </motion.button>
  )
}

export { MagneticButton }
export type { MagneticButtonProps }

