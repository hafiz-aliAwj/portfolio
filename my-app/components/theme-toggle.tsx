"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"
import { Sun, Moon, Laptop } from "lucide-react"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleThemeChange = (theme: string) => {
    setTheme(theme)
    setOpen(false)
  }

  if (!mounted) return null

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-accent transition-colors"
        aria-label="Toggle theme"
        onClick={() => setOpen(!open)}
      >
        {resolvedTheme === "dark" ? (
          <Moon className="w-5 h-5 text-foreground" />
        ) : (
          <Sun className="w-5 h-5 text-foreground" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-popover border border-border z-50">
          <ul className="py-1 text-sm">
            <li>
              <button
                onClick={() => handleThemeChange("light")}
                className="flex items-center w-full px-4 py-2 hover:bg-muted"
              >
                <Sun className="w-4 h-4 mr-2" />
                Light
              </button>
            </li>
            <li>
              <button
                onClick={() => handleThemeChange("dark")}
                className="flex items-center w-full px-4 py-2 hover:bg-muted"
              >
                <Moon className="w-4 h-4 mr-2" />
                Dark
              </button>
            </li>
            <li>
              <button
                onClick={() => handleThemeChange("system")}
                className="flex items-center w-full px-4 py-2 hover:bg-muted"
              >
                <Laptop className="w-4 h-4 mr-2" />
                System
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}










// "use client"

// import { useTheme } from "next-themes"
// import { Button } from "@/components/ui/button"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Moon, Sun, Laptop } from "lucide-react"

// export function ThemeToggle() {
//   const { setTheme } = useTheme()

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="icon" className="hover-target">
//           <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//           <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => setTheme("light")}>
//           <Sun className="mr-2 h-4 w-4" />
//           <span>Light</span>
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("dark")}>
//           <Moon className="mr-2 h-4 w-4" />
//           <span>Dark</span>
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("system")}>
//           <Laptop className="mr-2 h-4 w-4" />
//           <span>System</span>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }
