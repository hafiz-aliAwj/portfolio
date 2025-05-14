import { Suspense } from "react"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import ExperienceSection from "@/components/experience-section"
import EducationSection from "@/components/education-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import SectionDivider from "@/components/section-divider"
import ParticleBackground from "@/components/particle-background"
import ScrollIndicator from "@/components/scroll-indicator"
// import MouseTrail from "@/components/mouse-trail"
import PageTransition from "@/components/page-transition"
import ScrollContainer from "@/components/scroll-container"
import type { PersonalDetailsi, Skilli, Project, Experiencei, Educationi } from "@/lib/models"

// Mock data for when APIs don't return data
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

const mockSkills: Skilli[] = [
  {
    name: "React",
    level: 90,
    category: "Frontend",
    sequence: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "TypeScript",
    level: 85,
    category: "Frontend",
    sequence: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Next.js",
    level: 88,
    category: "Frontend",
    sequence: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Tailwind CSS",
    level: 92,
    category: "Frontend",
    sequence: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Node.js",
    level: 80,
    category: "Backend",
    sequence: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Express",
    level: 82,
    category: "Backend",
    sequence: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "MongoDB",
    level: 78,
    category: "Backend",
    sequence: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Figma",
    level: 75,
    category: "Design",
    sequence: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const mockProjects: Project[] = [
  {
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with product management, cart, and checkout functionality.",
    longDescription:
      "This project is a comprehensive e-commerce solution built with Next.js, featuring product management, shopping cart, secure checkout, and admin dashboard.",
    images: ["/placeholder.svg?height=400&width=600"],
    technologies: ["React", "Next.js", "MongoDB", "Stripe"],
    keywords: ["e-commerce", "web app", "fullstack"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    features: ["User authentication", "Product search", "Payment processing", "Order tracking"],
    sequence: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Portfolio Website",
    description: "A modern portfolio website showcasing projects and skills with animations and interactions.",
    longDescription:
      "A responsive portfolio website built with Next.js and Framer Motion, featuring smooth animations, dark mode, and contact form.",
    images: ["/placeholder.svg?height=400&width=600"],
    technologies: ["React", "Next.js", "Framer Motion", "Tailwind CSS"],
    keywords: ["portfolio", "animation", "frontend"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    features: ["Responsive design", "Dark mode", "Animated transitions", "Contact form"],
    sequence: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team features.",
    longDescription:
      "A task management application with real-time updates, team collaboration features, and progress tracking.",
    images: ["/placeholder.svg?height=400&width=600"],
    technologies: ["React", "Firebase", "Tailwind CSS", "Redux"],
    keywords: ["productivity", "web app", "collaboration"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    features: ["Task creation and assignment", "Real-time updates", "Team management", "Progress tracking"],
    sequence: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const mockExperiences: Experiencei[] = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    period: "2021 - Present",
    description:
      "Leading the frontend development team, implementing new features, and optimizing performance for a SaaS platform with over 100,000 users.",
    skills: ["React", "TypeScript", "Next.js", "GraphQL"],
    sequence: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    period: "2018 - 2021",
    description:
      "Developed and maintained multiple web applications, implemented responsive designs, and integrated third-party APIs.",
    skills: ["JavaScript", "Node.js", "MongoDB", "Express"],
    sequence: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Frontend Developer",
    company: "Creative Web Agency",
    period: "2016 - 2018",
    description:
      "Created responsive websites for clients across various industries, focusing on performance and user experience.",
    skills: ["HTML", "CSS", "JavaScript", "jQuery"],
    sequence: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const mockEducation: Educationi[] = [
  {
    institution: "University of Technology",
    degree: "Master's",
    field: "Computer Science",
    period: "2014 - 2016",
    description:
      "Specialized in web technologies and software engineering with a focus on modern JavaScript frameworks.",
    achievements: ["Graduated with honors", "Published research paper on web performance optimization"],
    sequence: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    institution: "State University",
    degree: "Bachelor's",
    field: "Software Engineering",
    period: "2010 - 2014",
    description: "Comprehensive program covering software development principles, algorithms, and web technologies.",
    achievements: ["Dean's List", "Led student web development club"],
    sequence: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

 


export default async function Home() {

  const [personalDetails, skills, projects, experiences, education] =  [
    mockPersonalDetails,mockSkills,mockProjects,mockExperiences,mockEducation
  ]

  return (
    <ScrollContainer disableScrollbar={true}>
      <ScrollIndicator showPercentage />
      {/* <MouseTrail /> */}
      <Navbar />

      <PageTransition type="fade">
        <ParticleBackground particleCount={150} connectParticles />

        <Suspense fallback={<div>Loading...</div>}>
          <HeroSection personalDetails={personalDetails} />
        </Suspense>

        <SectionDivider variant="wave" />

        <Suspense fallback={<div>Loading...</div>}>
          <SkillsSection skills={skills} />
        </Suspense>

        <SectionDivider variant="curve" flip />

        <Suspense fallback={<div>Loading...</div>}>
          <ProjectsSection projects={projects} />
        </Suspense>

        <SectionDivider variant="triangle" />

        <Suspense fallback={<div>Loading...</div>}>
          <ExperienceSection experiences={experiences} />
        </Suspense>

        <SectionDivider variant="zigzag" flip />

        <Suspense fallback={<div>Loading...</div>}>
          <EducationSection education={education} />
        </Suspense>

        <SectionDivider variant="wave" />

        <Suspense fallback={<div>Loading...</div>}>
          <ContactSection personalDetails={personalDetails} />
        </Suspense>

        <Footer personalDetails={personalDetails} />
      </PageTransition>
    </ScrollContainer>
  )
}
