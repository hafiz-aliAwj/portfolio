import mongoose, { Schema, type Document } from "mongoose"

export interface ISkill extends Document {
  name: string
  level: number
  category: string
  description?: string
  image?: string
  active: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const SkillSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    level: {
      type: Number,
      required: [true, "Level is required"],
      min: 0,
      max: 100,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
)

export default mongoose.models.Skill || mongoose.model<ISkill>("Skill", SkillSchema)
