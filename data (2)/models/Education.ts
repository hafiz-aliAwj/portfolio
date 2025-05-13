import mongoose, { Schema, type Document } from "mongoose"

export interface IEducation extends Document {
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

const EducationSchema = new Schema<IEducation>(
  {
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String, required: true },
    achievements: { type: [String], default: [] },
    sequence: { type: Number, required: true },
  },
  { timestamps: true },
)

export default mongoose.models.Education || mongoose.model<IEducation>("Education", EducationSchema)
