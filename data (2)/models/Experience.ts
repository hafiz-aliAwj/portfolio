import mongoose, { Schema, type Document } from "mongoose"

export interface IExperience extends Document {
  title: string
  company: string
  period: string
  description: string
  skills: string[]
  sequence: number
  createdAt: Date
  updatedAt: Date
}

const ExperienceSchema = new Schema<IExperience>(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String, required: true },
    skills: { type: [String], default: [] },
    sequence: { type: Number, required: true },
  },
  { timestamps: true },
)

export default mongoose.models.Experience || mongoose.model<IExperience>("Experience", ExperienceSchema)
