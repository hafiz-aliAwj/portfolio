"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  User,
  Briefcase,
  GraduationCap,
  Code,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  UserPlus,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Personal Details",
    href: "/admin/personal-details",
    icon: <User className="h-5 w-5" />,
  },
  {
    title: "Projects",
    href: "/admin/projects",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    title: "Experience",
    href: "/admin/experience",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    title: "Education",
    href: "/admin/education",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    title: "Skills",
    href: "/admin/skills",
    icon: <Code className="h-5 w-5" />,
  },
  {
    title: "Messages",
    href: "/admin/messages",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Register User",
    href: "/admin/register",
    icon: <UserPlus className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings className="h-5 w-5" />,
  },
  {
    title: "Visitor Logs",
    href: "/admin/visitor-logs",
    icon: <Activity className="h-5 w-5" />,
  },
]

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useMobile()

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)} className="hover-target">
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.aside
            initial={{ x: isMobile ? -256 : 0 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ duration: 0.3 }}
            className={cn("fixed top-0 left-0 z-40 h-screen w-64 bg-background border-r", isMobile ? "shadow-lg" : "")}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <Link href="/admin" className="text-xl font-bold">
                  Admin Panel
                </Link>
                <ThemeToggle />
              </div>

              <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-1">
                  {sidebarLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors hover-target",
                          pathname === link.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                        )}
                      >
                        {link.icon}
                        <span className="ml-3">{link.title}</span>
                        {pathname === link.href && <ChevronRight className="ml-auto h-4 w-4" />}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="p-4 border-t">
                <Button variant="destructive" className="w-full hover-target" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}
