import type mongoose from "mongoose"

// User model for authentication
export interface User {
  _id?: mongoose.Types.ObjectId
  username: string
  password: string
  name: string
  email: string
  role: "admin" | "editor"
  createdAt: Date
  updatedAt: Date
}

// Project model
export interface Project {
  _id?: mongoose.Types.ObjectId
  title: string
  description: string
  longDescription?: string
  images: string[]
  technologies: string[]
  keywords?: string[]
  githubUrl?: string
  liveUrl?: string
  features?: string[]
  client?: string
  duration?: string
  role?: string
  sequence: number
  createdAt: Date
  updatedAt: Date
}

// Skill model
export interface Skilli {
  _id?: mongoose.Types.ObjectId
  name: string
  level: number
  category: string
  imgUrl?: string
  sequence: number
  createdAt: Date
  updatedAt: Date
}

// Experience model
export interface Experiencei {
  _id?: mongoose.Types.ObjectId
  title: string
  company: string
  period: string
  description: string
  skills: string[]
  sequence: number
  createdAt: Date
  updatedAt: Date
}

// Education model
export interface Educationi {
  _id?: mongoose.Types.ObjectId
  institution: string
  degree: string
  field: string
  period: string
  description: string
  achievements?: string[]
  sequence: number
  createdAt: Date
  updatedAt: Date
}

// Contact model
export interface Contacti {
  _id?: mongoose.Types.ObjectId
  name: string
  email: string
  message: string
  contactType: "message" | "quote"
  budget?: string
  timeline?: string
  projectType?: string
  status: "new" | "read" | "replied" | "archived"
  createdAt: Date
  updatedAt: Date
}

// Personal details model
export interface PersonalDetailsi {
  _id?: mongoose.Types.ObjectId
  name: string
  title: string
  email: string
  phone: string
  location: string
  bio: string
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
    instagram?: string
    facebook?: string
    whatsapp?: string
  }
  createdAt: Date
  updatedAt: Date
}

// Visitor log model
export interface VisitorLogi {
  _id?: mongoose.Types.ObjectId
  ipAddress: string
  userAgent: string
  referrer: string
  page: string
  email?: string
  name?: string
  location?: string
  visitDate: Date
  createdAt: Date
}
