"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedProgressProps {
  value: number
  max?: number
  className?: string
  barClassName?: string
  height?: number
  label?: string
  showValue?: boolean
  color?: "primary" | "secondary" | "accent" | "blue" | "purple" | "gradient"
  animationDuration?: number
  delay?: number
}

export default function AnimatedProgress({
  value,
  max = 100,
  className,
  barClassName,
  height = 8,
  label,
  showValue = true,
  color = "primary",
  animationDuration = 1.5,
  delay = 0,
}: AnimatedProgressProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  const colorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
    blue: "bg-blue-600",
    purple: "bg-purple-600",
    gradient: "bg-gradient-to-r from-blue-600 to-purple-600",
  }

  const selectedColor = colorClasses[color]

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">{label}</span>
          {showValue && <span className="text-sm font-medium">{value}%</span>}
        </div>
      )}
      <div className={cn("w-full bg-secondary rounded-full overflow-hidden", `h-${height}`)} style={{ height }}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: animationDuration, delay, ease: "easeOut" }}
          className={cn("h-full rounded-full", selectedColor, barClassName)}
        />
      </div>
    </div>
  )
}
