"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function Hero3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 24

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // IT Consulting Theme: Abstract Connected Node Network + Low-Poly Geometric Core
    const group = new THREE.Group()
    scene.add(group)

    // 1. Central low-poly geometric icosahedron wireframe
    const icoGeo = new THREE.IcosahedronGeometry(5.5, 1)
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xdc2626,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    })
    const icosahedron = new THREE.Mesh(icoGeo, icoMat)
    group.add(icosahedron)

    // 2. Secondary inner core with contrasting nodes
    const innerGeo = new THREE.OctahedronGeometry(3.2, 0)
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x111827,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const innerCore = new THREE.Mesh(innerGeo, innerMat)
    group.add(innerCore)

    // 3. Node particles distributed around the network
    const particleCount = 45
    const positions = new Float32Array(particleCount * 3)
    const particlePoints: THREE.Vector3[] = []

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = 5.5 + (Math.random() - 0.5) * 3.5

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      particlePoints.push(new THREE.Vector3(x, y, z))
    }

    const particlesGeo = new THREE.BufferGeometry()
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    // Soft glowing node texture
    const canvas = document.createElement("canvas")
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext("2d")
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
      grad.addColorStop(0, "rgba(220, 38, 38, 1)")
      grad.addColorStop(0.5, "rgba(220, 38, 38, 0.4)")
      grad.addColorStop(1, "rgba(220, 38, 38, 0)")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 32, 32)
    }
    const particleTexture = new THREE.CanvasTexture(canvas)

    const particlesMat = new THREE.PointsMaterial({
      size: 0.6,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const particles = new THREE.Points(particlesGeo, particlesMat)
    group.add(particles)

    // 4. Connecting constellation network lines between near nodes
    const linePositions: number[] = []
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dist = particlePoints[i].distanceTo(particlePoints[j])
        if (dist < 3.8) {
          linePositions.push(
            particlePoints[i].x,
            particlePoints[i].y,
            particlePoints[i].z,
            particlePoints[j].x,
            particlePoints[j].y,
            particlePoints[j].z
          )
        }
      }
    }

    const linesGeo = new THREE.BufferGeometry()
    linesGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    )
    const linesMat = new THREE.LineBasicMaterial({
      color: 0x991b1b,
      transparent: true,
      opacity: 0.22,
    })
    const lines = new THREE.LineSegments(linesGeo, linesMat)
    group.add(lines)

    // Mouse parallax tracking (max 10px offset)
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      // Normalized between -1 and 1
      const nx = (e.clientX / innerWidth) * 2 - 1
      const ny = -(e.clientY / innerHeight) * 2 + 1

      // Max 10px offset in 3D space (~0.35 camera units)
      targetX = nx * 0.4
      targetY = ny * 0.4
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    // Resize handling
    const handleResize = () => {
      if (!container) return
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Animation Loop
    let animationFrameId: number
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      // Very slow auto-rotation
      group.rotation.y += 0.0012
      group.rotation.x += 0.0006
      innerCore.rotation.y -= 0.0018
      innerCore.rotation.z += 0.001

      // Subtle parallax interpolation (ease-out)
      mouseX += (targetX - mouseX) * 0.05
      mouseY += (targetY - mouseY) * 0.05

      group.position.x = mouseX
      group.position.y = mouseY

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      icoGeo.dispose()
      icoMat.dispose()
      innerGeo.dispose()
      innerMat.dispose()
      particlesGeo.dispose()
      particlesMat.dispose()
      linesGeo.dispose()
      linesMat.dispose()
      particleTexture.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden flex items-center justify-end"
    >
      {/* Off-center positioning at 15-20% opacity */}
      <div
        ref={containerRef}
        className="w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] md:w-[620px] md:h-[620px] lg:w-[720px] lg:h-[720px] opacity-[0.18] translate-x-12 sm:translate-x-20 -translate-y-6"
      />
    </div>
  )
}
