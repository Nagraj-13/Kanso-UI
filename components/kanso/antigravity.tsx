"use client"

import * as React from "react"
import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { cn } from "@/lib/utils"

export interface AntigravityProps {
  count?: number
  magnetRadius?: number
  ringRadius?: number
  waveSpeed?: number
  waveAmplitude?: number
  particleSize?: number
  lerpSpeed?: number
  color?: string
  colors?: string[]
  autoAnimate?: boolean
  particleVariance?: number
  rotationSpeed?: number
  depthFactor?: number
  pulseSpeed?: number
  particleShape?: "capsule" | "sphere" | "box" | "tetrahedron"
  fieldStrength?: number
}

function createRandom(seed: number) {
  let s = seed
  return () => {
    const x = Math.sin(s++) * 10000
    return x - Math.floor(x)
  }
}

const AntigravityInner: React.FC<AntigravityProps> = ({
  count = 300,
  magnetRadius = 10,
  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 2,
  lerpSpeed = 0.1,
  color = "#FF9FFC",
  colors,
  autoAnimate = false,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = "capsule",
  fieldStrength = 10,
}) => {
  const meshRef = React.useRef<THREE.InstancedMesh>(null)
  const { viewport } = useThree()
  const dummy = React.useMemo(() => new THREE.Object3D(), [])

  const lastMousePos = React.useRef({ x: 0, y: 0 })
  const lastMouseMoveTime = React.useRef(0)
  const virtualMouse = React.useRef({ x: 0, y: 0 })

  const particles = React.useMemo(() => {
    const temp = []
    const width = viewport.width || 100
    const height = viewport.height || 100
    const random = createRandom(42)

    for (let i = 0; i < count; i++) {
      const t = random() * 100
      const factor = 20 + random() * 100
      const speed = 0.01 + random() / 200
      const xFactor = -50 + random() * 100
      const yFactor = -50 + random() * 100
      const zFactor = -50 + random() * 100

      const x = (random() - 0.5) * width
      const y = (random() - 0.5) * height
      const z = (random() - 0.5) * 20

      const randomRadiusOffset = (random() - 0.5) * 2

      temp.push({
        t,
        factor,
        speed,
        xFactor,
        yFactor,
        zFactor,
        mx: x,
        my: y,
        mz: z,
        cx: x,
        cy: y,
        cz: z,
        vx: 0,
        vy: 0,
        vz: 0,
        randomRadiusOffset,
      })
    }
    return temp
  }, [count, viewport.width, viewport.height])

  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) return

    const { viewport: v, pointer: m } = state

    const mouseDist = Math.sqrt(
      Math.pow(m.x - lastMousePos.current.x, 2) + Math.pow(m.y - lastMousePos.current.y, 2)
    )

    if (mouseDist > 0.001) {
      lastMouseMoveTime.current = Date.now()
      lastMousePos.current = { x: m.x, y: m.y }
    }

    let destX = (m.x * v.width) / 2
    let destY = (m.y * v.height) / 2

    if (autoAnimate && Date.now() - lastMouseMoveTime.current > 2000) {
      const time = state.clock.getElapsedTime()
      destX = Math.sin(time * 0.5) * (v.width / 4)
      destY = Math.cos(time * 0.5 * 2) * (v.height / 4)
    }

    const smoothFactor = 0.05
    virtualMouse.current.x += (destX - virtualMouse.current.x) * smoothFactor
    virtualMouse.current.y += (destY - virtualMouse.current.y) * smoothFactor

    const targetX = virtualMouse.current.x
    const targetY = virtualMouse.current.y

    const globalRotation = state.clock.getElapsedTime() * rotationSpeed
    const colorObj = new THREE.Color()
    const hasColors = colors && colors.length > 0

    particles.forEach((particle, i) => {
      let { t } = particle
      const { speed, mx, my, mz, cz, randomRadiusOffset } = particle

      t = particle.t += speed / 2

      const projectionFactor = 1 - cz / 50
      const projectedTargetX = targetX * projectionFactor
      const projectedTargetY = targetY * projectionFactor

      const dx = mx - projectedTargetX
      const dy = my - projectedTargetY
      const dist = Math.sqrt(dx * dx + dy * dy)

      const targetPos = { x: mx, y: my, z: mz * depthFactor }

      if (dist < magnetRadius) {
        const angle = Math.atan2(dy, dx) + globalRotation

        const wave = Math.sin(t * waveSpeed + angle) * (0.5 * waveAmplitude)
        const deviation = randomRadiusOffset * (5 / (fieldStrength + 0.1))

        const currentRingRadius = ringRadius + wave + deviation

        targetPos.x = projectedTargetX + currentRingRadius * Math.cos(angle)
        targetPos.y = projectedTargetY + currentRingRadius * Math.sin(angle)
        targetPos.z = mz * depthFactor + Math.sin(t) * (1 * waveAmplitude * depthFactor)
      }

      particle.cx += (targetPos.x - particle.cx) * lerpSpeed
      particle.cy += (targetPos.y - particle.cy) * lerpSpeed
      particle.cz += (targetPos.z - particle.cz) * lerpSpeed

      dummy.position.set(particle.cx, particle.cy, particle.cz)

      dummy.lookAt(projectedTargetX, projectedTargetY, particle.cz)
      dummy.rotateX(Math.PI / 2)

      const currentDistToMouse = Math.sqrt(
        Math.pow(particle.cx - projectedTargetX, 2) + Math.pow(particle.cy - projectedTargetY, 2)
      )

      const distFromRing = Math.abs(currentDistToMouse - ringRadius)
      let scaleFactor = 1 - distFromRing / 10

      scaleFactor = Math.max(0, Math.min(1, scaleFactor))

      const finalScale = scaleFactor * (0.8 + Math.sin(t * pulseSpeed) * 0.2 * particleVariance) * particleSize
      dummy.scale.set(finalScale, finalScale, finalScale)

      dummy.updateMatrix()

      mesh.setMatrixAt(i, dummy.matrix)

      // Set individual instance color
      if (hasColors) {
        colorObj.set(colors[i % colors.length])
        mesh.setColorAt(i, colorObj)
      } else {
        colorObj.set(color)
        mesh.setColorAt(i, colorObj)
      }
    })

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {particleShape === "capsule" && <capsuleGeometry args={[0.1, 0.4, 4, 8]} />}
      {particleShape === "sphere" && <sphereGeometry args={[0.2, 16, 16]} />}
      {particleShape === "box" && <boxGeometry args={[0.3, 0.3, 0.3]} />}
      {particleShape === "tetrahedron" && <tetrahedronGeometry args={[0.3]} />}
      <meshBasicMaterial color={color} />
    </instancedMesh>
  )
}

