"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParallaxBackgroundProps {
  className?: string
  children?: React.ReactNode
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  intensity?: number
}

export default function ParallaxBackground({
  className,
  children,
  speed = 0.5,
  direction = "up",
  intensity = 0.2,
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Calculate transform based on direction
  const yTransform = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? ["0%", `${-intensity * 100}%`] : [`${-intensity * 100}%`, "0%"],
  )
  const xTransform = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" ? ["0%", `${-intensity * 100}%`] : [`${-intensity * 100}%`, "0%"],
  )

  // Use the appropriate transform based on direction
  const isVertical = direction === "up" || direction === "down"
  const transform = isVertical ? { y: yTransform } : { x: xTransform }

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={{
          ...transform,
          transition: `transform ${speed}s cubic-bezier(0.33, 1, 0.68, 1)`,
        }}
        className="absolute inset-0 w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}
