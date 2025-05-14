"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedCubeProps {
  className?: string
  size?: number
  color?: string
  speed?: number
}

export default function AnimatedCube({ className, size = 100, color = "primary", speed = 10 }: AnimatedCubeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const colorClasses = {
    primary: "border-primary",
    secondary: "border-secondary",
    accent: "border-accent",
    blue: "border-blue-500",
    purple: "border-purple-500",
    gradient: "border-gradient-to-r from-blue-500 to-purple-500",
  }

  const selectedColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.primary

  return (
    <div ref={ref} className={cn("relative", className)} style={{ width: size, height: size }}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, rotateX: 0, rotateY: 0, rotateZ: 0 },
          visible: {
            opacity: 1,
            rotateX: 360,
            rotateY: 360,
            rotateZ: 360,
            transition: {
              duration: 20 / speed,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            },
          },
        }}
        className="w-full h-full relative transform-style-3d"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(45deg) rotateZ(45deg)",
        }}
      >
        {/* Front face */}
        <div
          className={cn("absolute w-full h-full border-2 border-dashed", selectedColor)}
          style={{
            transform: `translateZ(${size / 2}px)`,
            backfaceVisibility: "hidden",
          }}
        />

        {/* Back face */}
        <div
          className={cn("absolute w-full h-full border-2 border-dashed", selectedColor)}
          style={{
            transform: `translateZ(-${size / 2}px) rotateY(180deg)`,
            backfaceVisibility: "hidden",
          }}
        />

        {/* Right face */}
        <div
          className={cn("absolute w-full h-full border-2 border-dashed", selectedColor)}
          style={{
            transform: `translateX(${size / 2}px) rotateY(90deg)`,
            backfaceVisibility: "hidden",
          }}
        />

        {/* Left face */}
        <div
          className={cn("absolute w-full h-full border-2 border-dashed", selectedColor)}
          style={{
            transform: `translateX(-${size / 2}px) rotateY(-90deg)`,
            backfaceVisibility: "hidden",
          }}
        />

        {/* Top face */}
        <div
          className={cn("absolute w-full h-full border-2 border-dashed", selectedColor)}
          style={{
            transform: `translateY(-${size / 2}px) rotateX(90deg)`,
            backfaceVisibility: "hidden",
          }}
        />

        {/* Bottom face */}
        <div
          className={cn("absolute w-full h-full border-2 border-dashed", selectedColor)}
          style={{
            transform: `translateY(${size / 2}px) rotateX(-90deg)`,
            backfaceVisibility: "hidden",
          }}
        />
      </motion.div>
    </div>
  )
}