export interface AntigravityWrapperProps extends React.HTMLAttributes<HTMLDivElement>, AntigravityProps {}

const Antigravity = React.forwardRef<HTMLDivElement, AntigravityWrapperProps>(
  (
    {
      count,
      magnetRadius,
      ringRadius,
      waveSpeed,
      waveAmplitude,
      particleSize,
      lerpSpeed,
      color,
      colors,
      autoAnimate,
      particleVariance,
      rotationSpeed,
      depthFactor,
      pulseSpeed,
      particleShape,
      fieldStrength,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("w-full h-full relative overflow-hidden", className)}
        style={style}
        {...props}
      >
        <Canvas camera={{ position: [0, 0, 50], fov: 35 }}>
          <AntigravityInner
            count={count}
            magnetRadius={magnetRadius}
            ringRadius={ringRadius}
            waveSpeed={waveSpeed}
            waveAmplitude={waveAmplitude}
            particleSize={particleSize}
            lerpSpeed={lerpSpeed}
            color={color}
            colors={colors}
            autoAnimate={autoAnimate}
            particleVariance={particleVariance}
            rotationSpeed={rotationSpeed}
            depthFactor={depthFactor}
            pulseSpeed={pulseSpeed}
            particleShape={particleShape}
            fieldStrength={fieldStrength}
          />
        </Canvas>
      </div>
    )
  }
)

Antigravity.displayName = "Antigravity"

export { Antigravity }
