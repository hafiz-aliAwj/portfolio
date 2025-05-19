"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

interface ParticleBackgroundProps {
  className?: string
  particleCount?: number
  particleSize?: number
  particleSpeed?: number
  connectParticles?: boolean
  responsive?: boolean
}

export default function ParticleBackground({
  className,
  particleCount = 150,
  particleSize = 5,
  particleSpeed = 2,
  connectParticles = true,
  responsive = true,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const animationRef = useRef<number>()
  const { theme } = useTheme()

  // Get colors based on theme
  const particleColor = theme === "dark" ? "#ffffff" : "#333333"
  const lineColor = theme === "dark" ? "#cccccc" : "#aaaaaa"

  // Resize observer for accurate dimensions
  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current

    const updateDimensions = () => {
      if (!canvas.parentElement) return
      const { width, height } = canvas.parentElement.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
      setDimensions({ width, height })
    }

    updateDimensions()

    const observer = new ResizeObserver(updateDimensions)
    if (canvas.parentElement) observer.observe(canvas.parentElement)

    return () => observer.disconnect()
  }, [])

  // Initialize particles
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const count = responsive
      ? Math.floor(particleCount * (dimensions.width / 1920))
      : particleCount

    const newParticles: Particle[] = []
    for (let i = 0; i < count; i++) {
      newParticles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * particleSize + 1,
        speedX: (Math.random() - 0.5) * particleSpeed,
        speedY: (Math.random() - 0.5) * particleSpeed,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    setParticles(newParticles)
  }, [dimensions, particleCount, particleSize, particleSpeed, responsive, theme])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || particles.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      const updatedParticles = particles.map((p) => {
        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0 || p.x > dimensions.width) p.speedX *= -1
        if (p.y < 0 || p.y > dimensions.height) p.speedY *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.globalAlpha = p.opacity
        ctx.fill()

        return p
      })

      if (connectParticles) {
        ctx.globalAlpha = 0.1
        ctx.strokeStyle = lineColor
        ctx.lineWidth = 2

        for (let i = 0; i < updatedParticles.length; i++) {
          for (let j = i + 1; j < updatedParticles.length; j++) {
            const dx = updatedParticles[i].x - updatedParticles[j].x
            const dy = updatedParticles[i].y - updatedParticles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 120) {
              ctx.beginPath()
              ctx.moveTo(updatedParticles[i].x, updatedParticles[i].y)
              ctx.lineTo(updatedParticles[j].x, updatedParticles[j].y)
              ctx.stroke()
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [particles, dimensions, connectParticles, particleColor, lineColor])

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
