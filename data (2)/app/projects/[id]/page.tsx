import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { ChevronLeft, Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GradientButton } from "@/components/gradient-button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedCube from "@/components/animated-cube"
import type { Project, PersonalDetailsi } from "@/lib/models"

// Mock data for when APIs don't return data
const mockProjects: Record<string, Project> = {
  "1": {
    _id: "1",
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with product management, cart, and checkout functionality.",
    longDescription:
      "This project is a comprehensive e-commerce solution built with Next.js, featuring product management, shopping cart, secure checkout, and admin dashboard.",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    technologies: ["React", "Next.js", "MongoDB", "Stripe"],
    keywords: ["e-commerce", "web app", "fullstack"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    features: ["User authentication", "Product search", "Payment processing", "Order tracking"],
    client: "Retail Solutions Inc.",
    duration: "4 months",
    role: "Lead Developer",
    sequence: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  "2": {
    _id: "2",
    title: "Portfolio Website",
    description: "A modern portfolio website showcasing projects and skills with animations and interactions.",
    longDescription:
      "A responsive portfolio website built with Next.js and Framer Motion, featuring smooth animations, dark mode, and contact form.",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    technologies: ["React", "Next.js", "Framer Motion", "Tailwind CSS"],
    keywords: ["portfolio", "animation", "frontend"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    features: ["Responsive design", "Dark mode", "Animated transitions", "Contact form"],
    client: "Creative Designer",
    duration: "2 months",
    role: "Frontend Developer",
    sequence: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
}

const mockRelatedProjects: Project[] = [
  {
    _id: "3",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team features.",
    images: ["/placeholder.svg?height=400&width=600"],
    technologies: ["React", "Firebase", "Tailwind CSS"],
    keywords: ["productivity", "web app"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    sequence: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "4",
    title: "Weather Dashboard",
    description: "A weather dashboard with location search and 7-day forecast.",
    images: ["/placeholder.svg?height=400&width=600"],
    technologies: ["React", "API Integration", "Chart.js"],
    keywords: ["weather", "dashboard"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    sequence: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const mockPersonalDetails: PersonalDetailsi = {
  name: "Ali Awj",
  title: "Full Stack Developer",
  email: "contact@example.com",
  phone: "+1 (234) 567-890",
  location: "New York, USA",
  bio: "Passionate about creating beautiful, functional, and accessible websites with impressive animations and interactions.",
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  createdAt: new Date(),
  updatedAt: new Date(),
}

async function getProject(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/projects/${id}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      return mockProjects[id] || null
    }

    const data = await res.json()
    return data.project || mockProjects[id] || null
  } catch (error) {
    console.error("Error fetching project:", error)
    return mockProjects[id] || null
  }
}

async function getProjectMetadata(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/projects/metadata?id=${id}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data.metadata || null
  } catch (error) {
    console.error("Error fetching project metadata:", error)
    return null
  }
}

async function getRelatedProjects(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/projects/related?id=${id}&limit=3`, {
      cache: "no-store",
    })

    if (!res.ok) {
      return mockRelatedProjects
    }

    const data = await res.json()
    return data.relatedProjects && data.relatedProjects.length > 0 ? data.relatedProjects : mockRelatedProjects
  } catch (error) {
    console.error("Error fetching related projects:", error)
    return mockRelatedProjects
  }
}

async function getPersonalDetails() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/details`, {
      cache: "no-store",
    })

    if (!res.ok) {
      return mockPersonalDetails
    }

    const data = await res.json()
    return data.details || mockPersonalDetails
  } catch (error) {
    console.error("Error fetching personal details:", error)
    return mockPersonalDetails
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const metadata = await getProjectMetadata(params.id)
  const project = await getProject(params.id)

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    }
  }

  return {
    title: metadata?.title || project.title,
    description: metadata?.description || project.description,
    keywords: metadata?.keywords || project.keywords.join(", "),
    openGraph: {
      title: metadata?.title || project.title,
      description: metadata?.description || project.description,
      images: [metadata?.image || project.images[0] || "/placeholder.svg?height=600&width=1200"],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata?.title || project.title,
      description: metadata?.description || project.description,
      images: [metadata?.image || project.images[0] || "/placeholder.svg?height=600&width=1200"],
    },
  }
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  const relatedProjects = await getRelatedProjects(params.id)
  const personalDetails = await getPersonalDetails()

  return (
    <>
      <Navbar />

      <main className="pt-24 pb-16 mobile-container">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/#projects" className="hover-target">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>

          {/* Project Header */}
          <div className="mb-12 relative">
            <div className="absolute -top-16 -right-16 opacity-20 hidden lg:block">
              <AnimatedCube size={150} color="primary" speed={5} />
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech: string) => (
                <Badge key={tech} variant="secondary" className="animate-in stagger-1">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <GradientButton
                gradientFrom="from-blue-600"
                gradientTo="to-purple-600"
                hoverGradientFrom="from-purple-600"
                hoverGradientTo="to-blue-600"
                className="animate-in stagger-2"
                asChild
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </GradientButton>

              <GradientButton
                variant="outline"
                gradientFrom="from-blue-600"
                gradientTo="to-purple-600"
                hoverGradientFrom="from-purple-600"
                hoverGradientTo="to-blue-600"
                className="animate-in stagger-3"
                asChild
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </GradientButton>
            </div>
          </div>

          {/* Project Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {project.images.map((image: string, index: number) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow-md transform transition-all duration-500 hover:scale-105 hover:shadow-xl animate-in"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <Image
                  src={image || "/placeholder.svg?height=400&width=600"}
                  alt={`${project.title} - Image ${index + 1}`}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>

          {/* Project Description */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2 animate-in stagger-1">
              <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Project Overview
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg mb-6">{project.description}</p>
                {project.longDescription && <p>{project.longDescription}</p>}
              </div>

              {project.features && project.features.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Key Features
                  </h3>
                  <ul className="list-none space-y-2">
                    {project.features.map((feature: string, index: number) => (
                      <li
                        key={index}
                        className="text-lg flex items-center animate-in"
                        style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                      >
                        <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="animate-in stagger-2">
              <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Project Details
              </h3>
              <div className="space-y-4 bg-muted/30 p-6 rounded-lg border border-border">
                {project.client && (
                  <div className="animate-in" style={{ animationDelay: "0.4s" }}>
                    <h4 className="text-sm font-semibold text-muted-foreground">Client</h4>
                    <p className="text-lg">{project.client}</p>
                  </div>
                )}

                {project.duration && (
                  <div className="animate-in" style={{ animationDelay: "0.5s" }}>
                    <h4 className="text-sm font-semibold text-muted-foreground">Duration</h4>
                    <p className="text-lg">{project.duration}</p>
                  </div>
                )}

                {project.role && (
                  <div className="animate-in" style={{ animationDelay: "0.6s" }}>
                    <h4 className="text-sm font-semibold text-muted-foreground">My Role</h4>
                    <p className="text-lg">{project.role}</p>
                  </div>
                )}

                <div className="animate-in" style={{ animationDelay: "0.7s" }}>
                  <h4 className="text-sm font-semibold text-muted-foreground">Technologies</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech: string, index: number) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="animate-in"
                        style={{ animationDelay: `${0.8 + index * 0.05}s` }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="animate-in" style={{ animationDelay: "0.9s" }}>
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Related Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((relatedProject: Project, index: number) => (
                  <div
                    key={relatedProject._id?.toString()}
                    className="rounded-lg overflow-hidden shadow-md border border-border hover:border-primary/50 transition-all duration-300 animate-in"
                    style={{ animationDelay: `${1 + index * 0.1}s` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedProject.images[0] || "/placeholder.svg?height=400&width=600"}
                        alt={relatedProject.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2">{relatedProject.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{relatedProject.description}</p>
                      <GradientButton
                        size="sm"
                        gradientFrom="from-blue-600"
                        gradientTo="to-purple-600"
                        hoverGradientFrom="from-purple-600"
                        hoverGradientTo="to-blue-600"
                        asChild
                      >
                        <Link href={`/projects/${relatedProject._id}`}>View Project</Link>
                      </GradientButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer personalDetails={personalDetails} />
    </>
  )
}
