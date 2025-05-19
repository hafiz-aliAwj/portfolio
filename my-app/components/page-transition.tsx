"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
  type?: "fade" | "slide" | "scale" | "flip" | "rotate"
  duration?: number
}

export default function PageTransition({ children, className, type = "fade", duration = 0.5 }: PageTransitionProps) {
  const pathname = usePathname()

  // Define variants based on transition type
  const getVariants = () => {
    switch (type) {
      case "slide":
        return {
          initial: { x: 300, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -300, opacity: 0 },
        }
      case "scale":
        return {
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 1.2, opacity: 0 },
        }
      case "flip":
        return {
          initial: { rotateY: 90, opacity: 0 },
          animate: { rotateY: 0, opacity: 1 },
          exit: { rotateY: -90, opacity: 0 },
        }
      case "rotate":
        return {
          initial: { rotate: 5, opacity: 0 },
          animate: { rotate: 0, opacity: 1 },
          exit: { rotate: -5, opacity: 0 },
        }
      case "fade":
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        }
    }
  }

  const variants = getVariants()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ duration, ease: "easeInOut" }}
        className={cn("", className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
