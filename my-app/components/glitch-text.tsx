"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  text: string
  className?: string
  glitchClassName?: string
  intensity?: "low" | "medium" | "high"
  speed?: "slow" | "medium" | "fast"
  active?: boolean
  onHover?: boolean
  color?: string
  fontSize?: string
  fontWeight?: string
}

export default function GlitchText({
  text,
  className,
  glitchClassName,
  intensity = "medium",
  speed = "medium",
  active = true,
  onHover = false,
  color = "currentColor",
  fontSize = "inherit",
  fontWeight = "inherit",
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(!onHover && active)
  const [displayText, setDisplayText] = useState(text)

  // Intensity settings
  const intensitySettings = {
    low: { chance: 0.1, maxChars: 2 },
    medium: { chance: 0.2, maxChars: 4 },
    high: { chance: 0.4, maxChars: 8 },
  }

  // Speed settings
  const speedSettings = {
    slow: 500,
    medium: 250,
    fast: 100,
  }

  // Characters for glitch effect
  const glitchChars = "!<>-_\\/[]{}—=+*^?#________"

  // Glitch effect
  useEffect(() => {
    if (!isGlitching) {
      setDisplayText(text)
      return
    }

    const { chance, maxChars } = intensitySettings[intensity]
    const interval = speedSettings[speed]

    const glitchInterval = setInterval(() => {
      // Create a copy of the original text
      const newText = text.split("")

      // Determine how many characters to glitch
      const numCharsToGlitch = Math.floor(Math.random() * maxChars) + 1

      // Glitch random characters
      for (let i = 0; i < numCharsToGlitch; i++) {
        if (Math.random() < chance) {
          const pos = Math.floor(Math.random() * text.length)
          const glitchChar = glitchChars[Math.floor(Math.random() * glitchChars.length)]
          newText[pos] = glitchChar
        }
      }

      setDisplayText(newText.join(""))
    }, interval)

    return () => clearInterval(glitchInterval)
  }, [text, isGlitching, intensity, speed])

  return (
    <motion.span
      className={cn("inline-block relative", className)}
      onMouseEnter={onHover ? () => setIsGlitching(true) : undefined}
      onMouseLeave={onHover ? () => setIsGlitching(false) : undefined}
      style={{ color, fontSize, fontWeight }}
    >
      {displayText}

      {isGlitching && (
        <>
          <motion.span
            className={cn("absolute top-0 left-0 text-red-500 opacity-70", glitchClassName)}
            animate={{ x: [-1, 1, 0], y: [0, 1, -1] }}
            transition={{ duration: 0.2, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
            style={{ fontSize, fontWeight }}
          >
            {displayText}
          </motion.span>
          <motion.span
            className={cn("absolute top-0 left-0 text-blue-500 opacity-70", glitchClassName)}
            animate={{ x: [1, -1, 0], y: [1, 0, -1] }}
            transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
            style={{ fontSize, fontWeight }}
          >
            {displayText}
          </motion.span>
        </>
      )}
    </motion.span>
  )
}
