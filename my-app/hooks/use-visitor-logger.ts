"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Hook to log visitor information on page visits
 * @param options Optional configuration for the visitor logger
 * @returns void
 */
export function useVisitorLogger(options?: {
  includePathInDeps?: boolean
  additionalInfo?: {
    email?: string
    name?: string
    location?: string
  }
}) {
  const pathname = usePathname()

  useEffect(
    () => {
      // Don't log visits during development if needed
      if (process.env.NODE_ENV === "development" && process.env.SKIP_VISITOR_LOGGING === "true") {
        return
      }

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
              ...options?.additionalInfo,
            }),
          })
        } catch (error) {
          console.error("Error logging visit:", error)
        }
      }

      // Log the visit
      logVisit()

      // We only want to add pathname to dependencies if specified
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    options?.includePathInDeps ? [pathname, options.additionalInfo] : [options?.additionalInfo],
  )
}
