"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ImageHoverEffectProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  effect?: "zoom" | "overlay" | "tilt" | "reveal" | "blur"
  overlayColor?: string
  overlayOpacity?: number
  overlayContent?: React.ReactNode
  tiltStrength?: number
}

export default function ImageHoverEffect({
  src,
  alt,
  width,
  height,
  className,
  effect = "zoom",
  overlayColor = "rgba(0, 0, 0, 0.5)",
  overlayOpacity = 0.7,
  overlayContent,
  tiltStrength = 15,
}: ImageHoverEffectProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (effect === "tilt") {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5
      setMousePosition({ x, y })
    }
  }

  const renderEffect = () => {
    switch (effect) {
      case "zoom":
        return (
          <motion.div className="w-full h-full" animate={{ scale: isHovered ? 1.1 : 1 }} transition={{ duration: 0.3 }}>
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              width={width}
              height={height}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )
      case "overlay":
        return (
          <>
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              width={width}
              height={height}
              className="w-full h-full object-cover"
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: overlayColor }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? overlayOpacity : 0 }}
              transition={{ duration: 0.3 }}
            >
              {overlayContent}
            </motion.div>
          </>
        )
      case "tilt":
        return (
          <motion.div
            className="w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
            animate={{
              rotateX: -mousePosition.y * tiltStrength,
              rotateY: mousePosition.x * tiltStrength,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              width={width}
              height={height}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )
      case "reveal":
        return (
          <>
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              width={width}
              height={height}
              className="w-full h-full object-cover"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
              initial={{ height: "30%" }}
              animate={{ height: isHovered ? "100%" : "30%" }}
              transition={{ duration: 0.3 }}
            />
            {overlayContent && <div className="absolute bottom-0 left-0 right-0 p-4 text-white">{overlayContent}</div>}
          </>
        )
      case "blur":
        return (
          <>
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              width={width}
              height={height}
              className="w-full h-full object-cover"
            />
            <motion.div
              className="absolute inset-0 backdrop-blur flex items-center justify-center"
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{
                opacity: isHovered ? 1 : 0,
                backdropFilter: isHovered ? "blur(5px)" : "blur(0px)",
              }}
              transition={{ duration: 0.3 }}
            >
              {overlayContent}
            </motion.div>
          </>
        )
      default:
        return (
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-full object-cover"
          />
        )
    }
  }

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {renderEffect()}
    </div>
  )
}
