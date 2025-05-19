"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  once?: boolean
  direction?: "up" | "down" | "left" | "right"
  staggerChildren?: number
  fontSize?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl"
  fontWeight?: "normal" | "medium" | "semibold" | "bold"
}

export default function TextReveal({
  text,
  className,
  delay = 0,
  duration = 0.5,
  once = true,
  direction = "up",
  staggerChildren = 0.03,
  fontSize = "xl",
  fontWeight = "bold",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: "-100px" })

  // Split text into words
  const words = text.split(" ")

  // Direction variants
  const directionVariants = {
    up: { y: "100%", opacity: 0 },
    down: { y: "-100%", opacity: 0 },
    left: { x: "100%", opacity: 0 },
    right: { x: "-100%", opacity: 0 },
  }

  // Font size classes
  const fontSizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
  }

  // Font weight classes
  const fontWeightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  }

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren,
              delayChildren: delay,
            },
          },
        }}
        className={cn("flex flex-wrap", fontSizeClasses[fontSize], fontWeightClasses[fontWeight])}
      >
        {words.map((word, i) => (
          <div key={i} className="mr-[0.25em] overflow-hidden">
            <motion.span
              className="inline-block"
              variants={{
                hidden: directionVariants[direction],
                visible: {
                  y: 0,
                  x: 0,
                  opacity: 1,
                  transition: {
                    duration,
                    ease: [0.2, 0.65, 0.3, 0.9],
                  },
                },
              }}
            >
              {word}
            </motion.span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
