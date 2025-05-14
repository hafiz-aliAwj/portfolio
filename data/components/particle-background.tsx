"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
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
  particleCount = 50,
  particleSize = 3,
  particleSpeed = 1,
  connectParticles = true,
  responsive = true,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const animationRef = useRef<number>()

  // Get dynamic color
  const getColor = () => {
    const style = getComputedStyle(document.documentElement)
    return {
      particle: style.getPropertyValue('--tw-prose-links') || '#fff',
      line: style.getPropertyValue('--tw-prose-invert') || 'rgba(255,255,255,0.2)',
    }
  }

  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const parent = canvas.parentElement
    if (!parent) return

    const resize = () => {
      const { width, height } = parent.getBoundingClientRect()
      canvas.width = width * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)
      setDimensions({ width, height })
    }

    // Initial resize + observe parent
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(parent)

    // Create particles
    const colorSet = getColor()
    const count = responsive ? Math.floor(particleCount * (dimensions.width / 1920)) : particleCount
    const newParticles: Particle[] = []

    for (let i = 0; i < count; i++) {
      newParticles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * particleSize + 1,
        speedX: (Math.random() - 0.5) * particleSpeed,
        speedY: (Math.random() - 0.5) * particleSpeed,
        color: colorSet.particle,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    setParticles(newParticles)

    return () => resizeObserver.disconnect()
  }, [particleCount, particleSize, particleSpeed, responsive])

  // Animate particles
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx || particles.length === 0) return

    const colorSet = getColor()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const updatedParticles = particles.map((p) => {
        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0 || p.x > dimensions.width) p.speedX *= -1
        if (p.y < 0 || p.y > dimensions.height) p.speedY *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()

        return p
      })

      if (connectParticles) {
        ctx.globalAlpha = 0.2
        ctx.strokeStyle = colorSet.line
        ctx.lineWidth = 0.5

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
  }, [particles, dimensions, connectParticles])

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-[-1]", className)}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}