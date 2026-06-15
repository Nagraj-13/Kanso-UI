"use client"

import * as React from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  MotionValue,
} from "framer-motion"
import { cn } from "@/lib/utils"

// Isomorphic Layout Effect
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect

// Media Query Hook for responsive design
function useMediaQuery(query: string, defaultValue = false): boolean {
  const [matches, setMatches] = React.useState(defaultValue)

  useIsomorphicLayoutEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = () => setMatches(media.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}

export interface ThreeDPhotoCarouselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "onTransitionEnd"> {
  /** Array of image URLs. If omitted, uses curated aesthetic anime/cyberpunk images. */
  images?: string[]
  /** Cylinder width multiplier scale factor (default: 1.0). Controls column distance from center. */
  spacing?: number
  /** Border radius of the cards (default: "12px"). Supports any CSS unit (px, rem, %). */
  borderRadius?: string
  /** Cylinder width at full desktop viewport (default: 1800) */
  cylinderWidth?: number
  /** Height of the carousel viewport (default: "500px") */
  height?: string | number
  /** Auto rotation speed (degrees per frame, e.g. 0.05). Use 0 to disable (default: 0). */
  autoRotationSpeed?: number
  /** Hide the overlay caption UI in the enlarged modal (default: false) */
  hideOverlayUI?: boolean
}

const DEFAULT_AESTHETIC_IMAGES = [
  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600&h=800", // Cinematic anime cyberpunk
  "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=600&h=800", // Cozy art room scene
  "https://images.unsplash.com/photo-1541562232579-512a21360020?auto=format&fit=crop&q=80&w=600&h=800", // Japan street shrine vibes
  "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=600&h=800", // Tokyo neon cityscape
  "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&q=80&w=600&h=800", // Japan Torii gate night
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600&h=800", // Misty castle fantasy landscape
  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600&h=800", // Retro vaporwave game room
  "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=600&h=800", // Vaporwave art illustration
  "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=600&h=800", // Cozy anime library layout
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600&h=800", // Cyberpunk neon alleyway
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600&h=800", // Starry galaxy space sky
  "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?auto=format&fit=crop&q=80&w=600&h=800", // Cherry blossom illustration
]

const transition = {
  duration: 0.15,
  ease: [0.32, 0.72, 0, 1] as const,
}

const transitionOverlay = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1] as const,
}

type CarouselControls = ReturnType<typeof useAnimation>

