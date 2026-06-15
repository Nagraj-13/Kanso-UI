"use client"

import * as React from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import gsap from "gsap"

export interface ThreeDMasonryOrbitProps extends React.HTMLAttributes<HTMLDivElement> {
  /** List of image URLs. If omitted, uses a curated list of anime/aesthetic images. */
  images?: string[]
  /** Number of columns around the circle (default: 14) */
  columns?: number
  /** Number of vertical tiers (default: 3) */
  rows?: number
  /** Orbit radius (default: 16) */
  radius?: number
  /** Base auto-rotation speed (default: 0.002) */
  autoRotationSpeed?: number
  /** Fog color (default: '#09090b') */
  fogColor?: string
  /** Fog density (default: 0.025) */
  fogDensity?: number
  /** Height of the viewport/canvas container (default: '100vh') */
  height?: string | number
  /** Hide UI overlay (title and description) (default: false) */
  hideUI?: boolean
  /** Custom title for UI overlay (default: 'Gallery') */
  titleText?: string
  /** Custom description for UI overlay (default: 'Drag to explore • Hover to focus') */
  descText?: string
  /** Card border radius in 3D world units (default: 0.15) */
  borderRadius?: number
  /** Column width/spacing multiplier factor (default: 1.0) */
  columnSpacing?: number
}

