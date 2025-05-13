"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  delay?: number
  duration?: number
  once?: boolean
  direction?: "up" | "down" | "left" | "right"
  distance?: number
}

export default function ScrollReveal({
  children,
  className,
  threshold = 0.1,
  delay = 0,
  duration = 0.5,
  once = true,
  direction = "up",
  distance = 50,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })

  // Direction variants
  const directionVariants = {
    up: { y: distance, opacity: 0 },
    down: { y: -distance, opacity: 0 },
    left: { x: distance, opacity: 0 },
    right: { x: -distance, opacity: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial={directionVariants[direction]}
      animate={
        isInView
          ? { y: 0, x: 0, opacity: 1, transition: { duration, delay, ease: "easeOut" } }
          : directionVariants[direction]
      }
      className={cn("", className)}
    >
      {children}
    </motion.div>
  )
}
