"use client"

import * as React from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { cn } from "@/lib/utils"

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
    const resolvedFogColor = new THREE.Color(fogColor)
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
            uColor: { value: new THREE.Color(0x18181b) },
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
  }, [images, columns, rows, radius, borderRadius, columnSpacing, autoRotationSpeed, fogColor, fogDensity])

  const isLoadingCompleted = loadedCount >= totalCount

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden select-none bg-[#09090b]", className)}
      style={{ height }}
      {...props}
    >
      {/* Loader UI */}
      {!isLoadingCompleted && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#09090b] text-white">
          <div className="text-sm font-semibold tracking-[0.2em] animate-pulse">
            LOADING ASSETS... ({loadedCount}/{totalCount})
          </div>
        </div>
      )}

      {/* Overlay UI */}
      {!hideUI && (
        <div className="absolute bottom-10 left-0 right-0 z-10 pointer-events-none flex flex-col items-center gap-2 text-center text-white/60">
          <h2 className="m-0 text-sm font-medium tracking-[0.3em] uppercase text-white">
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
