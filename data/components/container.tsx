import type React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export default function Container({ children, className, as: Component = "div" }: ContainerProps) {
  return (
    <Component className={cn("container mx-auto px-4 w-full box-border", "max-w-[100vw] overflow-x-hidden", className)}>
      {children}
    </Component>
  )
}
