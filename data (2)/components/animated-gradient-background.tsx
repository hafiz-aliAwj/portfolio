"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedGradientBackgroundProps {
  className?: string
  colors?: string[]
  speed?: number
  children?: React.ReactNode
}

export default function AnimatedGradientBackground({
  className,
  colors = ["#4f46e5", "#3b82f6", "#8b5cf6", "#6366f1"],
  speed = 3,
  children,
}: AnimatedGradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateDimensions = () => {
      if (!canvas.parentElement) return
      const { width, height } = canvas.parentElement.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    // Convert hex colors to RGB
    const rgbColors = colors.map((color) => {
      const r = Number.parseInt(color.slice(1, 3), 16)
      const g = Number.parseInt(color.slice(3, 5), 16)
      const b = Number.parseInt(color.slice(5, 7), 16)
      return { r, g, b }
    })

    // Create gradient animation
    let step = 0
    const gradientSpeed = 0.002 * speed

    const animate = () => {
      step += gradientSpeed

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

      // Add color stops with shifting positions
      for (let i = 0; i < rgbColors.length; i++) {
        const color = rgbColors[i]
        const pos = (i / (rgbColors.length - 1) + step) % 2
        gradient.addColorStop(pos - Math.floor(pos), `rgb(${color.r}, ${color.g}, ${color.b})`)
      }

      // Fill canvas with gradient
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateDimensions)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [colors, speed])

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
