"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Heart } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import SocialLinks from "@/components/social-links"
import type { PersonalDetailsi } from "@/lib/models"

interface FooterProps {
  personalDetails?: PersonalDetailsi
}

export default function Footer({ personalDetails }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-bold mb-4">About</h3>
            <p className="text-muted-foreground mb-4">
              {personalDetails?.bio?.substring(0, 150) ||
                "Passionate developer focused on creating beautiful, functional websites and applications with modern technologies and best practices."}
              {personalDetails?.bio && personalDetails.bio.length > 150 ? "..." : ""}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#about"
                  className="text-muted-foreground hover:text-primary transition-colors hover-target"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#skills"
                  className="text-muted-foreground hover:text-primary transition-colors hover-target"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/#projects"
                  className="text-muted-foreground hover:text-primary transition-colors hover-target"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/#experience"
                  className="text-muted-foreground hover:text-primary transition-colors hover-target"
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-muted-foreground hover:text-primary transition-colors hover-target"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <address className="not-italic text-muted-foreground mb-4">
              <p>{personalDetails?.location || "New York, USA"}</p>
              <p>{personalDetails?.email || "contact@example.com"}</p>
              <p>{personalDetails?.phone || "+1 (234) 567-890"}</p>
            </address>

            <div className="flex items-center space-x-4">
              <SocialLinks socialLinks={personalDetails?.socialLinks} variant="ghost" size="sm" />
<nav className="flex items-center space-x-4">
  <ThemeToggle />
</nav>

            </div>
          </motion.div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} {personalDetails?.name || "Portfolio"}. All rights reserved.
          </p>

          <p className="text-sm text-muted-foreground flex items-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> using Next.js and TypeScript
          </p>
        </div>
      </div>
    </footer>
  )
}
