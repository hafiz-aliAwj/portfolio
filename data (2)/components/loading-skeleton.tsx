"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  animate?: boolean
  speed?: number
  backgroundColor?: string
  highlightColor?: string
  count?: number
  direction?: "horizontal" | "vertical"
  gap?: number
}

export default function LoadingSkeleton({
  className,
  width = "100%",
  height = "1rem",
  borderRadius = "0.25rem",
  animate = true,
  speed = 1.5,
  backgroundColor = "hsl(var(--muted))",
  highlightColor = "hsl(var(--muted-foreground) / 0.1)",
  count = 1,
  direction = "vertical",
  gap = 8,
}: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i)

  const shimmerVariants = {
    initial: {
      backgroundPosition: "-500px 0",
    },
    animate: {
      backgroundPosition: ["500px 0", "-500px 0"],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 2 * (1 / speed),
        ease: "linear",
      },
    },
  }

  const renderSkeleton = (index: number) => (
    <motion.div
      key={index}
      className={cn("relative overflow-hidden", className)}
      style={{
        width,
        height,
        borderRadius,
        backgroundColor,
        marginBottom: direction === "vertical" ? gap : 0,
        marginRight: direction === "horizontal" ? gap : 0,
      }}
      initial="initial"
      animate={animate ? "animate" : "initial"}
      variants={shimmerVariants}
      custom={index}
    >
      {animate && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, transparent, ${highlightColor}, transparent)`,
            backgroundSize: "500px 100%",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
    </motion.div>
  )

  return (
    <div className={cn("flex", direction === "vertical" ? "flex-col" : "flex-row")}>
      {skeletons.map((_, index) => renderSkeleton(index))}
    </div>
  )
}
