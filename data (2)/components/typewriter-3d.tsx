"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { cn } from "@/lib/utils"

interface Typewriter3DProps {
  words: string[]
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenWords?: number
  textSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
  textColor?: string
  loop?: boolean
}

export default function Typewriter3D({
  words,
  className,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 1500,
  textSize = "xl",
  textColor = "text-primary",
  loop = true,
}: Typewriter3DProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
  }

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentText.length < words[currentWordIndex].length) {
            setCurrentText(words[currentWordIndex].substring(0, currentText.length + 1))
            controls.start({
              rotateX: [0, 20, 0],
              y: [0, -5, 0],
              transition: { duration: 0.2 },
            })
          } else {
            // Finished typing
            setTimeout(() => setIsDeleting(true), delayBetweenWords)
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(words[currentWordIndex].substring(0, currentText.length - 1))
            controls.start({
              rotateX: [0, -15, 0],
              y: [0, 3, 0],
              transition: { duration: 0.1 },
            })
          } else {
            // Finished deleting
            setIsDeleting(false)
            const nextIndex = (currentWordIndex + 1) % words.length
            if (nextIndex === 0 && !loop) {
              // Stop if we've gone through all words and loop is false
              return
            }
            setCurrentWordIndex(nextIndex)
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timeout)
  }, [currentText, currentWordIndex, isDeleting, words, typingSpeed, deletingSpeed, delayBetweenWords, loop, controls])

  return (
    <div className={cn("perspective-500 inline-block", className)} ref={containerRef}>
      <motion.span
        animate={controls}
        className={cn("inline-block transform-gpu", textSizeClasses[textSize], textColor)}
        style={{ transformStyle: "preserve-3d" }}
      >
        {currentText}
        <span className="animate-blink">|</span>
      </motion.span>
    </div>
  )
}
