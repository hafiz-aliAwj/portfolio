"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Github, ExternalLink, ChevronRight } from "lucide-react"
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

  // Extract unique technologies from all projects
  const allTechnologies = projects.reduce<string[]>((acc, project) => {
    project.technologies.forEach((tech) => {
      if (!acc.includes(tech)) {
        acc.push(tech)
      }
    })
    return acc
  }, [])

  const filteredProjects = activeFilter
    ? projects.filter((project) => project.technologies.includes(activeFilter))
    : projects

  return (
    <section id="projects" className="py-20">
      <Container>
        <SectionHeading title="My Projects" subtitle="Check out some of my recent work and personal projects." />

        {/* Filter Buttons - Scrollable container for mobile */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <div className="flex flex-nowrap gap-2">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all hover-target whitespace-nowrap",
                activeFilter === null ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/80",
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
                  activeFilter === tech ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/80",
                )}
                onClick={() => setActiveFilter(tech)}
              >
                {tech}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id?.toString() || index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="parallax-card"
              whileHover={{ scale: 1.03 }}
            >
              <Card className="overflow-hidden h-full border-2 hover:border-primary/50 transition-all duration-300 hover-target">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.images[0] || "/placeholder.svg?height=400&width=600"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                <CardContent className="p-6 parallax-card-content">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="font-normal">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="font-normal">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>

                  <p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>

                  <div className="flex items-center justify-between mt-auto pt-4">
                    <div className="flex space-x-2">
                      <Button size="icon" variant="outline" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="hover-target">
                          <Github className="h-4 w-4" />
                          <span className="sr-only">GitHub</span>
                        </a>
                      </Button>

                      <Button size="icon" variant="outline" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover-target">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">Live Demo</span>
                        </a>
                      </Button>
                    </div>

                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/projects/${project._id}`} className="hover-target">
                        Details
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found with the selected filter.</p>
          </div>
        )}
      </Container>
    </section>
  )
}
