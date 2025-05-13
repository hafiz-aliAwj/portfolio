"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  size: number
  color: string
  rotation: number
  speedX: number
  speedY: number
  speedRotation: number
}

interface ConfettiButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  confettiCount?: number
  confettiSize?: number
  confettiColors?: string[]
  duration?: number
  spread?: number
  disabled?: boolean
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export default function ConfettiButton({
  children,
  className,
  onClick,
  confettiCount = 50,
  confettiSize = 10,
  confettiColors = ["#4f46e5", "#3b82f6", "#8b5cf6", "#6366f1", "#ec4899", "#f43f5e"],
  duration = 2000,
  spread = 100,
  disabled = false,
  variant = "default",
  size = "default",
}: ConfettiButtonProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const animationRef = useRef<number>()

  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

  const sizeClasses = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-9 px-3 text-xs",
    lg: "h-11 px-8 text-base",
    icon: "h-10 w-10",
  }

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return

    // Call the provided onClick handler
    if (onClick) onClick()

    // Get button position
    const rect = buttonRef.current?.getBoundingClientRect()
    if (!rect) return

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Create confetti pieces
    const newConfetti: ConfettiPiece[] = Array.from({ length: confettiCount }, (_, i) => ({
      id: Date.now() + i,
      x: centerX,
      y: centerY,
      size: Math.random() * confettiSize + 5,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      rotation: Math.random() * 360,
      speedX: (Math.random() - 0.5) * spread,
      speedY: Math.random() * -spread - 10,
      speedRotation: (Math.random() - 0.5) * 20,
    }))

    setConfetti(newConfetti)
    setIsAnimating(true)

    // Clear confetti after animation
    setTimeout(() => {
      setIsAnimating(false)
      setConfetti([])
    }, duration)
  }

  // Animation loop
  useEffect(() => {
    if (!isAnimating) return

    let startTime: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      if (elapsed < duration) {
        setConfetti((prevConfetti) =>
          prevConfetti.map((piece) => ({
            ...piece,
            x: piece.x + piece.speedX * 0.1,
            y: piece.y + piece.speedY * 0.1 + 0.5, // Add gravity
            speedY: piece.speedY + 0.2, // Increase gravity over time
            rotation: piece.rotation + piece.speedRotation,
          })),
        )

        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isAnimating, duration])

  return (
    <div className="relative">
      <motion.button
        ref={buttonRef}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        disabled={disabled}
        className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      >
        {children}
      </motion.button>

      {isAnimating && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {confetti.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute"
              style={{
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                borderRadius: "2px",
                position: "absolute",
                top: 0,
                left: 0,
                transform: `translate(${piece.x}px, ${piece.y}px) rotate(${piece.rotation}deg)`,
              }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: duration / 1000, ease: "easeOut" }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
