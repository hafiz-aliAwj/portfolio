"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Zoom from "react-medium-image-zoom"
import 'react-medium-image-zoom/dist/styles.css'
import { Github, ExternalLink, ChevronLeft, ChevronRight, Play, Pause, Maximize2 } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SectionHeading from "@/components/section-heading"
import Container from "@/components/container"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/models"

interface ProjectsSectionProps {
  projects?: Project[]
}

export default function ProjectsSection({ projects = [] }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState(false)
  const [transitionType, setTransitionType] = useState<"fade" | "slide" | "zoom">("fade")
  const modalRef = useRef<HTMLDivElement | null>(null)

  const allTechnologies = projects.reduce<string[]>((acc, project) => {
    project.technologies.forEach((tech) => {
      if (!acc.includes(tech)) acc.push(tech)
    })
    return acc
  }, [])

  const filteredProjects = activeFilter
    ? projects.filter((project) => project.technologies.includes(activeFilter))
    : projects

  const openModal = (project: Project, index: number) => {
    setSelectedProject(project)
    setCurrentImageIndex(index)
    setIsModalOpen(true)
    setIsSlideshowPlaying(false) // Manual trigger
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
    setIsSlideshowPlaying(false)
  }

  const toggleSlideshow = () => setIsSlideshowPlaying((prev) => !prev)

  const nextImage = () => {
    if (!selectedProject) return
    setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length)
  }

  const prevImage = () => {
    if (!selectedProject) return
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedProject.images.length - 1 : prev - 1
    )
  }

  useEffect(() => {
    if (!isSlideshowPlaying || !selectedProject) return
    const interval = setInterval(nextImage, 3000)
    return () => clearInterval(interval)
  }, [isSlideshowPlaying, selectedProject])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleCloseModal()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [selectedProject])

  return (
    <section id="projects" className="py-20 overflow-hidden">
      <Container>
        <SectionHeading
          title="My Projects"
          subtitle="Check out some of my recent work and personal projects."
        />

        {/* Filters */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <div className="flex flex-nowrap gap-2">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all hover-target whitespace-nowrap",
                activeFilter === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              )}
              onClick={() => setActiveFilter(null)}
            >
              All
            </motion.button>

            {allTechnologies.map((tech, index) => (
              <motion.button
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all hover-target whitespace-nowrap",
                  activeFilter === tech
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                )}
                onClick={() => setActiveFilter(tech)}
              >
                {tech}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id?.toString() || index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="parallax-card"
            >
              <Card className="overflow-hidden h-full border-2 hover:border-primary/50 transition-all duration-300 relative">
                {/* Hover Image with Icon */}
                <div
                  className="relative h-48 overflow-hidden cursor-pointer group"
                  onClick={() => openModal(project, 0)}
                >
                  <Image
                    src={project.images[0] || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Maximize2 className="text-white w-6 h-6" />
                  </div>
                </div>

                <CardContent className="p-6 parallax-card-content flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="font-normal">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>

                 <div className="flex items-center justify-between mt-auto pt-4">
  <div className="flex space-x-2">
    {project.githubUrl && (
      <Button asChild variant="outline" className="gap-1">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <Github className="h-4 w-4" />
          <span className="text-xs">GitHub</span>
        </a>
      </Button>
    )}
    {project.liveUrl && (
      <Button asChild variant="outline" className="gap-1">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <ExternalLink className="h-4 w-4" />
          <span className="text-xs">Live</span>
        </a>
      </Button>
    )}
  </div>
</div>

                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects found with the selected filter.
            </p>
          </div>
        )}
      </Container>

      {/* Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 h-full flex justify-center items-center px-4">
          <div
            ref={modalRef}
            className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl"
          >
            {/* Close */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full z-10"
            >
              &times;
            </button>

            {/* Animated Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{
                  opacity: 0,
                  x: transitionType === "slide" ? 100 : 0,
                  scale: transitionType === "zoom" ? 0.8 : 1,
                }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  x: transitionType === "slide" ? -100 : 0,
                  scale: transitionType === "zoom" ? 0.8 : 1,
                }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-[32rem] bg-black"
              >
                <Zoom>
                  <Image
                    src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                    alt={selectedProject.title}
                    fill
                    className="object-contain"
                  />
                </Zoom>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="absolute inset-y-0 left-0 flex items-center px-3">
              <button
                onClick={prevImage}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full shadow-md"
              >
                <ChevronLeft size={24} />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center px-3">
              <button
                onClick={nextImage}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full shadow-md"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Controls */}
            <div className="flex justify-center items-center py-4 bg-black/80 space-x-4 flex-wrap">
              <button
                onClick={toggleSlideshow}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full shadow-md"
              >
                {isSlideshowPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <span className="text-white text-sm">
                {currentImageIndex + 1} / {selectedProject.images.length}
              </span>
              <select
                className="text-white bg-white/10 hover:bg-white/20 p-2 rounded shadow-md text-sm"
                value={transitionType}
                onChange={(e) => setTransitionType(e.target.value as any)}
              >
                <option value="fade">Fade</option>
                <option value="slide">Slide</option>
                <option value="zoom">Zoom</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
