import { cn } from "@/lib/utils"

interface SectionDividerProps {
  className?: string
  variant?: "wave" | "curve" | "triangle" | "zigzag"
  flip?: boolean
  color?: string
}

export default function SectionDivider({
  className,
  variant = "wave",
  flip = false,
  color = "currentColor",
}: SectionDividerProps) {
  const renderDivider = () => {
    switch (variant) {
      case "wave":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className={cn("w-full h-full", flip && "rotate-180")}
            style={{ display: "block" }} // Ensure no extra space
          >
            <path
              fill={color}
              fillOpacity="1"
              d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></path>
          </svg>
        )
      case "curve":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className={cn("w-full h-full", flip && "rotate-180")}
            style={{ display: "block" }}
          >
            <path fill={color} fillOpacity="1" d="M0,96L1440,32L1440,0L0,0Z"></path>
          </svg>
        )
      case "triangle":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className={cn("w-full h-full", flip && "rotate-180")}
            style={{ display: "block" }}
          >
            <path fill={color} fillOpacity="1" d="M0,96L720,32L1440,96L1440,0L0,0Z"></path>
          </svg>
        )
      case "zigzag":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className={cn("w-full h-full", flip && "rotate-180")}
            style={{ display: "block" }}
          >
            <path
              fill={color}
              fillOpacity="1"
              d="M0,64L120,80C240,96,480,128,720,122.7C960,117,1200,75,1320,53.3L1440,32L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
            ></path>
          </svg>
        )
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className={cn("w-full h-full", flip && "rotate-180")}
            style={{ display: "block" }}
          >
            <path
              fill={color}
              fillOpacity="1"
              d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></path>
          </svg>
        )
    }
  }

  return <div className={cn("section-divider w-full h-24 overflow-hidden", className)}>{renderDivider()}</div>
}
