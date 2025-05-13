import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export function getRandomColor(): string {
  const colors = [
    "from-purple-600 to-pink-600",
    "from-blue-600 to-purple-600",
    "from-green-600 to-blue-600",
    "from-yellow-600 to-red-600",
    "from-red-600 to-purple-600",
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}
