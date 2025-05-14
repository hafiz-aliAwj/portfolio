"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function VisitorLogger() {
  const pathname = usePathname()

  useEffect(() => {
    // Function to log visitor
    const logVisit = async () => {
      try {
        await fetch("/api/visitor-log", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: pathname,
          }),
        })
        console.log("Visit logged successfully")
      } catch (error) {
        console.error("Error logging visit:", error)
      }
    }

    // Log the visit
    logVisit()

    // We don't want to add pathname to dependencies array
    // because we only want to log once per page, not on every re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // This component doesn't render anything
  return null
}
