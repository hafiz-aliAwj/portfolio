import mongoose, { Schema, type Document } from "mongoose"

export interface IContact extends Document {
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

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    contactType: { type: String, enum: ["message", "quote"], required: true },
    budget: { type: String },
    timeline: { type: String },
    projectType: { type: String },
    status: { type: String, enum: ["new", "read", "replied", "archived"], default: "new" },
  },
  { timestamps: true },
)

export default mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema)