const DEFAULT_ANIME_AESTHETIC_IMAGES = [
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

export function ThreeDMasonryOrbit({
  images = DEFAULT_ANIME_AESTHETIC_IMAGES,
  columns = 14,
  rows = 3,
  radius = 16,
  borderRadius = 0.15,
  columnSpacing = 1.0,
  autoRotationSpeed = 0.002,
  fogColor = "#09090b",
  fogDensity = 0.025,
  height = "100vh",
  hideUI = false,
  titleText = "Gallery",
  descText = "Drag to explore • Hover to focus",
  className,
  ...props
}: ThreeDMasonryOrbitProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [loadedCount, setLoadedCount] = React.useState(0)
  const totalCount = columns * rows

  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(handle)
  }, [])

  const currentTheme = mounted ? resolvedTheme : "dark"
  const isDark = currentTheme === "dark"
  const defaultFogColor = isDark ? "#09090b" : "#fafafa"
  const activeFogColor = fogColor === "#09090b" ? defaultFogColor : fogColor

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Track active animations/elements to dispose cleanly
    let animationFrameId: number
    const geometriesToDispose: THREE.BufferGeometry[] = []
    const materialsToDispose: THREE.Material[] = []
    const texturesToDispose: THREE.Texture[] = []

    // --- 1. Scene Setup ---
    const scene = new THREE.Scene()
    // Parse hex colors safely for ThreeJS fog
    const resolvedFogColor = new THREE.Color(activeFogColor)
    scene.fog = new THREE.FogExp2(resolvedFogColor.getHex(), fogDensity)

    const startWidth = container.clientWidth || window.innerWidth
    const startHeight = container.clientHeight || window.innerHeight

    const camera = new THREE.PerspectiveCamera(45, startWidth / startHeight, 0.1, 1000)
    camera.position.set(0, 0, 35)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(startWidth, startHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // --- 2. Controls ---
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enablePan = false
    controls.minDistance = 10
    controls.maxDistance = 60

    const ringGroup = new THREE.Group()
    scene.add(ringGroup)

    // --- 3. Structured Masonry Grid ---
    const meshes: THREE.Mesh[] = []
    const textureLoader = new THREE.TextureLoader()

    let itemsLoaded = 0

    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        // Stagger spacing
        const isEvenColumn = i % 2 === 0
        const masonryOffset = isEvenColumn ? 0 : 2.5
        const angle = (i / columns) * Math.PI * 2
        const yPos = (j - 1) * 5.2 + masonryOffset

        const planeWidth = 3.8 * columnSpacing
        const planeHeight = 3.5 + Math.random() * 1.5
        const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight)
        geometriesToDispose.push(geometry)

        const material = new THREE.ShaderMaterial({
          uniforms: {
            uTexture: { value: null },
            uSize: { value: new THREE.Vector2(planeWidth, planeHeight) },
            uBorderRadius: { value: borderRadius },
            uOpacity: { value: 0.9 },
            uColor: { value: new THREE.Color(isDark ? 0x18181b : 0xe4e4e7) },
            uHasTexture: { value: 0.0 }
          },
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D uTexture;
            uniform vec2 uSize;
            uniform float uBorderRadius;
            uniform float uOpacity;
            uniform vec3 uColor;
            uniform float uHasTexture;
            varying vec2 vUv;

            void main() {
              vec2 uv = (vUv - 0.5) * uSize;
              vec2 halfSize = uSize * 0.5;
              
              // Rounded box SDF
              vec2 d = abs(uv) - halfSize + vec2(uBorderRadius);
              float outside = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - uBorderRadius;
              
              if (outside > 0.0) {
                discard;
              }
              
              vec4 color = vec4(uColor, 1.0);
              if (uHasTexture > 0.5) {
                color = texture2D(uTexture, vUv);
              }
              
              gl_FragColor = vec4(color.rgb, color.a * uOpacity);
            }
          `,
          side: THREE.DoubleSide,
          transparent: true,
        })
        materialsToDispose.push(material)

        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.x = Math.cos(angle) * radius
        mesh.position.y = yPos
        mesh.position.z = Math.sin(angle) * radius

        mesh.lookAt(0, yPos, 0)
        mesh.rotateY(Math.PI)

        mesh.userData = {
          baseScale: new THREE.Vector3(1, 1, 1),
          hoverScale: new THREE.Vector3(1.15, 1.15, 1.15),
          baseX: mesh.position.x,
          baseZ: mesh.position.z,
          angle: angle,
        }

        ringGroup.add(mesh)
        meshes.push(mesh)

        // Load image
        const imgIndex = (i * rows + j) % images.length
        const imageUrl = images[imgIndex]

        textureLoader.load(
          imageUrl,
          (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace
            texturesToDispose.push(texture)
            material.uniforms.uTexture.value = texture
            material.uniforms.uHasTexture.value = 1.0
            material.uniforms.uColor.value.setHex(0xffffff)
            material.needsUpdate = true
            
            itemsLoaded++
            setLoadedCount(itemsLoaded)
          },
          undefined,
          (err) => {
            console.error("Failed to load texture:", imageUrl, err)
            // Still count as loaded to dismiss loading screen on failures
            itemsLoaded++
            setLoadedCount(itemsLoaded)
          }
        )
      }
    }

    // --- 4. Interactions (Raycasting) ---
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    let hoveredMesh: THREE.Object3D | null = null
    let currentRotationSpeed = autoRotationSpeed

    const handlePointerMove = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    }

    window.addEventListener("pointermove", handlePointerMove)

    // --- 5. Animation Loop ---
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      raycaster.setFromCamera(pointer, camera)
      const intersects = raycaster.intersectObjects(meshes)

      if (intersects.length > 0) {
        if (hoveredMesh !== intersects[0].object) {
          hoveredMesh = intersects[0].object
          container.style.cursor = "pointer"
          currentRotationSpeed = autoRotationSpeed * 0.25 // Slow down rotation on hover
        }
      } else {
        hoveredMesh = null
        container.style.cursor = "default"
        currentRotationSpeed = THREE.MathUtils.lerp(currentRotationSpeed, autoRotationSpeed, 0.05)
      }

      meshes.forEach((mesh) => {
        const uData = mesh.userData
        const mat = mesh.material as THREE.ShaderMaterial

        if (mesh === hoveredMesh) {
          mesh.scale.lerp(uData.hoverScale, 0.1)
          const popRadius = radius + 1.5
          const targetX = Math.cos(uData.angle) * popRadius
          const targetZ = Math.sin(uData.angle) * popRadius
          mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, targetX, 0.1)
          mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, targetZ, 0.1)
          mat.uniforms.uOpacity.value = THREE.MathUtils.lerp(mat.uniforms.uOpacity.value, 1.0, 0.1)
        } else {
          mesh.scale.lerp(uData.baseScale, 0.1)
          const targetX = Math.cos(uData.angle) * radius
          const targetZ = Math.sin(uData.angle) * radius
          mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, targetX, 0.1)
          mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, targetZ, 0.1)
          const targetOpacity = hoveredMesh ? 0.4 : 0.9
          mat.uniforms.uOpacity.value = THREE.MathUtils.lerp(mat.uniforms.uOpacity.value, targetOpacity, 0.1)
        }
      })

      ringGroup.rotation.y -= currentRotationSpeed

      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // --- 6. Responsiveness ---
    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup Logic
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("resize", handleResize)

      controls.dispose()

      geometriesToDispose.forEach((g) => g.dispose())
      materialsToDispose.forEach((m) => m.dispose())
      texturesToDispose.forEach((t) => t.dispose())

      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [images, columns, rows, radius, borderRadius, columnSpacing, autoRotationSpeed, activeFogColor, fogDensity, isDark])

  const isLoadingCompleted = loadedCount >= totalCount

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden select-none bg-zinc-50 dark:bg-[#09090b]", className)}
      style={{ height }}
      {...props}
    >
      {/* Loader UI */}
      {!isLoadingCompleted && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-50 dark:bg-[#09090b] text-zinc-800 dark:text-white">
          <div className="text-sm font-semibold tracking-[0.2em] animate-pulse">
            LOADING ASSETS... ({loadedCount}/{totalCount})
          </div>
        </div>
      )}

      {/* Overlay UI */}
      {!hideUI && (
        <div className="absolute bottom-10 left-0 right-0 z-10 pointer-events-none flex flex-col items-center gap-2 text-center text-zinc-500/80 dark:text-white/60">
          <h2 className="m-0 text-sm font-medium tracking-[0.3em] uppercase text-zinc-855 dark:text-white">
            {titleText}
          </h2>
          <p className="m-0 text-xs tracking-wider">
            {descText}
          </p>
        </div>
      )}
    </div>
  )
}

// ==========================================
// VARIATION: CurvedRingArchive (GSAP/DOM)
// ==========================================

const DEFAULT_PROJECTS = [
  { title: "Contemplative Solitude", category: "Portrait", year: "2025", client: "Atlas Studio", desc: "A quiet study in stillness — soft window light and the unhurried grace of being alone.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600&h=800" },
  { title: "Dynamic Basketball", category: "Sports", year: "2025", client: "Court Co.", desc: "Peak athleticism frozen mid-air — explosive vertical leap and raw competitive energy.", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=600&h=800" },
  { title: "Minimalist Interior", category: "Architecture", year: "2026", client: "Form Atelier", desc: "Restrained material palette and sculptural negative space, every line intentional.", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600&h=800" },
  { title: "Rustic Charm Café", category: "Editorial", year: "2023", client: "Lyon Press", desc: "Weathered wood, warm ceramics, and the slow ritual of a European morning coffee.", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600&h=800" },
  { title: "Serene Beachcomber", category: "Travel", year: "2025", client: "Tideline", desc: "Bare feet on cool sand at first light — a solitary walk along the tide.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600&h=800" },
  { title: "Grassland Portrait", category: "Portrait", year: "2025", client: "Field Notes", desc: "Wind-swept grasses frame a quiet figure under an open, endless sky.", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600&h=800" },
  { title: "Warm Glow", category: "Portrait", year: "2024", client: "Atlas Studio", desc: "A silhouette wrapped in amber light — intimacy rendered in shadow and warmth.", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600&h=800" },
  { title: "Tennis Action", category: "Sports", year: "2025", client: "Court Co.", desc: "The split-second of contact — tension, focus, and explosive precision.", image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=600&h=800" },
]

const SEGMENTS = 4 // vertical strips per tile
const INTRO_START_RADIUS = 250

type CurvedRingSettings = {
  perRow: number
  rows: number
  ringSize: number
  rowSpacing: number
  stack: number
  tileScale: number
  bend: number
}

// --- MATH ---
const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max)
const mapRange = (v: number, inMin: number, inMax: number, outMin: number, outMax: number) =>
  outMin + ((v - inMin) / (inMax - inMin)) * (outMax - outMin)

const nearestRotation = (current: number, target: number) =>
  target + Math.round((current - target) / 360) * 360

const EXPAND_CONTAINER_MAX = 1500
const EXPAND_PANEL_W = 420
const EXPAND_GAP = 40

type HeroRect = { x: number; y: number; w: number; h: number }

function computeHeroRect(
  rootRect: DOMRect,
  aspect: number,
  isMobile: boolean
): HeroRect {
  const pad = isMobile ? 20 : 32
  const containerW = Math.min(rootRect.width - pad * 2, EXPAND_CONTAINER_MAX)
  const containerX = (rootRect.width - containerW) / 2

  if (isMobile) {
    const w = containerW
    const h = Math.min(w / aspect, (rootRect.height - pad * 2) * 0.4)
    return { x: containerX, y: pad, w, h }
  }

  const heroMaxW = containerW - EXPAND_PANEL_W - EXPAND_GAP
  const heroMaxH = rootRect.height - pad * 2
  let w = heroMaxW
  let h = w / aspect
  if (h > heroMaxH) {
    h = heroMaxH
    w = h * aspect
  }
  return {
    x: containerX,
    y: (rootRect.height - h) / 2,
    w,
    h,
  }
}

const prng = (seed: number) => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

type Tile = {
  key: string
  project: (typeof DEFAULT_PROJECTS)[number]
  projectIndex: number
  angle: number
  rowY: number
  radius: number
  width: number
  height: number
  bend: number
  focalX: number
  focalY: number
}

function buildTiles(s: CurvedRingSettings, projects: typeof DEFAULT_PROJECTS): { tiles: Tile[]; anglePer: number } {
  const anglePer = 360 / s.perRow

  const tiles: Tile[] = []
  let n = 0
  for (let r = 0; r < s.rows; r++) {
    for (let c = 0; c < s.perRow; c++) {
      const seed = n + 1
      const width = Math.round((160 + prng(seed * 1.7) * 150) * s.tileScale)
      const ratio = 0.6 + prng(seed * 2.3) * 0.85
      const height = Math.round(width * ratio)
      const angle =
        c * anglePer +
        (r % 2) * (anglePer / 2) +
        (prng(seed * 3.1) - 0.5) * anglePer * 0.55
      const rowY =
        (r - (s.rows - 1) / 2) * s.rowSpacing + (prng(seed * 4.9) - 0.5) * 120
      const radius = s.ringSize + (prng(seed * 5.7) - 0.5) * s.stack
      let projectIndex = Math.floor(prng(seed * 8.31 + r * 17.3 + c * 3.77) * projects.length)
      if (n > 0 && projectIndex === tiles[n - 1]?.projectIndex) {
        projectIndex = (projectIndex + 1 + Math.floor(prng(seed * 2.17) * (projects.length - 1))) % projects.length
      }
      const focalX = prng(seed * 6.21)
      const focalY = prng(seed * 7.43)
      const arcDeg = (width / radius) * (180 / Math.PI)
      const bend = arcDeg * (s.bend / anglePer)
      tiles.push({
        key: `t-${r}-${c}`,
        project: projects[projectIndex],
        projectIndex,
        angle,
        rowY,
        radius,
        width,
        height,
        bend,
        focalX,
        focalY,
      })
      n++
    }
  }
  return { tiles, anglePer }
}

function CurvedSurface({
  width,
  height,
  image,
  bend,
  focalX,
  focalY,
  lit,
}: {
  width: number
  height: number
  image: string
  bend: number
  focalX: number
  focalY: number
  lit: boolean
}) {
  const segAngle = bend / SEGMENTS
  const segW = width / SEGMENTS
  const radius = segW / 2 / Math.tan((segAngle * Math.PI) / 180 / 2)
  const mid = (SEGMENTS - 1) / 2
  const objPos = `${Math.round(focalX * 100)}% ${Math.round(focalY * 100)}%`

  return (
    <div
      className="absolute inset-0"
      style={{ transformStyle: "preserve-3d", transform: `translateZ(${-radius}px)` }}
    >
      {Array.from({ length: SEGMENTS }).map((_, i) => {
        const angle = (i - mid) * segAngle
        return (
          <div
            key={i}
            className="absolute top-0 overflow-hidden"
            style={{
              left: "50%",
              width: segW + 0.5,
              height,
              marginLeft: -(segW + 0.5) / 2,
              transformOrigin: "center center",
              transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
              backfaceVisibility: "visible",
            }}
          >
            <img
              data-curve-seg
              src={image}
              alt=""
              draggable={false}
              decoding="async"
              style={{
                width,
                height,
                maxWidth: "none",
                objectFit: "cover",
                objectPosition: objPos,
                marginLeft: -i * segW,
                display: "block",
                ...(lit ? { opacity: 1 } : {}),
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

type CurvedPhase = "loader" | "intro" | "ready"

function RingLoader({
  onComplete,
  stroke,
  bg,
}: {
  onComplete: () => void
  stroke: string
  bg: string
}) {
  const cylRef = React.useRef<HTMLDivElement>(null)
  const PANELS = 18
  const RADIUS = 74

  React.useLayoutEffect(() => {
    let finished = false
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-loader-stroke]")
      gsap.set(cylRef.current, { rotationY: 0, scaleX: 1.45, scaleZ: 1.45 })
      gsap.to(cylRef.current, {
        rotationY: 360,
        scaleX: 1,
        scaleZ: 1,
        duration: 2.4,
        ease: "power2.inOut",
      })
      gsap.fromTo(
        panels,
        { borderWidth: 7, opacity: 1 },
        {
          borderWidth: 0,
          opacity: 0.12,
          duration: 2.4,
          ease: "power2.inOut",
          stagger: { each: 0.035, from: "center" },
        }
      )
      gsap.delayedCall(2.55, () => {
        if (finished) return
        finished = true
        onComplete()
      })
    })
    return () => {
      finished = true
      ctx.revert()
    }
  }, [onComplete])

  return (
    <div
      className="absolute inset-0 z-[60] flex items-center justify-center"
      style={{ backgroundColor: bg }}
    >
      <div
        className="flex items-center justify-center"
        style={{ perspective: 720, width: 220, height: 220 }}
      >
        <div
          ref={cylRef}
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d", transform: "rotateX(-14deg)" }}
        >
          {Array.from({ length: PANELS }).map((_, i) => {
            const angle = (360 / PANELS) * i
            return (
              <div
                key={i}
                data-loader-stroke
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 50,
                  height: 104,
                  marginLeft: -25,
                  marginTop: -52,
                  border: `7px solid ${stroke}`,
                  borderRadius: 3,
                  boxSizing: "border-box",
                  background: "transparent",
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                  transformStyle: "preserve-3d",
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

const surfaceTokens = (theme: "light" | "dark") => {
  const isDark = theme === "dark"
  return {
    bg: isDark ? "#09090b" : "#fafafa",
    text: isDark ? "#ffffff" : "#09090b",
    textSecondary: isDark ? "#a1a1aa" : "#71717a",
    textMuted: isDark ? "#71717a" : "#a1a1aa",
    surface: isDark ? "#18181b" : "#f4f4f5",
    border: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
  }
}

// Accent hex resolver is omitted in favor of Kanso UI's neutral/minimalist palette.

export interface CurvedRingArchiveProps extends React.HTMLAttributes<HTMLDivElement> {
  projects?: {
    title: string
    category: string
    year: string
    client: string
    desc: string
    image: string
  }[]
  perRow?: number
  rows?: number
  ringSize?: number
  rowSpacing?: number
  stack?: number
  tileScale?: number
  bend?: number
  perspective?: number
  tilt?: number
  zoom?: number
  height?: string | number
  embedded?: boolean
}

// --- COMPONENT ---
export function CurvedRingArchive({
  projects = DEFAULT_PROJECTS,
  perRow = 22,
  rows = 2,
  ringSize = 850,
  rowSpacing = 168,
  stack = 260,
  tileScale = 1,
  bend = 18,
  perspective = 2200,
  tilt = -15,
  zoom = 0.55,
  height = "100vh",
  embedded = false,
  className,
  ...props
}: CurvedRingArchiveProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(handle)
  }, [])

  const activeTheme = (mounted ? resolvedTheme as "light" | "dark" : "dark") || "dark"
  const t = surfaceTokens(activeTheme)
  const isDark = activeTheme === "dark"

  const settings = React.useMemo(() => ({
    perRow,
    rows,
    ringSize,
    rowSpacing,
    stack,
    tileScale,
    bend,
  }), [perRow, rows, ringSize, rowSpacing, stack, tileScale, bend])

  const { tiles } = React.useMemo(
    () => buildTiles(settings, projects),
    [settings, projects]
  )

  const rootRef = React.useRef<HTMLDivElement>(null)
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const ringRef = React.useRef<HTMLDivElement>(null)
  const cardsRef = React.useRef<(HTMLButtonElement | null)[]>([])
  const heroRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const detailPanelRef = React.useRef<HTMLDivElement>(null)

  const [active, setActive] = React.useState<{
    project: (typeof projects)[number]
    tileIndex: number
  } | null>(null)
  const [phase, setPhase] = React.useState<CurvedPhase>("loader")
  const introLit = phase === "ready"
  const loaderStroke = isDark ? "#F2F2F2" : "#1C1C1C"

  const physics = React.useRef({
    rotation: -360,
    targetRotation: -360,
    velocity: 0,
    tilt: tilt,
    targetTilt: tilt,
    velocityTilt: 0,
    isDown: false,
    lastX: 0,
    lastY: 0,
    dim: 0,
    introRadiusMul: INTRO_START_RADIUS / ringSize,
    introRadiusBaked: false,
  })

  const expandTl = React.useRef<gsap.core.Timeline | null>(null)
  const expandMetaRef = React.useRef<{
    card: HTMLButtonElement
    hero: HTMLDivElement
  } | null>(null)
  const closingRef = React.useRef(false)
  const introTweens = React.useRef<{ rot?: gsap.core.Tween }>({})
  const introFinishedRef = React.useRef(false)
  const activeRef = React.useRef(active)

  React.useEffect(() => {
    activeRef.current = active
  }, [active])

  const resetExpandCard = () => {
    const meta = expandMetaRef.current
    if (!meta) return
    gsap.set(meta.hero, { clearProps: "all" })
    meta.hero.style.opacity = "0"
    meta.card.style.zIndex = ""
    meta.card.style.opacity = "1"
    meta.card.style.filter = "none"
    expandMetaRef.current = null
  }

  const interruptIntroRotation = () => {
    introTweens.current.rot?.kill()
    introTweens.current.rot = undefined
  }

  React.useEffect(() => {
    physics.current.targetTilt = tilt
  }, [tilt])

  React.useEffect(() => {
    cardsRef.current.length = tiles.length
  }, [tiles])

  React.useEffect(() => {
    if (!physics.current.introRadiusBaked) return
    cardsRef.current.forEach((card, i) => {
      const tile = tiles[i]
      if (!card || !tile) return
      card.style.transform = `rotateY(${tile.angle}deg) translateZ(${tile.radius}px) translateY(${tile.rowY}px)`
    })
  }, [tiles])

  React.useLayoutEffect(() => {
    if (phase !== "intro") return

    introFinishedRef.current = false
    const p = physics.current
    p.rotation = -360
    p.targetRotation = -360
    p.velocity = 0
    p.introRadiusMul = INTRO_START_RADIUS / ringSize
    p.introRadiusBaked = false

    cardsRef.current.forEach((card) => {
      card?.querySelectorAll<HTMLElement>("[data-curve-seg]").forEach((seg) => {
        seg.style.opacity = "0"
      })
    })

    let ctx: gsap.Context | undefined
    let frame = 0
    const ROT_DURATION = 2.8

    const runIntro = () => {
      const cards = cardsRef.current.filter(Boolean) as HTMLButtonElement[]
      const segCount = cards.reduce(
        (n, c) => n + c.querySelectorAll("[data-curve-seg]").length,
        0
      )

      if (segCount < cards.length * SEGMENTS && cards.length > 0) {
        frame = requestAnimationFrame(runIntro)
        return
      }

      const finishIntro = () => {
        if (introFinishedRef.current) return
        introFinishedRef.current = true

        introTweens.current.rot?.kill()
        introTweens.current.rot = undefined
        gsap.killTweensOf(p)

        p.rotation = 0
        p.targetRotation = 0
        p.velocity = 0
        p.introRadiusMul = 1
        p.introRadiusBaked = true

        cards.forEach((card, i) => {
          const tile = tiles[i]
          if (!card || !tile) return
          card.style.transform = `rotateY(${tile.angle}deg) translateZ(${tile.radius}px) translateY(${tile.rowY}px)`
        })
        setPhase("ready")
      }

      ctx = gsap.context(() => {
        const introTl = gsap.timeline({ delay: 0.1 })
        cards.forEach((card, tileIndex) => {
          const segs = card.querySelectorAll("[data-curve-seg]")
          introTl.to(
            segs,
            { opacity: 1, duration: 0.42, ease: "power2.out" },
            tileIndex * 0.028
          )
        })
        introTweens.current.rot = gsap.to(p, {
          targetRotation: 0,
          duration: ROT_DURATION,
          ease: "power3.out",
        })
        gsap.to(p, {
          introRadiusMul: 1,
          duration: 2.4,
          ease: "power2.out",
        })
        const photoEnd = 0.1 + Math.max(0, (cards.length - 1) * 0.028) + 0.42
        gsap.delayedCall(Math.max(photoEnd, ROT_DURATION), finishIntro)
      })
    }

    frame = requestAnimationFrame(runIntro)

    return () => {
      cancelAnimationFrame(frame)
      if (!introFinishedRef.current) ctx?.revert()
    }
  }, [phase, tiles, ringSize])

  React.useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const onWheelNative = (e: WheelEvent) => {
      if (activeRef.current) return
      e.preventDefault()
      interruptIntroRotation()
      const d = (e.deltaY + e.deltaX) * 0.05
      physics.current.targetRotation += d
      physics.current.velocity = d * 0.12
    }
    el.addEventListener("wheel", onWheelNative, { passive: false })
    return () => el.removeEventListener("wheel", onWheelNative)
  }, [])

  React.useEffect(() => {
    if (phase === "loader") return

    let frame: number
    let peTick = 0
    const loop = () => {
      const p = physics.current

      const activeTile = active?.tileIndex ?? -1

      const dimming = active && !closingRef.current

      if (!active || closingRef.current) {
        if (!p.isDown && !active) {
          p.targetRotation += p.velocity
          p.targetTilt += p.velocityTilt
          p.velocity *= 0.95
          p.velocityTilt *= 0.9
        }
        const dimRate = closingRef.current ? 0.2 : 0.1
        p.dim += (0 - p.dim) * dimRate
      } else {
        p.velocity = 0
        p.velocityTilt = 0
        p.dim += (1 - p.dim) * 0.12
      }

      p.targetTilt = clamp(p.targetTilt, -44, 26)
      if (!active || closingRef.current) {
        p.rotation += (p.targetRotation - p.rotation) * 0.09
        p.tilt += (p.targetTilt - p.tilt) * 0.09
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `rotateX(${p.tilt}deg) rotateY(${p.rotation}deg)`
      }
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `scale(${zoom})`
        wrapperRef.current.style.opacity = "1"
      }

      if (!p.introRadiusBaked) {
        const mul = p.introRadiusMul
        cardsRef.current.forEach((card, i) => {
          const tile = tiles[i]
          if (!card || !tile) return
          card.style.transform = `rotateY(${tile.angle}deg) translateZ(${tile.radius * mul}px) translateY(${tile.rowY}px)`
        })
      }

      if (peTick % 4 === 0) {
        const rot = p.rotation
        const canClick = !active
        cardsRef.current.forEach((card, i) => {
          const tile = tiles[i]
          if (!card || !tile) return

          if (i === activeTile) {
            card.style.pointerEvents = "none"
            return
          }

          const world = ((rot + tile.angle) * Math.PI) / 180
          const front = Math.cos(world)
          card.style.pointerEvents = front > 0.3 && canClick ? "auto" : "none"

          if (dimming) {
            const fade = 1 - p.dim * 0.9
            card.style.opacity = (fade * mapRange(front, -1, 1, 0.12, 1)).toString()
            card.style.filter = p.dim > 0.02 ? `blur(${p.dim * 8}px)` : "none"
          } else {
            card.style.opacity = "1"
            card.style.filter = "none"
          }
        })
      }
      peTick++

      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [tiles, zoom, active, phase, tilt])

  const onDown = (e: React.PointerEvent) => {
    if (active) return
    interruptIntroRotation()
    physics.current.isDown = true
    physics.current.lastX = e.clientX
    physics.current.lastY = e.clientY
    physics.current.velocity = 0
    physics.current.velocityTilt = 0
  }

  const onMove = (e: React.PointerEvent) => {
    const p = physics.current
    if (!p.isDown || active) return
    const dx = e.clientX - p.lastX
    const dy = e.clientY - p.lastY
    p.velocity = dx * 0.18
    p.velocityTilt = -dy * 0.06
    p.targetRotation += p.velocity
    p.targetTilt += p.velocityTilt
    p.lastX = e.clientX
    p.lastY = e.clientY
  }

  const onUp = () => {
    physics.current.isDown = false
  }

  const openProject = (project: (typeof projects)[number], tileIndex: number) => {
    if (active) return
    setActive({ project, tileIndex })
  }

  const closeProject = () => {
    const meta = expandMetaRef.current
    if (!active || !meta) {
      setActive(null)
      return
    }

    closingRef.current = true
    gsap.to(physics.current, { dim: 0, duration: 0.75, ease: "power2.out" })
    expandTl.current?.kill()

    const isMobile = (rootRef.current?.clientWidth ?? 1000) < 768
    expandTl.current = gsap.timeline({
      onComplete: () => {
        resetExpandCard()
        expandTl.current = null
        closingRef.current = false
        setActive(null)
      },
    })

    const rootRect = rootRef.current!.getBoundingClientRect()
    const cardRect = meta.card.getBoundingClientRect()
    const toX = cardRect.left - rootRect.left
    const toY = cardRect.top - rootRect.top
    const toW = cardRect.width
    const toH = cardRect.height

    expandTl.current
      .to(
        [contentRef.current, detailPanelRef.current],
        { opacity: 0, y: isMobile ? 16 : 0, x: isMobile ? 0 : 20, duration: 0.28, ease: "power2.in" },
        0
      )
      .to(
        meta.hero,
        {
          left: toX,
          top: toY,
          width: toW,
          height: toH,
          opacity: 0,
          duration: 0.85,
          ease: "power3.inOut",
        },
        0
      )
      .to(meta.card, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0.55)
  }

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && active) closeProject()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  React.useLayoutEffect(() => {
    if (!active || !rootRef.current || !heroRef.current) return
    const card = cardsRef.current[active.tileIndex]
    const tile = tiles[active.tileIndex]
    if (!card || !tile) return

    closingRef.current = false
    const p = physics.current
    const hero = heroRef.current
    const rootRect = rootRef.current.getBoundingClientRect()
    const isMobile = rootRect.width < 768
    const cardRect = card.getBoundingClientRect()
    const startX = cardRect.left - rootRect.left
    const startY = cardRect.top - rootRect.top
    const startW = cardRect.width
    const startH = cardRect.height
    const end = computeHeroRect(rootRect, tile.width / tile.height, isMobile)
    const faceRot = nearestRotation(p.rotation, -tile.angle)

    expandMetaRef.current = { card, hero }

    gsap.set(hero, {
      left: startX,
      top: startY,
      width: startW,
      height: startH,
      opacity: 0,
    })
    card.style.opacity = "1"
    card.style.zIndex = "120"

    expandTl.current?.kill()
    expandTl.current = gsap.timeline()

    expandTl.current.to(
      p,
      {
        targetRotation: faceRot,
        rotation: faceRot,
        duration: 0.85,
        ease: "power3.inOut",
      },
      0
    )

    expandTl.current.to(
      hero,
      { opacity: 1, duration: 0.38, ease: "power2.inOut" },
      0
    )
    expandTl.current.to(
      card,
      { opacity: 0, duration: 0.38, ease: "power2.inOut" },
      0
    )

    expandTl.current.to(
      hero,
      {
        left: end.x,
        top: end.y,
        width: end.w,
        height: end.h,
        duration: 0.92,
        ease: "power3.inOut",
      },
      0.2
    )

    expandTl.current.fromTo(
      contentRef.current,
      { opacity: 0, y: isMobile ? 20 : 0 },
      { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" },
      0.42
    )

    expandTl.current.fromTo(
      detailPanelRef.current,
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.55, ease: "power2.out" },
      0.48
    )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative w-full overflow-hidden select-none font-sans bg-zinc-50 dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50",
        embedded ? "h-[650px] rounded-xl border border-zinc-200 dark:border-zinc-800" : "h-screen min-h-[700px]",
        className
      )}
      style={{ backgroundColor: t.bg, color: t.text, touchAction: "none", height: embedded ? undefined : height }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      {...props}
    >
      {/* Monochromatic minimalist background gradient and grid lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? `linear-gradient(180deg, #09090b 0%, #18181b 100%)`
              : `linear-gradient(180deg, #f4f4f5 0%, #fafafa 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, ${isDark ? "#ffffff" : "#000000"} 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Minimalist Top-left header info */}
      {!embedded && !active && (
        <div
          className={cn(
            "absolute top-6 left-6 z-30 pointer-events-none transition-opacity duration-500",
            active ? "opacity-0" : "opacity-100"
          )}
        >
          <h1 className="text-xs font-semibold tracking-[0.25em] uppercase text-zinc-400 dark:text-zinc-500">
            Archive
          </h1>
        </div>
      )}

      {phase === "loader" && (
        <RingLoader
          stroke={loaderStroke}
          bg={t.bg}
          onComplete={() => setPhase("intro")}
        />
      )}

      {/* 3D stage */}
      {phase !== "loader" && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            active ? "z-30" : "z-10"
          )}
          style={{ perspective: `${perspective}px` }}
        >
          <div ref={wrapperRef} style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
            <div
              ref={ringRef}
              className="relative"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
                transform: `rotateX(${tilt}deg) rotateY(-360deg)`,
              }}
            >
              {tiles.map((tile, i) => (
                <button
                  key={tile.key}
                  ref={(el) => { cardsRef.current[i] = el; }}
                  onClick={(e) => { e.stopPropagation(); openProject(tile.project, i); }}
                  className="absolute top-1/2 left-1/2 focus-visible:outline-none focus-visible:ring-2 cursor-pointer"
                  style={{
                    width: tile.width,
                    height: tile.height,
                    marginLeft: -tile.width / 2,
                    marginTop: -tile.height / 2,
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                    transform: `rotateY(${tile.angle}deg) translateZ(${tile.radius * (INTRO_START_RADIUS / ringSize)}px) translateY(${tile.rowY}px)`,
                  }}
                  aria-label={`View ${tile.project.title}`}
                >
                  <div
                    className="absolute inset-0"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <CurvedSurface
                      width={tile.width}
                      height={tile.height}
                      image={tile.project.image}
                      bend={tile.bend}
                      focalX={tile.focalX}
                      focalY={tile.focalY}
                      lit={introLit}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {active && (
        <>
          <div
            className="absolute inset-0 z-20 pointer-events-auto cursor-pointer"
            onClick={closeProject}
            aria-hidden
          />

          {/* Screen-space hero */}
          <div
            ref={heroRef}
            className="absolute z-[35] overflow-hidden pointer-events-none"
            style={{ opacity: 0 }}
          >
            <img
              src={active.project.image}
              alt=""
              draggable={false}
              decoding="async"
              className="w-full h-full"
              style={{
                objectFit: "cover",
                objectPosition: `${Math.round((tiles[active.tileIndex]?.focalX ?? 0.5) * 100)}% ${Math.round((tiles[active.tileIndex]?.focalY ?? 0.5) * 100)}%`,
              }}
            />
          </div>

          <div
            ref={contentRef}
            className="absolute inset-0 z-40 flex items-end md:items-center justify-center pointer-events-none p-5 md:p-8"
          >
            <div className="w-full max-w-[1500px] mx-auto min-h-full flex flex-col justify-end md:min-h-0 md:flex-row md:items-center md:justify-end gap-6 md:gap-10 pointer-events-none">
              <div
                ref={detailPanelRef}
                className="relative w-full md:w-[420px] md:shrink-0 pointer-events-auto rounded-2xl border overflow-hidden md:ml-auto bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative p-7 md:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="px-2.5 py-0.5 text-[9px] font-semibold tracking-wider uppercase rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900"
                    >
                      {active.project.category}
                    </span>
                    <span
                      className="text-xs font-mono tracking-widest text-zinc-400 dark:text-zinc-500"
                    >
                      {active.project.year}
                    </span>
                  </div>

                  <h2
                    className="text-2xl font-semibold mb-4 tracking-tight leading-snug text-zinc-950 dark:text-zinc-50"
                  >
                    {active.project.title}
                  </h2>

                  <p
                    className="text-[14px] mb-8 leading-relaxed max-w-sm text-zinc-500 dark:text-zinc-400"
                  >
                    {active.project.desc}
                  </p>

                  <div
                    className="grid grid-cols-2 gap-6 mb-8 pb-7 border-b border-zinc-150 dark:border-zinc-900"
                  >
                    <div>
                      <p
                        className="text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1"
                      >
                        Client
                      </p>
                      <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                        {active.project.client}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1"
                      >
                        Archive Ref
                      </p>
                      <p className="text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200">
                        {(projects.findIndex((p) => p.title === active.project.title) + 1)
                          .toString()
                          .padStart(3, "0")}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-semibold border transition-all hover:bg-zinc-900 hover:text-zinc-50 dark:hover:bg-zinc-50 dark:hover:text-zinc-955 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-transparent cursor-pointer"
                    >
                      Explore Case Study
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
