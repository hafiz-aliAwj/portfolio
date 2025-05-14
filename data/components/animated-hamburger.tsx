"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedHamburgerProps {
  isOpen: boolean
  toggle: () => void
  className?: string
  barClassName?: string
  size?: "sm" | "md" | "lg"
  color?: string
  thickness?: number
  rounded?: boolean
  type?: "cross" | "arrow" | "rotate" | "collapse"
}

export default function AnimatedHamburger({
  isOpen,
  toggle,
  className,
  barClassName,
  size = "md",
  color = "currentColor",
  thickness = 2,
  rounded = true,
  type = "cross",
}: AnimatedHamburgerProps) {
  // Size variants
  const sizeVariants = {
    sm: { width: 16, gap: 3 },
    md: { width: 24, gap: 4 },
    lg: { width: 32, gap: 6 },
  }

  const { width, gap } = sizeVariants[size]

  // Animation variants based on type
  const getVariants = () => {
    switch (type) {
      case "arrow":
        return {
          top: {
            open: { rotate: 45, translateY: gap + thickness / 2, width: width * 0.6 },
            closed: { rotate: 0, translateY: 0, width: width },
          },
          middle: {
            open: { opacity: 0 },
            closed: { opacity: 1 },
          },
          bottom: {
            open: { rotate: -45, translateY: -(gap + thickness / 2), width: width * 0.6 },
            closed: { rotate: 0, translateY: 0, width: width },
          },
        }
      case "rotate":
        return {
          top: {
            open: { rotate: 180, translateY: gap + thickness / 2 },
            closed: { rotate: 0, translateY: 0 },
          },
          middle: {
            open: { opacity: 0 },
            closed: { opacity: 1 },
          },
          bottom: {
            open: { rotate: -180, translateY: -(gap + thickness / 2) },
            closed: { rotate: 0, translateY: 0 },
          },
        }
      case "collapse":
        return {
          top: {
            open: { translateY: gap + thickness / 2, width: 0 },
            closed: { translateY: 0, width: width },
          },
          middle: {
            open: { width: width },
            closed: { width: width },
          },
          bottom: {
            open: { translateY: -(gap + thickness / 2), width: 0 },
            closed: { translateY: 0, width: width },
          },
        }
      case "cross":
      default:
        return {
          top: {
            open: { rotate: 45, translateY: gap + thickness / 2 },
            closed: { rotate: 0, translateY: 0 },
          },
          middle: {
            open: { opacity: 0 },
            closed: { opacity: 1 },
          },
          bottom: {
            open: { rotate: -45, translateY: -(gap + thickness / 2) },
            closed: { rotate: 0, translateY: 0 },
          },
        }
    }
  }

  const variants = getVariants()

  return (
    <button
      onClick={toggle}
      className={cn("flex flex-col justify-center items-center", className)}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <motion.div
        animate={isOpen ? "open" : "closed"}
        initial="closed"
        className="flex flex-col justify-center items-center gap-[--gap]"
        style={{ "--gap": `${gap}px` } as React.CSSProperties}
      >
        <motion.span
          variants={variants.top}
          style={{
            height: thickness,
            width,
            backgroundColor: color,
            borderRadius: rounded ? 9999 : 0,
            transformOrigin: "center",
          }}
          className={cn("", barClassName)}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          variants={variants.middle}
          style={{
            height: thickness,
            width,
            backgroundColor: color,
            borderRadius: rounded ? 9999 : 0,
          }}
          className={cn("", barClassName)}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          variants={variants.bottom}
          style={{
            height: thickness,
            width,
            backgroundColor: color,
            borderRadius: rounded ? 9999 : 0,
            transformOrigin: "center",
          }}
          className={cn("", barClassName)}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </button>
  )
}
