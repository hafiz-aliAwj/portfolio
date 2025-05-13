import mongoose, { Schema, type Document } from "mongoose"

export interface IPersonalDetails extends Document {
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
  }
  createdAt: Date
  updatedAt: Date
}

const PersonalDetailsSchema = new Schema<IPersonalDetails>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    bio: { type: String, required: true },
    socialLinks: {
      github: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
      instagram: { type: String },
      facebook: { type: String },
    },
  },
  { timestamps: true },
)

export default mongoose.models.PersonalDetails ||
  mongoose.model<IPersonalDetails>("PersonalDetails", PersonalDetailsSchema)
