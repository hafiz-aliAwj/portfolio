"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingElementsProps {
  className?: string
  children: React.ReactNode
  delay?: number
  duration?: number
  distance?: number
  direction?: "up" | "down" | "left" | "right"
}

export default function FloatingElements({
  className,
  children,
  delay = 0,
  duration = 3,
  distance = 10,
  direction = "up",
}: FloatingElementsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  // Calculate animation properties based on direction
  const getAnimationProps = () => {
    const directionMap = {
      up: { y: [distance, -distance] },
      down: { y: [-distance, distance] },
      left: { x: [distance, -distance] },
      right: { x: [-distance, distance] },
    }

    return directionMap[direction]
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={
        isInView
          ? {
              opacity: 1,
              ...getAnimationProps(),
              transition: {
                opacity: { duration: 0.5, delay },
                ...getAnimationProps(),
                duration,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }
          : { opacity: 0 }
      }
      className={cn("", className)}
    >
      {children}
    </motion.div>
  )
}
