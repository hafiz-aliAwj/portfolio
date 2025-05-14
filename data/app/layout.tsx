import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import ParticlesCursor from "@/components/ParticlesCursor"
// import AnimatedCursor from "@/components/animated-cursor"
// import { VisitorLogger } from "@/components/visitor-logger"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfolio | Creative Developer",
  description: "Personal portfolio showcasing projects, skills, and experience",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} hide-scrollbar`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* <VisitorLogger />
          <AnimatedCursor /> */}
          <ParticlesCursor />
          <div className="content-container">{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
