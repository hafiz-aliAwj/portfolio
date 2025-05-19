"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SectionDividerProps {
  className?: string
  variant?: "wave" | "curve" | "triangle" | "zigzag"
  flip?: boolean
  color?: string
}

export default function SectionDivider({
  className,
  variant = "wave",
  flip = false,
  color = "url(#gradient)", // Use gradient by default
}: SectionDividerProps) {
  const renderDefs = () => (
    <defs>
      <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7F1DFF" />
        <stop offset="100%" stopColor="#FF1DA5" />
      </linearGradient>
    </defs>
  )

  const paths: Record<string, string> = {
    wave: `M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,0L0,0Z`,
    curve: `M0,96L1440,32L1440,0L0,0Z`,
    triangle: `M0,96L720,32L1440,96L1440,0L0,0Z`,
    zigzag: `M0,64L120,80C240,96,480,128,720,122.7C960,117,1200,75,1320,53.3L1440,32L1440,0L0,0Z`,
  }

  const pathData = paths[variant] ?? paths.wave

  return (
    <motion.div
      initial={{ opacity: 0, y: flip ? -40 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      viewport={{ once: true }}
      className={cn("w-full h-32 md:h-40 overflow-hidden", className)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={cn("w-full h-full transition-transform", flip && "rotate-180")}
        style={{ display: "block" }}
      >
        {color === "url(#gradient)" && renderDefs()}
        <motion.path
          d={pathData}
          fill={color}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  )
}
