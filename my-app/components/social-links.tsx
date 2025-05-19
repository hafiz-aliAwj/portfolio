"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Instagram, Facebook, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SocialLinksProps {
  socialLinks?: {
    github?: string
    linkedin?: string
    twitter?: string
    instagram?: string
    facebook?: string
    [key: string]: string | undefined
  }
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export default function SocialLinks({ socialLinks, className, variant = "default", size = "icon" }: SocialLinksProps) {
  const [links, setLinks] = useState<Array<{ name: string; url: string; icon: JSX.Element }>>([])

  useEffect(() => {
    if (socialLinks) {
      const formattedLinks = []

      if (socialLinks.github) {
        formattedLinks.push({
          name: "GitHub",
          url: socialLinks.github,
          icon: <Github className="h-5 w-5" />,
        })
      }

      if (socialLinks.linkedin) {
        formattedLinks.push({
          name: "LinkedIn",
          url: socialLinks.linkedin,
          icon: <Linkedin className="h-5 w-5" />,
        })
      }

      if (socialLinks.twitter) {
        formattedLinks.push({
          name: "Twitter",
          url: socialLinks.twitter,
          icon: <Twitter className="h-5 w-5" />,
        })
      }

      if (socialLinks.instagram) {
        formattedLinks.push({
          name: "Instagram",
          url: socialLinks.instagram,
          icon: <Instagram className="h-5 w-5" />,
        })
      }

      if (socialLinks.facebook) {
        formattedLinks.push({
          name: "Facebook",
          url: socialLinks.facebook,
          icon: <Facebook className="h-5 w-5" />,
        })
      }

      // Handle any other social links
      Object.entries(socialLinks).forEach(([key, value]) => {
        if (value && !["github", "linkedin", "twitter", "instagram", "facebook"].includes(key)) {
          formattedLinks.push({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            url: value,
            icon: <Globe className="h-5 w-5" />,
          })
        }
      })

      setLinks(formattedLinks)
    }
  }, [socialLinks])

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {links.map((link, index) => (
        <motion.div
          key={link.name}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.1 }}
        >
          <Button variant={variant} size={size} className="hover-target" asChild>
            <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
              {link.icon}
            </a>
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
