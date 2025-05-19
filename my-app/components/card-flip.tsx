"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardFlipProps {
  frontContent: React.ReactNode
  backContent: React.ReactNode
  className?: string
  frontClassName?: string
  backClassName?: string
  flipOnHover?: boolean
  flipOnClick?: boolean
  flipDuration?: number
  width?: number | string
  height?: number | string
}

export default function CardFlip({
  frontContent,
  backContent,
  className,
  frontClassName,
  backClassName,
  flipOnHover = false,
  flipOnClick = true,
  flipDuration = 0.6,
  width = "100%",
  height = "100%",
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    if (flipOnClick) {
      setIsFlipped(!isFlipped)
    }
  }

  const handleHover = () => {
    if (flipOnHover) {
      setIsFlipped(true)
    }
  }

  const handleHoverEnd = () => {
    if (flipOnHover) {
      setIsFlipped(false)
    }
  }

  return (
    <div
      className={cn("relative cursor-pointer perspective-1000", className)}
      onClick={handleFlip}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
      style={{ width, height }}
    >
      <motion.div
        className="relative w-full h-full transform-style-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: flipDuration, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className={cn("absolute inset-0 w-full h-full backface-hidden", frontClassName)}
          style={{ backfaceVisibility: "hidden" }}
        >
          {frontContent}
        </div>

        {/* Back */}
        <div
          className={cn("absolute inset-0 w-full h-full backface-hidden", backClassName)}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {backContent}
        </div>
      </motion.div>
    </div>
  )
}