const Carousel = React.memo(
  ({
    handleClick,
    controls,
    cards,
    isCarouselActive,
    spacing,
    borderRadius,
    cylinderWidthDesktop,
    autoRotationSpeed,
    rotation,
  }: {
    handleClick: (imgUrl: string, index: number) => void
    controls: CarouselControls
    cards: string[]
    isCarouselActive: boolean
    spacing: number
    borderRadius: string
    cylinderWidthDesktop: number
    autoRotationSpeed: number
    rotation: MotionValue<number>
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = (isScreenSizeSm ? cylinderWidthDesktop * 0.6 : cylinderWidthDesktop)
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = (cylinderWidth / (2 * Math.PI)) * spacing
    
    const isDragging = React.useRef(false)

    const transform = useTransform(
      rotation,
      (value: number) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    // Auto-rotation engine
    React.useEffect(() => {
      if (autoRotationSpeed === 0 || !isCarouselActive) return

      let lastTime = performance.now()
      let frameId: number

      const tick = (time: number) => {
        const delta = time - lastTime
        lastTime = time

        if (!isDragging.current) {
          // Normalize rotation based on delta time to keep it smooth across devices
          rotation.set(rotation.get() - autoRotationSpeed * (delta * 0.06))
        }

        frameId = requestAnimationFrame(tick)
      }

      frameId = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(frameId)
    }, [autoRotationSpeed, isCarouselActive, rotation])

    return (
      <div
        className="flex h-full items-center justify-center bg-transparent"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing shrink-0"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDragStart={() => {
            isDragging.current = true
          }}
          onDrag={(_, info) => {
            if (isCarouselActive) {
              rotation.set(rotation.get() + info.offset.x * 0.05)
            }
          }}
          onDragEnd={(_, info) => {
            isDragging.current = false
            if (isCarouselActive) {
              controls.start({
                rotateY: rotation.get() + info.velocity.x * 0.05,
                transition: {
                  type: "spring" as const,
                  stiffness: 100,
                  damping: 30,
                  mass: 0.1,
                },
              })
            }
          }}
          animate={controls}
        >
          {cards.map((imgUrl, i) => (
            <motion.div
              key={`key-${imgUrl}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center"
              style={{
                width: `${faceWidth}px`,
                borderRadius,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(imgUrl, i)}
            >
              <motion.img
                src={imgUrl}
                alt={`gallery_item_${i}`}
                layoutId={`img-${imgUrl}`}
                className="pointer-events-none w-full object-cover aspect-square shadow-lg select-none"
                style={{ borderRadius }}
                initial={{ filter: "blur(4px)" }}
                layout="position"
                animate={{ filter: "blur(0px)" }}
                transition={transition}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

Carousel.displayName = "Carousel"

export function ThreeDPhotoCarousel({
  images = DEFAULT_AESTHETIC_IMAGES,
  spacing = 1.0,
  borderRadius = "12px",
  cylinderWidth = 1800,
  height = "500px",
  autoRotationSpeed = 0,
  hideOverlayUI = false,
  className,
  ...props
}: ThreeDPhotoCarouselProps) {
  const [activeImg, setActiveImg] = React.useState<string | null>(null)
  const [isCarouselActive, setIsCarouselActive] = React.useState(true)
  const controls = useAnimation()
  const rotation = useMotionValue(0)

  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleClick = (imgUrl: string) => {
    setActiveImg(imgUrl)
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = React.useCallback(() => {
    setActiveImg(null)
    setIsCarouselActive(true)
  }, [])

  // Keyboard navigation support
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImg) {
        if (e.key === "Escape") {
          handleClose()
        }
      } else {
        const container = containerRef.current
        const isActive = document.activeElement === container || container?.contains(document.activeElement)
        
        if (isActive) {
          if (e.key === "ArrowLeft") {
            e.preventDefault()
            rotation.set(rotation.get() + 15)
          } else if (e.key === "ArrowRight") {
            e.preventDefault()
            rotation.set(rotation.get() - 15)
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeImg, handleClose, rotation])

  return (
    <motion.div
      ref={containerRef}
      tabIndex={0}
      layout
      className={cn(
        "relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-700 rounded-2xl select-none bg-zinc-950/5 dark:bg-zinc-950/40",
        className
      )}
      style={{ height, ...props.style }}
      {...props}
    >
      <AnimatePresence mode="sync">
        {activeImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layoutId={`img-container-${activeImg}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center z-50 p-4 md:p-16 lg:p-24"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
          >
            <div className="relative max-w-full max-h-full flex items-center justify-center p-2">
              <motion.img
                layoutId={`img-${activeImg}`}
                src={activeImg}
                className="max-w-[90vw] max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/10"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.1,
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{
                  willChange: "transform",
                }}
              />
              {!hideOverlayUI && (
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 z-50 text-white/70 text-xs tracking-wider bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 pointer-events-none uppercase">
                  Press ESC or click outside to dismiss
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="relative w-full h-full overflow-hidden"
      >
        <Carousel
          handleClick={handleClick}
          controls={controls}
          cards={images}
          isCarouselActive={isCarouselActive}
          spacing={spacing}
          borderRadius={borderRadius}
          cylinderWidthDesktop={cylinderWidth}
          autoRotationSpeed={autoRotationSpeed}
          rotation={rotation}
        />

        {/* Shadow/Reflect ambient depth enhancer */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-zinc-100/10 via-zinc-100/5 to-transparent dark:from-zinc-950/20 dark:via-zinc-950/5" />
      </div>
    </motion.div>
  )
}
