"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Typewriter } from "react-simple-typewriter"
import { Download, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { PersonalDetailsi } from "@/lib/models"

interface HeroSectionProps {
  personalDetails?: PersonalDetailsi
}

// Mock data for when API doesn't return data
const mockPersonalDetails: PersonalDetailsi = {
  name: "Ali Awj",
  title: "Full Stack Developer",
  email: "contact@example.com",
  phone: "+1 (234) 567-890",
  location: "New York, USA",
  bio: "Passionate about creating beautiful, functional, and accessible websites with impressive animations and interactions. Let's bring your digital vision to life!",
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  createdAt: new Date(),
  updatedAt: new Date(),
}

export default function HeroSection({ personalDetails }: HeroSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const details = personalDetails || mockPersonalDetails

  const roles = ["Web Designer", "Web Developer", "Frontend Developer", "Backend Developer"]

  useEffect(() => {
    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2

      // Calculate distance from center (normalized to -1 to 1)
      const moveX = (clientX - centerX) / centerX
      const moveY = (clientY - centerY) / centerY

      setMousePosition({ x: moveX * 15, y: moveY * 15 })
    }

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      <div className="container mx-auto px-20 py-16 md:py-24 flex flex-col md:flex-row items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 mb-12 md:mb-0"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            Hi, I'm {details.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl font-medium mb-6 text-primary"
          >
            I'm a{" "}
            <span>
              <Typewriter words={roles} loop cursor cursorStyle="|" typeSpeed={70} deleteSpeed={50} delaySpeed={1500} />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-lg text-muted-foreground mb-8 max-w-lg"
          >
            {details.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              className="group hover-target"
              onClick={() => {
                const projectsSection = document.getElementById("projects")
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              View My Work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="hover-target"
              onClick={() => {
  const link = document.createElement("a")
  link.href = "/AliAwj.pdf"
  link.download = "AliAwj.pdf"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}}
            >
              Download CV
              <Download className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Content - Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full md:w-1/2 flex justify-center md:justify-end"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${-mousePosition.x}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt={details.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Animated Background Elements - Client-side only */}
      {/* <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {windowSize.width > 0 &&
          [...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "absolute rounded-full bg-primary/10 dark:bg-primary/5",
                i % 2 === 0 ? "w-64 h-64" : "w-96 h-96",
              )}
              initial={{
                x: Math.random() * windowSize.width * 0.8,
                y: Math.random() * windowSize.height * 0.8,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                x: [
                  Math.random() * windowSize.width * 0.8,
                  Math.random() * windowSize.width * 0.8,
                  Math.random() * windowSize.width * 0.8,
                ],
                y: [
                  Math.random() * windowSize.height * 0.8,
                  Math.random() * windowSize.height * 0.8,
                  Math.random() * windowSize.height * 0.8,
                ],
                scale: [Math.random() * 0.5 + 0.5, Math.random() * 0.7 + 0.3, Math.random() * 0.5 + 0.5],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 20 + i * 5,
                ease: "linear",
                repeatType: "reverse",
              }}
            />
          ))}
      </div> */}
    </section>
  )
}
