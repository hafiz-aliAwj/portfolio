"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

interface ScrollContainerProps {
  children: React.ReactNode
  className?: string
  disableScrollbar?: boolean
}

export default function ScrollContainer({ children, className, disableScrollbar = false }: ScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  useEffect(() => {
    if (!containerRef.current) return

    // Function to handle overflow issues
    const handleOverflow = () => {
      const container = containerRef.current
      if (!container) return

      // Ensure container doesn't exceed viewport width
      const viewportWidth = window.innerWidth
      if (container.scrollWidth > viewportWidth) {
        container.style.maxWidth = `${viewportWidth}px`
      }
    }

    // Apply initial overflow handling
    handleOverflow()

    // Handle resize events
    window.addEventListener("resize", handleOverflow)
    return () => window.removeEventListener("resize", handleOverflow)
  }, [])

  // Apply scrollbar hiding on mobile if needed
  useEffect(() => {
    if (isMobile && disableScrollbar) {
      document.body.classList.add("hide-scrollbar")
    } else {
      document.body.classList.remove("hide-scrollbar")
    }

    return () => {
      document.body.classList.remove("hide-scrollbar")
    }
  }, [isMobile, disableScrollbar])

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full max-w-[100vw] overflow-x-hidden",
        disableScrollbar && isMobile && "overflow-y-hidden",
        className,
      )}
    >
      {children}
    </div>
  )
}
