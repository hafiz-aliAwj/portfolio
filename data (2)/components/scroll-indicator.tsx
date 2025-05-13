"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollIndicatorProps {
  className?: string
  height?: number
  color?: string
  position?: "top" | "bottom"
  showPercentage?: boolean
}

export default function ScrollIndicator({
  className,
  height = 4,
  color = "hsl(var(--primary))",
  position = "top",
  showPercentage = false,
}: ScrollIndicatorProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const [scrollPercentage, setScrollPercentage] = useState(0)

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      setScrollPercentage(Math.round(value * 100))
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <>
      <motion.div
        className={cn("fixed left-0 right-0 z-50", position === "top" ? "top-0" : "bottom-0", className)}
        style={{
          scaleX,
          height,
          backgroundColor: color,
          transformOrigin: "left",
        }}
      />
      {showPercentage && (
        <div
          className={cn(
            "fixed left-4 z-50 bg-background border border-border rounded-full px-2 py-1 text-xs font-medium",
            position === "top" ? "top-4" : "bottom-4",
          )}
        >
          {scrollPercentage}%
        </div>
      )}
    </>
  )
}
