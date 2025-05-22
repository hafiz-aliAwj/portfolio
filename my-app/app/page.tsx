import { Suspense } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import ExperienceSection from "@/components/experience-section";
import EducationSection from "@/components/education-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import SectionDivider from "@/components/section-divider";
import ParticleBackground from "@/components/particle-background";
import ScrollIndicator from "@/components/scroll-indicator";
// import MouseTrail from "@/components/mouse-trail"
import PageTransition from "@/components/page-transition";
import ScrollContainer from "@/components/scroll-container";
import type {
  PersonalDetailsi,
  Skilli,
  Project,
  Experiencei,
  Educationi,
} from "@/lib/models";
import ParallaxBackground from "@/components/parallax-background";

// Mock data for when APIs don't return data
const mockPersonalDetails: PersonalDetailsi = {
  name: "Ali Awj",
  title: "Full Stack Developer",
  email: "hafizaliawj112@gmail.com",
  phone: "+92 322 2820828",
  location: "Karachi, Pakistan",
  bio: "Passionate about creating beautiful, functional, and accessible websites with impressive animations and interactions. Let's bring your digital vision to life!",
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockSkills: Skilli[] = [
  {
    name: "HTML",
    level: 95,
    category: "Frontend",
    sequence: 1,
    imgUrl: "/skills/html-1.svg",
  },
  { name: "CSS", level: 92, category: "Frontend", sequence: 2, imgUrl: "" },
  {
    name: "JavaScript",
    level: 90,
    category: "Frontend",
    sequence: 3,
    imgUrl: "",
  },
  {
    name: "TypeScript",
    level: 88,
    category: "Frontend",
    sequence: 4,
    imgUrl: "",
  },
  {
    name: "React.js",
    level: 90,
    category: "Frontend",
    sequence: 5,
    imgUrl: "",
  },
  { name: "Next.js", level: 88, category: "Frontend", sequence: 6, imgUrl: "" },
  { name: "Redux", level: 85, category: "Frontend", sequence: 7, imgUrl: "" },
  { name: "Zustand", level: 80, category: "Frontend", sequence: 8, imgUrl: "" },
  {
    name: "Tailwind CSS",
    level: 92,
    category: "Frontend",
    sequence: 9,
    imgUrl: "",
  },
  { name: "Shadcn", level: 84, category: "Frontend", sequence: 10, imgUrl: "" },
  { name: "Node.js", level: 85, category: "Backend", sequence: 11, imgUrl: "" },
  {
    name: "Express.js",
    level: 83,
    category: "Backend",
    sequence: 12,
    imgUrl: "",
  },
  {
    name: "MongoDB",
    level: 80,
    category: "Database",
    sequence: 13,
    imgUrl: "",
  },
  { name: "SQL", level: 78, category: "Database", sequence: 14, imgUrl: "" },
];

const mockProjects: Project[] = [
  {
    title: "Simmates",
    description:
      "A full-featured e-commerce platform with product management, cart, and checkout functionality.",
    longDescription: [
      "This project is a comprehensive e-commerce solution built with Next.js, featuring product management, shopping cart, secure checkout, and admin dashboard.",
    ],
    images: [
      "/projects/simmates/s1.png",
      "/projects/simmates/s2.png",
      "/projects/simmates/s3.png",
      "/projects/simmates/s4.png",
      "/projects/simmates/s5.png",
      "/projects/simmates/s6.png",
      "/projects/simmates/s7.png",
      "/projects/simmates/s8.png",
      "/projects/simmates/s9.png",
      "/projects/simmates/s10.png",
      "/projects/simmates/s11.png",
      "/projects/simmates/s12.png",
    ],
    technologies: ["React", "Next.js", "MongoDB", "Stripe"],
    keywords: ["e-commerce", "web app", "fullstack"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    features: [
      "User authentication",
      "Product search",
      "Payment processing",
      "Order tracking",
    ],
    sequence: 1,
  },
  {
    title: "Portfolio Website",
    description:
      "A modern portfolio website showcasing projects and skills with animations and interactions.",
    longDescription: [
      "A responsive portfolio website built with Next.js and Framer Motion, featuring smooth animations, dark mode, and contact form.",
    ],
    images: [
      "/projects/parking/p1.png",
      "/projects/parking/p2.png",
      "/projects/parking/p3.png",
      "/projects/parking/p4.png",
      "/projects/parking/p5.png",
      "/projects/parking/p6.png",
      "/projects/parking/p7.png",
      "/projects/parking/p8.png",
    ],
    technologies: ["React", "Next.js", "Framer Motion", "Tailwind CSS"],
    keywords: ["portfolio", "animation", "frontend"],
    githubUrl: "https://github.com",
    // liveUrl: "https://example.com",
    features: [
      "Responsive design",
      "Dark mode",
      "Animated transitions",
      "Contact form",
    ],
    sequence: 2,
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates and team features.",
    longDescription: [
      "A task management application with real-time updates, team collaboration features, and progress tracking.",
      "A task management application with real-time updates, team collaboration features, and progress tracking.",
    ],
    images: ["/projects/portfolio/port1.png", "/projects/portfolio/port2.png"],
    technologies: ["React", "Firebase", "Tailwind CSS", "Redux"],
    keywords: ["productivity", "web app", "collaboration"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    features: [
      "Task creation and assignment",
      "Real-time updates",
      "Team management",
      "Progress tracking",
    ],
    sequence: 3,
  },
  {
    title: "Portfolio Website",
    description:
      "A modern portfolio website showcasing projects and skills with animations and interactions.",
    longDescription: [
      "A responsive portfolio website built with Next.js and Framer Motion, featuring smooth animations, dark mode, and contact form.",
    ],
    images: ["/projects/assignment/1.png"],
    technologies: ["React", "Next.js", "Framer Motion", "Tailwind CSS"],
    keywords: ["portfolio", "animation", "frontend"],
    githubUrl: "https://github.com",
    // liveUrl: "https://example.com",
    features: [
      "Responsive design",
      "Dark mode",
      "Animated transitions",
      "Contact form",
    ],
    sequence: 2,
  },
];

const mockExperiences: Experiencei[] = [
  {
    title: "Web Developer Internee",
    company: "TeraHz Solutions",
    period: "Nov 2024 - March 2025",
    description: [
      "Designed and developed responsive user interfaces using Tailwind CSS and ShadCN, enhancing UI consistency and user experience.",
      "Ensured cross-device compatibility using mobile-first design and media queries, improving accessibility across all screen sizes",
      "Built backend functionality with Next.js API routes to support dynamic content rendering and server-side operations.",
      "Integrated Stripe payment gateway to enable secure and seamless online transactions for clients.",
      "Developed and optimized stored procedures in SQL Server, streamlining data retrieval and backend performance.",
      "Implemented Google and Facebook OAuth services for secure and user-friendly authentication.",
      "Created reusable, mobile-responsive HTML email templates for marketing and transactional communications.",
    ],

    skills: [
      "Next.js",
      "SQL Server",
      "Stripe API",
      "OAuth",
      "Tailwind CSS",
      "ShadCN",
    ],
    sequence: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Front End Developer Internee",
    company: "Invision Custom Solutions Inc.",
    period: "Summer 2023",
    description: [
      "Developed visually engaging websites using React.js and Next.js for both training and client-based projects",
      "Implemented responsive layouts using Tailwind CSS, Material UI, and custom CSS, ensuring seamless display across mobile and desktop platforms",
      "Enhanced user experience by building interactive UI components and forms using React state management and conditional rendering",
      "Collaborated on a client project, applying component-based architecture and design best practices to meet realworld business requirements",
    ],
    skills: ["React.js", "Next.js", "Material UI", "Tailwind CSS"],
    sequence: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockEducation: Educationi[] = [
  {
    institution: "University of Technology",
    degree: "Master's",
    field: "Computer Science",
    period: "2014 - 2016",
    description:
      "Specialized in web technologies and software engineering with a focus on modern JavaScript frameworks.",
    achievements: [
      "Graduated with honors",
      "Published research paper on web performance optimization",
    ],
    sequence: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    institution: "State University",
    degree: "Bachelor's",
    field: "Software Engineering",
    period: "2010 - 2014",
    description:
      "Comprehensive program covering software development principles, algorithms, and web technologies.",
    achievements: ["Dean's List", "Led student web development club"],
    sequence: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default async function Home() {
  const [personalDetails, skills, projects, experiences] = [
    mockPersonalDetails,
    mockSkills,
    mockProjects,
    mockExperiences,
  ];

  return (
    <ScrollContainer disableScrollbar={true}>
      <ScrollIndicator showPercentage />
      {/* <MouseTrail /> */}
      <Navbar />

      <PageTransition type="fade">
        {/* <ParallaxBackground /> */}
        <ParticleBackground particleCount={150} connectParticles />

        <Suspense fallback={<div>Loading...</div>}>
          <HeroSection personalDetails={personalDetails} />
        </Suspense>

        {/* <SectionDivider variant="wave" /> */}

        <Suspense fallback={<div>Loading...</div>}>
          <SkillsSection skills={skills} />
        </Suspense>

        {/* <SectionDivider variant="curve" flip /> */}

        <Suspense fallback={<div>Loading...</div>}>
          <ProjectsSection projects={projects} />
        </Suspense>

        {/* <SectionDivider variant="triangle" />/ */}

        <Suspense fallback={<div>Loading...</div>}>
          <ExperienceSection experiences={experiences} />
        </Suspense>

        {/* <SectionDivider variant="zigzag" flip /> */}

        {/* <Suspense fallback={<div>Loading...</div>}>
          <EducationSection education={education} />
        </Suspense> */}

        {/* <SectionDivider variant="wave" />/ */}

        <Suspense fallback={<div>Loading...</div>}>
          <ContactSection personalDetails={personalDetails} />
        </Suspense>

        <Footer personalDetails={personalDetails} />
      </PageTransition>
    </ScrollContainer>
  );
}
