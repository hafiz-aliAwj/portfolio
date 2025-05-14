"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface TimelineItem {
  id: string | number
  title: string
  subtitle?: string
  content: React.ReactNode
  date?: string
  icon?: React.ReactNode
}

interface AnimatedTimelineProps {
  items: TimelineItem[]
  className?: string
  lineColor?: string
  dotColor?: string
  dotSize?: number
  lineWidth?: number
  alternating?: boolean
}

export default function AnimatedTimeline({
  items,
  className,
  lineColor = "hsl(var(--primary))",
  dotColor = "hsl(var(--primary))",
  dotSize = 16,
  lineWidth = 2,
  alternating = true,
}: AnimatedTimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Timeline line */}
      <div
        className="absolute left-[calc(var(--dot-size)/2)] top-0 bottom-0 -translate-x-1/2 md:left-1/2"
        style={{
          "--dot-size": `${dotSize}px`,
          width: lineWidth,
          backgroundColor: lineColor,
        }}
      />

      {/* Timeline items */}
      <div className="relative">
        {items.map((item, index) => (
          <TimelineItemComponent
            key={item.id}
            item={item}
            index={index}
            dotColor={dotColor}
            dotSize={dotSize}
            alternating={alternating}
          />
        ))}
      </div>
    </div>
  )
}

interface TimelineItemComponentProps {
  item: TimelineItem
  index: number
  dotColor: string
  dotSize: number
  alternating: boolean
}

function TimelineItemComponent({ item, index, dotColor, dotSize, alternating }: TimelineItemComponentProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Determine if item should be on left or right side
  const isEven = index % 2 === 0
  const isLeft = alternating ? isEven : true

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex flex-col md:flex-row items-start mb-12 last:mb-0",
        alternating && !isLeft && "md:flex-row-reverse",
      )}
    >
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute left-0 md:left-1/2 top-0 -translate-x-1/2 z-10 rounded-full flex items-center justify-center"
        style={{
          width: dotSize,
          height: dotSize,
          backgroundColor: dotColor,
        }}
      >
        {item.icon && (
          <span className="text-white" style={{ fontSize: dotSize * 0.6 }}>
            {item.icon}
          </span>
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={cn(
          "pl-8 md:pl-0 w-full md:w-[calc(50%-20px)]",
          alternating ? (isLeft ? "md:pr-12" : "md:pl-12") : "md:pl-12",
        )}
      >
        {item.date && <div className="text-sm font-medium text-muted-foreground mb-1">{item.date}</div>}
        <h3 className="text-xl font-bold mb-1">{item.title}</h3>
        {item.subtitle && <div className="text-primary font-medium mb-2">{item.subtitle}</div>}
        <div className="text-muted-foreground">{item.content}</div>
      </motion.div>
    </div>
  )
}
