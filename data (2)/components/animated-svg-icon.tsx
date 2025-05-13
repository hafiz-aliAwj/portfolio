"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedSvgIconProps {
  className?: string
  pathClassName?: string
  strokeWidth?: number
  duration?: number
  delay?: number
  repeat?: boolean
  color?: string
  size?: number
  viewBox?: string
  path: string
  pathProps?: React.SVGProps<SVGPathElement>
}

export default function AnimatedSvgIcon({
  className,
  pathClassName,
  strokeWidth = 2,
  duration = 2,
  delay = 0,
  repeat = false,
  color = "currentColor",
  size = 24,
  viewBox = "0 0 24 24",
  path,
  pathProps,
}: AnimatedSvgIconProps) {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: !repeat, margin: "-100px" })

  return (
    <motion.svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay }}
      className={cn("", className)}
    >
      <motion.path
        d={path}
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration, delay, ease: "easeInOut" }}
        className={cn("", pathClassName)}
        {...pathProps}
      />
    </motion.svg>
  )
}
