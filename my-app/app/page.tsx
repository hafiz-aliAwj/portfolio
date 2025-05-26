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
  bio: "I'm a full stack developer with expertise in the MERN stack and Next.js. I specialize in building fast, scalable backends and crafting visually appealing, interactive, and accessible user interfaces. Whether it's a polished web app or a robust API, I bring ideas to life with clean code and thoughtful design.",
  socialLinks: {
    github: "https://github.com/hafiz-aliAwj",
    linkedin: "https://www.linkedin.com/in/ali-awj/",
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};


export const mockSkills: Skilli[] = [
  {
    name: "HTML",
    level: 90,
    category: "Frontend",
    sequence: 1,
    imgUrl: "/skills/html-1.svg",
  },
  { name: "CSS", level: 80, category: "Frontend", sequence: 2, imgUrl: "" },
  {
    name: "JavaScript",
    level: 80,
    category: "Frontend",
    sequence: 3,
    imgUrl: "",
  },
  {
    name: "TypeScript",
    level: 80,
    category: "Frontend",
    sequence: 4,
    imgUrl: "",
  },
  {
    name: "React.js",
    level: 80,
    category: "Frontend",
    sequence: 5,
    imgUrl: "",
  },
  { name: "Next.js", level: 85, category: "Frontend", sequence: 6, imgUrl: "" },
  { name: "Redux", level: 80, category: "Frontend", sequence: 7, imgUrl: "" },
  { name: "Zustand", level: 80, category: "Frontend", sequence: 8, imgUrl: "" },
  {
    name: "Tailwind CSS",
    level: 80,
    category: "Frontend",
    sequence: 9,
    imgUrl: "",
  },
  { name: "Shadcn", level: 80, category: "Frontend", sequence: 10, imgUrl: "" },
  { name: "Node.js", level: 80, category: "Backend", sequence: 11, imgUrl: "" },
  {
    name: "Express.js",
    level: 80,
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
  { name: "SQL", level: 75, category: "Database", sequence: 14, imgUrl: "" },
];

const mockProjects: Project[] = [
  {
    title: "Simmates",
   description:
  "A mobile-responsive eSIM purchasing platform offering region-based data plans, seamless authentication, and real-time eSIM management.",
longDescription: [
  "Simmates is a modern eSIM purchasing solution built with Next.js and SQL Server.",
  "Users can browse data plans by country or region and purchase packages based on their data needs and budget.",
  "Supports secure authentication via email, Google, or Facebook OAuth.",
  "Payments are processed through Stripe, with order confirmations and eSIM details delivered via email.",
  "Mobile-responsive design ensures a seamless experience across devices.",
  "Built using SQL Server stored procedures for efficient backend operations.",
  "Includes a user/admin portal to track transactions, manage purchased eSIMs, connect them to devices, and view data usage."
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
    technologies: ["Next.js",
      "SQL Server",
      "Stripe API",
      "OAuth",
      "Tailwind CSS",
      "ShadCN"],
   keywords: [
  "eSIM",
  "data plans",
  "Next.js",
  "SQL Server",
  "Stripe",
  "OAuth",
  "mobile-first",
  "telecom",
  "stored procedures",
  "responsive web app"
],
    liveUrl: "https://www.simmates.com",
    features: [
  "Country and region-based data plan browsing",
  "Secure user authentication (Email, Google, Facebook)",
  "Stripe-based payment processing",
  "Automated email delivery of eSIM details",
  "Mobile-responsive design",
  "Transaction and eSIM management portal",
  "Data usage monitoring",
],
    sequence: 1,
  },
  //{
   // title: "Parking Management",
  // description:
    //  "A modern portfolio website showcasing projects and skills with animations and interactions.",
   // longDescription: [
     // "A responsive portfolio website built with Next.js and F  ramer Motion, featuring smooth animations, dark mode, and contact form.",
   // // ],
   // images: [
    //  "/projects/parking/p1.png",
    //  "/projects/parking/p2.png",
  //    "/projects/parking/p3.png",
    //  "/projects/parking/p4.png",
     // "/projects/parking/p5.png",
     // "/projects/parking/p6.png",
     // "/projects/parking/p7.png",
     // "/projects/parking/p8.png",
  //  ],
   // technologies: ["React", "Next.js", "Framer Motion", "Tailwind CSS"],
   // keywords: ["portfolio", "animation", "frontend"],
   // githubUrl: "https://github.com",
    // liveUrl: "https://example.com",
   // features: [
     // "Responsive design",
      //"Dark mode",
      //"Animated transitions",
      //"Contact form",
    // ],
    // sequence: 2,
 // },
  {
    title: "Portfolio Website",
description:
  "A modern, mobile-responsive personal portfolio with animations, project showcases, and interactive features.",
longDescription: [
  "A fully responsive and visually engaging personal portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.",
  "Showcases development skills, featured projects, and professional experience with smooth transitions and animations.",
  "Includes a downloadable resume, interactive contact form, and support for both dark and light modes.",
  "Designed with a strong focus on performance, accessibility, and user experience across all devices.",
  "Serves as a personal branding platform to highlight frontend expertise and career accomplishments.",
],
images: ["/projects/portfolio/port1.png", "/projects/portfolio/port2.png"],
technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
keywords: [
  "portfolio",
  "personal website",
  "Next.js",
  "frontend development",
  "Framer Motion",
  "TypeScript",
  "responsive design",
  "dark mode",
  "resume",
  "contact form"
],
githubUrl: "https://github.com/hafiz-aliAwj/portfolio",
liveUrl: "https://ali-awj.vercel.app/",
features: [
  "Animated project and skills showcase",
  "Responsive design for all devices",
  "Framer Motion-powered transitions",
  "Dark mode and light mode support",
  "Downloadable resume",
  "Interactive contact form",
  "Professional experience timeline",
],
sequence: 3,
  },
  {
  title: "Assignment Portal Server",
  description:
    "A backend API for an assignment management system with role-based access, file storage, and scoring logic.",
  longDescription: [
    "A Node.js and Express.js-based backend for an assignment portal that supports both student and teacher roles.",
    "Integrates with Google Drive API to securely store and retrieve assignment files.",
    "Students can upload assignments via file or link, with validations and deadline enforcement.",
    "Teachers can create assignments with descriptions, deadlines, optional file attachments, and scoring criteria.",
    "Includes functionality for grading submissions, starring notable work, and generating a real-time leaderboard based on student rankings.",
    "Features secure authentication using JWT and optimized APIs for performance and scalability."
  ],
  images: ["/projects/assignment/1.png"],
  technologies: ["Node.js", "Express.js", "JWT", "Google Drive API"],
  keywords: [
    "Node.js",
    "backend",
    "Express.js",
    "assignment management",
    "Google Drive API",
    "REST API",
    "JWT authentication",
    "education tech",
    "leaderboard"
  ],
  githubUrl: "https://github.com/MRsabcod/AssignmentPortalServer",
  liveUrl: "https://assignment-portal-server-gamma.vercel.app/",
  features: [
    "Role-based authentication for students and teachers",
    "Assignment upload with file/link and deadline validation",
    "Teacher assignment creation with optional files and scoring",
    "Submission grading and feedback system",
    "Starred submissions for teachers",
    "Google Drive API file integration",
    "Leaderboard based on student scores",
    "Optimized RESTful APIs"
  ],
  sequence: 2
}

];

const mockExperiences: Experiencei[] = [
  {
    title: "Web Developer Intern",
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
    title: "Front End Developer Intern",
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
    institution: "Adamjee Govt. Science College",
    degree: "Intermediate",
    field: "Computer Science",
    period: "2022 - 2024",
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
    institution: "MTIS",
    degree: "Matriculation",
    field: "Software Engineering",
    period: "2020 - 2022",
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
