"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface NumberCounterProps {
  end: number
  start?: number
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
  className?: string
  once?: boolean
  decimals?: number
  separator?: string
}

export default function NumberCounter({
  end,
  start = 0,
  duration = 2,
  delay = 0,
  prefix = "",
  suffix = "",
  className,
  once = true,
  decimals = 0,
  separator = ",",
}: NumberCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once, margin: "-100px" })
  const [count, setCount] = useState(start)

  // Format number with separators and decimals
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: true,
    })
      .format(num)
      .replace(/,/g, separator)
  }

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number
    const totalChange = end - start

    const easeOutQuad = (t: number) => t * (2 - t)

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const runtime = timestamp - startTime
      const relativeProgress = runtime / (duration * 1000)
      const easedProgress = easeOutQuad(Math.min(relativeProgress, 1))
      const value = start + totalChange * easedProgress

      setCount(value)

      if (runtime < duration * 1000) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    const startAnimation = () => {
      animationFrame = requestAnimationFrame(animate)
    }

    const timeoutId = setTimeout(startAnimation, delay * 1000)

    return () => {
      clearTimeout(timeoutId)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isInView, start, end, duration, delay])

  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
    >
      {prefix}
      {formatNumber(count)}
      {suffix}
    </motion.span>
  )
}
