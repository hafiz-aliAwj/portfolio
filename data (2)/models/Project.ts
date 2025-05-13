import mongoose, { Schema, type Document } from "mongoose"

export interface IProject extends Document {
  title: string
  description: string
  longDescription?: string
  images: string[]
  technologies: string[]
  keywords: string[]
  githubUrl: string
  liveUrl: string
  features?: string[]
  client?: string
  duration?: string
  role?: string
  sequence: number
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    images: { type: [String], required: true },
    technologies: { type: [String], required: true },
    keywords: { type: [String], default: [] },
    githubUrl: { type: String, required: true },
    liveUrl: { type: String, required: true },
    features: { type: [String] },
    client: { type: String },
    duration: { type: String },
    role: { type: String },
    sequence: { type: Number, required: true },
  },
  { timestamps: true },
)

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema)
