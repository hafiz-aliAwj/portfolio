"use client"

import type React from "react"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  gradientFrom?: string
  gradientTo?: string
  hoverGradientFrom?: string
  hoverGradientTo?: string
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  children: React.ReactNode
  asChild?: boolean
}

const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  (
    {
      gradientFrom = "from-blue-600",
      gradientTo = "to-purple-600",
      hoverGradientFrom = "from-purple-600",
      hoverGradientTo = "to-blue-600",
      className,
      variant = "default",
      size = "default",
      children,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover-target"

    const sizeClasses = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-9 px-3 text-xs",
      lg: "h-11 px-8 text-base",
      icon: "h-10 w-10",
    }

    const variantClasses = {
      default: `bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white hover:bg-gradient-to-r hover:${hoverGradientFrom} hover:${hoverGradientTo}`,
      outline: `border-2 border-gradient-to-r ${gradientFrom} ${gradientTo} bg-transparent hover:bg-gradient-to-r hover:${hoverGradientFrom} hover:${hoverGradientTo} hover:text-white`,
      ghost: `bg-transparent hover:bg-gradient-to-r hover:${hoverGradientFrom} hover:${hoverGradientTo} hover:text-white`,
    }

    return (
      <motion.button
        ref={ref}
        className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.button>
    )
  },
)

GradientButton.displayName = "GradientButton"

export { GradientButton }
