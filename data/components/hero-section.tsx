"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PersonalDetailsi } from "@/lib/models";

interface HeroSectionProps {
  personalDetails?: PersonalDetailsi;
}

const spring = {
  type: "spring",
  stiffness: 400,
  damping: 20,
}

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
};

export default function HeroSection({ personalDetails }: HeroSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const details = personalDetails || mockPersonalDetails;

  const roles = [
    "Web Designer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setMousePosition({ x: x * 10, y: y * 10 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 md:px-20 overflow-hidden">
      {/* Keep your background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-16">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Hi, I'm {details.name}
          </h1>

          <motion.div
            className="text-xl md:text-2xl font-medium mb-4 text-primary dark:text-white"
            style={{
              perspective: 1000,
            }}
          >
            <motion.span
              style={{
                display: "inline-block",
                transformStyle: "preserve-3d",
              }}
              animate={{
                rotateX: mousePosition.y / 2,
                rotateY: -mousePosition.x / 2,
                transition: { type: "spring", stiffness: 100, damping: 20 },
              }}
            >
              I'm a{" "}
              <span className="inline-block bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                <Typewriter
                  words={roles}
                  loop
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </span>
            </motion.span>
          </motion.div>

          <p className="text-muted-foreground max-w-md mb-6 mx-auto md:mx-0">
            {details.bio}
          </p>

           <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-4">
      {/* Gradient Animated Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={spring}
        onClick={() => {
          const projectsSection = document.getElementById("projects")
          if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: "smooth" })
          }
        }}
        className="relative group inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-rose-500 shadow-lg transition-all duration-300"
      >
        <span className="relative z-10 flex items-center gap-2">
          View My Work
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </span>

        {/* Glow ring */}
        <motion.div
          className="absolute inset-0 rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 pointer-events-none"
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </motion.button>

      {/* Glassmorphic Button with Motion */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={spring}
        onClick={() => {
          const link = document.createElement("a")
          link.href = "/AliAwj.pdf"
          link.download = "AliAwj.pdf"
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }}
        className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-blue-600 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
      >
        <span className="flex items-center gap-2 z-10">
          Download CV
          <Download className="h-5 w-5" />
        </span>

        {/* Optional glow or highlight */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-white/5 blur-xl opacity-0 group-hover:opacity-30 transition-all duration-300 pointer-events-none"
          whileHover={{ opacity: 0.3 }}
        />
      </motion.button>
    </div>
        </motion.div>

        {/* 3D Profile Image */}
        <motion.div
          className="flex justify-center md:justify-end"
          animate={{
            rotateX: mousePosition.y,
            rotateY: -mousePosition.x,
            transition: { type: "spring", stiffness: 80, damping: 20 },
          }}
          style={{ perspective: "1200px" }}
        >
          <div
            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-xl bg-white/10 dark:bg-black/20"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
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
    </section>
  );
}
